/**
 * Cheap heuristic for whether a markdown body contains math.
 * Matches both display (`$$...$$`) and inline (`$...$`) delimiters used by
 * remark-math. We intentionally keep this a simple scan rather than parsing
 * markdown — false positives (e.g. a literal $ in prose) just mean we load
 * the KaTeX stylesheet unnecessarily, which is harmless.
 */
export function hasMath(body: string): boolean {
  return /\$/.test(body);
}
