import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
     <h1>Labs</h1>
     <p>Kelsey Wandera / Section: CS4550.11597.202610</p>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
        <li>
          <a href="https://github.com/kelwand/kambaz-next-js" id="wd-github" target="_blank">
            Link to Github: Kambaz Next.js Repository
          </a>
        </li>
     </ul>
   </div>
);}

