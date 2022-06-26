import React, { useEffect, useState } from 'react'
import data from './data';
import right from './right.png'
import left from './left.png'

function Colisor() {
  const [current, setCurrent] = useState(null)
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [auto, setAuto] = useState(false)

  const handlePrevious = () => {
    setNext(current)
    setCurrent(previous)
    setPrevious(data.data.indexOf(previous) === 0 ? data.data[data.data.length - 1] : data.data[data.data.indexOf(previous) - 1])
  }

  const handleNext = () => {
    setPrevious(current)
    setCurrent(next)
    setNext(data.data.indexOf(next) === data.data.length - 1 ? data.data[0] : data.data[data.data.indexOf(next) + 1])
  }

  useEffect(() => {
    setCurrent(data.data[0]);
    setNext(data.data[1])
    setPrevious(data.data[data.data.length - 1])
  }, []);

  useEffect(() => {
    if (auto) {
      var intervalId = window.setInterval(() => {
        setPrevious(current)
        setCurrent(next)
        setNext(data.data.indexOf(next) === data.data.length - 1 ? data.data[0] : data.data[data.data.indexOf(next) + 1])
      }, 2000)
      return () => clearInterval(intervalId)
    } else {
      return () => clearInterval(intervalId)
    }
  }, [auto, current,next])


  if (!current || !next || !previous) {
    return <div className="colisorHolder" >No images to show</div>
  }
  return (
    <div className="colisorHolder">
      <img height="100%" width="auto" src={current} alt="FreeFire" />
      <button className="playButtton" onClick={() => setAuto(!auto)} >{auto ? <div>Stop</div> : <div>Auto</div>}</button>
      <button className="previous" onClick={() => handlePrevious()} ><img src={left} width="100%" alt="" /></button>
      <button className="next" onClick={() => handleNext()} > <img src={right} width="100%" alt="" /></button>
    </div>
  );
}

export default Colisor