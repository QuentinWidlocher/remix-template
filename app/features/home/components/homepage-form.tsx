import { Transition } from "@remix-run/react/transition";
import { useEffect, useRef, useState } from "react";
import { Form } from "remix";
import FormField from "~/components/form-field";
import {
  HomePageAvailableAction,
  HomePageFormErrors,
} from "../actions/homepage-action";

interface HomePageFormProps {
  errors?: HomePageFormErrors;
  transition: Transition;
}

export default function HomePageForm({
  errors,
  transition,
}: HomePageFormProps) {
  let [projectsNumber, setProjectsNumber] = useState(0);
  let formRef = useRef<HTMLFormElement>(null);

  let actionType: HomePageAvailableAction = "add";
  let isSending = transition.state == "submitting";

  useEffect(() => {
    console.debug("errors", errors);
    if (!isSending && !errors) {
      formRef.current?.reset();
      setProjectsNumber(0);
    }
  }, [isSending]);

  return (
    <Form ref={formRef} method="post" className="flex flex-col space-y-5">
      <FormField label="Full Name" error={errors?.name}>
        <input className="rounded" type="text" name="name" required />
      </FormField>

      <FormField label="Email (optional)" error={errors?.email}>
        <input className="rounded" type="email" name="email" />
      </FormField>

      <FormField label="Projects" error={errors?.projects}>
        <ul>
          {Array(projectsNumber)
            .fill(0)
            .map((_, index) => (
              <li className="my-3" key={index}>
                <FormField error={errors?.projects?.[index]}>
                  <div className="flex">
                    <input
                      className="flex-1 rounded"
                      type="text"
                      name="projects[]"
                      required
                    />
                  </div>
                </FormField>
              </li>
            ))}
          <li>
            <div className="flex space-x-2">
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
                  Remove Project
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
        Create User
      </button>
    </Form>
  );
}
