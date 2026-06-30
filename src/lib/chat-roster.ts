/**
 * Build-time bridge for passing a chat's participant roster into the <Turn>
 * MDX component.
 *
 * Why this exists: MDX bodies can't read entry frontmatter, and the
 * `components` map passed to <Content/> can only swap a component's identity
 * — it can't inject extra props per render. So the chat detail page sets the
 * roster here before rendering <Content/>, and Turn.astro reads it by key.
 *
 * Safe in this static build: each chat page renders synchronously within its
 * own getStaticPaths iteration; we set → render → (the next page overwrites).
 * There is no concurrent request handling at build time.
 */
export interface Participant {
  name: string;
  role: 'user' | 'assistant' | 'system';
}

let current: Record<string, Participant> = {};

/** Set the roster for the chat currently being rendered. */
export function setChatRoster(roster: Record<string, Participant>): void {
  current = roster;
}

/** Look up a participant by the speaker key used in <Turn speaker="...">. */
export function getParticipant(speaker: string): Participant | undefined {
  return current[speaker];
}
