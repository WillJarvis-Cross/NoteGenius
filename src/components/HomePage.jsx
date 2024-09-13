import React, { useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { signOut } from 'aws-amplify/auth';
import ChatBox from './ChatBox';
import './HomePage.css';

Amplify.configure(awsExports);

const HomePage = () => {
  const [classes, setClasses] = useState(['Math', 'Science', 'History']);
  const [currentClass, setCurrentClass] = useState(classes[0]);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.createRef();

  const handleAddClass = () => {
    setIsAddingClass(true);
  };

  const handleClassNameChange = (e) => {
    setNewClassName(e.target.value);
  };

  const handleAddClassSubmit = (e) => {
    e.preventDefault();
    if (newClassName.trim()) {
      setClasses([...classes, newClassName.trim()]);
      setNewClassName('');
      setIsAddingClass(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    // Implement file upload logic here
    console.log('File to upload:', selectedFile);
  };

  return (
    <div className="outerContainer">
      <div className="home-page">
        <div className="class-list">
          <h2 className="title">Classes</h2>
          <ul>
            {classes.map((className, index) => (
              <li
                key={index}
                onClick={() => setCurrentClass(className)}
                className={className === currentClass ? 'active' : 'title'}
              >
                {className}
              </li>
            ))}
          </ul>
          {isAddingClass ? (
            <form onSubmit={handleAddClassSubmit}>
              <input
                className="class-input"
                type="text"
                value={newClassName}
                onChange={handleClassNameChange}
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
          <Button onClick={handleFileUploadClick}>
            Upload Note
          </Button>
          <input
            style={{ display: "none" }}
            type="file"
            accept=".pdf,.docx,.txt,.md,image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {selectedFile && <p>Selected file: {selectedFile.name}</p>}

          <ChatBox $currentClass={currentClass} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
