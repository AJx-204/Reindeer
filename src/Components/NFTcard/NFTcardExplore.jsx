import React from 'react'
import Btn from '../Buttons/Btn';
import { RiShoppingBag4Fill } from "react-icons/ri";

const NFTcardExplore = ({imgSrc , collactionName, NFTName, chainLogoSrc, price, crypto, active}) => {
  return (

    <div className='max-h-100 hover:scale-101 p-1.5 rounded-xl hover:border-2 hover:border-zinc-500 flex flex-col text-sm gap-2 dark:bg-zinc-900  bg-zinc-100 border shadow-lg border-zinc-300 font-semibold  dark:border-zinc-800'>
        <div className='h-full w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 overflow-hidden'>
            <img className='object-cover hover:object-contain h-full w-full' 
                src={imgSrc}
                alt="NFTs" 
              />
        </div>
       <div className='flex px-1.5 justify-between'>
          <div className=' flex flex-col w-[90%]'>
             <span className='dark:text-zinc-400 text-zinc-600 line-clamp-1 capitalize'>{collactionName}</span>
             <span className='line-clamp-1'>{NFTName}</span>
          </div>
          <div className=' h-5 w-5 shrink-0 overflow-hidden'>
            <img className='h-full w-full rounded-full' src={chainLogoSrc} alt={crypto}/>
        </div>
       </div>
        <div className='NFTs-price-explore gap-1 rounded-lg p-2  bg-zinc-300 dark:bg-zinc-800 flex justify-between items-end w-[100%]'>
            {active ? (
              <>
              <div className='flex flex-col'>
                <span className='dark:text-zinc-500 text-zinc-600'>Price</span>
                <span>{price} {crypto}</span>
              </div>
             <Btn
               text={"Byu"}
               icon={<RiShoppingBag4Fill/>}
               style={"byu-NFTs-explore rounded-lg border-none h-[max-content]  dark:bg-zinc-300 bg-white  font-semibold text-black"}
              />
              </>
            ):(
              <p className='w-full flex justify-center line-clamp-1'>Not For Sale</p>
            )}
        </div>
     </div>

  )
}

export default NFTcardExplore;