import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const getMatches = () =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
      : undefined

  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(getMatches)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    setIsMobile(mql.matches) // initialize after mount
    mql.addEventListener("change", handler)

    return () => mql.removeEventListener("change", handler)
  }, [])

  return isMobile
}
