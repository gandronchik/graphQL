const {makeRequest} = require('./make-request')

const appSetDevelopers = makeRequest(
  function makeQuery({appId, developerIds}) {
    return `
      mutation {
        setAppDevelopers(
          appId: "${appId}"
          developerIds: [${developerIds.map(v => `"${v}"`).join`,`}]
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
  `setAppDevelopers`
)

module.exports = {appSetDevelopers}