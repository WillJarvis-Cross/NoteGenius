import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || '#007bff'};
  color: ${(props) => props.textColor || '#ffffff'};
  border: none;
  border-radius: '4px';
  padding: '10px 20px';
  font-size: '16px';
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#0056b3'};
  }
`

const CustomButton = ({
  children,
  onClick,
  bgColor,
  textColor,
  hoverColor,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      bgColor={bgColor}
      textColor={textColor}
      hoverColor={hoverColor}
    >
      {children}
    </StyledButton>
  )
}

export default CustomButton
