"use client";

import { ReactNode, Suspense } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";


export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>

      <div id="wd-kambaz">
        <div className="d-flex">
          <Suspense fallback={<div>Loading navigation...</div>}>
            <KambazNavigation />
          </Suspense>
          <div className="wd-main-content-offset p-3 flex-fill">
            {children}
          </div>
        </div>
      </div>
    </Provider>

  );
}