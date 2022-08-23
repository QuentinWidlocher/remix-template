import { MetaFunction } from '@remix-run/react/dist/routeModules'

export let meta: MetaFunction = () => {
  return {
    title: 'Remix Template',
  }
}

export default function Index() {
  return <h1 className="text-blue">Hello, World!</h1>
}
