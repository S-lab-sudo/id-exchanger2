import React, { useContext, useState } from 'react'
import './BuyThis.css'
import { AppContext } from '../../../../App'
import qrCode from './recieveQRCode.jpeg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'


function BuyThis() {
    const navigate = useNavigate()
    const { value } = useContext(AppContext)
    const [esewaTransactionCode, setEsewaTransactionCode] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    useEffect(() => {
        if (!value.buyThis) {
            navigate('/buy')
        }
    }, [navigate, value.buyThis])

    const buyId=()=>{
        let sendDataToBackend={emailAddress,esewaTransactionCode,phoneNumber,buyingUID:value.buyThis.id}
        axios.post('http://localhost:8000/api/buy',sendDataToBackend).then(response=>{
            console.log(response)
        }).catch(err=>{
            console.log(err)
        })
    }

    if (!value.buyThis) {
        return null
    }
    return (
        <div className="buyThis">
            <div className="selectedId">
                <div className="ffID"> ID : {value.buyThis.id}</div>
                <div className="ffIDLevel"> ID Level:  {value.buyThis.idLevel}</div>
                <div className="idSellingPrice"> Price : {value.buyThis.sellingPrice}</div>
            </div>
            <div className="notice">
                Please send us Nrs. <u> {value.buyThis.sellingPrice} </u> on the following esewa code
            </div>
            <div className="sendMoneyImage">
                <img src={qrCode} alt="" />
            </div>
            <div className="form">
                <div className="esewaTransactionCode emailAddress ">
                    <input type="text" placeholder='Esewa Transaction Code' value={esewaTransactionCode} onChange={e => setEsewaTransactionCode(e.target.value)} />
                </div>
                <div className="emailAddress">
                    <input type="text" placeholder='Email Address' value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
                </div>
                <div className="phoneNumber">
                    <input type="text" placeholder='Phone Number' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </div>
            </div>
            <div className="buyButtonHolder">
                <button disabled={!esewaTransactionCode||!emailAddress||!phoneNumber} className='buyButton' onClick={buyId} >Buy ID</button>
            </div>
        </div>
    )
}

export default BuyThis