import React, { useState } from 'react'
import styled from 'styled-components'
import DropdownMenu from './DropDownMenu'

const DotsButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin-right: 8px;
  margin-left: auto;
  width: 30px;
  height: 40px;
  color: ${(props) => (props.$isActive ? 'white' : 'black')};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Slightly transparent background */
    border-radius: 50%; /* Makes the background circular */
  }

  &:focus {
    outline: none; /* Remove the focus outline */
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1); /* Prevent additional background color change on click */
    box-shadow: none; /* Remove any box shadow on click */
  }
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`

const ClassList = ({
  classes,
  currentClass,
  setCurrentClass,
  handleRenameClass,
  handleDeleteClass,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [renamingIndex, setRenamingIndex] = useState(null)
  const [newClassName, setNewClassName] = useState('')

  const handleRenameSubmit = (e, index) => {
    e.preventDefault()
    if (newClassName.trim()) {
      handleRenameClass(index, newClassName)
      setRenamingIndex(null)
      setNewClassName('')
    }
  }

  return (
    <ul>
      {classes.map((className, index) => (
        <ListItem
          key={index}
          onClick={() => setCurrentClass(className)}
          className={className === currentClass ? 'active' : 'title'}
        >
          {renamingIndex === index ? (
            <form onSubmit={(e) => handleRenameSubmit(e, index)}>
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                autoFocus
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setRenamingIndex(null)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              {className}
              <DotsButton
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveDropdown(index === activeDropdown ? null : index)
                }}
                $isActive={className === currentClass}
              >
                &#x22EE;
              </DotsButton>
              {index === activeDropdown && (
                <DropdownMenu
                  $isVisible={index === activeDropdown}
                  onRename={() => {
                    setRenamingIndex(index)
                    setNewClassName(className) // Pre-fill the input with the current class name
                  }}
                  onDelete={() => handleDeleteClass(index)}
                  closeDropdown={() => setActiveDropdown(null)}
                />
              )}
            </>
          )}
        </ListItem>
      ))}
    </ul>
  )
}

export default ClassList
