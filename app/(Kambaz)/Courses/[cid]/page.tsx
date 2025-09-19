import { redirect } from "next/navigation";

type CoursesPageProps = {
  params: { cid: string };
};

export default function CoursesPage({ params }: CoursesPageProps) {
  const { cid } = params;
 redirect("/Courses/${cid}/Home");
}