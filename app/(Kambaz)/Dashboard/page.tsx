import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/*course 1*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="CS 1234" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/*course 2*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/1800" className="wd-dashboard-course-link">
            <Image src="/images/discrete.webp" width={200} height={150} alt="CS 1800" />
            <div>
              <h5> CS1800 Discrete Structures </h5>
              <p className="wd-dashboard-course-title">
                Mathematical Foundation
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

         {/*course 3*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/2500" className="wd-dashboard-course-link">
            <Image src="/images/Racket Logo.png" width={200} height={150} alt="CS 2500" />
            <div>
              <h5> CS2500 Fundamentals of Computer Science 1 </h5>
              <p className="wd-dashboard-course-title">
                Intro to Programming 1
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

         {/*course 4*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/2510" className="wd-dashboard-course-link">
            <Image src="/images/java.jpg" width={200} height={150} alt="CS 2510" />
            <div>
              <h5> CS2510 Fundamentals of Computer Science 2 </h5>
              <p className="wd-dashboard-course-title"> 
                Intro to Programming 2
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/*course 5*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/3500" className="wd-dashboard-course-link">
            <Image src="/images/ood.jpeg" width={200} height={150} alt="CS 3500" />
            <div>
              <h5> CS3500 Object Orient Design </h5>
              <p className="wd-dashboard-course-title">
                Object-Oriented Programming
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/*course 6*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/2550" className="wd-dashboard-course-link">
            <Image src="/images/security.jpg" width={200} height={150} alt="CY 2550" />
            <div>
              <h5> CY2550 Foundations of CyberSecurity </h5>
              <p className="wd-dashboard-course-title">
                Introduction to CyberSecurity
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        {/*course 7*/}
        <div className="wd-dashboard-course">
          <Link href="/Courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/python.png" width={200} height={150} alt="DS 3000" />
            <div>
              <h5> DS 3000 Foundations of Data Science </h5>
              <p className="wd-dashboard-course-title">
                Intro to Data Science 
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}

