import { View, StyleSheet } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import theme from '../theme'
import AppBar from './AppBar'
import RepositoryList from './RepositoryList'
import SignIn from './SignIn'


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: theme.fonts.main,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main