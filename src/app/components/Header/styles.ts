import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export default {
  Tab: styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  `,

  Border: styled.div<{
    $isActive: boolean
  }>`
    margin-top: 15px;
    height: 1px;
    width: 100%;
    border-bottom: 2px solid #004dff59;
    margin-left: auto;
    margin-right: auto;
    opacity: 0;
    transition: all 0.3s;

    ${(props) =>
      props.$isActive &&
      `
    opacity: 1;
    `};
  `,

  BurgerMenuButton: styled.div<{ $open: boolean }>`
    transition: all 0.2s;

    ${(props) => props.$open && `transform: rotate(-90deg);`}
  `,

  BurgerMenu: styled.div`
    @media (min-width: 751px) {
      display: none;
    }
  `,

  Column: styled.div`
    font-size: 40px;
    margin-right: 20px;
    color: #000;
    font-weight: 100;
    align-items: center;

    @media (max-width: 750px) {
      display: none;
    }
  `,

  Links: styled.div`
    display: flex;
    gap: 20px;

    a {
      text-decoration: none;
      color: #000;
    }

    @media (max-width: 750px) {
      display: none;
    }
  `,

  Left: styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,

  Action: styled.div`
    display: flex;
    gap: 10px;

    @media (max-width: 750px) {
      display: none;
    }
  `,

  LoginButton: styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 15px;
    transition: all 0.3s;
    border-radius: 14px;
    padding: 5px 14px 7px 14px;

    &:hover {
      background: #efefef;
    }
  `,

  SignupButton: styled.button`
    background: #0064ff;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-size: 15px;
    color: #fff;
    padding: 5px 14px 7px 14px;
    transition: all 0.2s;

    &:hover {
      background: #0042a7;
    }
  `,

  LogoImg: styled.img`
    width: 36px;
  `,

  Logo: styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    margin-right: 30px;
    text-decoration: none;
    color: #000;
  `,

  Container: styled.div`
    display: flex;
    height: 70px;
    padding: 0 50px;
    border-bottom: 1px solid #f1f1f1;
    position: fixed;
    background: #fff;
    z-index: 10;
    width: calc(100% - 80px);
    width: calc(100% - 81px);
  `,

  Content: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  `,
}
