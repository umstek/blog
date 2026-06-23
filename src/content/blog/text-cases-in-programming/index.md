---
title: "Text Cases in Programming"
description: "Camel, Pascal, Snake, what do they even mean?"
pubDatetime: 2017-01-16T05:42:22.000Z
tags:
  - conventions
  - programming
---

When coding, text cases become an important factor if you want to maintain your code up to a high standard, following best practices. Different languages follow different naming conventions for variables, constants etc. Here we discuss some of the different types of text casing and their usages in some popular languages.

## Camel Case

Spaces are omitted and first letter of each word is capitalized. Looks like a camel with many humps. Other names: _Pascal Case_, _Bumpy Caps_, _Upper Camel Case_.  
e.g.: `CreateCatDetailsPage`, `GiveMeAHug`, `XmlHttpRequest` _(Note how popular abbreviations are converted.)_  
**C#/VB _(VB is case insensitive)_ method names**

## Headless Camel Case

Spaces are omitted and first letter of each word except the first word is capitalized. As implied by the name, looks like a camel without its head.  
e.g.: `getCatDetails`, `giveMeAHug`  
**Java method and variable names**

## Snake Case

Looks like snakes, with the words of phrases are separated with undescores (`_`) rather than spaces.  
e.g.: `get_snake_details`, `give_me_a_hug`  
**Python/Ruby function and variable names**

## Screaming Snake Case

Screaming most of the time means making all the text uppercase. This case is the same as snake case except that all letters are capitalized.  
e.g.: `SNAKE_SPEED_FACTOR`, `MAX_SNAKE_AGE`  
**In most programming languages, constants are named using screaming snake case.**

## Kebab Case / Lisp Case

This one does not have a standard name but called with names like _Caterpillar Case_, _Spine Case_, or _Hyphenated_.  
e.g.: `max-time-limit`, `font-family`  
**CSS, Lisp**

## Train Case

This one is the same as the above, but first letters of all words are capitalized.  
e.g.: `Train-Case`

## COBOL Case

Looks more like a screaming Lisp case. Hyphenated words with all caps.  
e.g.: `MAGIC-NUMBER`  
**COBOL**

## Studly Caps

Uppercase letters and lowercase letters are mixed. I'm curious whether this is used in any kind of programming.  
e.g.: `StUdLyCaPs`

---

If you know of more, or if you want to add anything, need clarifications, please comment below. :smile:
