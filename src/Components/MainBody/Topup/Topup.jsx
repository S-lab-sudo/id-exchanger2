import axios from 'axios'
import React, { useState } from 'react'
import diamond from './diamond.png'
import recive from './recieveQRCode.jpeg'
import './Topup.css'

const priceList = [
  [100],
  [200],
  [300],
  [500],
  [1000],
  [2000]
  // PRICELIST MUST BE SERVED FROM BACKEND
]

function Topup() {
  const [topUpClicked, setTopUpClicked] = useState(false)
  const [esewaTransactionCode, setEsewaTransactionCode] = useState('');
  const [emailAddress, setEmailAddress] = useState('')

  const [playerId, setPlayerId] = useState('')
  const [playerPassword, setPlayerPassword] = useState('')

  const [success, setSuccess] = useState('')
  const [err, setErr] = useState('')

  const handleSublit = () => {
    const dataToSend = { esewaTransactionCode, emailAddress, playerId, playerPassword }
    axios.post('http://localhost:8000/api/topup', dataToSend).then(res => {
      if (res.data.success) {
        setSuccess(res.data.msg)
      } else {
        setErr(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
      setErr("An error occured on Server");
    })
  }

  return (
    <div className="topUp">
      <div className={topUpClicked ? "showIt" : "hideIt"}>
        <div className="closeButton" onClick={() => setTopUpClicked(false)} >X</div>
        <img src={recive} alt="QR code" width="100%" />

        <div className="ismoneySent">
          <div className="verificationInputs">
            <div className="emailAddressinput">Please enter your Email Address</div>
            <input type="email" placeholder='Email Address' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
            <div className="playerId">Freefire Id</div>
            <input type="text" placeholder='Freefire Id' value={playerId} onChange={(e) => setPlayerId(e.target.value)} />
            <div className="playerPassword">Freefire Password</div>
            <input type="password" placeholder='Freefire Password' value={playerPassword} onChange={(e) => setPlayerPassword(e.target.value)} />
            <div className="transactionCodeInput">Please enter esewa transaction Code</div>
            <input type="text" placeholder='Verification Code' value={esewaTransactionCode} onChange={(e) => setEsewaTransactionCode(e.target.value)} />
          </div>
        </div>

        <div className="checkoutButton">
          <button onClick={() => handleSublit()} disabled={!emailAddress || !esewaTransactionCode || !playerId || !playerPassword} className='nextVerify' >Done!</button>
        </div>
      </div>
      {priceList.length === 0 ? <div className='error' >Please reload this page</div> : topUpClicked ? null : <div className="notice">
        <label className='topupNotice' htmlFor="">
          The topup takes about <b>5 min</b> please wait till..
        </label>
        {
          priceList.map((v, i) => {
            return (<div key={i} className="priceList">
              <div className="diamondAndPrice">
                <div className="diamond">
                  <div className="noOfDiamonds">
                    {v}
                  </div>
                  <div className="diamondImage">
                    <img src={diamond} alt="Diamond" width="20px" />
                  </div>
                </div>
                <div className="price"> <label className='priceText'>Price : </label> {v}</div>
              </div>
              <button onClick={() => setTopUpClicked(!topUpClicked)} className='topupButton' >TOP UP</button>
            </div>);
          })
        }
      </div>
      }
      {success ? <div className="success">{success}</div> : err ? <div className="err">{err}</div> : null}
    </div>
  )
}

export default Topup