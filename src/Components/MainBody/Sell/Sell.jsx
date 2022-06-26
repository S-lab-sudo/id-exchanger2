import React, { useEffect, useState } from 'react'
import './Sell.css'
import axios from 'axios'
import Shower from "./Shower"

function Sell() {
  const [idLevel, setIdLevel] = useState('')
  const [diamondsAvailable, setDiamondsAvailable] = useState('')
  const [freefireId, setFreefireId] = useState('');
  const [freefirePassword, setFreefirePassword] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [emotesImages, setEmotesImages] = useState('')
  const [gunsImages, setGunsImages] = useState('')
  const [characters, setCharacters] = useState('')
  const [petImages, setPetImages] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')


  const [emotesImagesURL, setEmotesImagesURL] = useState([])

  const handleSublitForm = () => {
    let dataToSendBackend = new FormData()
    let jsonDataToSend = JSON.stringify({ emailAddress, idLevel, diamondsAvailable, sellingPrice, freefireId, freefirePassword, phoneNumber })
    dataToSendBackend.append('jsonDataToSend', jsonDataToSend)
    const allImages = [emotesImages, gunsImages, characters, petImages]
    allImages.map((v, i) => {
      let dynamicText = i === 0 ? 'emotes' : i === 1 ? 'guns' : i === 2 ? 'characters' : 'pets'
      for (let j = 0; j < v.length; j++) {
        dataToSendBackend.append(dynamicText, v[j])
      }
    })
    axios.post('http://localhost:8000/api/sell', dataToSendBackend).then(res => {
      console.log(res)
    })
  }

  useEffect(() => {
    let URLS = []
    Array.from(emotesImages).map(v => {
      URLS.push(URL.createObjectURL(v))
    })
    setEmotesImagesURL(URLS)
  }, [emotesImages])
  return (
    <div className="sell">
      <label className='sellNotice' htmlFor="">Please Enter your ID details . <u> The more you put details the chance of ID getting sold increases. </u> </label>
      <div className="idLevel">
        <input type="Number" placeholder='Freefire ID Level' value={idLevel} onChange={(e) => setIdLevel(e.target.value)} />
      </div>
      <div className="diamondsAvailable">
        <input type=" Number" placeholder='Diamonds Available' value={diamondsAvailable} onChange={(e) => setDiamondsAvailable(e.target.value)} />
      </div>
      <div className="idTag">
        <input type="text" placeholder='UID' value={freefireId} onChange={(e) => setFreefireId(e.target.value)} />
      </div>
      <div className="idPassword">
        <input type="password" placeholder='Password' value={freefirePassword} onChange={e => setFreefirePassword(e.target.value)} />
      </div>
      <div className="emailAddress">
        <input type="email" placeholder='Email Address' value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
      </div>
      <div className="sellingPrice">
        <input type="Number" placeholder='Id Selling Price' value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
      </div>
      <div className="phoneNumber">
        <input type="Number" placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div className="noticeEmotes">
        <label className='emotesVideoUpload' htmlFor="emotesVideo">
          Upload your Emotes' Photos or Videos
          <input id='emotesVideo' name='EmotesVideo' type="file" className='fileInput' multiple={true} placeholder="Upload Images/Videos" onChange={e => setEmotesImages(e.target.files)} />
        </label>
        {
          emotesImagesURL&&<div className="imageViewHolder">
            {emotesImagesURL.map((v,i)=>{
              return <Shower image={v} key={i} />
            })}
          </div>
        }
      </div>
      <div className="noticeGuns">
        <label className='emotesVideoUpload' htmlFor="GunsVideo">
          Upload your Guns' Photos or Videos
        <input name='GunsVideo' type="file" className='fileInput' multiple={true} onChange={e => setGunsImages(e.target.files)} />
        </label>
        {
          gunsImages&&<div className="imageViewHolder">
            {Array.from(gunsImages).map((v,i)=>{
              return <Shower image={URL.createObjectURL(v)} key={i} />
            })}
          </div>
        }
      </div>
      <div className="noticeCharacter">
        <label className='emotesVideoUpload' htmlFor="PetVideo">
          Upload your Characters' Photos or Videos
        <input name='PetVideo' type="file" className='fileInput' multiple={true} onChange={e => setCharacters(e.target.files)} />
        </label>
        {
          characters&&<div className="imageViewHolder">
            {Array.from(characters).map((v,i)=>{
              return <Shower image={URL.createObjectURL(v)} key={i} />
            })}
          </div>
        }
      </div>
      <div className="petImages">
        <label className='emotesVideoUpload' htmlFor="CharacterVideo">
          Upload your Pets' Photos or Videos
        <input name='CharacterVideo' type="file" className='fileInput' multiple={true} onChange={e => setPetImages(e.target.files)} />
        </label>
        {
          petImages&&<div className="imageViewHolder">
            {Array.from(petImages).map((v,i)=>{
              return <Shower image={URL.createObjectURL(v)} key={i} />
            })}
          </div>
        }
      </div>

      <div className="sellId">
        <button disabled={!idLevel}  className='sellID' onClick={() => handleSublitForm()} >Sell ID</button>
      </div>
    </div>
  )
}

export default Sell