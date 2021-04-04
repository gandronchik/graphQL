const {makeRequest} = require('./make-request')

const devQueryAll = makeRequest(
  function makeQuery() {
    return `
      query {
        developers {
          id
          name
        }
      }
    `
  },
  `developers`
)

module.exports = {devQueryAll}