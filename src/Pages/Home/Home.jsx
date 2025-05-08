import React from 'react'
import './home.css'
import { Link } from 'react-router-dom';
import Btn from '../../Components/Buttons/Btn';
import { GoArrowUpRight } from "react-icons/go";
import NFTCardForHome from '../../Components/NFTcard/NFTCardForHome';



const Home = () => {

  return (
    <>
      <div className='home dark:text-zinc-200  w-full h-full flex pt-30 flex-col items-center px-4
        bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px]
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]'>
           <div className='home-tital z-10 red-shadow  text-9xl text-center tracking-tight  uppercase leading-20'>
               <h1>Nft the</h1>
               <h1>digital art.</h1>
           </div>
           <div className='home-Passege mt-3 z-10 text-xl dark:red-shadow text-center max-w-140 text-zinc-700 dark:text-zinc-200 text-shadowML'>
              <p>Dive into the world of digital art — create or explore a massive collection of exclusive NFTs .</p>
           </div>
           <Link 
             to={'explore'}
             className='home-btn mt-5 z-10 text-[18px]'>
               <Btn
                to={'explore'}
                text={"Explore"} 
                icon={< GoArrowUpRight  strokeWidth={1}/>}
                activeStyle={"rotate-45 group-hover:rotate-0"}
                style={" font-semibold text-shadowML dark:text-white hover:shadow-[-6px_6px_#252525] shadow-[-3px_3px_1px_#252525] dark:hover:shadow-[-6px_6px_#FFA0A0] dark:shadow-[-3px_3px_1px_#FFA0A0] bg-gradient-to-r from-red-300 via-red-200 to-red-100 dark:from-red-600 dark:via-red-500 dark:to-red-400"}
                />
            </Link>
            <div className='mt-8 flex gap-1 flex-wrap justify-center'>
               <NFTCardForHome 
                 imgSrc={"https://i.pinimg.com/474x/d8/7d/48/d87d4813a58665602d018944fbee64d7.jpg"}
                 name={"Monkey Naruto"}
                 style={"bg-red-100/10 dark:bg-zinc-800/50 dark:border-zinc-700"}
                />
               <NFTCardForHome 
                 imgSrc={"https://i.pinimg.com/474x/6b/c7/10/6bc7109e41148eebb19b5183b732b9dc.jpg"}
                 name={"Pink Baby"}
                 style={"bg-red-300 dark:border-zinc-700"}
                />
               <NFTCardForHome 
                 imgSrc={"https://i.pinimg.com/736x/e0/6b/92/e06b925c5db65af9cf9f46d18a44ea3b.jpg"}
                 name={"Dream Nature"}
                 style={"bg-red-50 dark:bg-zinc-700/50 sepia-30 dark:border-zinc-700"}
                />
            </div>
            <div className='h-[100vh]'></div>
      </div>
      
    </>
  )
}

export default Home;
