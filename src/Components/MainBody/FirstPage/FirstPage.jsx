import React from 'react'
import { Link } from 'react-router-dom'
import './FirstPage.css'
import diamond from './diamond.png'

function FirstPage() {
    return (
        <div className="firstPageHolder">
            <label className='iwantto' htmlFor="">I want to :- </label>
            <div className="buySellNavigation">
                <Link className='gotoSell' to={"/sell"} >
                    <div className="sellID">Sell Your ID </div>
                </Link>
                <Link className='gotoBuy' to={"/buy"} >
                    <div className="buyID">Buy/Explore IDs</div>
                </Link>
            </div>
            <div className="gotoTopup">
                <Link to={"/topup"}>
                    <div className="topup">
                        <label htmlFor="">
                            Topup Diamonds
                        </label>
                        <img src={diamond} alt="diamond" /> </div>
                </Link>
            </div>
            <div className="aboutUs">
                <ol>
                    <li>We have been exchanging Accounts of free fire players in Nepal since 2020</li>
                    <li>We have been providing these services since 2022/6/20</li>
                    <li>Any suspecious or scam activety will suspend the ID that has been used as well as the IP of your device.</li>
                    <li>We take around 7 min to approve your id for selling</li>
                    <li>We take around 5 min to approve your buying ID all the details regarding your brought ID will be sent to your email address</li>
                    <li>We take around 3 min to topup diamonds from free fire</li>
                </ol>
            </div>
        </div>
    )
}

export default FirstPage