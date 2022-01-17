# Remix Template

With :

- [Remix](https://github.com/remix-run/remix) (obviously)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Prisma](https://github.com/prisma/prisma) (SQLite by default)
- [Zod](https://github.com/colinhacks/zod)
- [SuperJSON](https://github.com/blitz-js/superjson)

## Notes

Hooks and utils are provided in their respective directories. They serve global applicative purpose (pagination, parsing forms, getting nested route values etc.).

---

This template is losely based on [Bulletproof React](https://github.com/alan2207/bulletproof-react), and provide an example of file architecture and logical structuring via the "home" feature.

You can see an example of a loader with easy pagination, data serialization etc.

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
