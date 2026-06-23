import { jsx, jsxs } from 'react/jsx-runtime';

/**
 * Custom OG card renderer, designed to match the blog's minimal theme:
 * light surface, accent-colored site name as a kicker, bold title, and a
 * muted description. Uses Takumi's built-in Tailwind via the `tw` prop.
 *
 * Replaces the stock `blackAndWhite` preset (spec §B.2.5: the OG card
 * should be part of the visual identity, not a default).
 *
 * @typedef {import('astro-takumi').RenderFunctionInput} RenderFunctionInput
 * @param {RenderFunctionInput} input
 * @returns {Promise<import('react').ReactNode>}
 */
export async function blogCard({ title, description }) {
  return jsxs(
    'div',
    {
      tw: 'flex h-full w-full flex-col justify-between',
      style: {
        backgroundColor: '#ffffff',
        padding: '64px 72px',
        fontFamily: 'Inter',
      },
      children: [
        jsx(
          'div',
          {
            tw: 'flex items-center gap-3',
            style: { color: '#c2410c' },
            children: jsx('span', {
              tw: 'text-3xl font-semibold tracking-tight',
              children: 'UMSTeK Blog',
            }),
          },
        ),
        jsxs(
          'div',
          {
            tw: 'flex flex-col',
            style: { color: '#1c1c1e' },
            children: [
              jsx('div', {
                tw: 'text-6xl font-bold leading-tight tracking-tight',
                children: title,
              }),
              description
                ? jsx('div', {
                    tw: 'mt-6 text-3xl leading-relaxed',
                    style: { color: '#6b6b70' },
                    children: description,
                  })
                : null,
            ],
          },
        ),
        jsx('div', {
          tw: 'text-2xl',
          style: { color: '#9a9aa2' },
          children: 'blog.umstek.com',
        }),
      ],
    },
  );
}
