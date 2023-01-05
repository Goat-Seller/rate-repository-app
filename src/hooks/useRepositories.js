import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ order, filter }) => {
  const [orderBy, orderDirection] = order ? order.split(' ') : ''

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: filter,
    },
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  const [repositories, setRepositories] = useState()

  const fetchRepositories = () => {
    try {
      setRepositories(data.repositories)
    } catch (e) {
      return error
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [loading])

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch: fetchRepositories,
  }
}

export default useRepositories
