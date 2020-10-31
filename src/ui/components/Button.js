import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { buttonReset } from '../styles/buttonReset';

const StyledButton = styled.button`
  ${buttonReset}
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  transition: background 0.2s;
  ${css({
    px: 0,
    pr: 200,
    py: 100,
    my: 100
  })}

  &:hover {
    ${css({ bg: 'gray.200' })}
  }
`;

function Button(props) {
  return <StyledButton {...props} />;
}

export default Button;
