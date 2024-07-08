import Link from "next/link";
import React from "react";
import { Room } from "types/room.type";

import { Groups } from "./Groups";

interface SidebarProps {
  rooms: Room[];
  // eslint-disable-next-line no-unused-vars
  setSelectedRoom: (room: Room) => void;
}

export const Sidebar = ({ rooms, setSelectedRoom }: Readonly<SidebarProps>) => {
  return (
    <div className="flex flex-col border-r bg-muted/40">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
          <span>Jibber App</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="flex flex-col h-full justify-end px-4">
          <Groups rooms={rooms} setSelectedRoom={setSelectedRoom} />
        </div>
      </div>
    </div>
  );
};
