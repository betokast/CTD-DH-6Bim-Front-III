import styles from "./Navbar.module.css";
import {useTheme} from "../hooks/useTheme";
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const {theme, changeTheme} = useTheme()
  const { auth, removeToken } = useAuth()

  return (
    <header className="sticky-top">

      <nav
        className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}
        aria-label="Third navbar example"
      >
        <div className="container">

          <Link to={'/home'} className={`navbar-brand ${styles.navbarBrand}`}>
            DH Odonto
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>

                <Link to={'/home'} className={`nav-link`}>
                  Home
                </Link>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>

                {(auth === '') ?
                <Link to="/login" className="nav-link">Login</Link>
                  :
                  (
                    <Link to="/home" className={`btn btn-${theme}`} onClick={() => removeToken()}>
                    Logout
                    </Link>
                  )
                }

              </li>
              <li className={`nav-item`}>
                <button
                  className={`btn btn-${theme}`}
                  onClick={() => changeTheme(
                    localStorage.getItem('theme') === 'light' ? 'dark' : 'light'
                  )}
                >
                  {theme === 'dark' ? '☀' : '🌙'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;