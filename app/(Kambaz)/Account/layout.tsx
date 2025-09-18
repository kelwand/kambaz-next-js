import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
   <div>
     <table>
     <tbody>
       <tr>
         <td valign="top" width="200">  
            <KambazNavigation /> 
         </td>
         <td valign="top" width="100%"> 
            {children}           
         </td>
       </tr>
     </tbody>
   </table>
  </div>
);}
