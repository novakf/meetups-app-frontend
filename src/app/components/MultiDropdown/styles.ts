import { styled } from 'styled-components'
import ArrowRight from '../../icons/ArrowRight'

export default {
  DropDown: styled.div<{ $active: boolean }>`
    opacity: 0;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 230px;
    width: 326px;
    transition: all 0.3s;
    pointer-events: none;
    transform: scaleY(0);
    transform-origin: top;

    ${(p) =>
      p.$active &&
      `opacity: 1;
    transform: scaleY(1);
   pointer-events: all;`}
  `,

  Select: styled.div`
    width: 300px;
    display: inline-flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
    cursor: pointer !important;
  `,

  OptionEl: styled.div<{ $active: boolean }>`
    color: #000;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    display: flex;
    padding: 14px 12px;
    align-items: center;
    gap: var(--space-xxs, 8px);
    flex-shrink: 0;
    border-radius: var(--border-radius, 0px);
    border: 1px solid var(--input-border, #fff);
    background: var(--input-bg, #fff);
    cursor: pointer;

    ${(p) => p.$active && `color: #157bff`}
  `,

  ArrowRight: styled(ArrowRight)<{ $active: boolean }>`
    cursor: pointer;
    transition: 0.3s;
    margin-top: 4px;

    ${(props) =>
      props.$active &&
      `
    transform: rotate(90deg);
  `}
  `,
}
