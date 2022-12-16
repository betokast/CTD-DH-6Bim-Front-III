import styles from "./Card.module.css"
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

const Card = (props) => {
  const { theme } = useTheme()


  return (
    <>

      <div className={`card ${theme === 'dark' ? `${styles.cardDark}` : ''}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>

          <Link className="link" to={`../dentist/${props.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{props.nome} {props.sobrenome}</h5>
            <p className={`${theme === 'dark' ? `${styles.cardTextDark}` : `${styles.cardTextLight}`}`}>{props.usuario}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;