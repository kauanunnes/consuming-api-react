import styled from 'styled-components'
export const List = styled.div`
  max-width: 70%;
  min-height: 50px;
  height: auto;

  background: #fff;
  
  margin: 0 auto;
  padding: 10px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  
  border-radius: 4px;
  
  h1 {
    font-size: 18px;
    font-weight: 500;
    color: #324C73;
  }
  div#img {
    width: 100%;
    display: flex;
    justify-content: end;
    svg {
      width: 24px;
      height: auto;
      cursor: pointer;
      transition: all .3s;
      border-radius: 5px;
    }
    svg:hover {
      background: #324C73;
    }
    
    svg:hover > path{
      
      fill: white;
    }

    svg.active {
      transform: rotate(180deg);
    }
  }
  
  table {
    width: 90%;
    margin: 10px 75px 25px;
    transition: all .3s;
    
    tr {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }

    td {
    
      img {
        cursor: pointer;
      }
      img.deleteIcon {
        align-self: flex-end;
      }
    }
  }
` 
