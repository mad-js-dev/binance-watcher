import { React, Component, useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { StyleSheet, Text, View } from "react-native";

import { Provider } from 'react-redux'
import store from './store/store'

import Home from "./atomic/pages/Home";
import About from "./atomic/pages/About";

import { NativeRouter, Routes, Route, Link } from "react-router-native";

export default class App extends Component {
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


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);