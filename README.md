# Remix Template

With :

- [Remix](https://github.com/remix-run/remix) (obviously)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Prisma](https://github.com/prisma/prisma) (SQLite by default)
- [Zod](https://github.com/colinhacks/zod) (To easily validate and format form errors)
- [qs](https://github.com/ljharb/qs) (To parse complex form data)
- [SuperJSON](https://github.com/blitz-js/superjson) (To send complex data through loaders)
- [Remix Utils](https://github.com/sergiodxa/remix-utils)

## Notes

This repository contains a demo showcasing the way it's meant to be used (Styles, database, form parsing and validation, pagination and more).

You should take a look at the demo to see how everything works, it's a very basic list + creation form.

**Before starting** you should delete those files and folders :

- `/app/features/demo`
- `/app/routes/demo.tsx`
- `/prisma/migration/`
- `/prisma/demo-db.sqlite`

And the `demo()` function in `/prisma/seed.ts`

Don't forget to add a `.env` file at the root of the project and declare a `DATABASE_URL` too.

---

Hooks and utils are provided in their respective directories. They serve global applicative purpose (pagination, parsing forms, getting nested route values etc.).

You also have access to basic components used for forms in `/app/components` (see the demo for a use case)

---

This template is losely based on [Bulletproof React](https://github.com/alan2207/bulletproof-react), and provide an example of file architecture and logical structuring via the "demo" feature.

---

A `manifest.json` and a service worker (`sw.js`) are already defined.

---

CSS is compiled from `/styles` to `/app/styles`.\
**Don't** write css inside `/app/styles` or else it will be removed!

---

You can seed your Prisma database by updating the `seed()` function in `./prisma/seed.ts`

---

You can access the Prisma client by importing `db` from `~/utils/db.ts`.\
This script allow reloading the Remix server without re-creating a new database connection each time.
