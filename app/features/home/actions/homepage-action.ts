import type { ActionFunction } from "remix";
import { badRequest } from "remix-utils";
import { z } from "zod";
import { db } from "~/utils/db.server";
import { getFormAction, safeParseFormData } from "~/utils/formData.server";

const homepageFormValidator = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Email is invalid").optional(),
  projects: z.array(z.string().nonempty("Project is required")).default([]),
});

export type HomePageForm = z.infer<typeof homepageFormValidator>;
export type HomePageFormErrors = z.ZodFormattedError<HomePageForm>;

export type HomePageActionPayload = {
  values: HomePageForm;
  errors: HomePageFormErrors;
};

const availableActions = ["add"] as const;
export type HomePageAvailableAction = typeof availableActions[number];

export const homePageAction: ActionFunction = async ({ request }) => {
  let action = await getFormAction(request, availableActions);

  if (action == "add") {
    let parsed = await safeParseFormData(request, homepageFormValidator);

    if (!parsed.success) {
      return parsed.error.format();
    }

    await db.demoUser.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        projects: {
          create: parsed.data.projects.map((project) => ({
            name: project,
          })),
        },
      },
    });

    return null;
  }

  throw badRequest("Unknown action");
};
