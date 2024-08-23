import { Storage } from '@aws-amplify/storage'

// Function to upload a file to S3
export async function uploadFile(file) {
  try {
    const result = await Storage.put(file.name, file, {
      contentType: file.type,
    });
    console.log('File uploaded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Function to retrieve a file's URL from S3
export async function getFileUrl(fileName) {
  try {
    const url = await Storage.get(fileName);
    console.log('File URL:', url);
    return url;
  } catch (error) {
    console.error('Error retrieving file:', error);
    throw error;
  }
}
