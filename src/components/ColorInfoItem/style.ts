import styled from 'styled-components';

export const ColorInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  .color-label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .color-box {
    width: 22px;
    height: 22px;
    border-radius: 3px;
    border: 1px solid gray;
  }
`;
