import {makeRequest} from './make-request'

export const setDevelopers = makeRequest(
  function makeQuery({appId, developerIds}) {
    return `
      mutation {
        setAppDevelopers(
          appId: "${appId}"
          developerIds: [${developerIds.map((v) => `"${v}"`).join`,`}]
        ) {
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
  },
  ({setAppDevelopers}) => setAppDevelopers,
)
