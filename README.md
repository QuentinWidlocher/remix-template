# Remix Template

With :

- [Remix](https://github.com/remix-run/remix) (obviously)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Prisma](https://github.com/prisma/prisma) (SQLite by default)
- [Zod](https://github.com/colinhacks/zod) (To easily validate and format form errors)
- [qs](https://github.com/ljharb/qs) (To parse complex form data)
- [SuperJSON](https://github.com/blitz-js/superjson) (To send complex data through loaders)
- [Remix Utils](https://github.com/sergiodxa/remix-utils)

## Before you start

Check out the demo app if you want ([read here](#a-demo-app)).

Then you should delete these :

- Then entire [`/app/features/demo`](/app/features/demo) directory
- The [`/app/routes/demo.tsx`](/app/routes/demo.tsx) file
- The `demo()` function in [`/prisma/seed.ts`](/prisma/seed.ts)
- The two `Demo` models in [`/prisma/schema.prisma`](prisma/schema.prisma)

Don't forget to add a `.env` file at the root of the project and declare a `DATABASE_URL` too.

You should also update [`meta()`](app/root.tsx) function and the [`manifest.json`](public/manifest.json) with you application name.

## Features

### A demo "app"

Everything mentionned below can be seen in the [`/app/features/demo`](/app/features/demo) directory. It's heavily commented so you should definitely have a look to see how I recommend using this template.

To view this demo :

1. Add this line to a `.env` file at the root of the project :
   - `DATABASE_URL=file:./demo-db.sqlite?mode=memory&cache=shared`
2. Run `yarn && yarn prisma migrate dev` to build the database
3. Run `yarn dev` to launch the app
4. Access the demo on `localhost:3000/demo`

This demo is loosely based on [Bulletproof React](https://github.com/alan2207/bulletproof-react). This is simply how I prefer to organize my code but feel free to do as you please.

### A Prisma ORM, ready to use

The template comes with [Prisma](https://github.com/prisma/prisma).

You can access the Prisma client by importing `db` from [`~/utils/db.ts`](app/utils/db.server.ts).\
This script allow reloading the Remix server without re-creating a new database connection each time.

You can seed your Prisma database by updating the `seed()` function in [`/prisma/seed.ts`](/prisma/seed.ts)

### Tailwind CSS

The template uses PostCSS to include

- [Tailwind](https://github.com/tailwindlabs/tailwindcss)
- [Tailwind Form Reset](https://github.com/tailwindlabs/tailwindcss-forms) plugin
- Support for [CSS Nesting](https://github.com/postcss/postcss-nested) (because it's so much easier to write custom CSS like that)
- A [Prettier plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) that automatically reorder your Tailwind classes.

CSS is compiled from [`/styles`](/styles) to `/app/styles`.\
**Don't** write css inside `/app/styles` or else it will be removed!

### Utilitary functions and components

A lot of utils functions and hooks are already available with [Remix Utils](https://github.com/sergiodxa/remix-utils), this template adds a bunch more like :

- [`useCurrentRoute()`](app/hooks/useCurrentRoute.ts), to simply get the name of the current route client-side
- [`useNestedHandleValue()`](app/hooks/useNestedHandleValue.ts), to access previously loaded data from parent routes client-side.
- [`parseFormData()` and `safeParseFormData()`](/app/utils/formData.server.ts), using [`qs`](https://github.com/ljharb/qs) and [`zod`](https://github.com/colinhacks/zod) to powerfully parse the form data. It allows to :
  - Parse primitive directly (Numbers, dates, null/undefined, arrays, objects...)
  - Provide a zod validator to ensure the form is correct (compatible with `<FormField/>`)
- [`getFormAction()`](/app/utils/formData.server.ts), to quickly extract the `_action` field from a form, and ensure it's correctly typed. This field is usually used to have a single route with multiple actions. You can also use this type in the client to ensure the form provides the right type
- [`<FormField/>`](app/components/form-field.tsx) and [`<ErrorMessage/>`](app/components/error-message.tsx), to display a form field with a label, and automatically display `ZodFormattedErrors` from your validator.
- [`paginateLoader()`](app/utils/pagination.server.ts), to quickly paginate a list, coming from any source of data. It uses a `?p=1` query parameter.

### Ready to be a PWA

Well, not really since Remix works server-side, but this template provide a [`manifest.json`](public/manifest.json) and a service worker ([`sw.js`](public/sw.js)) to cache requests to built files.
