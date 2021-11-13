import styled from 'styled-components';
import WolfIllustration from '../../images/svg/Wolf.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  height: 100vh;
  padding: 0 150px;
  background: url(${WolfIllustration}) no-repeat left -100px top -45px;
  background-size: 258px;
  gap: 50px;
  padding-bottom: 50px;
  
  header {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 40px;


    #header-left {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 30px;

      h1 {
        font-family: 'Anton', sans-serif;
        letter-spacing: 0.8px;
        font-size: 3rem;
        font-weight: 500;
        color: #284de2;
      }
    }
    
    #header-right {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 50px;
      
      button {
        font: 500 1rem 'Poppins', sans-serif;
        padding: 6px 25px;
        border: 2px solid #284de2;
        color: #284DE2;
        border-radius: 8px;
        
        :hover {
          border: 2px solid #2240b5;
          color: #2240b5;
        }

        :active {
          transform: scale(1.01);
        }
      }

      svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }

  }

  section {
    flex: 6;
    display: flex;
    padding-bottom: 50px;

    
    #section-left {
      display: flex;
      flex-direction: column;
      flex: 1;
      color: #15254D;
      height: 100%;
      justify-content: center;
      align-items: flex-start;
      
      h2 {
        font: bold 1.9rem 'Poppins', sans-serif;
      }
      
      p {
        max-width: 400px;
        font: 500 1.3rem 'Poppins', sans-serif;
      }

      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #284de2;
        width: 220px;
        font: 500 1rem 'Poppins', sans-serif;
        padding: 12px 0;
        color: #fff;
        border-radius: 8px;
        margin-top: 64px;
        gap: 10px;

        :hover {
          background: #2445c9;
        }

        :active {
          transform: scale(1.01);
        }
      }
      
      article {
        display: flex;
        width: 100%;
        margin-top: 26px;

        input {
          border: 2px solid #81899E;
          border: none;
          padding: 10px 25px;
          border-radius: 8px;
          height: 50px;
          background: transparent;
          outline: none;
        }

        button {
          width: 80px;
          padding: 0px;
          margin: 0;
          margin-left: 24px;
          color: ${props => props.isInputFill ? "#284de2" : "#81899E"};
          background: transparent;
          cursor: ${props => props.isInputFill ? "pointer" : "not-allowed"};
        }

        form {
          display: flex;
          #input-container {
            display: flex;
            border-radius: 8px;
            border: ${props => props.isInputFill ? "2px solid #284de2" : "2px solid #81899E"};
  
            :focus-within {
              border: 2px solid #284de2;
              outline: none;
            }
            
            svg {
              position: relative;
              top: 50%;
              transform: translate(70%, -50%);
              margin-right: 4px;
            }
          }
        }
      }
    }
    
    #section-right {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;

      #section-right-top {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        img {
          width: 450px;
        }

        svg {
          cursor: pointer;
        }
      }

      #section-right-bottom {
        h3 {
          margin-top: 49px;
          font: 900 1.3rem 'Poppins', sans-serif;
          color: #454D5A;
        }
        
        p {
          margin-top: 8px;
          font: 500 0.9rem 'Poppins', sans-serif;
          color: #58606B;
          width: 280px;
        }
      }
    }
  } 
`;