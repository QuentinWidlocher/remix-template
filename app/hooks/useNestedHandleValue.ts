import { useMatches } from "remix";

export default function useNestedHandleValue<T>(key: string): T | undefined {
  let matches = useMatches();

  let defaultValue = { data: { [key]: undefined } };
  let foundValue = matches.find((m) => key in (m.data ?? {}));

  let { data } = foundValue ?? defaultValue;

  return data[key];
}
