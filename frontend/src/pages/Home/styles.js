import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;

  ul {
    margin-bottom: 20px;
    background: #F0F0F0;
    padding: 20px;

    li {
      text-decoration: none;
      list-style: none;
      text-align: center;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #bbbbbb;
      margin-bottom: 5px;
      margin-right: 200px;
      background: #b6ccf0;
    }

    .user1 {
      margin-right: 0px;
      margin-left: 200px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    
    input {
      margin-bottom: 5px;
    }

    button {
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #bbbbbb;
      cursor: pointer;
    }
  }

  > button {
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #bbbbbb;
    cursor: pointer;
    margin-top: 15px;
  }

  p {
    margin-top: 15px;
  }
`;