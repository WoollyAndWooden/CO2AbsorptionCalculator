import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'


export default function PercentagesPage() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [selectedOptions, setSelectedOptions] = useState([0, 0, 0]);
    const inputRef = useRef()


    function handleInputs(event, index) {
        setSelectedOptions(prevSelectedOptions => {
          const updatedOptions = [...prevSelectedOptions];
          updatedOptions[index] = event.target.value;
          return updatedOptions;
        });
      }

      function addOptionsToChoiceList() {
        const newList = choiceList.push(selectedOptions)
        setChoiceList(newList)
      }
   
  return (
    <div className='bg'>
            <div className="centerdiv">
                <h2>Wybierz procenty</h2>
                <Form className='next'>
                <div className='column'>
                {choiceList[3].map((element, index) => (
                    <div >
                        <FormLabel>{element}</FormLabel>
                        <input
                            type="number"
                            index={index}
                            onChange={event => handleInputs(event, index)}
                            ref={inputRef}
                            />

                    </div>             
                ))}
                </div>
            </Form>
            <Link onClick={addOptionsToChoiceList} to={{
                        pathname: '/howmanytrees',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
            </div>
        </div>
  )
}
