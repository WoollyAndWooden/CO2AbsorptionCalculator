import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function HabitatPage() {
  const location = useLocation();
  const [choiceList, setChoiceList] = useState(location.state.state.concat(0));
  const [isSelected, setSelected] = useState(false);
  const inputRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/habitat/all')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })  
      .catch(error => console.log(error));
  });

  function handleChange(event) {
    setSelected(true);
    if (choiceList.length === 4) {
      choiceList.pop();
    }

    const newList = choiceList.concat({ value: event.target.value });
    setChoiceList(newList);
  }

  function goToAnotherPage(event) {
    if (!isSelected) {
      alert('Nie została wybrana żadna opcja!');
      event.preventDefault();
    }
  }

  if (loading) {
    return (
      <center>
        <h1>Loading....</h1>
      </center>
    )
  }

  return (
    <body>
      <div className="centerdiv fade-in">
        <h2>Siedlisko:</h2>
        <form>
          {data &&
            data.map(element => (
              <div key={element.name}>
                <label>
                  <input
                    className="radio"
                    ref={inputRef}
                    name="radiobutton"
                    type="radio"
                    value={element.name}
                    onClick={handleChange}
                  />
                  {element.name} ({element.latinName})/{element.polishName}
                </label>
              </div>
            ))}

          <div className="forlink">
            <Link
              className="endlink"
              to={{
                pathname: '/averageAge',
                state: {
                  state: choiceList.slice(0, -2),
                },
              }}
            >
              Wróć
            </Link>
            <Link
              onClick={goToAnotherPage}
              className="link"
              to={{
                pathname: '/degree',
                state: {
                  state: choiceList,
                },
              }}
            >
              Dalej
            </Link>
          </div>
        </form>
      </div>
    </body>
  );
}
