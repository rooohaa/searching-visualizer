import styled from 'styled-components';

export const InputArrayWrapper = styled.div`
  width: 100%;
  padding: 8px 16px;
  background-color: #fff;
  border-radius: 9px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div.input-wrap {
    display: flex;
    align-items: center;
    column-gap: 6px;
    
    input {
      width: 300px;
      border: 2px solid #4fd1c5;
      border-radius: 4px;
      padding: 6px 3px;
    }
  }

  div.colors-info {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }
`;
