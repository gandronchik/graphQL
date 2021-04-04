const {appCreate} = require('./app--create')
const {appSetDevelopers} = require('./app--set-developers')
const {appQueryAll} = require('./app--query-all')
const {devQueryAll} = require('./dev--query-all')

test('appQueryAll', async () => {
  const result = await appQueryAll()
  
  expect(result).toEqual([
    {
      "id": "fight-club",
      "name": "Fight Club",
      "publisher": {
        "id": "almus",
        "name": "Almus"
      },
      "developers": [
        {
          "id": "george",
          "name": "George"
        }
      ]
    },
    {
      "id": "live-wallpapers",
      "name": "Live Wallpapers",
      "publisher": {
        "id": "apalon",
        "name": "Apalon"
      },
      "developers": [
        {
          "id": "dima",
          "name": "Dima"
        }
      ]
    },
    {
      "id": "stickers",
      "name": "Stickers",
      "publisher": {
        "id": "gismart",
        "name": "Gismart"
      },
      "developers": [
        {
          "id": "kolia",
          "name": "Kolia"
        }
      ]
    }
  ])
})

test('devQueryAll', async () => {
  const result = await devQueryAll()
  
  expect(result).toEqual([
    { id: 'george', name: 'George' },
    { id: 'dima', name: 'Dima' },
    { id: 'kolia', name: 'Kolia' } 
  ])
})

test('appCreate', async () => {
  const result = await appCreate({name: `New application`})
  
  delete result.id
  
  expect(result).toEqual({
    name: 'New application',
    publisher: { id: 'almus', name: 'Almus' },
    developers: []
  })
})

test('appSetDevelopers', async () => {
  const result = await appSetDevelopers({appId: `fight-club`, developerIds: [`george`, `kolia`]})

  expect(result).toEqual({
    "id": "fight-club",
    "name": "Fight Club",
    "publisher": {
      "id": "almus",
      "name": "Almus"
    },
    "developers": [
      {
        "id": "george",
        "name": "George"
      },
      {
        "id": "kolia",
        "name": "Kolia"
      }
    ]
  })
})