import React, {useState} from 'react'
import down from '../Emotes/down.png'
import gun1 from '../Emotes/gun1.png'
import gun from '../Emotes/gun.png'

function Characters() {
  const [showCharacters, setShowCharacters] = useState(false)
  return (<>
     <>
    <div className='emoteHolder' onClick={() => setShowCharacters(!showCharacters)} >
      <div className="emotesHolder">
        <label htmlFor="">Characters</label>
        <img src={down} height="25px" width="25px" alt="" />
      </div>
      {
        showCharacters && <div className="emotes">
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
  </>
  )
}

export default Characters