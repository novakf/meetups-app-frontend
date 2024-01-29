import { styled } from 'styled-components'

export default {
  ModalWrapper: styled.div<{ $open: boolean }>`
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;

    ${(props) =>
      props.$open &&
      `
      opacity: 1;
      pointer-events: all;
  `}
  `,

  ModalContent: styled.div<{ $open: boolean }>`
    width: 1000px;
    margin: 0 40px;
    border-radius: 10px;
    background-color: white;
    transform: scale(0.2);
    transition: transform 0.2s;

    ${(props) => props.$open && 'transform: scale(1);'}
  `,
}
