import { z } from "zod";
import qs, { IParseOptions } from "qs";

// Taken from here : https://github.com/ljharb/qs/issues/91#issuecomment-522289267
// Added support for dates
function newDecoder(
  parseNumbers = true,
  parseDates = true,
  parseBool = true,
  ignoreNull = true,
  ignoreEmptyString = true
) {
  let decoder: IParseOptions["decoder"] = (str, decoder, charset) => {
    const strWithoutPlus = str.replace(/\+/g, " ");
    if (charset === "iso-8859-1") {
      // unescape never throws, no try...catch needed:
      return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }

    if (parseNumbers && /^(\d+|\d*\.\d+)$/.test(str)) {
      return parseFloat(str);
    }

    if (ignoreEmptyString && str.length === 0) {
      return;
    }

    const keywords = {
      null: ignoreNull ? undefined : null,
      undefined,
    };

    if (str in keywords) {
      //@ts-ignore - I know we're supposed to return a string, but we need this and it works
      return keywords[str];
    }

    const boolKeywords = {
      true: true,
      false: false,
    };

    if (parseBool && str in boolKeywords) {
      //@ts-ignore - I know we're supposed to return a string, but we need this and it works
      return boolKeywords[str];
    }

    if (
      parseDates &&
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(str)
    ) {
      return new Date(str);
    }

    try {
      return decodeURIComponent(strWithoutPlus);
    } catch (e) {
      return strWithoutPlus;
    }
  };

  return decoder;
}

const customDecoder = newDecoder();

/**
 * Get an object with the fields from the formData
 * @param request the request object containing the form data
 * @returns an object representing the form data
 */
async function getObjectFromFormData(request: Request) {
  let formData = await request.formData();
  let formDataEntries = [...formData.entries()] as string[][];
  let queryParams = new URLSearchParams(formDataEntries).toString();
  return qs.parse(queryParams, { decoder: customDecoder });
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
