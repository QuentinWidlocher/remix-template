import { DemoProject, DemoUser } from "@prisma/client";
import { LoaderFunction } from "remix";
import { serialize } from "superjson";
import { db } from "~/utils/db.server";
import { Paginated, paginateLoader } from "~/utils/pagination.server";

/**
 * We declare a return type for the loader.
 * We'll use this inside the route to type-check the response.
 */
export type DemoPageLoaderPayload = Paginated<
  DemoUser & { projects: DemoProject[] }
> & {
  serverTime: Date;
};

export const demoPageLoader: LoaderFunction = async ({ request }) => {
  // Here we paginate the list of users
  let { items, page, totalItems, itemsPerPage } = await paginateLoader<
    DemoUser & { projects: DemoProject[] }
  >({
    request, // We need to provide the request to read the query params
    // We also need a function to fetch the users for the current page
    getItems: (page, itemsPerPage) =>
      db.demoUser.findMany({
        include: { projects: true },
        take: itemsPerPage,
        skip: page * itemsPerPage,
        orderBy: {
          name: "asc",
        },
      }),
    // We also need a function to fetch the total of users
    getTotal: () => db.demoUser.count(),
    // And we can optionally provide the numbers of items per page
    itemsPerPage: 5,
  });

  // We create a type payload to type-check the response
  let payload: DemoPageLoaderPayload = {
    items,
    page,
    totalItems,
    itemsPerPage,
    serverTime: new Date(),
  };

  // And we use the serialize function to ensure our complex types are serialized (like dates)
  return serialize(payload);
};
