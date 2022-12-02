import { View, Pressable } from 'react-native'
import Text from './Text'
import useSignOut from '../hooks/useSignOut'

const SignOut = () => {
  const signOut = useSignOut()
  return (
    <View>
      <Pressable
        onPress={() => {
          signOut()
        }}>
        <Text
          style={{ padding: 15, fontSize: 24 }}
          fontWeight='bold'
          color='textSecondary'>
          Sign Out
        </Text>
      </Pressable>
    </View>
  )
}
export default SignOut
