import { DemoProject, DemoUser } from "@prisma/client";
import { Transition } from "@remix-run/react/transition";
import { Form, Link } from "remix";
import {
  HomePageForm as HomePageFormType,
  HomePageFormErrors,
} from "../actions/homepage-action";
import HomePageForm from "../components/homepage-form";
import HomePageItem from "../components/homepage-item";

interface HomePageProps {
  serverTime: Date;
  page: number;
  total: number;
  itemsPerPage: number;
  items: (DemoUser & { projects: DemoProject[] })[];
  transition: Transition;
  errors?: HomePageFormErrors;
}

export default function HomePage({
  serverTime,
  items,
  page,
  total,
  itemsPerPage,
  transition,
  errors,
}: HomePageProps) {
  return (
    <div>
      <h1 className="text-xl font-bold">Home page</h1>
      <h2 className="text-lg opacity-50">Date: {serverTime.toString()}</h2>

      <div className="flex space-x-5 p-5">
        <section className="flex-1">
          <HomePageForm errors={errors} transition={transition} />
        </section>
        <section className="flex flex-1 flex-col space-y-5">
          {items.map((item) => (
            <HomePageItem key={item.id} item={item} />
          ))}

          <nav className="space-x-5">
            {page - 1 > 0 ? (
              <Link className="rounded bg-gray-200 p-3" to={"?p=" + (page - 1)}>
                Previous page
              </Link>
            ) : null}
            {page + 1 <= Math.ceil(total / itemsPerPage) ? (
              <Link className="rounded bg-gray-200 p-3" to={"?p=" + (page + 1)}>
                Next page
              </Link>
            ) : null}
          </nav>
        </section>
      </div>
    </div>
  );
}
