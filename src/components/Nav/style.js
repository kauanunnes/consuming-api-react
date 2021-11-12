import styled from 'styled-components'

export const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  padding: 15px;

  width: 15vw;
  height: 100vh;
  
  background: #cecece;
  
  align-self: flex-start;
  
  .userInfo {
    display: flex;
    align-items: center;
    gap: 15px;

    height: auto;
    width: 80%;

    img {
      width: 40px;
      height: 40px;
    }

    .userCredencials {
      display: flex;
      flex-direction: column;
      height: 30px;
      justify-content: space-around;

      h1 {
        font-size: 17px;
        font-weight: 600;
      }
      
      h1, span {
        color: #031d44;
        
      }


      span {
        font-size: 15px;
        font-weight: 400;
      }
    }
  }

  .router {
    width: 80%;

    h2 {
      font-size: 17px;
      color: #031d44;
    }

    ul {
      list-style-type: none;
      margin: 10px 0;

      display: flex;
      flex-direction: column;
      gap: 5px;
      color: #031d44;

      li {
        display: flex;
        align-items: center;
        /* gap: 5px; */
        ul.submenu {
          display: none;
          margin: 0 70px;
          background: #f0f0f08b;
          color: #031d44;
          padding: 5px;
          width: 75px;
          position: absolute;
          font-weight: 600;
          border-radius: 2px;
          transition: all .5s;
          
          li:nth-child(even) {
            border-top: 1px solid #cecece;
          }
        }
      }

      li:hover > ul.submenu {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      
      li a {
        text-decoration: none;
        color: #031d44;
      }

      li a:hover {
        text-decoration: underline;
      }
    }

  }

  .actionsButtons {
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
        
        path {
          fill: #324C73;
        }
      }

      svg.home {
        background: #fff;
        padding: 4px;
        border-radius: 50%;

      }
    }

  }
`
