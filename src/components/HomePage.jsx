import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'
import { signOut } from 'aws-amplify/auth'
import ChatBox from './ChatBox'
import ClassList from './ClassList'
import FileUpload from './FileUpload'
import './HomePage.css'

Amplify.configure(awsExports)

const HomePage = () => {
  const [classes, setClasses] = useState(['Math', 'Science', 'History'])
  const [currentClass, setCurrentClass] = useState(classes[0])
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [newClassName, setNewClassName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleAddClass = () => {
    setIsAddingClass(true)
  }

  const handleAddClassSubmit = (e) => {
    e.preventDefault()
    if (newClassName.trim()) {
      setClasses([...classes, newClassName.trim()])
      setNewClassName('')
      setIsAddingClass(false)
    }
  }

  const handleRenameClass = (index) => {
    const newClassName = prompt('Enter new class name')
    if (newClassName) {
      setClasses(classes.map((cls, i) => (i === index ? newClassName : cls)))
    }
  }

  const handleDeleteClass = (index) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter((_, i) => i !== index))
      if (currentClass === classes[index]) {
        setCurrentClass(classes[0])
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

  return (
    <div className="outerContainer">
      <div className="home-page">
        <div className="class-list">
          <h2 className="title">Classes</h2>
          <ClassList
            classes={classes}
            currentClass={currentClass}
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
              <button type="submit">Add</button>
            </form>
          ) : (
            <button onClick={handleAddClass}>Add Class</button>
          )}
          <div className="signout-button">
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
        <div className="class-details">
          <h2 className="title">{currentClass}</h2>
          <FileUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            fileInputRef={fileInputRef}
          />
          <ChatBox $currentClass={currentClass} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
