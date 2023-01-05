import { useApolloClient, useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER)
  const apolloClient = useApolloClient()

  const createUser = async ({password, username}) => {
    const user = {password, username}

    const { data } = await mutate({ variables: {user} })
    await apolloClient.resetStore()

    return data
  }
  return [createUser, result]
}
export default useCreateUser
