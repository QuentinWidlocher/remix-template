import { MetaFunction, useLoaderData } from "remix";
import { deserialize } from "superjson";
import {
  homePageLoader,
  HomePageLoaderPayload,
} from "~/features/home/loaders/homepage-loader";
import HomePage from "~/features/home/pages/homepage-page";

export let meta: MetaFunction = () => {
  return {
    title: "My Home page",
  };
};

export let loader = homePageLoader;

export default function Index() {
  let { serverTime, items, page, totalItems, itemsPerPage } =
    deserialize<HomePageLoaderPayload>(useLoaderData());
  return (
    <HomePage
      serverTime={serverTime}
      items={items}
      page={page}
      total={totalItems}
      itemsPerPage={itemsPerPage}
    />
  );
}
