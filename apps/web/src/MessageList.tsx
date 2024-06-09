import React from 'react';
import { useSubscription } from '@apollo/client';
import { gql } from './__generated__';

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
  subscription OnMessageAdded {
    messageAdded {
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

  const { data: subscriptionData, error } = useSubscription(MESSAGE_ADDED);
  console.log('subscriptionData', subscriptionData, error);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error :(</p>;

  const messages = [];
  const newMessage = subscriptionData ? subscriptionData.messageAdded : null;
  console.log('newMessage', newMessage);

  if (newMessage) {
    messages.push(newMessage);
  }

  return (
    <div>
      {messages.map(({ message, userId }: any, index) => (
        <div key={index}>
          <p>
            <strong>{userId}</strong>: {message}{' '}
            {/* <em>{new Date(createdAt).toLocaleTimeString()}</em> */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
