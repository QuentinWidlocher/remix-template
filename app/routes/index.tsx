import { MetaFunction } from 'remix'

export let meta: MetaFunction = () => {
  return {
    title: 'My Remix Index',
  }
}

export default function Index() {
  return <div className="text-red-500">Hello, World!</div>
}
