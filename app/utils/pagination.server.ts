const defaultItemsPerPage = 20;

export interface Paginated<Item> {
  items: Item[];
  totalItems: number;
  itemsPerPage: number;
  page: number;
}

/**
 * Take the request, a function to fetch the items, a function to get the total of items, and the items per page
 * and return a paginated object.
 * @param param0
 * @returns Everything needed to paginate a loader
 */
export async function paginateLoader<Item>({
  request,
  getItems,
  getTotal,
  itemsPerPage = defaultItemsPerPage,
}: {
  request: Request;
  getItems: (page: number, itemsPerPage: number) => Promise<Item[]>;
  getTotal: () => Promise<number>;
  itemsPerPage?: number;
}): Promise<Paginated<Item>> {
  let url = new URL(request.url);
  let page = url.searchParams.get("p");
  let pageNumber = page && Number(page) > 0 ? Number(page) - 1 : 0;

  let [items, totalItems] = await Promise.all([
    getItems(pageNumber, itemsPerPage),
    getTotal(),
  ]);

  return {
    items: items ?? [],
    page: pageNumber + 1,
    totalItems,
    itemsPerPage,
  };
}
