import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 8px 15px 0 15px;
  background-color: #2d3748;
  width: 100%;
  border-radius: 9px;

  // temporary solution
  height: 320px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  row-gap: 10px;

  div.bars-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-end;
    column-gap: 2.5px;
  }

  div.bars-header {
    display: flex;
    align-items: center;
    column-gap: 25px;

    .search-name {
      font-size: 14px;
      color: #fff;
      font-weight: 600;
    }

    .search-result {
      font-size: 14px;
      color: #bdbdbd;
    }
  }
`;

export const ActionsWrapper = styled.div`
  width: 100%;
  padding: 10px 30px;
  background-color: #2d3748;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .app-name {
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }

  .app-controls {
    display: flex;
    align-items: center;
    column-gap: 40px;

    .app-search-input {
      display: flex;
      align-items: center;
      column-gap: 10px;

      input {
        border-radius: 4px;
        padding: 8px;
        border: none;
      }
    }
  }

  .app-range-controls {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  .app-range-slider-wrap {
    display: flex;
    align-items: center;
    column-gap: 10px;

    .label {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
    }
  }
`;
