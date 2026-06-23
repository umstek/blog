---
title: "My React+Markdown blog journey (Part 1)"
description: "Me trying to create the perfect blog, and failing"
pubDatetime: 2019-01-21T05:00:00.000Z
series:
  name: "My blog journey"
  order: 1
tags:
  - blog
  - react
  - gatsby
  - github
---

I had the idea of creating a blog since at least 2010. In fact, I **did** create
several blogs (<https://umstek.wordpress.com/>, <http://www.umstek.co.vu/>,
<https://bunnydebugs.wordpress.com/>) and some of them even had custom domains,
I got [for](https://codotvu.co/ "co.vu")
[free](https://www.freenom.com/en/index.html?lang=en "Freenom"). After becoming
more of a programmer than a multimedia guy, I decided that I needed a custom
blog -- or a website.

Since my focus was a _static_ blog, that also had few custom pages to showcase
what I have developed, I decided to go with [Jekyll](https://jekyllrb.com/)
on [GitHub pages](https://pages.github.com/). Selecting GitHub pages as the
hosting space is the best matching choice because of several reasons. I only
need to add a file to the remote repository hosted on git, with virtually
unlimited space, to [trigger a build](https://travis-ci.org/ "Travis-CI") and
update my blog. I can even use GitHub's web UI to write a post! As far as the
limitations are concerned, I didn't need any database connectivity or use of
any APIs that needed authentication.

Jekyll, on the other hand, was the preferred choice with GitHub pages, although
now you can just add some HTML pages or Markdown and configure GitHub Pages
with a theme to build a site instantly. Even if I could do that at the time, I
needed the ability to customize my website. My relationship with Jekyll was
fine initially as it was already familiar to me with the
[liquid template engine](https://shopify.github.io/liquid/), which is used to
generate HTML pages (you need pages other than markdown posts, and navigation
etc.) -- I had used [Symfony](https://symfony.com/) (v2 and v3) which was (is?)
a popular [PHP](https://secure.php.net/manual/en/intro-whatis.php) web
framework with a template language called [twig](https://twig.symfony.com/),
which is similar to liquid. But it became uncomfortable when I had to touch
[Ruby](https://www.ruby-lang.org/en/) to get some things done. Jekyll also had
some problems with Windows and I had problems with Linux.

Anyway, I didn't have much time to write posts, as I was busy with academic
work and other work, such as finding the perfect blog platform rather than
writing blogs on what is available.

I don't remember when I decided that I needed a new blog site but should be
around January 2017. But I know why I wanted a new site:
[React](https://reactjs.org/) was beginning to be the de-facto view library and
[NodeJS](https://nodejs.org/en/) was already popular. I accidentally learned
React and was obsessed with it.

So, I needed to write posts in
[markdown](https://en.wikipedia.org/wiki/Markdown), other pages and the site in
React, and to have the site
[SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) ready. Since I
was still going to host the site on GitHub pages,
[SSR](https://alligator.io/react/server-side-rendering/) was not possible
(and not needed, since the content was static) because there was no server.
But, if I can get the rendered HTML once per change, it was what I needed.
After researching, I found [GatsbyJS](https://www.gatsbyjs.org/), which matched
all of my obsessions.

GatsbyJS is an entire ecosystem which lets you create static
[progressive web apps](https://developers.google.com/web/progressive-web-apps/)
with state-of-the-art tools like React, [GraphQL](https://graphql.org/),
Markup(down) together with APIs that brings data to the site. Everything is
built before publishing on your preferred platform (gh-pages,
[netlify](https://www.netlify.com/), [now.sh](https://zeit.co/now) etc.) so
it's plain ol' HTML with additional CSS/JS and other assets. I used the
gatsby-advanced-starter boilerplate and it's even configured with more plugins
such as image compression, tags, SEO and
[Google Analytics](https://analytics.google.com/analytics/web/). I added the
magnificent [Grommet UI](https://v1.grommet.io/) kit from hp (?) and was good to
go.

Of course, the journey didn't end there.
