import { ScrollView, StyleSheet, View } from 'react-native'
import AppBarTab from './AppBarTab'

import Constants from 'expo-constants'
import theme from '../theme'
import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'
import SignOut from './SignOut'
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  items: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarPrimary,
    flex: 1,
  },
})

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  })

  return (
    <View style={style.container}>
      <ScrollView horizontal style={style.items}>
        <AppBarTab text='Repositories' path='/' />
        {data?.me === null ? (
          <>
            <AppBarTab text='Sign in' path='/signIn' />
            <AppBarTab text='Sign up' path='/signUp' />
          </>
        ) : (
          <>
            <AppBarTab text='Create a review' path='/createReview' />
            <AppBarTab text='My reviews' path='/myReviews' />
            <SignOut />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
