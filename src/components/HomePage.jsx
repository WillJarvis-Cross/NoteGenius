import React, { useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import styled from 'styled-components';
import awsExports from '../aws-exports';
import { signOut } from 'aws-amplify/auth';
import ChatBox from './ChatBox';
import './HomePage.css';

Amplify.configure(awsExports);

const CustomButton = styled(Button)`
  background-color: #007bff
  color: #0000ff
  border-radius: 4px
  padding: 10px 20px
  font-size: 16px
  bottom: 20px

  &:hover {
    background-color: #0056b3
  }
`;
const HiddenFileInput = styled.input`
  display: none;
`;

const TalkButton = styled(CustomButton)`
  background-color: #28a745;
  color: #ffffff;
  position: fixed;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: #218838;
  }
`;

const ChatHeader = styled.div`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const ChatBody = styled.div`
  padding: 10px;
  height: calc(100% - 80px); /* Adjust height for header and input */
  overflow-y: auto;
`;

const ChatInputContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #f1f1f1;
  border-top: 1px solid #ccc;
`;

const ChatInput = styled.input`
  width: calc(100% - 80px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000000;
  background-color: #ffffff;
`;

const SendButton = styled(CustomButton)`
  width: 70px;
  height: 40px;
  margin-left: 10px;
`;

const HomePage = () => {
  const [classes, setClasses] = useState(['Math', 'Science', 'History']);
  const [currentClass, setCurrentClass] = useState(classes[0]);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChatVisible, setIsChatVisible] = useState(false);
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
            <CustomButton onClick={handleSignOut}>Sign Out</CustomButton>
          </div>
        </div>
        <div className="class-details">
          <h2 className="title">{currentClass}</h2>
          <CustomButton onClick={handleFileUploadClick}>
            Upload Note
          </CustomButton>
          <HiddenFileInput
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
