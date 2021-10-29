import styled from 'styled-components'

export const Login = styled.div`
  width: 40%;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px 15px;
  border-radius: 4px;

  h1 {
    font-size: 18px;
    font-weight: 500;
    color: #324C73;
  }

  form {
    margin: 10px 0;
    display: flex;
    flex-direction: column;

    input {
      width: 250px;
      height: 30px;
      outline: none;
      border-radius: 4px;
  
      padding: 10px;
      background: #A7BCDC;
      border: none;
    }

    label {
      margin: 10px 0;
    }

    button {
      height: 34px;
      width: 100%;
      border: none;
      border-radius: 4px;
      background: #324C73;
      margin: 15px 0 0 0;
      color: #fff;
      cursor: pointer;
    }
  }
` 