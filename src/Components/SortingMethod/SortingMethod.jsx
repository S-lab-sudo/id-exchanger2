import React, { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../../App'
import './SortingMethod.css'

function SortingMethod() {
    const [showPriceRange, setShowPriceRange] = useState(false)
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const {value,dispatcher} = useContext(AppContext)
    if (value.showSortingMethods) {
        return (
            <div className="sortingMethodHolder">
                <div className="sortingMethodList">
                    <div className="buttonHolder">
                        <button onClick={() => dispatcher({action:"TOGGLE_SORTING_SHOW"})} >X</button>
                    </div>
                    <div onClick={() => dispatcher({action:"SORT1"})} className="hottest">Hottest</div>
                    <div onClick={() => dispatcher({action:"SORT_ASCENDING"})} className="lowest">Lowest</div>
                    <div onClick={() => dispatcher({action:"SORT_DESCENDING"})} className="highest">Highest</div>
                    <div onClick={() => !showPriceRange&&setShowPriceRange(!showPriceRange)} className="priceRangeHolder">
                        <div className="labelAndCloseButton">
                            <label className='priceRangeText' htmlFor="">Price Range</label>
                            {showPriceRange && <div onClick={()=>setShowPriceRange(!showPriceRange)} className="close"><button>X</button></div>}
                        </div>
                        {
                            showPriceRange && <div onClick={()=>0}  className="priceRange">
                                <input type="number" value={min} placeholder="Minimun Price" onChange={e => setMin(e.target.value)} />
                                <input type="number" value={max} placeholder="Maxmimum Price" onChange={e => setMax(e.target.value)} />
                                <button onClick={()=>dispatcher({action:"SORT_USING_RANGE",payload:{max,min}})} >Sort</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default SortingMethod