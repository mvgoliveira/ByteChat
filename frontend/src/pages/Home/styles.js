import styled from 'styled-components';
import WolfIllustration from '../../images/svg/Wolf.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  height: 100vh;
  padding: 0 150px;
  background: #FAFAFA url(${WolfIllustration}) no-repeat left -100px top -45px;
  background-size: 258px;
  
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
      
      button {
        font: 500 1rem 'Poppins', sans-serif;
        padding: 6px 25px;
        border: 2px solid #284de2;
        color: #284DE2;
        border-radius: 8px;
      }
    }

  }

  section {
    flex: 6;
    display: flex;
    
    #section-left {
      display: flex;
      flex-direction: column;
      flex: 1;
      color: #15254D;
      height: 100%;
      justify-content: center;
      align-items: flex-start;
      padding-bottom: 120px;
      
      h2 {
        font: bold 1.9rem 'Poppins', sans-serif;
      }
      
      p {
        max-width: 400px;
        font: 500 1.3rem 'Poppins', sans-serif;
      }

      button {
        background: #284de2;
        width: 220px;
        font: 500 1rem 'Poppins', sans-serif;
        padding: 12px 30px;
        color: #fff;
        border-radius: 8px;
        margin-top: 64px;
      }
      
      article {
        display: flex;
        width: 100%;
        margin-top: 26px;

        input {
          border: 2px solid #81899E;
          padding: 10px 25px;
          border-radius: 8px;
          height: 50px;
          
          :focus {
            border: 2px solid #284de2;
            outline: none;
          }
        }

        button {
          width: 80px;
          padding: 0px;
          margin: 0;
          margin-left: 27px;
          color: #81899E;
          background: transparent;
        }
      }
    }
    
    #section-right {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 120px;
      flex-direction: column;
      align-items: center;
      text-align: center;

      #section-right-top {
        display: flex;
        justify-content: center;

        img {
          width: 450px;
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