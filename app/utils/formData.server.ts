import { z } from "zod";
import qs from "qs";

/**
 * Get an object with the fields from the formData
 * @param request the request object containing the form data
 * @returns an object representing the form data
 */
async function getObjectFromFormData(request: Request) {
  let formData = await request.formData();
  let formDataEntries = [...formData.entries()] as string[][];
  let queryParams = new URLSearchParams(formDataEntries).toString();
  return qs.parse(queryParams);
}

/**
 * Parse a form data object into a valid object using safeParse.
 * @param request the request containing the form data
 * @param validator the zod validator to use
 * @returns a promise that resolves to the parsed object or error
 */
export function safeParseFormData<T extends z.ZodRawShape>(
  request: Request,
  validator: z.ZodObject<T>
) {
  return getObjectFromFormData(request).then((formData) =>
    validator.safeParse(formData)
  );
}

/**
 * Parse a form data object into a valid object.
 * @param request the request containing the form data
 * @param validator the zod validator to use
 * @returns a promise that resolves to the parsed object
 */
export function parseFormData<T extends z.ZodRawShape>(
  request: Request,
  validator: z.ZodObject<T>
) {
  return getObjectFromFormData(request.clone()).then((formData) =>
    validator.parse(formData)
  );
}

/**
 * Parse the form data and get the _action field.
 * Returns the action or throws an error if the action is not valid.
 * @param request the request containing the form data
 * @param availableActions the actions that are available for the form (must be readonly)
 * @returns the action type
 */
export async function getFormAction<
  Actions extends Readonly<[string, ...string[]]> = Readonly<
    [string, ...string[]]
  >
>(request: Request, availableActions: Actions): Promise<Actions[number]> {
  // Wtf, calling formData() actually consume the request body
  // thus the second time we call it (inside safeParseFormData)
  // it just returns an empty object. This is why we clone the request
  let formData = await request.clone().formData();
  let rawAction = formData.get("_action")?.toString();
  let parsedResult: Actions[number] = z.enum(availableActions).parse(rawAction);
  return parsedResult;
}
