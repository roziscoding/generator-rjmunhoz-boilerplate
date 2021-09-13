// TODO: Replace with your endpoints
import { dummy } from './dummy'
import { Routing } from '@expresso/router'

/**
 * Creates all the routing for this app
 * @returns Routes object
 */
export const getRoutes = (): Routing => {
  return {
    // TODO: Replace with your routes
    '/dummy': {
      get: dummy,
    }
  }
}