import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'


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
        console.log(selectedOptions)
        console.log(choiceList)
        
        var sum = 0
        for (let index = 0; index < selectedOptions.length; index++) {
          sum = sum + selectedOptions[index]
        }
        console.log(sum)

        if (sum < 60 || sum >= 100) {
          console.log("sumkipumki")
          alert("Suma procentowa nie może być mniejsza niz 60% oraz większa od 100%!")
          event.preventDefault()
          return
        } 

        let newList = selectedOptions
        addToChoiceList(newList)
      }
  return (
    <div className='bg'>
            <div className="centerdiv">
                <h2>Wybierz procentowy udział wybranych gatunków dominujących</h2>
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
            <Link onClick={checkCorrectValues} className='link'  to={{
                        pathname: '/howmanytrees',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

            </div>
            
            </div>
        </div>
  )
}
