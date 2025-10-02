"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FiHelpCircle } from "react-icons/fi";
import { MdVideoLibrary, MdPeopleAlt } from "react-icons/md";
import { GoClock } from "react-icons/go";
import 'bootstrap/dist/css/bootstrap.min.css';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";


export default function KambazNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDashboard = pathname === "/Dashboard" && !searchParams.get("tab");
  const isCourses = pathname === "/Dashboard" && searchParams.get("tab") === "courses";


  const getItemClasses = (path: string, isAccount = false) => {
    if (isAccount) return "border-0 bg-black text-center text-white";
    return `border-0 text-center ${pathname === path ? "bg-white text-danger" : "bg-black text-white"
      }`;
  };

  const getIconColor = (path: string, isAccount = false) => {
    if (isAccount) return "text-white";
    return "text-danger";
  };

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed top-0 start-0 d-none d-md-block z-2 bg-black"
      style={{ width: "110px", height: "100vh", overflowY: "auto" }}
    >
      {/* NEU logo */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      {/* account */}
      <ListGroupItem
        className={`border-0 text-center ${pathname.startsWith("/Account") ? "bg-white" : "bg-black"
          }`}
      >
        <Link
          href="/Account"
          className={`text-decoration-none ${pathname.startsWith("/Account") ? "text-danger" : "text-white"
            }`}
        >
          <FaRegCircleUser
            className={`fs-3 ${pathname.startsWith("/Account") ? "text-danger" : "text-danger"
              }`}
          />
          <br />
          Account
        </Link>
      </ListGroupItem>

      {/* dashboard */}
      <ListGroupItem className={`border-0 text-center ${isDashboard ? "bg-white" : "bg-black"}`}>
        <Link
          href="/Dashboard"
          className={`text-decoration-none ${isDashboard ? "text-danger" : "text-white"}`}
        >
          <AiOutlineDashboard className="fs-4 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      {/* courses */}
      <ListGroupItem className={`border-0 text-center ${isCourses ? "bg-white" : "bg-black"}`}>
        <Link
          href="/Dashboard?tab=courses"
          className={`text-decoration-none ${isCourses ? "text-danger" : "text-white"}`}
        >
          <LiaBookSolid className="fs-4 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      {/* people */}
      <ListGroupItem className={getItemClasses("/People")}>
        <Link href="/People" className={`text-decoration-none ${pathname === "/People" ?
          "text-danger" : "text-white"}`}>
          <MdPeopleAlt className={`fs-4 ${getIconColor("/People")}`} />
          <br />
          People
        </Link>
      </ListGroupItem>

      {/* calendar */}
      <ListGroupItem className={getItemClasses("/Calendar")}>
        <Link href="/Calendar" className={`text-decoration-none ${pathname === "/Calendar" ?
          "text-danger" : "text-white"}`}>
          <IoCalendarOutline className={`fs-4 ${getIconColor("/Calendar")}`} />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      {/* inbox */}
      <ListGroupItem className={getItemClasses("/Inbox")}>
        <Link href="/Inbox" className={`text-decoration-none ${pathname === "/Inbox" ?
          "text-danger" : "text-white"}`}>
          <FaInbox className={`fs-4 ${getIconColor("/Inbox")}`} />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      {/* history */}
      <ListGroupItem className={getItemClasses("/History")}>
        <Link href="/History" className={`text-decoration-none ${pathname === "/History" ?
          "text-danger" : "text-white"}`}>
          <GoClock className={`fs-4 ${getIconColor("/History")}`} />
          <br />
          History
        </Link>
      </ListGroupItem>

      {/* studio */}
      <ListGroupItem className={getItemClasses("/Studio")}>
        <Link href="/Studio" className={`text-decoration-none ${pathname === "/Studio" ?
          "text-danger" : "text-white"}`}>
          <MdVideoLibrary className={`fs-4 ${getIconColor("/Studio")}`} />
          <br />
          Studio
        </Link>
      </ListGroupItem>

      {/* help */}
      <ListGroupItem className={getItemClasses("/Help")}>
        <Link href="/Help" className={`text-decoration-none ${pathname === "/Help" ?
          "text-danger" : "text-white"}`}>
          <FiHelpCircle className={`fs-4 ${getIconColor("/Help")}`} />
          <br />
          Help
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
