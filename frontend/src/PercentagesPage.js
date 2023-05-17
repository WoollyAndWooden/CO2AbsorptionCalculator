import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'

export function getPercentageChoice(val) {
  return Number(val)
}

export default function PercentagesPage() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [selectedOptions, setSelectedOptions] = useState(Array(choiceList[3].length).fill(0));
    const inputRef = useRef()

    function handleInputs(event, index) {
      
        setSelectedOptions(prevSelectedOptions => {
          const updatedOptions = [...prevSelectedOptions];
          const c = event.target.value
          updatedOptions[index] = Number(c);
          return updatedOptions;
        });
      }

      function addToChoiceList(newList) {
        const lele = choiceList.push(newList)
        setChoiceList(lele)
      }


      function checkCorrectValues(event) {    
        var sum = 0
        for (let index = 0; index < selectedOptions.length; index++) {
          sum = sum + selectedOptions[index]
        }

        if (sum < 60 || sum >= 100) {
          alert("Suma procentowa nie może być mniejsza niz 60% oraz większa od 100%!")
          event.preventDefault()
          return
        } 

        let newList = selectedOptions
        addToChoiceList(newList)
      }
  return (
    <body>
            <div className="centerdiv fade-in">
                <h2>Wpisz procentowy udział każdego z gatunków w ekosystemie leśnym. Suma nie może być mniejsza niż 60%</h2>
                <Form className='next'>
                <div className='column'>
                {choiceList[3].map((element, index) => {
                  if(element !== 'brak') {
                    return (
                      <div >
                          <FormLabel>{element}</FormLabel>
                          <input
                              type="number"
                              index={index}
                              onInput={event => handleInputs(event, index)}
                              ref={inputRef}
                              />
                      </div>             
                    )
                  }
                } )}
                </div>
            </Form>
            <div className='forlink'>
            <Link className='endlink' to={{
                            pathname: '/dominant',
                            state: {
                                state: choiceList.slice(0, -1)
                            }
                        }}>Wróć</Link>
            <Link onClick={checkCorrectValues} className='link'  to={{
                        pathname: '/howmanytrees',
                        state: {
                            state: choiceList,
                        }
                    }}>Dalej</Link>

            </div>
            
            </div>
        </body>
  )
}
