import React, { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

// custom components
import Header from './Components/Header/Header'
import SortingMethod from './Components/SortingMethod/SortingMethod';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Buy from './Components/MainBody/Buy/Buy'
import Sell from './Components/MainBody/Sell/Sell'
import Topup from './Components/MainBody/Topup/Topup'
import FirstPage from './Components/MainBody/FirstPage/FirstPage'
import Carts from './Components/MainBody/Carts/Carts'
import TransactionHistory from './Components/MainBody/TransactionHistory/TransactionHistory'
import BuyThis from './Components/MainBody/Buy/BuyThis/BuyThis';


export const AppContext = createContext()
function App() {
  const [carts, setCarts] = useState(localStorage.getItem('cartedIds') !== null ? JSON.parse(localStorage.getItem('cartedIds')) : [])
  const [cartedAmount, setCartedAmount] = useState(0)
  const [buyData, setBuyData] = useState([{ idLevel: 100, views: 100, sellingPrice: 2000, colisorData: [1, 2, 3, 4], id: 12394756, diamondsAvailable: 1000, emotesData: [1, 2, 3, 4], gunsSkinData: [1, 2, 3, 4], characterData: [1, 2, 3, 4] }, { idLevel: 10, views: 10, sellingPrice: 200, colisorData: [1, 2, 3, 4], id: 1239456, diamondsAvailable: 1000, emotesData: [1, 2, 3, 4], gunsSkinData: [1, 2, 3, 4], characterData: [1, 2, 3, 4] }])
  const [buyDateCopy, setBuyDateCopy] = useState([])

  const reducer = (state, dispatch) => {
    switch (dispatch.action) {
      case "NEXT":
        // TODO FETCH DATA BEFORE 5 MORE DATAS ARE SENT
        if (state.buyData.length - 1 > state.index) {
          return {
            buyData: state.buyData,
            index: state.index + 1,
            cartedAmount: state.cartedAmount,
            showSortingMethods: state.showSortingMethods,
            carts: state.carts,
            buyThis: null
          }
        }
        return state
      // Better to return than break
      case "PREVIOUS":
        if (state.index > 0) {
          return {
            buyData: state.buyData,
            index: state.index - 1,
            cartedAmount: state.cartedAmount,
            showSortingMethods: state.showSortingMethods,
            carts: state.carts,
            buyThis: null
          }
        }
        return state
      case "FETCHNEWDATA":
        // axios.post('/backend')
        return state

      case "SORT1":
        return {
          buyData: buyDateCopy,
          index: state.index,
          cartedAmount: state.cartedAmount,
          showSortingMethods: state.showSortingMethods,
          carts: state.carts,
          buyThis: null
        }

      case "SORT_ASCENDING":
        console.log("first")
        return {
          buyData: buyData.sort((a, b) => a - b),
          index: state.index,
          cartedAmount: state.cartedAmount,
          showSortingMethods: state.showSortingMethods,
          carts: state.carts,
          buyThis: null
        }

      case "SORT_DESCENDING":
        return {
          buyData: buyData.sort((a, b) => b - a),
          index: state.index,
          cartedAmount: state.cartedAmount,
          showSortingMethods: state.showSortingMethods,
          carts: state.carts,
          buyThis: null
        }

      case "SORT_USING_RANGE":
        // TODO HERE
        // TRANSACTION HISTORY BACKEND
        // SELL ID CSS
        // REMOVE CARTS
        return {
          // SEND PAYLOAD INSTEAD OF NESTING PROPS THROUGH COMPONENTS
          buyData: buyData.filter(v => v.sellingPrice >= dispatch.payload.min && v.sellingPrice <= dispatch.payload.max),
          index: state.index,
          cartedAmount: state.cartedAmount,
          showSortingMethods: state.showSortingMethods,
          carts: state.carts,
          buyThis: null
        }
      case "TOGGLE_SORTING_SHOW":
        return {
          buyData: state.buyData,
          index: state.index,
          cartedAmount: state.cartedAmount,
          showSortingMethods: !state.showSortingMethods,
          carts: state.carts,
          buyThis: null
        }
      case "ADD_TO_CART":
        if (state.carts.map(v => v.id).includes(state.buyData[state.index].id)) {
          return state
        }
        setCarts(current => [{
          id: state.buyData[state.index],
          date: new Date().toLocaleString()
        }, ...current])
        return {
          buyData: state.buyData,
          index: state.index,
          cartedAmount: state.cartedAmount + 1,
          showSortingMethods: state.showSortingMethods,
          carts: carts,
          buyThis: null
        }

      case "BUY_THIS_ID":
        return {
          buyData: state.buyData,
          index: state.index,
          cartedAmount: state.cartedAmount + 1,
          showSortingMethods: state.showSortingMethods,
          carts: carts,
          buyThis: dispatch.payload
        }
      default:
        return state
    }
  }



  useEffect(() => {
    // FETCH BUY DATA
    setCartedAmount(carts.length)
    if (!buyData) {
      axios.get('/backend').then(response => {
        setBuyData(response.data)
        setBuyDateCopy(response.data)
      })
    }
  }, [carts, carts.length, buyData])


  useEffect(() => {
    // UPDATE CARTED AMOUNT
    setCartedAmount(carts.length)
    // STORE IN LOCAL STORAGE
    if (carts.length > 0) {
      localStorage.setItem('cartedIds', JSON.stringify(carts))
    }
  }, [carts])

  let initialState = {
    buyData,
    index: 0,
    cartedAmount,
    showSortingMethods: false,
    carts,
    buyThis: null
  }
  const [value, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ value, dispatcher: dispatch }}>
      <div className='App'>
        <Router>
          <Header cartedAmount={cartedAmount} />
          <SortingMethod />

          <div className='mainBody' ><Routes>
              <Route path='/' element={<FirstPage />} ></Route>
              <Route path='/buy' element={<Buy />} ></Route>
              <Route path='/buythis' element={<BuyThis />} ></Route>
              <Route path='/sell' element={<Sell />} ></Route>
              <Route path='/topup' element={<Topup />} ></Route>
              <Route path='/carts' element={<Carts value={carts} />} ></Route>
              <Route path='/transactionhistory' element={<TransactionHistory />} ></Route>
            </Routes>
          </div>


          <NavigationBar />
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
