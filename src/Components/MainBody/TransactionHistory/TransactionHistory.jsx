import React from 'react'
import './TransactionHistory.css'
// import axios from 'axios'
// import { useEffect } from 'react'
import { useState } from 'react'
// import axios from 'axios'

function TransactionHistory() {
  // TODO SEND REQUEST TO TRANSACTION HISTORY ANG FILTER DATA BY IP
  const [transactionData, setTransactionData] = useState([{ id: '123423', date: new Date().toLocaleString(), status: "Pending" }])
  // useEffect(() => {
  //   axios.get('/transactionhistory').then(response=>{
  //     if(response.success){
  //       setTransactionData(response.data.value)
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }, [])
  return (
    transactionData.map((v, i) => {
      console.log(v)
      return <div className="perCarts" key={i} >
        <div className="index">
          {i + 1}:
        </div>
        <div className="idNameandDateandStatusHolder">
          <div className="idNameandDate">
            <div className="idName">
              {v.id}
            </div>
            <div className="boughtDate">
              {v.date}
            </div>
          </div>
          <div className="status">
            {v.status}
          </div>
        </div>
      </div>
    })
  )
}

export default TransactionHistory