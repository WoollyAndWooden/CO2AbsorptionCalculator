import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './css/page.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MainPage() {

    const [choiceList, setChoiceList] = useState([{tag: 'mature', value: 'Dojrzałe lasy'}])
    const inputRef = useRef()

    function addChoice(event) {
        choiceList.pop()

        let choice;
        if(event.target.value === 'Dojrzałe') {
            choice = {tag: event.target.value, value: 'Dojrzałe lasy'}
        } else {
            choice = {tag: event.target.value, value: 'Młode lasy'}
        }
        const newList = choiceList.concat(choice)

        setChoiceList(newList)
    }

    return (
        <div className='bg'>
            <div className="centerdiv">
                <h2>Chcę obliczyć wielkość akumulacji CO2 przez:</h2>
                <form>
                    <select  onChange={addChoice}>
                        <option value="mature" ref={inputRef}>Dojrzałe lasy</option>
                        <option value="young" ref={inputRef}>Młode lasy </option>
                    </select>
                    <label className='label'>wiek lasu</label>
                  
                </form>
                <div className='forlink'>
                <Link className='link' to={{
                        pathname: '/area',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </div>

                
            </div>
        </div>
    )
}