import { useActionData, useLoaderData, useTransition } from '@remix-run/react'
import { MetaFunction } from '@remix-run/react/dist/routeModules'
import { deserialize } from 'superjson'
import { SuperJSONResult } from 'superjson/dist/types'
import {
  demoPageAction,
  DemoPageFormErrors,
} from '~/features/demo/actions/demo-page-action'
import {
  demoPageLoader,
  DemoPageLoaderPayload,
} from '~/features/demo/loaders/demo-page-loader'
import DemoPage from '~/features/demo/pages/demo-page'

export let meta: MetaFunction = () => {
  return {
    title: 'Demo Page',
  }
}

/**
 * In the route, I like to only put 'links' to the functions and components
 */

export let loader = demoPageLoader

export let action = demoPageAction

export default function Index() {
  // In the deserialize function, we can use the same type as the loader
  let { serverTime, items, page, totalItems, itemsPerPage } =
    deserialize<DemoPageLoaderPayload>(useLoaderData() as SuperJSONResult)

  // Same thing for the types of the errors
  let errors = useActionData<DemoPageFormErrors>()

  let transition = useTransition()

  // This component is just a simple wrapper around the page component
  return (
    <DemoPage
      serverTime={serverTime}
      items={items}
      page={page}
      total={totalItems}
      itemsPerPage={itemsPerPage}
      transition={transition}
      errors={errors}
    />
  )
}
