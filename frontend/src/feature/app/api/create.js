import {makeRequest} from './make-request'

export const create = makeRequest(
  ({name}) => `mutation {
    createApp(app: {
      name: "${name}"
      publisherId: "almus"
    }) {
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
  }`,
  ({createApp}) => createApp,
)
