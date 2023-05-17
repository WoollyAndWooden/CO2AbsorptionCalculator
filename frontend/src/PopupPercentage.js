import React, { useState } from 'react'

export default function PopupPercentage({index, list, inputRef, onListUpate, onPopupIndexUpdate}) {

    console.log('rendered ' + index)
    const [selectedOptions, setSelectedOptions] = useState(Array(list[4].length).fill(0));
    const filteredArray = list[3].filter(element => element !== 'brak')


    function handleInputs(event, index) {
        setSelectedOptions(prevSelectedOptions => {
            const updatedOptions = [...prevSelectedOptions];
            const c = event.target.value
            updatedOptions[index] = Number(c);
            return updatedOptions;
          });
    }

    return (
        <div className='popup fade-in'>
            

          {Array.from({ length: filteredArray.length }, (_, index) => (
            <div>
              <label>{list[3][index]}</label>
              <input key={index} type='number' ref={inputRef} onInput={event => handleInputs(event, index)} />
            </div>
            
          ))}

            <button onClick={(event) => handleClosePopup(event, index)}>Close Popup</button>

        </div>


      );

    function modifyChoiceList(index) {
        let sum = 0;
        for (let index = 0; index < selectedOptions.length; index++) {
            sum = sum + selectedOptions[index]
          }
  
          if (sum < 60 || sum >= 100) {
            alert("Suma procentowa nie może być mniejsza niz 60% oraz większa od 100%!")
            return
          } 
       
        const updatedList = [...list]

        updatedList[4] = selectedOptions;
        console.log(updatedList)
        onListUpate(updatedList)
      }
    
    
    function handleClosePopup(event, index) {
        modifyChoiceList(index)
        onPopupIndexUpdate(null);
    }

}
