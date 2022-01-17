import { z } from "zod";

/**
 * Get an object with the fields from the formData
 * @param request the request object containing the form data
 * @returns an object representing the form data
 */
function getObjectFromFormData(request: Request) {
  return request.formData().then((fd) => Object.fromEntries(fd.entries()));
}

/**
 * Actually only transforms 'true' and 'false' to booleans
 * TODO: parse other types of values
 * @param val the value to transform
 * @returns the transformed value
 */
function transformField(val: unknown | null) {
  switch (val) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return val;
  }
}

/**
 * Apply the transformField function to all fields in the object
 * @param obj the object to transform
 * @returns the transformed object
 */
function transformFields(obj: any) {
  return Object.keys(obj as any).reduce(
    (acc, k) => ({
      ...acc,
      [k]: transformField(obj[k]),
    }),
    {}
  );
}

/**
 * Use transformFields to edit the fields in the object
 * @param validator the zod validator
 * @returns an updated zod validator
 */
function transformFormData<T extends z.ZodRawShape>(validator: z.ZodObject<T>) {
  return z.preprocess(
    (obj) => (typeof obj == "object" ? transformFields(obj) : obj),
    validator
  );
}

/**
 * Parse a form data object into a valid object using safeParse.
 * @param request the request containing the form data
 * @param validator the zod validator to use
 * @returns a promise that resolves to the parsed object or error
 */
export async function safeParseFormData<T extends z.ZodRawShape>(
  request: Request,
  validator: z.ZodObject<T>
) {
  return getObjectFromFormData(request).then((x) =>
    transformFormData(validator).safeParse(x)
  );
}

/**
 * Parse a form data object into a valid object.
 * @param request the request containing the form data
 * @param validator the zod validator to use
 * @returns a promise that resolves to the parsed object
 */
export async function parseFormData<T extends z.ZodRawShape>(
  request: Request,
  validator: z.ZodObject<T>
) {
  return getObjectFromFormData(request).then((x) =>
    transformFormData(validator).parse(x)
  );
}
