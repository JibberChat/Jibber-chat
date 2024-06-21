import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Groups } from "./Groups";

export const Sidebar = () => {
  return (
    <div className="flex flex-col border-r bg-muted/40">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
          <span>Jibber App</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="flex flex-col h-full justify-end px-4">
          <Groups />
        </div>
      </div>
    </div>
  );
};

// import React, { useState } from 'react';
// import Link from "next/link";
// import PlusIcon from "./icons/plus";
// import { Button } from "./ui/button";
// import { Contact } from "./Contact";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import Settings from "./icons/settings";

// const users = [
//   { id: 1, name: "Nolan", message: "Go Dev!" },
//   {
//     id: 2,
//     name: "Chahine",
//     message: "Va checker mon app de reconnaissance faciale en Rust",
//   },
//   { id: 3, name: "Bakary", message: "Incroyable le shell!" },
//   { id: 4, name: "Aymene", message: "Bientôt chez Tiktok!" },
//   { id: 5, name: "Romain", message: "Incroyable les vacances en Grèce !" },
// ];

// export const Sidebar = () => {
//   return (
//     <div className="flex flex-col border-r bg-muted/40">
//       <div className="flex h-[60px] items-center border-b px-6">
//         <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
//           <span>Chat App</span>
//         </Link>
//         <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
//           <Settings className="h-4 w-4" />
//           <span className="sr-only">Settings</span>
//         </Button>
//       </div>
//       <div className="flex-1 overflow-auto py-2">
//         <div className="grid gap-2 px-4">
//           <UserItem
//             name="John Doe"
//             message="Hey there! How's it going?"
//             status="online"
//             avatarSrc="/placeholder-user.jpg"
//           />
//           <UserItem
//             name="Sarah Anderson"
//             message="Sending you a file, check it out!"
//             status="online"
//             avatarSrc="/placeholder-user.jpg"
//           />
//           <UserItem
//             name="Michael Johnson"
//             message="Are we still on for the meeting?"
//             status="offline"
//             avatarSrc="/placeholder-user.jpg"
//           />
//           <UserItem
//             name="Emily Martinez"
//             message="Let me know if you have any questions!"
//             status="online"
//             avatarSrc="/placeholder-user.jpg"
//           />
//         </div>
//       </div>
//     </div>
//     // <div className="border-r bg-gray-50 dark:border-gray-800 dark:bg-gray-850">
//     //   <div className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-800">
//     //     <h2 className="text-sm font-medium text-gray-700 dark:text-gray-400">
//     //       Utilisateurs actifs
//     //     </h2>
//     //     <Button className="rounded-full" size="icon" variant="ghost">
//     //       <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//     //     </Button>
//     //   </div>
//     //   <div className="h-[calc(100vh-64px)] overflow-y-auto">
//     //     <div className="space-y-4 p-4">
//     //       {users.map((user) => (
//     //         <Contact
//     //           key={user.id}
//     //           avatar={user.name.substring(0, 2)}
//     //           name={user.name}
//     //           message={user.message}
//     //           room_id={String(user.id)}
//     //         />
//     //       ))}
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }

// export const UserItem = ({ name, message, status, avatarSrc }) => {
//   return (
//     <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 truncate ...">
//       <Avatar className="h-10 w-10">
//         <AvatarImage src={avatarSrc} />
//         <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
//       </Avatar>
//       <div className="flex-1 overflow-hidden">
//         <div className="font-medium truncate">{name}</div>
//         <div className="text-xs text-muted-foreground truncate">{message}</div>
//       </div>
//       <div className={`flex h-2 w-2 rounded-full ${status === "online" ? "bg-green-500" : "bg-red-500"}`} />
//     </div>
//   );
// }
