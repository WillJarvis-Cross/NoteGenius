import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const DropdownMenuContainer = styled.div`
  position: relative;
  right: 0; /* Align with the right edge of the parent */
  top: 100%; /* Place below the parent element */
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};
  z-index: 1000; /* Ensure dropdown is on top */
`

const DropdownOption = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: none;
  }
`

const DropdownMenu = ({ $isVisible, onRename, onDelete, closeDropdown }) => {
  const dropdownRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Close the dropdown if the click is outside of the dropdown
        closeDropdown()
      }
    }

    if ($isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [$isVisible, closeDropdown])

  return (
    <DropdownMenuContainer ref={dropdownRef} $isVisible={$isVisible}>
      <DropdownOption onClick={onRename}>Rename</DropdownOption>
      <DropdownOption onClick={onDelete}>Delete</DropdownOption>
    </DropdownMenuContainer>
  )
}

export default DropdownMenu
