import Link from "next/link";
import React from "react";

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
