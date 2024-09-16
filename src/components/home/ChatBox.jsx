import { Button } from '@aws-amplify/ui-react'
import React, { useState } from 'react'
import styled from 'styled-components'

const ChatContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 600px;
  height: 800px;
  border: 1px solid #ccc;
  border-radius: 8px 8px 0 0;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const CustomButton = styled(Button)`
  background-color: #007bff;
  color: #0000ff;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`

const TalkButton = styled(CustomButton)`
  background-color: #28a745;
  color: #ffffff;
  position: fixed;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: #218838;
  }
`

const SendButton = styled(CustomButton)`
  width: 70px;
  height: 40px;
  margin-left: 10px;
`

const ChatHeader = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  text-align: center;
`

const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`

const ChatSection = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #f1f1f1;
  color: #000;
  border-top: 1px solid #ccc;
  display: 'flex';
`

const ChatInput = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  border-top: 1px solid #ccc;
  outline: none;
  background-color: #fff;
  color: #000;
`

const CloseButton = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #121212;
  }
`

const ChatBox = ({ $currentClass }) => {
  const [messages, setMessages] = useState([])
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [input, setInput] = useState('')

  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')
    }
  }

  const handleTalkWithTutor = () => {
    setIsChatVisible(!isChatVisible)
  }

  return (
    <div>
      <TalkButton onClick={handleTalkWithTutor}>
        Virtual {$currentClass} Tutor
      </TalkButton>
      {isChatVisible && (
        <ChatContainer>
          <ChatHeader>
            <CloseButton onClick={handleTalkWithTutor}>X</CloseButton>
            {`Virtual ${$currentClass} Tutor`}
          </ChatHeader>
          <ChatBody>
            {messages.map((message, index) => (
              <div key={index}>{message.text}</div>
            ))}
          </ChatBody>
          <ChatSection style={{ display: 'flex' }}>
            <ChatInput
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSendMessage}
            />
            <SendButton
              onClick={() => {
                /* Implement send message logic here */
              }}
            >
              Send
            </SendButton>
          </ChatSection>
        </ChatContainer>
      )}
    </div>
  )
}

export default ChatBox
