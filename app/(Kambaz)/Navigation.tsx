"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { MdVideoLibrary, MdPeopleAlt } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLink {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: () => boolean;
}

export default function KambazNavigation() {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const tab: string = searchParams?.get("tab") || "";
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const links: NavLink[] = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard, isActive: () => pathname === "/Dashboard" && !tab },
    { label: "Courses", path: "/Dashboard?tab=courses", icon: LiaBookSolid, isActive: () => pathname === "/Dashboard" && tab === "courses" },
    { label: "Labs", path: "/Labs", icon: CiSettings, isActive: () => pathname === "/Labs" },
    { label: "People", path: "/People", icon: MdPeopleAlt, isActive: () => pathname === "/People" },
    { label: "Calendar", path: "/Calendar", icon: IoCalendarOutline, isActive: () => pathname === "/Calendar" },
    { label: "Inbox", path: "/Inbox", icon: FaInbox, isActive: () => pathname === "/Inbox" },
    { label: "History", path: "/History", icon: GoClock, isActive: () => pathname === "/History" },
    { label: "Studio", path: "/Studio", icon: MdVideoLibrary, isActive: () => pathname === "/Studio" },
    { label: "Help", path: "/Help", icon: FiHelpCircle, isActive: () => pathname === "/Help" },
  ];

  if (!isClient) return null;

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed top-0 start-0 d-none d-md-block z-2 bg-black"
      style={{ width: "110px", height: "100vh", overflowY: "auto" }}
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem
        className={`border-0 text-center ${
          pathname.startsWith("/Account") ? "bg-white" : "bg-black"
        }`}
      >
        <Link href="/Account" className="text-decoration-none">
          <FaRegCircleUser className="fs-3 text-danger" />
          <br />
          <span className={pathname.startsWith("/Account") ? "text-danger" : "text-white"}>
            Account
          </span>
        </Link>
      </ListGroupItem>

      {links.map((link: NavLink) => {
        const active = link.isActive();
        return (
          <ListGroupItem
            key={link.label}
            as={Link}
            href={link.path}
            className={`border-0 text-center ${active ? "bg-white" : "bg-black"}`}
          >
            <link.icon className="fs-4 text-danger" />
            <br />
            <span className={active ? "text-danger" : "text-white"}>{link.label}</span>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
