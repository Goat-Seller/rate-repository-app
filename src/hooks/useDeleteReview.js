import { useApolloClient, useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'
import { GET_CURRENT_USER } from '../graphql/queries'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_CURRENT_USER }, 'getCurrentUser'],
  })
  const apolloClient = useApolloClient()

  const deleteReview = async (id) => {
    await mutate({ variables: { deleteReviewId: id } })
    await apolloClient.resetStore()
    
    return result
  }
  return deleteReview
}
export default useDeleteReview
