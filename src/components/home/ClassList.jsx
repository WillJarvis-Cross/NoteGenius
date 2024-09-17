import React, { useState } from 'react'
import styled from 'styled-components'
import DropdownMenu from './DropDownMenu'
import './ClassList.css'

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
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: none;
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
        <li
          key={index}
          onClick={() => setCurrentClass(index)}
          className={`list-item ${className === currentClass ? 'active' : ''}`}
        >
          {renamingIndex === index ? (
            <form onSubmit={(e) => handleRenameSubmit(e, index)}>
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                autoFocus
                className='rename-input'
              />
              <div className='rename-buttons-container'>
                <button className='rename-button' type="submit">Save</button>
                <button className='rename-button' type="button" onClick={() => setRenamingIndex(null)}>
                  Cancel
                </button>
              </div>
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
        </li>
      ))}
    </ul>
  )
}

export default ClassList
