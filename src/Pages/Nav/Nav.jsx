import React, { useEffect, useRef, useState } from 'react'
import './nav.css'
import MenuBtn from '../../Components/Buttons/MenuBtn'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useLocation } from 'react-router-dom';
import { GiDeerHead } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";


const Nav = () => {

  const [showMenu , setShowMenu] = useState(false)
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      };
      if (showMenu) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [showMenu]);

  return (
    <nav 
       className="nav dark:bg-zinc-900/50 dark:text-zinc-200 px-8 py-4 fixed top-0 w-full flex justify-between items-center z-50 backdrop-blur-[15px] bg-red-50/50 shadow-lg  text-zinc-800"
      >
       <div 
         className="nav-logo text-shadow flex gap-2 items-center font-semibold text-xl tracking-wider"
        >
         <i className='dark:text-red-100 text-[#4d0404]'><GiDeerHead size={35}/></i><h1 className='mt-1.5'>REINDEER</h1>
       </div>
       <div className='flex items-center'>
          <div
               className='nav-menus text-sm flex items-center font-semibold tracking-wider gap-14'
              >
                <MenuBtn
                  to={'/'}
                  text={'Home'}
                  style={`${location.pathname == '/' ? 'text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
                 />
                <MenuBtn
                  to={'/explore'}
                  text={'Explore'}
                  style={`${location.pathname == '/explore' ? 'text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
                 />
                <MenuBtn
                  to={'/leaderboard'}
                  text={'Leaderboard '}
                  style={`${location.pathname == '/leaderboard' ? ' text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
                 />
                <MenuBtn
                  to={'/about'}
                  text={'About'}
                  style={` ${location.pathname == '/about' ?'text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
                 />
                 
           </div>
           <div className='nav-btns ml-10 flex gap-4 items-center'>
               <i 
                 onClick={()=>setShowMenu(true)}
                 className='hidden text-xl'
                 >
                   <HiOutlineMenuAlt3/>
               </i>
                <MenuBtn
                  to={'/profile'}
                  text={<CiUser size={20} strokeWidth={0.2}/>}
                  icon={<MdKeyboardArrowDown/>}
                  style={` ${location.pathname == '/profile' ?'shadow-lg  rounded-full border border-zinc-600 dark:border-zinc-500' : "" } text-[#4D0404] dark:text-red-100  `}
                  activStyle={`${location.pathname == '/profile' ? "mt-1 text-[#FF0022]":"group-hover:mt-1 "}`}
                 />
            </div>
        </div>
       { showMenu &&
          <div
             onClick={()=>setShowMenu(false)}
             ref={menuRef}
             className='nav-menusCol dark:bg-zinc-900 backdrop-blur-2xl bg-red-50 z-50 font-semibold text-sm flex flex-col absolute items-center gap-15 top-16 px-4 py-8 right-5 border dark:border-zinc-500 dark:shadow-[0px_0px_3px_#1F1F23]  border-red-300 shadow-[0px_0px_3px_#FF2233] rounded-2xl'
            >   
             <MenuBtn
               to={'/'}
               text={'Home'}
               style={` ${location.pathname == '/' ? 'text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
              />
             <MenuBtn
               to={'explore'}
               text={'Explore'}
               style={` ${location.pathname == '/explore' ? 'text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
              />
             <MenuBtn
               to={'leaderboard'}
               text={'Leaderboard'}
               style={` ${location.pathname == '/leaderboard' ? 'text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
              />
             <MenuBtn
               to={'about'}
               text={'About'}
               style={` ${location.pathname == '/about' ? 'text-[#FF0033] underline text-shadow-black' : " hover:underline text-shadowM" }`}
              />
          </div>
         }
     </nav>
  )
}

export default Nav