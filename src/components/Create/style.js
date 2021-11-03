import styled from "styled-components";

export const Container = styled.div`
  width: 50%;

  margin: 0 auto;

  background: #fff;
  border-radius: 4px;

  padding: 15px 0;

  form {
    width: 38%;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    gap: 10px;
    margin: 0 auto;
    align-items: center;
  }

  form input, form select {
    width: 250px;
    height: 30px;
    outline: none;
    border: none;
    background: #F0F0F0;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;

  }

  form label {
    align-self: flex-start;
  }

  form input {
    padding: 5px 10px;
  }

  form button {
    width: 250px;
    height: 35px;
    outline: none;
    border: none;
    border-radius: 4px;
    background: #324C73;
    color: #fff;
    margin: 10px 0;
  }
`