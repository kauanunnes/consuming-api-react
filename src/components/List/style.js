import styled from 'styled-components'
export const List = styled.div`
  width: 900px;
  max-width: 70%;
  min-height: 50px;
  height: auto;

  background: #fff;
  
  margin: 10% 0;

  padding: 10px 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
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
    margin: 10px 0;
    width: 100%;
    border-collapse: collapse;
    transition: all .3s;

    td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
      img {
        cursor: pointer;
      }
      img.deleteIcon {
        align-self: flex-end;
      }
    }
    tr:nth-child(even) {
      background-color: #dddddd;
    }
  }
` 
