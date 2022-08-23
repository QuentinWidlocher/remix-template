import { DemoProject, DemoUser } from '@prisma/client'
import { Link } from '@remix-run/react'
import { Transition } from '@remix-run/react/dist/transition'
import { DemoPageFormErrors } from '../actions/demo-page-action'
import DemoPageForm from '../components/demo-page-form'
import DemoPageUser from '../components/demo-page-user'

interface DemoPageProps {
  serverTime: Date
  page: number
  total: number
  itemsPerPage: number
  items: (DemoUser & { projects: DemoProject[] })[]
  transition: Transition
  errors?: DemoPageFormErrors
}

/**
 * The page is pretty much the same as the route, expect it takes everything it need
 * in the props instead of using the loader and action hooks.
 * This allow the page to be used somewhere else and also keep things tidy.
 */
export default function DemoPage({
  serverTime,
  items,
  page,
  total,
  itemsPerPage,
  transition,
  errors,
}: DemoPageProps) {
  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-xl font-bold">Demo page</h1>
        <h2 className="text-lg opacity-50">Date: {serverTime.toString()}</h2>
      </div>

      <div className="flex flex-col space-y-5 md:flex-row md:space-x-5">
        <section className="flex-1">
          <DemoPageForm errors={errors} transition={transition} />
        </section>
        <section className="flex flex-1 flex-col space-y-5">
          {items.map((item) => (
            <DemoPageUser key={item.id} item={item} />
          ))}

          <nav className="space-x-5">
            {page - 1 > 0 ? (
              <Link className="rounded bg-gray-200 p-3" to={'?p=' + (page - 1)}>
                Previous page
              </Link>
            ) : null}
            {page + 1 <= Math.ceil(total / itemsPerPage) ? (
              <Link className="rounded bg-gray-200 p-3" to={'?p=' + (page + 1)}>
                Next page
              </Link>
            ) : null}
          </nav>
        </section>
      </div>
    </div>
  )
}
