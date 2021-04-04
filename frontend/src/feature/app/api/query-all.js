import {makeRequest} from './make-request'

export const queryAll = makeRequest(
  () => `query {
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

    developers {
      id
      name
    }    
  }`,
  (v) => v,
)
