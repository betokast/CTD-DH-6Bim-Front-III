import { useEffect } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";

import { useTheme } from "../hooks/useTheme";
import { useParams } from "react-router-dom"

import { useState } from "react";


const DetailCard = () => {

  const { theme } = useTheme()
  const params = useParams()

  const [ dentists, setDentists ] = useState([])

  useEffect(() => {
    fetch(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${params.matricula}`).then(
      res => {
        if(res.ok) {
          res.json().then(
            data => {
              setDentists(data)
            }
          )
        }
      }
    )

  }, [dentists, params.matricula]);
  return (
     //As instruções que estão com {''} precisam ser
    //substituídas com as informações que vem da api
    <>
      {dentists?.usuario ? (
        <>
          <h1>Detalhes sobre os Dentistas {dentists.nome} </h1>
          <section className="card col-sm-12 col-lg-6 container">

          <div className={`card-body row ${theme === 'dark' ? `${styles.cardDark}` : ''}`}>
              <div className="col-sm-12 col-lg-6">
                <img
                  className="card-img-top"
                  src="/images/doctor.jpg"
                  alt="doctor placeholder"
                />
              </div>
              <div className="col-sm-12 col-lg-6">
                <ul className="list-group">
                  <li className="list-group-item">Nome: {dentists.nome}</li>
                  <li className="list-group-item">
                    Sobrenome: {dentists.sobrenome}
                  </li>
                  <li className="list-group-item">
                    Usuário: {dentists.usuario.username}
                  </li>
                </ul>
                <div className="text-center">

                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className={`btn btn-${theme} ${styles.button
                      }`}
                  >
                    Marcar consulta
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null }

      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
