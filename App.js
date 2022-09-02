import { React, Component, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { AppRegistry , StyleSheet, Text, View } from "react-native";

import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store/store'
import { selectAllOrders, fetchPrices } from './store/ordersSlice'

import Home from "./atomic/pages/Home";
import About from "./atomic/pages/About";

import { NativeRouter, Routes, Route, Link } from "react-router-native";

export default class App extends Component {
  //dispatch = useDispatch()
  //orders = useSelector(selectAllOrders)
  /*constructor(props) {
    super(props);
    console.log('App mount')
  }
  componentDidMount() {
    let timer = setInterval(this.tick, 1000);
  }
  tick() {
    useEffect(() => {
      if (orders.length > 0) {
        dispatch(fetchPrices())
      }
    })
  }*/
  render(){
    return (
      <Provider store={store()}>
        <NativeRouter>
          <View style={styles.container}>
            <View style={styles.nav}>
              <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
                <Text>Home</Text>
              </Link>
              <Link
                to="/about"
                underlayColor="#f0f4f7"
                style={styles.navItem}
              >
                <Text>About</Text>
              </Link>
              <Link
                to="/topics"
                underlayColor="#f0f4f7"
                style={styles.navItem}
              >
                <Text>Topics</Text>
              </Link>
            </View>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
            </Routes>
          </View>
        </NativeRouter>
      </Provider>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

AppRegistry.registerComponent('Binance-watcher', () => <App />);
