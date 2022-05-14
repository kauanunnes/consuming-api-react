import { ExpandLess, ExpandMore, GroupAdd, Logout } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context";
import { stringAvatar } from "../../helpers/functions";
import { NavMenu } from "./style";

function Nav(props) {
  const [openCargos, setOpenCargos] = React.useState(false);
  const [openSetores, setOpenSetores] = React.useState(false);

  const { user, logged, userLogout } = React.useContext(UserContext);

  let queryString = window.location.pathname;

  const handleOpenCargos = () => {
    setOpenCargos(!openCargos);
  };

  const handleOpenSetores = () => {
    setOpenSetores(!openSetores);
  };

  return (
    <>
      <NavMenu>
        {logged && (
          <div className="userInfo">
            <Avatar {...stringAvatar(user?.name)} />
            <div className="userCredencials">
              <h1>{user?.name}</h1>
              <span>{user?.job}</span>
            </div>
          </div>
        )}
        <div className="router">
          {/* <li>
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
            </li> */}

          <List
            sx={{
              width: "100%",
              maxWidth: 200,
              bgcolor: "transparent",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton>
              <ListItemText>
                <Link to="/funcionarios/">Funcionários</Link>
              </ListItemText>
            </ListItemButton>
            <ListItemButton onClick={handleOpenCargos}>
              <ListItemText style={{ color: "#324C73" }} primary="Cargos" />
              {openCargos ? (
                <ExpandLess htmlColor="#324C73" />
              ) : (
                <ExpandMore htmlColor="#324C73" />
              )}
            </ListItemButton>
            <Collapse in={openCargos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText>
                    <Link to="/cargos/">Listar</Link>
                  </ListItemText>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText>
                    <Link to="/create/cargos/">Criar</Link>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleOpenSetores}>
              <ListItemText style={{ color: "#324C73" }} primary="Setores" />
              {openCargos ? (
                <ExpandLess htmlColor="#324C73" />
              ) : (
                <ExpandMore htmlColor="#324C73" />
              )}
            </ListItemButton>
            <Collapse in={openSetores} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText>
                    <Link to="/setores/">Listar</Link>
                  </ListItemText>
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText>
                    <Link to="/create/setores/">Criar</Link>
                  </ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
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
              <GroupAdd color="primary" style={{ cursor: "pointer" }} />
            </Link>
          </button>
          {user?.job !== -1 ? (
            <button type="button" onClick={userLogout}>
              <Link to="#">
                <Logout color="primary" style={{ cursor: "pointer" }} />
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
