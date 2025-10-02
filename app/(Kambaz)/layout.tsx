"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
     <div id="wd-kambaz">
      <div className="d-flex">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3 flex-fill" >
          {children}
        </div>
      </div>
    </div>
  );
}