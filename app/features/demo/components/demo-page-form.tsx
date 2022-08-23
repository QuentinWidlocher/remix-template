import { Form } from '@remix-run/react'
import { Transition } from '@remix-run/react/dist/transition'
import { useEffect, useRef, useState } from 'react'
import FormField from '~/components/form-field'
import {
  DemoPageAvailableAction,
  DemoPageFormErrors,
} from '../actions/demo-page-action'

interface DemoPageFormProps {
  errors?: DemoPageFormErrors
  transition: Transition
}

/**
 * Display a pretty simple form
 */
export default function DemoPageForm({
  errors,
  transition,
}: DemoPageFormProps) {
  // The only state we need is the number of projects in the list
  let [projectsNumber, setProjectsNumber] = useState(0)

  // We add a ref to the form, so we can reset it later
  let formRef = useRef<HTMLFormElement>(null)

  // Here we type check the action type to always be in sync with the server
  let actionType: DemoPageAvailableAction = 'add'

  // This basically resets the form to its initial state after a successful submit
  let isSending = transition.state == 'submitting'
  useEffect(() => {
    if (!isSending && !errors) {
      formRef.current?.reset()
      setProjectsNumber(0)
    }
  }, [isSending])

  return (
    <Form ref={formRef} method="post" className="flex flex-col space-y-5">
      {/* We use FormField to display a label and errors under the form */}
      <FormField label="Full Name" error={errors?.name}>
        <input className="rounded" type="text" name="name" required />
      </FormField>

      <FormField label="Email (optional)" error={errors?.email}>
        <input className="rounded" type="email" name="email" />
      </FormField>

      {/* A FormField can apply to a list... */}
      <FormField label="Projects" error={errors?.projects}>
        <ul>
          {Array(projectsNumber)
            .fill(0)
            .map((_, index) => (
              <li className="my-5 rounded-lg bg-gray-100 p-3" key={index}>
                <div className="flex flex-wrap space-y-2 md:flex-nowrap md:space-x-2 md:space-y-0">
                  {/* ... as well a certains fields inside the list */}
                  <FormField
                    label="Name"
                    className="flex-1"
                    error={errors?.projects?.[index].name}
                  >
                    {/* 
                    To handle a list of fields, we just need to append [] to the name.
                    To handle objects inside the list, we need to append a [key].
                  */}
                    <input
                      className="rounded"
                      type="text"
                      name={`projects[${index}][name]`}
                      required
                    />
                  </FormField>
                  <FormField
                    label="Date (optional)"
                    className="w-full md:w-1/4"
                    error={errors?.projects?.[index].date}
                  >
                    <input
                      className="rounded"
                      type="date"
                      name={`projects[${index}][date]`}
                    />
                  </FormField>
                </div>
              </li>
            ))}
          <li>
            <div className="mt-5 flex space-x-2">
              <button
                className="flex-1 rounded bg-gray-200 p-1"
                type="button"
                onClick={() => setProjectsNumber((x) => x + 1)}
              >
                Add Project
              </button>
              {projectsNumber > 0 ? (
                <button
                  className="flex-1 rounded bg-red-200 p-1"
                  type="button"
                  onClick={() => setProjectsNumber(projectsNumber - 1)}
                >
                  Remove Last Project
                </button>
              ) : null}
            </div>
          </li>
        </ul>
      </FormField>

      <button
        className="rounded bg-blue-200 p-3"
        type="submit"
        name="_action"
        disabled={isSending}
        value={actionType}
      >
        {isSending ? 'Creating...' : 'Create a user'}
      </button>
    </Form>
  )
}
