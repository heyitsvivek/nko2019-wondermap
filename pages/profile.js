import '../styles/index.css'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Trash2 } from 'react-feather'
import Router from 'next/router'
import Button from '../components/button'
import Layout from '../components/layout'
import Card, { CardLoader, CardIcon } from '../components/card'
import Heading from '../components/heading'
import Value from '../components/value'
import ItemsInput from '../components/items-input'
import { authedFetch, swrAuthedFetch, withAuthSync } from '../lib/client/auth'

const emptyItem = {
  key: '',
  value: '',
  type: 'TEXT'
}

const Page = ({ user }) => {
  const profile = useSWR('/api/profile', swrAuthedFetch, { initialData: { user } })
  const cards = useSWR('/api/cards', swrAuthedFetch)
  const [ items, setItems ] = useState([ emptyItem ])

  return (
    <Layout profile={profile}>
      <Heading>The Cards of {profile.data ? profile.data.user.name : 'Loading...'}</Heading>
      <p className='mb-20'>{profile.data ? profile.data.user.username : 'Loading...'}</p>

      <form className='mb-10' onSubmit={async (event) => {
        event.preventDefault()
        if (items.length > 0) {
          setItems([ emptyItem ])
          await authedFetch({}, '/api/add-card', { items })
          mutate('/api/cards', { cards: [
            ...cards.data.cards,
            { items, _id: Math.random() }
          ] })
        }
      }}>
        <Card className='mb-4'>
          <ItemsInput
            items={items}
            setItems={setItems}
            legend='Items'
          />
        </Card>
        <Button type='submit' disabled={items.length === 0}>
          Submit!
        </Button>
      </form>

      <div className='grid'>
        {cards.data ? cards.data.cards.map((data, cardIndex) => (
          <Card key={data._id}>
            {data.items.map(({ key, value, type }, index) => (
              <div className='mb-1' key={index}>
                <div className='font-bold text-light-1'>{key}</div>
                <Value value={value} type={type} />
              </div>
            ))}
            <CardIcon icon={Trash2} onClick={async () => {
              await authedFetch({}, '/api/delete-card', { id: data._id })
              mutate('/api/cards', { cards: [
                ...cards.data.cards.slice(0, cardIndex),
                ...cards.data.cards.slice(cardIndex + 1)
              ] })
            }} />
          </Card>
        )): [ <CardLoader />, <CardLoader />, <CardLoader /> ]}
      </div>
    </Layout>
  )
}

Page.getInitialProps = async (ctx) => {
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    return await authedFetch(ctx, '/api/profile')
  } catch (error) {
    return await redirectOnError()
  }
}

export default withAuthSync(Page)