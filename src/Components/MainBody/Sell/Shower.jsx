import React from 'react'
import './Shower.css'

function Shower({image}) {
  return (
    <div className="imageView">
        <img src={image} alt="" />
    </div>
  )
}

export default Shower