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
          style={{ padding: 15 }}
          fontWeight='bold'
          fontSize='tab'
          color='textSecondary'>
          Sign out
        </Text>
      </Pressable>
    </View>
  )
}
export default SignOut
