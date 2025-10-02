"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AccountNavigation() {
  const pathname = usePathname();

  const getItemClasses = (path: string) => {
    return `list-group-item border-0 ${pathname.includes(path) ? "active" : ""}`;
  };

  const getLinkClasses = (path: string) => {
    return `text-decoration-none ${pathname.includes(path) ? "text-dark" : "text-danger"}`;
  };

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <ListGroupItem className={getItemClasses("/Account/Signin")}>
        <Link href="/Account/Signin" className={getLinkClasses("/Account/Signin")}>
          Signin
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Account/Signup")}>
        <Link href="/Account/Signup" className={getLinkClasses("/Account/Signup")}>
          Signup
        </Link>
      </ListGroupItem>

      <ListGroupItem className={getItemClasses("/Account/Profile")}>
        <Link href="/Account/Profile" className={getLinkClasses("/Account/Profile")}>
          Profile
        </Link>
      </ListGroupItem>
    </div>
  );
}
