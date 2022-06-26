import React, { useState } from 'react'
import down from './down.png'
import gun1 from './gun1.png'
import gun from './gun.png'

function Emotes() {
  const [showEmotes, setShowEmotes] = useState(false)
  return (<>
    <div className='emoteHolder' onClick={() => setShowEmotes(!showEmotes)} >
      <div className="emotesHolder">
        <label htmlFor="">Emotes</label>
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

export default Emotes