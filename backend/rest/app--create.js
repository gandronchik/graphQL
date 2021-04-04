const {makeRequest} = require('./make-request')

const appCreate = makeRequest(
  function makeQuery({name}) {
    return `
      mutation {
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
      }
    `
  },
  `createApp`
)

module.exports = {appCreate}