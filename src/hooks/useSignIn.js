import { useApolloClient, useMutation } from "@apollo/client"
import { GET_AUTH } from "../graphql/mutations"
import useAuthStorage from "./useAuthStorage"

const useSignIn = () =>{
    const authStorage = useAuthStorage()
    const [mutate, result] = useMutation(GET_AUTH)
    const apolloClient = useApolloClient()

    const signIn = async ({ username, password }) => {
        const credentials = { username, password}
        const {data} = await mutate({variables:{ credentials } })
        await authStorage.setAccessToken(data.authenticate.accessToken)    
        await apolloClient.resetStore()
        return result
    } 
    return [signIn, result]
}
export default useSignIn;
