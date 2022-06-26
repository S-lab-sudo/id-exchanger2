import React from 'react'
import { useState } from 'react'
import down from '../Emotes/down.png'
import gun1 from '../Emotes/gun1.png'
import gun from '../Emotes/gun.png'

export default function Pets() {
    const [showEmotes, setShowEmotes] = useState(false)
  return (
    <>
    <div className='emoteHolder' onClick={() => setShowEmotes(!showEmotes)} >
      <div className="emotesHolder">
        <label htmlFor="">Pets</label>
        <img src={down} height="25px" width="25px" alt="" />
      </div>
      {
        showEmotes && <div className="emotes">
          <div className="emotesImages">
            <div className="gunImageHolder">
              <img src={gun} alt="" />
            </div>
            <div className="gunImageHolder">
              <img src={gun1} alt="" />
            </div>
          </div>
          <div className="emotesImages">
            <div className="gunImageHolder">
              <img src={gun1} alt="" />
            </div>
            <div className="gunImageHolder">
              <img src={gun} alt="" />
            </div>
          </div>
        </div>
      }
    </div>
  </>
  )
}
