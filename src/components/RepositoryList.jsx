import { FlatList, View, StyleSheet } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const renderItem = ({ item }) => <RepositoryItem item={item} />

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {

  const { repositories } = useRepositories()

  const repositoryNodes = repositories ? repositories.edges.map(e => e.node): []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}

export default RepositoryList
