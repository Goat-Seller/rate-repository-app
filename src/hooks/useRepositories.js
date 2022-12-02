import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })
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

  return { repositories, loading, refetch: fetchRepositories }
}

export default useRepositories
