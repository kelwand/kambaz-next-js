"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import type { RootState } from "../store";

interface User {
  _id: string;
  role: string;
  [key: string]: unknown;
}

// const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default function AccountNavigation() {
  const currentUser = useSelector((state: {accountReducer: {currentUser: {username: string, password: string}}}) => state.accountReducer.currentUser);

  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/${link.toLowerCase()}`}
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
 