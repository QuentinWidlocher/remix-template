# Remix Template

With :

- Remix (obviously)
- Tailwind CSS
- Prisma (SQLite by default)

## Notes

To prevent double render, css is compiled from `./styles` in `.cache/postcss.ignored` and then synchronized in `./app/styles`.\
**Don't** write css inside `./app/styles` or else it will be removed!

---

You can seed your Prisma database by updating the `seed()` function in `./prisma/seed.ts`

---

You can access the Prisma client by importing `db` from `~/utils/db.ts`.\
This script allow reloading the Remix server without re-creating a new database connection each time.
