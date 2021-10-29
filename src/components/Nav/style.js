import styled from 'styled-components'

export const NavMenu = styled.nav`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
`

export const UserInfo = styled.div`
  display: flex;
  gap: 10px;
  height: 100%;

  img {
    width: 50px;
    height: 50px;
  }

  .userCredencials {
    display: flex;
    flex-direction: column;
    height: 50px;
    justify-content: space-around;

    h1 {
      color: #fff;
      font-size: 17px;
      font-weight: 500;
    }

    span {
      font-size: 15px;
      color: #fff;
      font-weight: 400;
    }
  }

`

export const ActionsButtons = styled.div`
  display: flex;
  gap: 15px;

  button {
    background: none;
    border: none;
    height: auto;
    width: auto;
    cursor: pointer;

    svg {
      width: 35px;
      height: 35px;
    }
    svg.home {
      background: #fff;
      padding: 4px;
      border-radius: 50%;

      path {
        fill: #324C73;
      }
    }
  }
`