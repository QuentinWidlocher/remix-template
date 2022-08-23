import { useMatches } from '@remix-run/react'

/**
 * Get the current route using the useMatches hook
 * @returns the current route
 */
export default function useCurrentRoute(): string | undefined {
  let matches = useMatches()
  return matches[matches.length - 1]?.pathname
}
