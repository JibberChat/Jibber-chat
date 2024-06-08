'use client';

import SendMessage from '../src/SendMessage';
import MessageList from '../src/MessageList';

export default function Home() {
  return (
    <div>
      <h1>Chat Application</h1>
      <MessageList />
      <SendMessage />
    </div>
  );
}
