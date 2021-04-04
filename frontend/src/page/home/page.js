import React from 'react'
import {useList} from 'effector-react'
import {createDomain} from 'effector'
import {sample} from 'effector'
import {queryAll} from 'feature/app/api/query-all'

const domain = createDomain(`PageHome (page)`)

const onPageStart = domain.event()

const $apps = domain.store([])

const fxQuery = domain.effect({handler: queryAll})

$apps.on(fxQuery.doneData, (_, v) => v)

sample({clock: onPageStart, target: fxQuery})

export function PageHome() {
  React.useEffect(onPageStart, [])

  return (
    <>
      <SectionAppListActions />
      <SectionAppList />
    </>
  )
}

const SectionAppListActions = () => <>SectionAppListActions</>

const SectionAppList = () => <BlockAppList />

const BlockAppList = () => useList($apps, (props) => <AppCard {...props} />)

function AppCard({name, publisher, developers}) {
  return (
    <div>
      <div>{name}</div>
      <div>Publisher</div>
      <Publisher {...publisher} />
      <div>Developers</div>
      <DevelopersList list={developers} />
    </div>
  )
}

const Publisher = ({name}) => <div>{name}</div>

const DevelopersList = ({list}) =>
  list.map((v) => <Developer key={v.id} {...v} />)

const Developer = ({name}) => (
  <div>
    <b>{name}</b>
  </div>
)
