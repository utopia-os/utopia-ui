import axios from 'axios'
import { useState, useEffect } from 'react'

import type { Item } from '#types/Item'

interface AccountData {
  account: {
    name: string
    type: string
    stats: {
      balance: {
        valueInCents: number
        currency: string
      } | null
      totalAmountReceived: {
        valueInCents: number
        currency: string
      }
      totalAmountSpent: {
        valueInCents: number
        currency: string
      }
      contributionsCount: number
      contributorsCount: number
    }
  }
}

interface GraphQLResponse<T> {
  data?: T
  errors?: { message: string }[]
}

const GET_TRANSACTIONS = `
  query GetAccountStats($slug: String!) {
    account(slug: $slug) {
      name
      type
      stats {
        balance {
          valueInCents
          currency
        }
        totalAmountReceived(net: true) {
          valueInCents
          currency
        }
        totalAmountSpent {
          valueInCents
          currency
        }
        contributionsCount
        contributorsCount
      }
    }
  }
`

const token = '9350b1eecb4c70f2b15d85e32df4d4cf3ea80a1f'

const graphqlClient = axios.create({
  baseURL: 'https://api.opencollective.com/graphql/v2',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

const formatCurrency = (valueInCents: number, currency: string) => {
  const value = valueInCents / 100
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    ...(Math.abs(value) >= 1000 ? { minimumFractionDigits: 0, maximumFractionDigits: 0 } : {}),
  }
  return new Intl.NumberFormat('de-DE', options).format(value)
}

export const CrowdfundingView = ({ item }: { item: Item }) => {
  // Hier wird slug aus dem Item extrahiert.
  const slug = item.slug

  const [data, setData] = useState<AccountData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await graphqlClient.post<GraphQLResponse<AccountData>>('', {
          query: GET_TRANSACTIONS,
          variables: { slug },
        })
        if (response.data.errors?.length) {
          setError(response.data.errors[0].message)
        } else {
          setData(response.data.data ?? null)
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          throw err
        }
      }
      setLoading(false)
    }

    if (slug) {
      void fetchData()
    }
  }, [slug])

  if (loading)
    return (
      <div className='tw-flex tw-justify-center'>
        <span className='tw-loading tw-loading-spinner tw-loading-lg tw-text-neutral-content'></span>
      </div>
    )

  if (error) {
    return <p className='tw-text-center tw-text-lg tw-text-red-500'>Error: {error}</p>
  }

  if (!data?.account) {
    return (
      <p className='tw-text-center tw-text-lg tw-text-red-500'>
        No data available for this account.
      </p>
    )
  }

  const { stats } = data.account
  const balanceValueInCents = stats.balance?.valueInCents ?? 0
  const currency = stats.balance?.currency ?? 'USD'
  const currentBalance = balanceValueInCents

  return (
    <div className='tw-mx-6 tw-mb-6'>
      <div className='tw-card tw-bg-base-200 tw-w-fit tw-max-w-full tw-shadow-xl'>
        <div className='tw-stats tw-stats-vertical lg:tw-stats-horizontal tw-shadow tw-mb-12'>
          <div className='tw-stat'>
            <div className='tw-stat-title'>Current Balance</div>
            <div className='tw-stat-value'>{formatCurrency(currentBalance, currency)}</div>
          </div>
          <div className='tw-stat'>
            <div className='tw-stat-title'>Received</div>
            <div className='tw-stat-value tw-text-green-500'>
              {formatCurrency(stats.totalAmountReceived.valueInCents, currency)}
            </div>
          </div>
          <div className='tw-stat'>
            <div className='tw-stat-title'>Spent</div>
            <div className='tw-stat-value tw-text-red-500'>
              {formatCurrency(stats.totalAmountReceived.valueInCents - currentBalance, currency)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
