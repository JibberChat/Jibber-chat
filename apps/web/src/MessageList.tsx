import React from 'react';
import { useQuery, useSubscription, gql } from '@apollo/client';

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

const MESSAGE_ADDED = gql`
  subscription OnMessageAdded {
    messageAdded {
      userId
      message
    }
  }
`;

// const MESSAGE_ADDED = gql`
//   subscription OnMessageAdded {
//     messageAdded
//   }
// `;

const MessageList = () => {
  //   const { data, loading, error } = useQuery(GET_MESSAGES, {
  //     variables: { roomId },
  //   });

  const { data: subscriptionData, error } = useSubscription(MESSAGE_ADDED);
  console.log('subscriptionData', subscriptionData, error);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error :(</p>;

  //   const messages = data ? data.getMessages : [];
  const newMessage = subscriptionData ? subscriptionData.messageAdded : null;
  console.log('newMessage', newMessage);

  //   if (newMessage && newMessage.roomId === roomId) {
  //     messages.push(newMessage);
  //   }

  return (
    <div>
      {/* {messages.map(({ id, content, sender, createdAt }: any) => (
        <div key={id}>
          <p>
            <strong>{sender}</strong>: {content}{' '}
            <em>{new Date(createdAt).toLocaleTimeString()}</em>
          </p>
        </div>
      ))} */}
    </div>
  );
};

export default MessageList;
