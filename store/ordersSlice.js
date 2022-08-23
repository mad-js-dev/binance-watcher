import { React, useEffect } from "react";
import { Platform } from 'react-native';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import * as SQLite from 'expo-sqlite';
import Constants from "expo-constants";
const baseUrl = 'http://192.168.1.128:3001';

//async () => await binance.exchanges ()
const initialState = {
  orders: [],
  status: 'idle',
  error: null
}

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

export const fetchOrders = createAsyncThunk('posts/fetchOrders', async () => {
  let response = await axios.get(`${baseUrl}`)
  
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists orders (id integer primary key not null, title text, buy int, sell int);",
      [],
      (tx, result) => {
        console.log('1Result:', result.rows)
      },
      (tx, err) => {
        console.log('1Error!', err)
      }
    );
    tx.executeSql(
      "delete from orders;",
      [],
      (tx, result) => {
        console.log('2Result:', result.rows)
      },
      (tx, err) => {
        console.log('2Error!', err)
      },
    );
  });

  response.data.forEach(val => {
    //console.log(val)
    db.transaction((tx) => {
      tx.executeSql(
        `insert into orders (title, buy, sell) values (?, ?, ?)`,
        [val.title, val.buy, val.sell],
        (tx, result) => {
          //console.log('3Result:', result.rows)
        },
        (tx, err) => {
          //console.log('3Error!', err)
        },
      );
    });
    
  })
  
  queryResult = []
  return response.data
})

export const getSqliteOrders = createAsyncThunk('posts/getSqliteOrders', async () => {
  const promiseDB = await new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from orders',
        [],
        (tx, result) => {
          resolve(result.rows._array);
        },
        (tx, error) => {
          reject(error);
        }
      );
    });
  });
  console.log('...', promiseDB)
  return promiseDB
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderAdded: {
      reducer(state, action) {
        state.orders.push(action.payload)
      },
      prepare(title, content, userId) {
        // omit prepare logic
      }
    },
    reactionAdded(state, action) {
      const { orderId, reaction } = action.payload
      const existingOrder = state.orders.find(order => order.id === orderId)
      if (existingOrder) {
        existingOrder.reactions[reaction]++
      }
    },
    orderUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingOrder = state.orders.find(order => order.id === id)
      if (existingOrder) {
        existingOrder.title = title
        existingOrder.content = content
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched orders to the array
        //state.orders = state.orders.concat(action.payload)
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getSqliteOrders.fulfilled, (state, action) => {
        // Add any fetched orders to the array
        state.orders = state.orders.concat(action.payload)
      })
  }
})

export const { orderAdded, orderUpdated, reactionAdded } = ordersSlice.actions

export default ordersSlice.reducer

export const selectAllOrders = (state) => {
  return state.ordersList.orders
}