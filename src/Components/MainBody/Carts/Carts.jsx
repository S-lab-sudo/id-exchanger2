import React from 'react'
import './Carts.css'
import { AppContext } from '../../../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function Carts({ value }) {
    const navigate = useNavigate()
    const { dispatcher } = useContext(AppContext)
    const handleBuyIt = (v) => {
        dispatcher({ action: 'BUY_THIS_ID', payload: v })
        navigate('/buythis')
    }

    if(value.length===0){
        return <div className="no">You haven't carted any thing</div>
    }
    return (
        value.map((v, i) => {
            return <div className="perCarts" key={i} >
                <div className="index">
                    {i + 1}:
                </div>
                <div className="idNameandDateandStatusHolder">
                    <div className="idNameandDate">
                        <div className="idName">
                            {v.id.id} <label className='cartPrice' htmlFor="">(Price : {v.id.sellingPrice})</label>
                        </div>
                        <div className="boughtDate">
                            {v.date}
                        </div>
                    </div>
                    <div className="status">
                        <button onClick={()=>handleBuyIt(v)}>Buy It</button>
                    </div>
                </div>
            </div>
        })
    )
}

export default Carts