import { ActionFunction } from '@remix-run/server-runtime'
import { badRequest } from 'remix-utils'
import { z } from 'zod'
import { db } from '~/utils/db.server'
import { getFormAction, safeParseFormData } from '~/utils/formData.server'

/**
 * Zod validator for our form.
 * Here, the messages are the one that will be displayed to the user, thanks
 * to the FormField component.
 */
const demoPageFormValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Must be a valid email').optional(),
  projects: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        date: z.date({ invalid_type_error: 'Must be a valid date' }).optional(),
      })
    )
    .default([]),
})

// We declare types for parsing the form. Success and Error.
export type DemoPageForm = z.infer<typeof demoPageFormValidator>
export type DemoPageFormErrors = z.ZodFormattedError<DemoPageForm>

/**
 * We declare all the types for the action.
 * Here we only have a single action, but you can have as many as you want and
 * safely check for them in the action function.
 *
 * The type is here to type-check the action in the DemoPageForm component.
 */
const availableActions = ['add'] as const
export type DemoPageAvailableAction = typeof availableActions[number]

export const demoPageAction: ActionFunction = async ({ request }) => {
  // We first use a helper to get the action from the form.
  let action = await getFormAction(request, availableActions)

  // We can now safely check the type of the action.
  if (action == 'add') {
    // We parse the form data. This works with arrays, booleans dates, etc.
    let parsed = await safeParseFormData(request, demoPageFormValidator)

    if (!parsed.success) {
      // In case of error, we return a formatted errors, to display inside the FormField component.
      return parsed.error.format()
    }

    // Here we take a shortcut because the form has the same properties as the database object
    await db.demoUser.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        projects: {
          create: parsed.data.projects.map((project) => ({
            name: project.name,
            date: project.date,
          })),
        },
      },
    })

    // We don't need to return a value, but of course we could send the updated value.
    return null
  }

  // If we reach this point, the action is not valid.
  throw badRequest('Unknown action')
}
