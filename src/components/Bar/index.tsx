import React from 'react';
import styled from 'styled-components';

const BarWrapper = styled.div`
  background-color: #4fd1c5;
  width: 100%;
  transition: height 0.3s ease-out;
  color: #fff;
`;

interface BarProps {
  value: number;
  dataVal: string;
}

const Bar: React.FC<BarProps> = ({ value, dataVal }) => {
  return (
    <BarWrapper
      className="app-bar"
      style={{
        height: `${value}px`,
      }}
    >
      <div id={dataVal}></div>
    </BarWrapper>
  );
};

export { Bar };
