import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/page.css'


export default function AverageAgePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [value, setValue] = useState(0)
    const inputRef = useRef()
    const ageGroups = ["30-50", "51-70", "71-90", "91-110", "111-130"]
    const ageGroupsArray = ageGroups.map(element => createRadioButton(element))

    function createRadioButton(element){
        console.log(element)
        return (
        <div>
            <label>
                <input
                    type="radio"
                    value="{element}"
                />
                {element}
            </label>
        </div>
        )
    }


    return (
        <div>
            <div className="centerdiv">
                <h2>Średni wiek lasu poniżej...:</h2>
                <form>
                    {ageGroupsArray}
                    <Link to={{
                        pathname: '/notImplemented',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </form>
            </div>
        </div>
    )
}