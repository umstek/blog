/// <reference path="../.astro/types.d.ts" />

// @pagefind/default-ui ships no type declarations.
declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options: {
      element: string;
      showSubResults?: boolean;
      showImages?: boolean;
      processTerm?: (term: string) => string | string[] | false | Promise<string | string[] | false>;
      translations?: Record<string, string>;
    });
  }
}
