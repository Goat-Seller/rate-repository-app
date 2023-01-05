import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = ({ id }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  })
  const [repository, setRepository] = useState()

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }
    fetchMore({
      variables: {
        after: data.repository.review.pageInfo.endCursor,
        ...variables,
      },
    })
  }
  const fetchRepository = async () => {
    try {
      setRepository(data.repository)
    } catch (e) {
      return error
    }
  }

  useEffect(() => {
    fetchRepository()
  }, [loading])

  return {
    repository,
    loading,
    refetch: fetchRepository,
    fetchMore: handleFetchMore,
  }
}

export default useRepository
