import { useState } from "react";
import { useEffect } from "react";
import Card from "../Components/Card";

const Home = () => {

  const [ dentists, setDentists ] = useState([])

  useEffect(() => {

    fetch('https://dhodonto.ctdprojetos.com.br/dentista')
      .then(res => {res.json()
      .then(dataDentists => {
          setDentists(dataDentists)
        })
      })
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {
          dentists.map((dentist) => {
            return(
              <Card
                cardData={dentist}
                key={dentist.matricula}
              />
            )
          })
        }
      </div>
    </>
  );
};

export default Home;
