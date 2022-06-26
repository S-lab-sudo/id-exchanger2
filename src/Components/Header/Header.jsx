import React from 'react'
import './Header.css'
import adc from './adc.png'
import { AppContext } from '../../App'
import { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

function SortingToggleButton({ dispatcher }) {
  return (<div className="sorting" onClick={() => dispatcher({ action: "TOGGLE_SORTING_SHOW" })} >
    Sort By : Hottest
  </div>
  )
}

function Header({ cartedAmount }) {
  const { dispatcher } = useContext(AppContext)
  return (
    <div className="header">
      <div className="cart" >
        <Link to="/carts" >
          <img width="30px" height="auto" src={adc} alt="" />:
          <label htmlFor="">
            {cartedAmount}
          </label>
        </Link>
      </div>
      <div className="transActionHistory">
        <Link to="/transactionhistory" >
          <button>Transaction History</button>
        </Link>
      </div>
      <Routes>
        <Route path='/buy' element={<SortingToggleButton dispatcher={dispatcher} />} ></Route>
      </Routes>

    </div>
  )
}

export default Header