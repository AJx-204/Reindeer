import React from 'react'
import { Link } from 'react-router-dom'

const MenuBtn = ({text, style, to, icon, activStyle}) => {
  return (
     <Link 
       to={to}
       className={`flex group cursor-pointer py-0.5 px-1.5  items-center ${style}`}
      >
         <i className={`-mt-1 ${activStyle}`}>
           {icon}
         </i>
         {text}
     </Link>
  )
}

export default MenuBtn