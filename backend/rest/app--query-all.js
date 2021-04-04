const {makeRequest} = require('./make-request')

const appQueryAll = makeRequest(
  function makeQuery() {
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
  },
  `apps`
)

module.exports = {appQueryAll}
