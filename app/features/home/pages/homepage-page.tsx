import { Form, Link } from "remix";
import Home from "../components/homepage-item";

interface HomePageProps {
  serverTime: Date;
  page: number;
  total: number;
  itemsPerPage: number;
  items: string[];
}

export default function HomePage({
  serverTime,
  items,
  page,
  total,
  itemsPerPage,
}: HomePageProps) {
  return (
    <div>
      <h1 className="text-xl font-bold">Home page</h1>
      <h2 className="text-lg opacity-50">Date: {serverTime.toString()}</h2>

      <section className="my-5">
        {items.map((item) => (
          <>
            <Home key={item} item={item} />
            <br />
          </>
        ))}
      </section>

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
    </div>
  );
}
