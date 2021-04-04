import {attach} from 'effector'
import {guard} from 'effector'
import {sample} from 'effector'
import {createDomain} from 'effector'
import {useList} from 'effector-react'
import {useStore} from 'effector-react'
import React from 'react'

import {create} from 'feature/app/api/create'
import {setDevelopers} from 'feature/app/api/set-developers'
import {queryAll} from 'feature/app/api/query-all'

import * as A from './styled'

const domain = createDomain(`PageHome (page)`)

const onPageStart = domain.event()
const onNameChange = domain.event()
const onCreate = domain.event()
const onSelect = domain.event()
const onSetDev = domain.event()

const $apps = domain.store([])
const $developers = domain.store([])
const $selected = domain.store(null).on(onSelect, (_, v) => v)
const $name = domain.store(``).on(onNameChange, (_, v) => v)

const fxQuery = domain.effect({handler: queryAll})

$apps.on(fxQuery.doneData, (_, {apps}) => apps.reverse())
$developers.on(fxQuery.doneData, (_, {developers}) => developers)

const _fxCreate = domain.effect({handler: create})
const fxCreate = attach({
  effect: _fxCreate,
  source: {name: $name},
  mapParams: (_, state) => state,
})

$apps.on(fxCreate.doneData, (_, v) => [v, ..._])

const _fxSetDevelopers = domain.effect({handler: setDevelopers})
const fxSetDevelopers = attach({
  effect: _fxSetDevelopers,
  source: {
    appId: $selected,
  },
  mapParams: (params, state) => ({...state, ...params}),
})

$apps.on(fxSetDevelopers.doneData, (_, v) =>
  _.map((o) => (o.id === v.id ? v : o)),
)

sample({clock: onPageStart, target: fxQuery})
sample({clock: onCreate, target: fxCreate})

guard({
  source: sample({
    source: onSetDev,
    fn: (v) => ({developerIds: [v]}),
  }),
  filter: $selected,
  target: fxSetDevelopers,
})

export function PageHome() {
  React.useEffect(onPageStart, [])

  return (
    <>
      <SectionAppListActions />
      <SectionAppList />
    </>
  )
}

function SectionAppListActions() {
  return (
    <>
      <BlockActionName />
      <BlockDeveloperChoose />
    </>
  )
}

function BlockActionName() {
  const value = useStore($name)

  return (
    <>
      <A.Label>
        Create new app
        <input
          value={value}
          onChange={({currentTarget: {value}}) => onNameChange(value)}
        />
      </A.Label>
      <button onClick={onCreate}>Create</button>
    </>
  )
}

const BlockDeveloperChoose = () => {
  const list = useList($developers, (props) => <Dev {...props} />)
  return (
    <select onChange={({target: {value}}) => onSetDev(value)}>
      <option value="null">None</option>
      {list}
    </select>
  )
}

function Dev({id, name}) {
  return <option value={id}>{name}</option>
}

const SectionAppList = () => <BlockAppList />

const BlockAppList = () => {
  const selected = useStore($selected)

  return useList($apps, {
    keys: [selected],
    fn: (props) => <AppCard {...props} active={selected === props.id} />,
  })
}

function AppCard({id, name, publisher, developers, active}) {
  return (
    <A.AppCard onClick={() => onSelect(id)} active={active}>
      <A.Title>{name}</A.Title>
      <A.Title>Publisher</A.Title>
      <Publisher {...publisher} />
      <A.Title>Developers</A.Title>
      <DevelopersList list={developers} />
    </A.AppCard>
  )
}

const Publisher = ({name}) => <div>{name}</div>

const DevelopersList = ({list}) =>
  list.map((v) => <Developer key={v.id} {...v} />)

const Developer = ({name}) => <div>{name}</div>
