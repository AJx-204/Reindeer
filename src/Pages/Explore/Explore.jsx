import React, { useEffect, useRef, useState } from 'react'
import './explore.css'
import Btn from '../../Components/Buttons/Btn';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import NFTCardForHome from '../../Components/NFTcard/NFTCardForHome';
import NFTcardExplore from '../../Components/NFTcard/NFTcardExplore';

const blockChains = [
  { id:1, lable:"All" , icon:"./CryptoLogo/allchain.jpg"},
  { id:2, lable:"Ethereum" , icon:"./CryptoLogo/eth.png"},
  { id:3, lable:"Arbitrum" , icon:"./CryptoLogo/arb.png"},
  { id:4, lable:"B3-base" , icon:"./CryptoLogo/b3.png"},
  { id:5, lable:"Berachain" , icon:"./CryptoLogo/bera.png"},
  { id:6, lable:"Avalanche" , icon:"./CryptoLogo/avax.png"},
  { id:7, lable:"Optimism" , icon:"./CryptoLogo/op.png"},
  { id:8, lable:"Polygon" , icon:"./CryptoLogo/pol.png"},
  { id:9, lable:"SEI" , icon:"./CryptoLogo/sei.png"},
]

const prices = [
  {id:1, lable:"Default", icon:< HiOutlineArrowNarrowRight/>},
  {id:2, lable:"Low to High", icon:<FaArrowTrendDown color='red'/>},
  {id:3, lable:"High to Low", icon:<FaArrowTrendUp color='green'/>},
]

const Explore = () => {
  
  const [selectedMenu , setSelectedMenu] = useState("NFTs")
  const [openFilters, setOpenFilters] = useState(false)
  const [blockchain, setChain] = useState("All")
  const [selectedprice, setPrice] = useState('Low to High')
  const filterRef = useRef(null)

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
          setOpenFilters(false)
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
  
  return (
   <>
     <div className='explore dark:text-zinc-200'>
        <div className='pt-20 bg-gradient-to-b z-20 sticky -top-[70px] from-white  to-red-100 dark:from-zinc-700 dark:to-zinc-950 '>
          <div className='px-7 text-3xl text-shadowML font-semibold'>
              <h2>Explore</h2>
           </div>
           <div className='explore-menu-btn flex gap-1 flex-wrap mt-6 font-semibold text-lg  px-4 p-1'>
              <Btn 
                onClick={()=>setSelectedMenu("NFTs")}
                text={"NFTs"}
                style={`${selectedMenu == "NFTs" ? "text-red-600 " : "hover:bg-zinc-500 hover:text-white"} border-none pl-2 pr-1 `}
               />
              <Btn 
                onClick={()=>setSelectedMenu("YourCollections")}
                text={"Your Collections"}
                style={`${selectedMenu == "YourCollections" ? "text-red-600" : "hover:bg-zinc-500 hover:text-white"} border-none pl-2 pr-1 `}
               />
              <Btn 
                onClick={()=>setSelectedMenu("WatchList")}
                text={"WatchList"}
                style={`${selectedMenu == "WatchList" ? "text-red-600" : "hover:bg-zinc-500 hover:text-white"} border-none pr-1 pl-2 `}
               />
           </div>
        </div>
         <div className='flex flex-wrap gap-1 justify-between font-semibold  items-center p-2 w-full bg-red-300 shadow-lg dark:bg-zinc-800 px-5'>
            <Btn
               onClick={()=>setOpenFilters(!openFilters)}
               text={"Filter"}
               icon={<HiOutlineAdjustmentsHorizontal/>}
               style={"hover:bg-blue-500 pl-3 pr-2 dark:shadow-zinc-900 shadow-lg border-zinc-400 bg-red-100 dark:bg-zinc-900 dark:border-zinc-700"}
             />
             {openFilters && (
              <div
                ref={filterRef} 
                className='absolute z-10 mt-168 py-1 pb-2 min-w-60 h-[max-content] overflow-y-auto text-sm border rounded-[5px] border-zinc-300 dark:border-zinc-800 bg-red-200/50 dark:bg-zinc-800/80 backdrop-blur-[25px] shadow-lg'>
                 <div
                   onClick={()=>setOpenFilters(false)}
                   className='w-full h-5 flex justify-center items-center'>
                    <div className='h-1 w-16 bg-zinc-500 rounded-full'>
                    </div>
                 </div>
                 <div className='mt-4'>
                    <span className='px-3 font-semibold'>BlockChain</span>
                    <div className='mt-3 flex gap-1 flex-col'>
                       {blockChains?.map((chain)=>(
                        <div
                          key={chain.id} 
                          onClick={() => setChain(chain.lable)}
                          className={`${blockchain == chain.lable ? "bg-zinc-300 dark:bg-zinc-700":"hover:bg-zinc-200 dark:hover:bg-zinc-700"} flex p-2 px-4  gap-3 items-center`}>
                            <span className='w-5'>{chain.id}</span>
                            <img className='h-6 w-6 rounded-full' src={chain.icon} alt="" />
                            <span>{chain.lable}</span>
                        </div>
                       ))}
                    </div>
                 </div>
                 <div className='mt-4'>
                    <span className='px-3 font-semibold '>Price</span>
                    <div className='mt-3 flex gap-1 flex-col'>
                       {prices?.map((price)=>(
                        <div
                          key={price.id} 
                          onClick={() => setPrice(price.lable)}
                          className={`${selectedprice == price.lable ? "bg-zinc-300 dark:bg-zinc-700":"hover:bg-zinc-200 dark:hover:bg-zinc-700"} flex p-2 px-4  gap-3 items-center`}>
                            <span className='w-5'>{price.id}</span>
                            <i>{price.icon}</i>
                            <span>{price.lable}</span>
                        </div>
                       ))}
                    </div>
                 </div>
              </div>
             )}
             <div className='flex text-sm dark:shadow-zinc-900 shadow-lg font-light items-center px-2 p-1 rounded-full gap-2 border border-zinc-400 bg-red-100 dark:bg-zinc-900 dark:border-zinc-700'>
               < AiOutlineSearch size={16}/>
               <input 
                 type="text"
                 className='outline-0'
                 placeholder='Search NFT here . . . ' 
                />
             </div>
          </div>
          <div className="explore-NFTs-card grid gap-4 p-2 pt-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                <NFTcardExplore
                imgSrc={"https://i.pinimg.com/474x/82/ae/b4/82aeb40253de226727f4261850bfb53b.jpg"}
                collactionName={"cars maina"}
                NFTName={"PORSCHE GT4 XX"}
                chainLogoSrc={"./CryptoLogo/arb.png"}
                price={"0.02"}
                crypto={"ETH"}
                active={true}
                />
                <NFTcardExplore
                imgSrc={"https://i.pinimg.com/474x/58/1d/9b/581d9b33743998676637f4b47feff00b.jpg"}
                collactionName={"cars maina"}
                NFTName={"PORSCHE GT4 XX"}
                chainLogoSrc={"./CryptoLogo/arb.png"}
                price={"0.02"}
                crypto={"ETH"}
                active={true}
                />
                 <NFTcardExplore
                imgSrc={"https://i.pinimg.com/474x/b4/3c/d3/b43cd33006d3c50bd241047a6fbb3104.jpg"}
                collactionName={"cars maina"}
                NFTName={"PORSCHE GT4 XX"}
                chainLogoSrc={"./CryptoLogo/arb.png"}
                price={"0.02"}
                crypto={"ETH"}
                active={true}
                />
                 <NFTcardExplore
                imgSrc={"https://i.pinimg.com/474x/91/a0/5b/91a05bb63da68d53a149d297c628b44b.jpg"}
                collactionName={"cars maina"}
                NFTName={"PORSCHE GT4 XX"}
                chainLogoSrc={"./CryptoLogo/arb.png"}
                price={"0.02"}
                crypto={"ETH"}
                active={true}
                />
                  <NFTcardExplore
                imgSrc={"https://i.pinimg.com/474x/5e/4c/a1/5e4ca171b715c4d9cf360eee29778fde.jpg"}
                collactionName={"cars maina"}
                NFTName={"PORSCHE GT4 XX"}
                chainLogoSrc={"./CryptoLogo/arb.png"}
                price={"0.02"}
                crypto={"ETH"}
                active={true}
                />
                 <NFTcardExplore
                imgSrc={"https://i.pinimg.com/474x/e6/bb/e5/e6bbe5a5a401f68d635362558050a41c.jpg"}
                collactionName={"cars maina"}
                NFTName={"PORSCHE GT4 XX"}
                chainLogoSrc={"./CryptoLogo/arb.png"}
                price={"0.02"}
                crypto={"ETH"}
                active={true}
                />
           </div>
          <div className='h-[200vh]'>
          </div>
     </div>
   </>
  )
}

export default Explore