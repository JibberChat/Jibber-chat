import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "./__generated__";

// const SEND_MESSAGE = gql(`
//   mutation SendMessage($input: SendMessageInput!) {
//     sendMessage(input: $input) {
//       userId
//       message
//     }
//   }
// `);

const SEND_MESSAGE = gql(`
  mutation SendMessage($roomId: String!, $message: String!) {
    sendMessage(roomId: $roomId, message: $message) {
      userId
      message
    }
  }
`);

const SendMessage = () => {
  const [content, setContent] = useState("");
  const [sender, setSender] = useState("");
  // const [roomId, setRoomId] = useState('');

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({
      variables: { message: content, roomId: "1" },
    });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="text" placeholder="Sender" value={sender} onChange={(e) => setSender(e.target.value)} />
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
