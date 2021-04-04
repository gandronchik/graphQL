import {makeRequest} from './make-request'

export const queryAll = makeRequest(function makeQuery() {
  return `
    query {
      apps {
        id
        name
        publisher {
          id
          name
        }
        developers {
          id
          name
        }
      }
    }
  `
}, `apps`)
