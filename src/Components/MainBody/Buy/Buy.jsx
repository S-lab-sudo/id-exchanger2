import React from 'react'
import './Buy.css'
import { useContext } from 'react'
import { AppContext } from '../../../App'
import Colisor from './Colisor/Colisor'
import Emotes from './Emotes/Emotes'
import Characters from './Characters/Characters'
import Pets from './Pets/Pets'
import Guns from './Guns/Guns'
import { useNavigate } from 'react-router-dom'

function Buy() {
  const navigate=useNavigate()
  const { value, dispatcher } = useContext(AppContext)
  let { buyData, index, carts } = value
  const handleBuyIt=()=>{
    dispatcher({ action: "BUY_THIS_ID", payload: buyData[index] })
    navigate('/buythis')
  }
  if (buyData.length === 0) {
    return (
      <div className="noSelllers">
        For now, there are no sellers to sell ID.
      </div>
    )
  }
  return (
    <div className='buyBodyHolder' >
      <div className='levelViewsPriceHolder' >
        <li>Level :{buyData[index].idLevel} </li>
        <li>Views :{buyData[index].views} </li>
        <li>Price :{buyData[index].sellingPrice} </li>
      </div>
      <Colisor />
      <div className='idDiamonds' >
        <div className="onSellId">
          <label className='priceText' >ID : </label> {buyData[index].id}
        </div>
        <div className="idDiamondsAvailable">
          <label className='priceText' >Diamonds : </label> {buyData[index].diamondsAvailable}
        </div>
      </div>
      <Emotes />
      <Guns />
      <Characters />
      <Pets />
      <div className="addToCardBuy">
        <button onClick={() => dispatcher({ action: "ADD_TO_CART" })} className="addtoCard">
          {
            carts.includes(buyData[index].id) ? "Carted Look at Carts" : "Add to Card"
          }
        </button>
        <button onClick={handleBuyIt} className="buyIt">Buy It</button>
      </div>
      <div className="previousNextHolder">
        <button onClick={() => dispatcher({ action: "PREVIOUS" })} className="previousIdButton">Previous</button>
        <button onClick={() => dispatcher({ action: "NEXT" })} className="nextIdButton">Next</button>
      </div>
    </div>
  )
}

export default Buy