import { RemixBrowser } from '@remix-run/react'
import { hydrate } from 'react-dom'

hydrate(<RemixBrowser />, document)

// if the browser supports SW (all modern browsers do it)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // we will register it after the page complete the load
    navigator.serviceWorker.register('/sw.js')
  })
}
