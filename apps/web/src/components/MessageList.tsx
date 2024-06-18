import React from "react";
import { useSubscription } from "@apollo/client";
import { gql } from "@/__generated__";

// const GET_MESSAGES = gql`
//   query GetMessages($roomId: String!) {
//     getMessages(roomId: $roomId) {
//       id
//       #   content
//       #   sender
//       #   createdAt
//     }
//   }
// `;

const MESSAGE_ADDED = gql(`
  subscription userJoinedRoom($roomId: String!) {
    userJoinedRoom(roomId: $roomId) {
      userId
      message
    }
  }
`);

// const MESSAGE_ADDED = gql`
//   subscription OnMessageAdded {
//     messageAdded
//   }
// `;

const MessageList = () => {
  //   const { data, loading, error } = useQuery(GET_MESSAGES, {
  //     variables: { roomId },
  //   });

  const {
    data: subscriptionData,
    error,
    loading,
  } = useSubscription(MESSAGE_ADDED, {
    variables: { roomId: "1" },
  });
  console.log("subscriptionData", subscriptionData, error, loading);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error :(</p>;

  const messages = [];
  const newMessage = subscriptionData ? subscriptionData.userJoinedRoom : null;
  console.log("newMessage", newMessage);

  if (newMessage) {
    messages.push(newMessage);
  }

  return (
    <div>
      {messages.map(({ message, userId }: any, index) => (
        <div key={index}>
          <p>
            <strong>{userId}</strong>: {message} {/* <em>{new Date(createdAt).toLocaleTimeString()}</em> */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
