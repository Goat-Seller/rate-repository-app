
import { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Searchbar } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  OrderPicker: {
    margin: 5,
    padding: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  navigate,
  order,
  setOrder,
  filter,
  onEndReach,
  setFilter,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  const OrderPicker = ({ order, setOrder }) => {
    return (
      <>
        <Searchbar
          placeholder='Search'
          onChangeText={setFilter}
          value={filter}
        />
        <Picker
          selectedValue={order}
          onValueChange={(itemValue, itemIndex) => setOrder(itemValue)}>
          <Picker.Item label='Lastest repositories' value='CREATED_AT ASC' />
          <Picker.Item
            label='Highest rated repositories'
            value='RATING_AVERAGE DESC'
          />
          <Picker.Item
            label='Lowest rated repositories'
            value='RATING_AVERAGE ASC'
          />
        </Picker>
      </>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
        <RepositoryItem item={item} />
      </Pressable>
    )
  }
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={OrderPicker({ order, setOrder })}
      ListHeaderComponentStyle={styles.OrderPicker}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const RepositoryList = () => {
  const [order, setOrder] = useState()
  const [filter, setFilter] = useState()
  useDebounce(filter, 500)
  const { repositories, fetchMore } = useRepositories({order, filter ,first: 8})

  const onEndReach = () => {
    fetchMore()
  }

  const navigate = useNavigate()
  return (
    <RepositoryListContainer
      navigate={navigate}
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      onEndReach={onEndReach}
      filter={filter}
      setFilter={setFilter}
    />
  )
}

export default RepositoryList
