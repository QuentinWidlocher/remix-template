# Remix Template

With :

- [Remix](https://github.com/remix-run/remix) (obviously)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [Prisma](https://github.com/prisma/prisma) (SQLite by default)
- [Zod](https://github.com/colinhacks/zod)

## Notes

To prevent double render, css is compiled from `./styles` in `.cache/postcss.ignored` and then synchronized in `./app/styles`.\
**Don't** write css inside `./app/styles` or else it will be removed!

---

You can seed your Prisma database by updating the `seed()` function in `./prisma/seed.ts`

---

You can access the Prisma client by importing `db` from `~/utils/db.ts`.\
This script allow reloading the Remix server without re-creating a new database connection each time.
