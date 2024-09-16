import React, { useState, useEffect } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import styled from 'styled-components';
import awsExports from '../aws-exports';
import { signOut } from 'aws-amplify/auth';
import ChatBox from './ChatBox';
import './HomePage.css';
import DropdownMenu from './DropDownMenu';

Amplify.configure(awsExports);

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
`;

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
`;

const HomePage = () => {
  const [classes, setClasses] = useState(['Math', 'Science', 'History']);
  const [currentClass, setCurrentClass] = useState(classes[0]);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null)
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

  const handleRenameClass = (index) => {
    const newClassName = prompt('Enter new class name');
    if (newClassName) {
      setClasses(classes.map((cls, i) => (i === index ? newClassName : cls)));
    }
  };

  const handleDeleteClass = (index) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter((_, i) => i !== index));
      if (currentClass === classes[index]) {
        setCurrentClass(classes[0]);
      }
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-menu')) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="outerContainer">
      <div className="home-page">
        <div className="class-list">
          <h2 className="title">Classes</h2>
          <ul>
            {classes.map((className, index) => (
              <ListItem
                key={index}
                onClick={() => setCurrentClass(className)}
                className={className === currentClass ? 'active' : 'title'}
              >
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
                      handleClassNameChange;
                      
                    }}
                    onDelete={() => {
                      handleDeleteClass();
                    }}
                  />
                )}
              </ListItem>
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
