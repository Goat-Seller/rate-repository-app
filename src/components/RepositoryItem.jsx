import { View, StyleSheet, Image, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 10,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  user: {
    flexDirection: 'row',
    image: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    info: {
      flex: 1,
      paddingHorizontal: 10,
      alignItems: 'flex-start',
    },
    language: {
      backgroundColor: theme.colors.primary,
      color: 'white',
      borderRadius: 5,
      padding: 2,
      textAlign: 'center',
    },
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    numbers: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    text: {
      textAlign: 'center',
      color: 'textSecondary',
    },
  },
  gitButton: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 5,
    margin: 5,
    padding: 10,
    textAlign: 'center',
  },
})

const RepositoryItem = ({ item, gitButton }) => {
  const makeK = num => {
    return Math.abs(num) > 999
      ? (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.abs(num)
  }
  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={styles.user}>
        <Image
          style={styles.user.image}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.user.info}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text color='textSecondary'>{item.description}</Text>
          <Text style={styles.user.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View>
          <Text style={styles.stats.numbers}>
            {makeK(item.stargazersCount)}
          </Text>
          <Text style={styles.stats.text}>Stars</Text>
        </View>
        <View>
          <Text style={styles.stats.numbers}>{makeK(item.forksCount)}</Text>
          <Text style={styles.stats.text}>Fork</Text>
        </View>
        <View>
          <Text style={styles.stats.numbers}>{makeK(item.reviewCount)}</Text>
          <Text style={styles.stats.text}>Reviews</Text>
        </View>
        <View>
          <Text style={styles.stats.numbers}>{makeK(item.ratingAverage)}</Text>
          <Text style={styles.stats.text}>Rating</Text>
        </View>
      </View>
      {gitButton && (
        <Pressable onPress={() => {Linking.openURL(item.url)}}>
          <Text style={styles.gitButton}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  )
}

export default RepositoryItem
