import { styled } from 'styled-components'
import robot from '../../assets/robot.png'
import angryRobot from '../../assets/angry-robot.png'

export default {
  Hint: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1;

    @media (max-width: 500px) {
      margin-top: 20px;
    }
  `,

  ChangeContentButton: styled.div`
    cursor: pointer;
    text-decoration: underline;
  `,

  ImageContainer: styled.div<{ $error: boolean }>`
    display: flex;
    justify-content: center;
    height: 215px;
    width: 200px;
    background-image: url('${(props) => (!props.$error ? robot : angryRobot)}');
    background-size: 200px;
    background-repeat: no-repeat;
    margin-left: auto;
    margin-right: auto;
    z-index: 1;

    transition: all 0.3s;
  `,

  Content: styled.div`
    display: flex;
  `,

  LeftTitle: styled.div`
    font-size: 24px;
    z-index: 1;
  `,

  Left: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    background: #ebebeb;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding: 24px;
    gap: 40px;
    justify-content: space-between;

    @media (max-width: 500px) {
      display: none;
    }
  `,

  Right: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    border-radius: 10px;
    padding: 24px;

    @media (max-width: 500px) {
      width: 100%;
    }
  `,
}
