import { FlatList, View, Text } from 'react-native'
import useMyReviews from '../hooks/useMyReviews'
import { ReviewItem } from './Repository'

const Review = ({ review }) => {
  return (
    <>
      <ReviewItem review={review} buttons={true}/>
    {/* to tez */}
    </>
  )
}

const MyReviews = () => {
  const { reviews, loading, fetchMore } = useMyReviews()
  if (loading || reviews === undefined) {
    return
  }

  const rr = reviews.edges.map(e => e.node)
  const onEndReach = () => {
    console.log('END REACHED')
    fetchMore()
  }

  return (
    <FlatList
      data={rr}
      renderItem={({ item }) => <Review review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default MyReviews
