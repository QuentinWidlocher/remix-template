import { DemoProject, DemoUser } from "@prisma/client";
import { LoaderFunction } from "remix";
import { serialize } from "superjson";
import { db } from "~/utils/db.server";
import { Paginated, paginateLoader } from "~/utils/pagination.server";

export type HomePageLoaderPayload = Paginated<
  DemoUser & { projects: DemoProject[] }
> & {
  serverTime: Date;
};

export const homePageLoader: LoaderFunction = async ({ request }) => {
  let { items, page, totalItems, itemsPerPage } = await paginateLoader<
    DemoUser & { projects: DemoProject[] }
  >({
    request,
    getItems: (page, itemsPerPage) =>
      db.demoUser.findMany({
        include: { projects: true },
        take: itemsPerPage,
        skip: page * itemsPerPage,
        orderBy: {
          name: "asc",
        },
      }),
    getTotal: () => db.demoUser.count(),
    itemsPerPage: 5,
  });

  let payload: HomePageLoaderPayload = {
    items,
    page,
    totalItems,
    itemsPerPage,
    serverTime: new Date(),
  };

  return serialize(payload);
};
