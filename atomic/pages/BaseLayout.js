import React from 'react'; 

const Item = ({ title, buy, sell }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{buy}</Text>
        <Text style={styles.value}>{sell}</Text>
        <Text style={styles.value}>5.34%</Text>
    </View>
);

export default class HomeScreen extends React.Component {
    state = {  
        orders: [
            { id: 0, title: "Asset",      sell: "Buy price",buy: "Sell price"   , percent: "Current %"},
            { id: 1, title: "ONT/BTC",    sell: 0.0000143,  buy: 0.00001291     , percent: 5},
            { id: 2, title: "ASR/BTC",    sell: 0.0003145,  buy: 0.0002099      , percent: 5},
            { id: 3, title: "FIO/BUSD",   sell: 0.063,      buy: 0.0555         , percent: 5},
            { id: 4, title: "ANC/BUSD",   sell: 0.1254,     buy: 0.28957        , percent: 5},
            { id: 5, title: "GMT/BUSD",   sell: 3.75,       buy: 1.06579        , percent: 5},
            { id: 6, title: "WAVES/BUSD", sell: 6.656,      buy: 8.4            , percent: 5},
            { id: 7, title: "ONT/BTC",    sell: 0.0000143,  buy: 0.00001291     , percent: 5},
            { id: 8, title: "ASR/BTC",    sell: 0.0003145,  buy: 0.0002099      , percent: 5},
            { id: 9, title: "FIO/BUSD",   sell: 0.063,      buy: 0.0555         , percent: 5},
            { id: 10, title: "ANC/BUSD",  sell: 0.1254,     buy: 0.28957        , percent: 5},
            { id: 11, title: "GMT/BUSD",  sell: 3.75,       buy: 1.06579        , percent: 5},
            { id: 12, title: "WAVES/BUSD",sell: 6.656,      buy: 8.4            , percent: 5},
            { id: 13, title: "ONT/BTC",   sell: 0.0000143,  buy: 0.00001291     , percent: 5},
            { id: 14, title: "ASR/BTC",   sell: 0.0003145,  buy: 0.0002099      , percent: 5},
            { id: 15, title: "FIO/BUSD",  sell: 0.063,      buy: 0.0555         , percent: 5},
            { id: 16, title: "ANC/BUSD",  sell: 0.1254,     buy: 0.28957        , percent: 5},
            { id: 17, title: "GMT/BUSD",  sell: 3.75,       buy: 1.06579        , percent: 5}
        ]
    }
    render() {
        return
            <ScrollView  style={styles.container}>
                <View style={styles.listHeader}>
                    <Text style={styles.title}>Asset</Text>
                    <Text style={styles.value}>Buy price</Text>
                    <Text style={styles.value}>Sell price</Text>
                    <Text style={styles.value}>Current %</Text>
                </View>
                <FlatList
                    data={this.state.orders}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
                <StatusBar style="auto" />
            </ScrollView>
    }
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
  