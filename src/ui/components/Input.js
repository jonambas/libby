import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledInput = styled.input`
  display: block;
  margin: 0;
  width: 80%;
  border: none;
  border-radius: 4px;
  border: none;
  outline: none;
  transition: 0.2s;

  ${css({
    p: 200,
    fontSize: 100,
    bg: 'gray.200'
  })}

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blue};
  }
`;

const Input = React.forwardRef(function Input(props, ref) {
  return <StyledInput data-id="libra-input" {...props} ref={ref} />;
});

export default Input;
