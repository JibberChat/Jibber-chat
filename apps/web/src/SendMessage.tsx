import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input)
  }
`;

const SendMessage = () => {
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  // const [roomId, setRoomId] = useState('');

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({
      variables: { input: { message: content, userId: sender } },
    });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sender"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      /> */}
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
