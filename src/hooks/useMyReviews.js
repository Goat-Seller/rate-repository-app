import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'

const useMyReviews = () => {

  const { data, error, loading, fetchMore } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })
  const [reviews, setReviews] = useState()

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage
      if (!canFetchMore) {
        return
      }
      fetchMore({
        variables: {
          after: data.reviews.pageInfo.endCursor,
          ...variables,
        },
      })
    }

  const fetchRepositories = () => {
    try {
      setReviews(data.me.reviews)
    } catch (e) {
      return error
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [loading])

  return {
    reviews,
    fetchMore: handleFetchMore,
    loading,
    refetch: fetchRepositories,
  }
}
export default useMyReviews
