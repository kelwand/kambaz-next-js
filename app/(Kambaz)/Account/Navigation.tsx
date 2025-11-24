"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  const getLinkClasses = (link: string) =>
    pathname.endsWith(link) || pathname.endsWith(link.toLowerCase())
      ? "text-black fw-bold"    
      : "text-danger";           

  return (
    <Nav>
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.endsWith(link.toLowerCase())}
            className={getLinkClasses(link)}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      {currentUser?.role === "ADMIN" && (
        <NavItem>
          <NavLink
            as={Link}
            href="/Account/Users"
            active={pathname.endsWith("Users")}
            className={getLinkClasses("Users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}
