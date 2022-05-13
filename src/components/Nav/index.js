import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context";
import userProfile from "./assets/user-profile.svg";
import { NavMenu } from "./style";

function Nav(props) {
  const { user, logged, userLogout } = React.useContext(UserContext);

  let queryString = window.location.pathname;

  

  return (
    <>
      <NavMenu>
        {logged && (
          <div className="userInfo">
            <img src={userProfile} alt="user profile" />
            <div className="userCredencials">
              <h1>{user?.name}</h1>
              <span>{user?.job}</span>
            </div>
          </div>
        )}
        <div className="router">
          <h2>Navegue por aqui:</h2>
          <ul>
            <li>
              <Link to="/funcionarios/">Funcionários</Link>
            </li>
            <li>
              Setores
              <ul className="submenu">
                <li>
                  <Link to="/setores/">Listar</Link>
                </li>
                <li>
                  <Link to="/create/setores/">Criar</Link>
                </li>
              </ul>
            </li>
            <li>
              Cargos
              <ul className="submenu">
                <li>
                  <Link to="/cargos/">Listar</Link>
                </li>
                <li>
                  <Link to="/create/cargos/">Criar</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="actionsButtons">
          {!logged && (
            <button type="button">
              <Link to="/">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={queryString === "/" ? "home" : ""}
                >
                  <path
                    d="M19.0028 2.7606C18.5967 2.37661 18.0589 2.16266 17.5 2.16266C16.9411 2.16266 16.4033 2.37661 15.9972 2.7606L5.40094 12.775C5.07649 13.082 4.81815 13.452 4.64174 13.8624C4.46532 14.2728 4.37456 14.7148 4.375 15.1615V27.3459C4.37558 28.2158 4.72154 29.0498 5.33683 29.6647C5.95212 30.2796 6.78639 30.625 7.65625 30.625H10.9375C11.8077 30.625 12.6423 30.2793 13.2577 29.6639C13.8731 29.0486 14.2188 28.214 14.2188 27.3437V21.875C14.2188 21.5849 14.334 21.3067 14.5391 21.1016C14.7442 20.8965 15.0224 20.7812 15.3125 20.7812H19.6875C19.9776 20.7812 20.2558 20.8965 20.4609 21.1016C20.666 21.3067 20.7813 21.5849 20.7813 21.875V27.3437C20.7813 28.214 21.127 29.0486 21.7423 29.6639C22.3577 30.2793 23.1923 30.625 24.0625 30.625H27.3438C28.214 30.625 29.0486 30.2793 29.6639 29.6639C30.2793 29.0486 30.625 28.214 30.625 27.3437V15.1593C30.6249 14.7129 30.5336 14.2711 30.3568 13.8611C30.18 13.4511 29.9215 13.0816 29.5969 12.775L19.0028 2.75622V2.7606Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </button>
          )}
          <button type="button">
            <Link to="/create/">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.25 17.5C19.432 17.5 19.6088 17.514 19.7838 17.5402C18.5354 18.4299 17.5179 19.6053 16.8162 20.9682C16.1145 22.3311 15.7489 23.8421 15.75 25.375C15.75 26.817 16.0667 28.1873 16.6355 29.414C15.4798 29.6449 14.3035 29.7575 13.125 29.75C7.154 29.75 3.5 27.2195 3.5 23.625V21C3.5 20.0717 3.86875 19.1815 4.52513 18.5251C5.1815 17.8687 6.07174 17.5 7 17.5H19.25Z"
                  fill="white"
                />
                <path
                  d="M29.75 11.375C29.75 12.5353 29.2891 13.6481 28.4686 14.4686C27.6481 15.2891 26.5353 15.75 25.375 15.75C24.2147 15.75 23.1019 15.2891 22.2814 14.4686C21.4609 13.6481 21 12.5353 21 11.375C21 10.2147 21.4609 9.10188 22.2814 8.28141C23.1019 7.46094 24.2147 7 25.375 7C26.5353 7 27.6481 7.46094 28.4686 8.28141C29.2891 9.10188 29.75 10.2147 29.75 11.375Z"
                  fill="white"
                />
                <path
                  d="M13.125 3.5C13.9293 3.5 14.7258 3.65843 15.4689 3.96624C16.2121 4.27405 16.8873 4.72521 17.456 5.29397C18.0248 5.86273 18.476 6.53794 18.7838 7.28106C19.0916 8.02418 19.25 8.82065 19.25 9.625C19.25 10.4293 19.0916 11.2258 18.7838 11.9689C18.476 12.7121 18.0248 13.3873 17.456 13.956C16.8873 14.5248 16.2121 14.976 15.4689 15.2838C14.7258 15.5916 13.9293 15.75 13.125 15.75C11.5005 15.75 9.94263 15.1047 8.79397 13.956C7.64531 12.8074 7 11.2495 7 9.625C7 8.00055 7.64531 6.44263 8.79397 5.29397C9.94263 4.14531 11.5005 3.5 13.125 3.5Z"
                  fill="white"
                />
                <path
                  d="M33.25 25.375C33.25 27.4636 32.4203 29.4666 30.9435 30.9435C29.4666 32.4203 27.4636 33.25 25.375 33.25C23.2864 33.25 21.2834 32.4203 19.8065 30.9435C18.3297 29.4666 17.5 27.4636 17.5 25.375C17.5 23.2864 18.3297 21.2834 19.8065 19.8065C21.2834 18.3297 23.2864 17.5 25.375 17.5C27.4636 17.5 29.4666 18.3297 30.9435 19.8065C32.4203 21.2834 33.25 23.2864 33.25 25.375ZM26.25 21.875C26.25 21.6429 26.1578 21.4204 25.9937 21.2563C25.8296 21.0922 25.6071 21 25.375 21C25.1429 21 24.9204 21.0922 24.7563 21.2563C24.5922 21.4204 24.5 21.6429 24.5 21.875V24.5H21.875C21.6429 24.5 21.4204 24.5922 21.2563 24.7563C21.0922 24.9204 21 25.1429 21 25.375C21 25.6071 21.0922 25.8296 21.2563 25.9937C21.4204 26.1578 21.6429 26.25 21.875 26.25H24.5V28.875C24.5 29.1071 24.5922 29.3296 24.7563 29.4937C24.9204 29.6578 25.1429 29.75 25.375 29.75C25.6071 29.75 25.8296 29.6578 25.9937 29.4937C26.1578 29.3296 26.25 29.1071 26.25 28.875V26.25H28.875C29.1071 26.25 29.3296 26.1578 29.4937 25.9937C29.6578 25.8296 29.75 25.6071 29.75 25.375C29.75 25.1429 29.6578 24.9204 29.4937 24.7563C29.3296 24.5922 29.1071 24.5 28.875 24.5H26.25V21.875Z"
                  fill="white"
                />
              </svg>
            </Link>
          </button>
          {user?.job !== -1 ? (
            <button type="button" onClick={userLogout}>
              <Link to="#">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23 4H7C6.46957 4 5.96086 4.21071 5.58579 4.58579C5.21071 4.96086 5 5.46957 5 6V30C5 30.5304 5.21071 31.0391 5.58579 31.4142C5.96086 31.7893 6.46957 32 7 32H23C23.5304 32 24.0391 31.7893 24.4142 31.4142C24.7893 31.0391 25 30.5304 25 30V24H15.63C15.3648 24 15.1104 23.8946 14.9229 23.7071C14.7354 23.5196 14.63 23.2652 14.63 23C14.63 22.7348 14.7354 22.4804 14.9229 22.2929C15.1104 22.1054 15.3648 22 15.63 22H25V6C25 5.46957 24.7893 4.96086 24.4142 4.58579C24.0391 4.21071 23.5304 4 23 4V4Z"
                    fill="white"
                  />
                  <path
                    d="M28.16 17.28C27.9687 17.1162 27.7226 17.0306 27.4709 17.0403C27.2193 17.05 26.9805 17.1544 26.8024 17.3324C26.6243 17.5105 26.52 17.7493 26.5103 18.001C26.5006 18.2526 26.5862 18.4987 26.75 18.69L30.13 22H25V24H30.13L26.75 27.46C26.6453 27.5497 26.5603 27.66 26.5003 27.784C26.4403 27.9081 26.4065 28.0432 26.4012 28.181C26.3959 28.3187 26.4191 28.456 26.4694 28.5843C26.5196 28.7127 26.5959 28.8292 26.6933 28.9267C26.7908 29.0241 26.9074 29.1004 27.0357 29.1506C27.164 29.2009 27.3013 29.2241 27.4391 29.2188C27.5768 29.2135 27.7119 29.1798 27.836 29.1197C27.96 29.0597 28.0704 28.9747 28.16 28.87L34 23.07L28.16 17.28Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </button>
          ) : (
            <></>
          )}
        </div>
      </NavMenu>
      <ToastContainer />
    </>
  );
}

export default Nav;
