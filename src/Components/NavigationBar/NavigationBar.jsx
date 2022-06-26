import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationBar.css'

function NavigationBar() {{
    return (
      <div className="navigationBar">
        <li><Link to={'/sell'} >Sell ID</Link></li>
        <li><Link to={'/buy'} >Buy ID</Link></li>
        <li><Link to={'/topup'} >Topup</Link></li>
      </div>
    )
  }
}

export default NavigationBar