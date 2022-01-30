import {
  MetaFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { deserialize } from "superjson";
import {
  homePageAction,
  HomePageActionPayload,
  HomePageFormErrors,
} from "~/features/home/actions/homepage-action";
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

export let action = homePageAction;

export default function Index() {
  let { serverTime, items, page, totalItems, itemsPerPage } =
    deserialize<HomePageLoaderPayload>(useLoaderData());

  let transition = useTransition();

  let errors = useActionData<HomePageFormErrors>();

  return (
    <HomePage
      serverTime={serverTime}
      items={items}
      page={page}
      total={totalItems}
      itemsPerPage={itemsPerPage}
      transition={transition}
      errors={errors}
    />
  );
}
