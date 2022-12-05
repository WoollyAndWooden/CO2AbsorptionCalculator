import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './css/page.css'

export default function MainSite() {

    const [choiceList, setChoiceList] = useState([])
    const inputRef = useRef()

    function addChoice() {
        choiceList.pop()
        
        let choice;
        if(inputRef.current.value === 'Dojrzałe lasy') {
            choice = 'mature'
        } else {
            choice = 'young'
        }
        const newList = choiceList.concat(choice)

        setChoiceList(newList)
    }

    return (
        <div>
            <div className="centerdiv">
                <h2>Chcę obliczyć wielkość akumulacji CO2 przez:</h2>
                <form>
                    <input ref={inputRef} list="forests" onInput={addChoice}></input>
                    <label>wiek lasu</label>
                    <Link to={{
                        pathname: '/area',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                    <datalist id="forests">
                        <option value="Dojrzałe lasy"></option>
                        <option value="Młode lasy"></option>
                    </datalist>
                </form>
            </div>
        </div>
    )
}
