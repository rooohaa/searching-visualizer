import styled from 'styled-components';

export const ButtonWrapper = styled.button<{
  variant: 'primary' | 'secondary';
}>`
  color: ${(props) => (props.variant === 'primary' ? '#fff' : '#38b2ac')};
  background-color: ${(props) =>
    props.variant === 'primary' ? '#38b2ac' : '#fff'};
  border-radius: 4px;
  font-weight: 500;
  padding: 8px 12px;
  border: ${(props) =>
    props.variant === 'primary' ? 'none' : '2px solid #38b2ac'};
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: #4fd1c5;
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
