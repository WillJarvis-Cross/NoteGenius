import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import awsExports from '../../aws-exports'
import { signOut } from 'aws-amplify/auth'
import ChatBox from './ChatBox'
import ClassList from './ClassList'
import FileUpload from './FileUpload'
import './HomePage.css'

Amplify.configure(awsExports)

const HomePage = () => {
  const [classes, setClasses] = useState([{ name: 'Math', description: '' }, { name: 'Science', description: '' }, { name: 'History', description: '' }])
  const [currentClass, setCurrentClass] = useState(0)
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [newClassName, setNewClassName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [newClassDescription, setNewClassDescription] = useState('')
  const fileInputRef = useRef(null)

  const handleAddClass = () => {
    setIsAddingClass(!isAddingClass)
  }

  const handleAddClassSubmit = (e) => {
    e.preventDefault()
    if (newClassName.trim()) {
      const newEntry = { name: newClassName.trim(), description: '' }
      setClasses([...classes, newEntry])
      setNewClassName('')
      setNewClassDescription('')
      setIsAddingClass(false)
    }
  }

  const handleRenameClass = (index, newName) => {
    setClasses(
      classes.map((cls, i) =>
        i === index
          ? { ...cls, name: newName, description: cls.description }
          : cls
      )
    )
  }

  const handleDeleteClass = (index) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter((_, i) => i !== index))
      if (currentClass === index) {
        setCurrentClass(0)
      }
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const classNamesArray = classes.map(cls => cls.name)
  const currClassName = classNamesArray[currentClass]

  return (
    <div className="outerContainer">
      <div className="home-page">
        <div className="class-list">
          <h2 className="title">Classes</h2>
          <ClassList
            classes={classNamesArray}
            currentClass={currClassName}
            setCurrentClass={setCurrentClass}
            handleRenameClass={handleRenameClass}
            handleDeleteClass={handleDeleteClass}
          />
          {isAddingClass ? (
            <form onSubmit={handleAddClassSubmit}>
              <input
                className="class-input"
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Enter new class name"
                autoFocus
              />
              <div className='add-cancel'>
                <button type="submit">Add</button>
                <button type="button" onClick={handleAddClass}>Cancel</button>
              </div>
            </form>
          ) : (
            <button onClick={handleAddClass}>Add Class</button>
          )}
          <div className="signout-button">
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
        <div className="class-details">
          <h2 className="title">{currClassName}</h2>
          <input
            className='description-input'
            type='text'
            value={newClassDescription}
            onChange={(e) => setNewClassDescription(e.target.value)}
            placeholder='Enter class description'
          />
          <FileUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            fileInputRef={fileInputRef}
          />
          <ChatBox $currentClass={currClassName} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
