import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router-native'

import theme from '../theme'
import Text from './Text'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import useDeleteReview from '../hooks/useDeleteReview'

const styles = StyleSheet.create({
  main: {
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 10,
    flexBasis: 'auto',
    flex: 1,
  },
  review: {
    flexDirection: 'row',
    items: {
      paddingHorizontal: 10,
      flexShrink: 1,
    },
    rating: {
      width: 40,
      height: 40,
      padding: 2,
      borderWidth: 2,
      borderRadius: 40 / 2,
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  buttonsV: {
    flexDirection: 'row',
    justifyContent: 'center',
    simpleB: {
      backgroundColor: theme.colors.primary,
      color: 'white',
      borderRadius: 5,
      margin: 5,
      padding: 10,
      textAlign: 'center',
    },
    deleteB: {
      backgroundColor: 'red',
      color: 'white',
      borderRadius: 5,
      margin: 5,
      padding: 10,
      textAlign: 'center',
    },
  },
})

const RepositoryInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem item={repository} gitButton />
    </>
  )
}

const ItemSeparator = () => <View style={{ height: 10 }}></View>

export const ReviewItem = ({ review, ...props }) => {
  const nav = useNavigate()
  const deleteReview = useDeleteReview()
  const date = format(new Date(review.createdAt), 'MM.dd.yyyy')
  return (
    <View style={styles.main}>
      <View style={styles.review}>
        <View style={styles.review.rating}>
          <Text color='primary' fontWeight='bold'>
            {review.rating}
          </Text>
        </View>
        <View style={styles.review.items}>
          <View>
            <Text fontWeight='bold'>{review.user.username}</Text>
            <Text color='textSecondary'>{date}</Text>
          </View>
          <Text>{review.text}</Text>
        </View>
      </View>
      {props.buttons && (
        <View style={styles.buttonsV}>
          <Pressable
            onPress={() => {
              nav(`/repository/${review.repositoryId}`)
            }}>
            <Text style={styles.buttonsV.simpleB}>View repository</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Alert.alert(
                'Delete review',
                'Are you sure you want to delete this review',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: () => deleteReview(review.id),
                    style: 'default',
                  },
                ]
              )
            }}>
            <Text style={styles.buttonsV.deleteB}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const { repository, loading, fetchMore } = useRepository({ id, first: 4 })

  if (loading || repository === undefined) {
    return (
      <View>
        <Text>...loading</Text>
      </View>
    )
  }
  const onEndReach = () => {
    console.log('END REACHED')
    fetchMore()
  }

  const reviews = repository?.reviews?.edges?.map(e => e.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default SingleRepository
