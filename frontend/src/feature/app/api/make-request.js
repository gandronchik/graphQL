const fetch = require('cross-fetch')

const API_URL = process.env.REACT_APP_API_URL
const API = `${API_URL}/graphql`

export function makeRequest(queryFn, entityName) {
  return async function query(params) {
    const r = await fetch(API, {
      method: `POST`,
      body: JSON.stringify({
        query: queryFn(params),
      }),
      headers: {
        'content-type': `application/json`,
      },
    })

    const {data, errors = {}} = await r.json()

    if (errors.length) {
      throw errors[0]
    }

    return data[entityName]
  }
}
