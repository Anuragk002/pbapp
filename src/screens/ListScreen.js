import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../actions/userActions';

const ListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers(1, 5));
  }, []);

  const getData = () => {
    dispatch(fetchUsers(current + 1, 5));
    setCurrent(prev => prev + 1);
  }
  const handleItemClick = (user) => {
    navigation.navigate('Details', { userid: user.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemClick(item)}>
      <Text style={styles.itemText}>{item.first_name} {item.last_name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'red'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString() + Math.random()}
        extraData={users}
        onEndReachedThreshold={0.6}
        onEndReached={getData}
        contentContainerStyle={{marginTop:20}}
        ItemSeparatorComponent={<View style={{height:10,backgroundColor:'white'}}></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'beige',
    paddingHorizontal:20
  },
  listContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor:'#15ae71',
    borderRadius:20,
  },
  itemText: {
    fontSize: 20,
    fontWeight:'bold',
    color:'white'
  },
});

export default ListScreen;
