import { styled } from 'styled-components'
import ArrowRight from '../../icons/ArrowRight'

export default {
  ArrowRight: styled(ArrowRight)`
    @media (max-width: 751px) {
      width: 14px;
    }
  `,

  Container: styled.div`
    display: flex;
    background: #f7f7f7;
    padding: 8px 20px;
    border-radius: 15px;
    gap: 10px;
    width: fit-content;
    z-index: 1;

    @media (max-width: 751px) {
      gap: 5px;
      padding: 6px 10px;
    }
  `,

  Section: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;

    @media (max-width: 751px) {
      font-size: 12px;
      gap: 5px;
    }
  `,
}
