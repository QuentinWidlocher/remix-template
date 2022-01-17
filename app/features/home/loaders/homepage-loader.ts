import { LoaderFunction } from "remix";
import { serialize } from "superjson";
import { Paginated, paginateLoader } from "~/utils/pagination.server";

export type HomePageLoaderPayload = Paginated<string> & { serverTime: Date };

const fakeData = [
  "Hello",
  "World",
  "!",
  "How",
  "are",
  "you",
  "doing",
  "today",
  "?",
  "I",
  "am",
  "fine",
  "thanks",
  "for",
  "asking",
];

export const homePageLoader: LoaderFunction = async ({ request }) => {
  let { items, page, totalItems, itemsPerPage } = await paginateLoader<string>({
    request,
    getItems: async (page, itemsPerPage) =>
      fakeData.slice(page * itemsPerPage, (page + 1) * itemsPerPage),
    getTotal: async () => fakeData.length,
    itemsPerPage: 3,
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
