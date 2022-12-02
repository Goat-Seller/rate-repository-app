import { View, StyleSheet, Pressable } from 'react-native'
import Text from './Text'

import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  text: {
    padding: 15,
    fontSize: 24,
  },
})

const AppBarTab = ({ text, path }) => {
  return (
    <View>
      <Pressable>
        <Link to={path}>
          <Text style={styles.text} fontWeight='bold' color='textSecondary'>
            {text}
          </Text>
        </Link>
      </Pressable>
    </View>
  )
}

export default AppBarTab
