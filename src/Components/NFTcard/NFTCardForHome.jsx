import React from 'react'
import './nftscard.css'


const NFTCardForHome = ({imgSrc, name, style, nameStyle}) => {

  return (
   <>
     <div className={`Nft-card-home max-w-60 h-[max-content]  ${style} border border-zinc-300 backdrop-blur-[5px] p-2 shrink-0 flex flex-col items-center shadow-2xl overflow-hidden  
     `}>
        <img 
          className='w-full h-full object-cover' 
          src={imgSrc}
          alt="" />
         <p className={`NFT-home-name ${nameStyle}`}>{name}</p>
     </div>
   </>
  )
}

export default NFTCardForHome;


