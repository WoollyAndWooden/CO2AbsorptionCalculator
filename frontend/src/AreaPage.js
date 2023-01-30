import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/page.css'


export default function AreaPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat({value: 0}))
    const [value, setValue] = useState(0)
    const inputRef = useRef()

    function addChoice() {
        if(choiceList.length === 2) {
            choiceList.pop()
        }
        const newList = choiceList.concat({value: handleDecimalPlace(inputRef.current.value)})
        setChoiceList(newList)
    }

    function handleDecimalPlace(value) {
        if(value.length === 0) {
            return 0
        }
        const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
        return Number(value.match(regex)[0])
    }

    function checkValue(event) {
        setValue(handleDecimalPlace(event.target.value))
    }

    if(choiceList[0].tag === 'mature') {
        return (
            <div className='bg'>
                <div className="centerdiv">
                    <h2>Powierzchnia Lasu:</h2>
                    <form>
                        <input
                        id="area"
                        ref={inputRef}
                        type="number"
                        step="0.01"
                        value={value}
                        onChange={(event) => checkValue(event, 'change')}
                        onInput={addChoice}>
                        </input>
                        <label className='label'>m2</label>
                        <Link className='link' to={{
                        pathname: '/averageAge',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className='bg'>
                <div className="centerdiv">
                    <h2>Powierzchnia Lasu...:</h2>
                    <form>
                        <input
                        id="area"
                        ref={inputRef}
                        type="number"
                        step="0.01"
                        value={value}
                        onChange={(event) => checkValue(event, 'change')}
                        onInput={addChoice}>
                        </input>
                        <label>m2</label>
                        <Link className='link' to={{
                        pathname: '/groundtype',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                    </form>
                </div>
            </div>
        )
    }
}
