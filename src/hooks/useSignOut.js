import { useNavigate } from 'react-router-native'
import { useApolloClient } from '@apollo/client'
import useAuthStorage from './useAuthStorage'

const useSignOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const nav = useNavigate()
  const signOut = async () => {
    try {
      await authStorage.removeAccessToken()
      await apolloClient.resetStore()
      return nav('/')
    } catch (error) {
      console.log(error)
    }
  }
  return signOut
}
export default useSignOut
