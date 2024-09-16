import React from 'react';
import { Button } from '@aws-amplify/ui-react';

const FileUpload = ({ selectedFile, setSelectedFile, fileInputRef }) => {
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <Button onClick={handleFileUploadClick}>Upload Note</Button>
      <input
        style={{ display: 'none' }}
        type="file"
        accept=".pdf,.docx,.txt,.md,image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
