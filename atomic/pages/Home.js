import { React, useEffect  } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView, StatusBar } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { selectAllOrders, fetchOrders, getSqliteOrders } from '../../store/ordersSlice'

const Item = ({ title, buy, sell }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{buy}</Text>
    <Text style={styles.value}>{sell}</Text>
    <Text style={styles.value}>5.34%</Text>
  </View>
);

export default function Home() {
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrders)
  const ordersStatus = useSelector(state => state.ordersList.status)
  const error = useSelector(state => state.ordersList.error)

  const renderItem = ({ item }) => (
    <Item title={item.title} buy={item.buy} sell={item.sell}/>
  )
  let content

  useEffect(() => {
    if (ordersStatus === 'idle') {
      dispatch(getSqliteOrders())
      dispatch(fetchOrders())
    }
  }, [ordersStatus, dispatch])

  
  console.log(ordersStatus)
  //if (ordersStatus === 'loading') {
  //  content = <Text style={styles.title}>Loading</Text>
 // } else if (ordersStatus === 'succeeded') {
   
    content = <View>
      <View style={styles.listHeader}>
        <Text style={styles.title}>{ordersStatus}</Text>
        <Text style={styles.value}>Buy price</Text>
        <Text style={styles.value}>Sell price</Text>
        <Text style={styles.value}>Current %</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
    </View>
    
  //} else if (ordersStatus === 'failed') {
 //   content = <Text style={styles.title}>Error fetching data</Text>
  //}

  return (
    <View  style={styles.container}>
      {content}
    </View>)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 10,
      paddingTop: 20,
    },
    listHeader: {
      backgroundColor: '#CCC',
      padding: 10,
      marginVertical: 4,
      marginHorizontal: 16,
      display: "flex",
      flexDirection: "row",
    },
    item: {
      backgroundColor: '#EEE',
      padding: 10,
      marginVertical: 4,
      marginHorizontal: 16,
      display: "flex",
      flexDirection: "row",
    },
    title: {
      fontSize: 12,
      width: "25%",
      textAlign: "left",
    },
    value: {
      fontSize: 12,
      width: "25%",
      textAlign: "right",
    },
  });