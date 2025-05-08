import React from 'react'


const Btn = ({text, style, icon,  activeStyle, onClick}) => {
  return (
    <button 
       onClick={onClick}
       className={`px-4 group py-1 cursor-pointer flex gap-2 items-center justify-center rounded-[3px] border ${style} `}
         >
           {text}
           <i className={`${activeStyle}`}>
             {icon}
           </i>
    </button>
  )
}

export default Btn