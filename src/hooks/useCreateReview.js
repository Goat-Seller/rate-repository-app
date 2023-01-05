import { useApolloClient, useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const apolloClient = useApolloClient()

  const createReview = async (values) => {
    const int = parseInt(values.rating)
    const review = {...values, rating: int }
    const {data} = await mutate({ variables: { review } })
    await apolloClient.resetStore()
    
    return data
  }
  return [createReview, result]
}
export default useCreateReview
