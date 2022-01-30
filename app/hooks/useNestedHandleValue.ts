import { useMatches } from "remix";

/**
 * This hooks can access a data form any parent route.
 * Pretty useful to get something like the current user without having to
 * fetch it from the server everytime.
 * 
 * @param key the key of the value we want to get
 * @returns the value if it exists, undefined otherwise
 */
export default function useNestedHandleValue<T>(key: string): T | undefined {
  let matches = useMatches();

  let defaultValue = { data: { [key]: undefined } };
  let foundValue = matches.find((m) => key in (m.data ?? {}));

  let { data } = foundValue ?? defaultValue;

  return data[key];
}
