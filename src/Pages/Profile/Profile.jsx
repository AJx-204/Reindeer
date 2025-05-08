import React, { useEffect, useRef, useState } from 'react'
import './profile.css'
import Btn from '../../Components/Buttons/Btn'
import { CiAt } from "react-icons/ci";
import { RiEdit2Fill } from "react-icons/ri";
import { BiSolidCopy } from "react-icons/bi";
import { FcOk } from "react-icons/fc";
import { MdSettingsSuggest } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import { TfiLayoutGrid3Alt, TfiLayoutGrid2Alt } from "react-icons/tfi";
import { IoIosSunny } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { GiDeerHead } from "react-icons/gi";
import { PiCurrencyDollarBold, PiCurrencyGbpBold, PiCurrencyEurBold, PiCurrencyJpyBold, PiCurrencyInrBold } from "react-icons/pi";
import { TbCurrencyDollarCanadian, TbCurrencyDollarAustralian, TbCurrencyDollarSingapore, TbCurrencyYuan   } from "react-icons/tb";
import { BiWon } from "react-icons/bi";
import { LuSwissFranc } from "react-icons/lu";
import { RiArrowDownSLine } from "react-icons/ri";
import useTheme from '../../Context/Themecontext';
import useCurrency from '../../Context/Currencycontext';
import useWallet from '../../Context/Walletcontext';


const currencyOptions = [
  { label: "USD", icon: <PiCurrencyDollarBold  /> },
  { label: "EUR", icon: <PiCurrencyEurBold /> },
  { label: "GBP", icon: <PiCurrencyGbpBold /> },
  { label: "CAD", icon: <TbCurrencyDollarCanadian /> },
  { label: "AUD", icon: <TbCurrencyDollarAustralian /> },
  { label: "JPY", icon: <PiCurrencyJpyBold/> },
  { label: "CNY", icon: <TbCurrencyYuan /> },
  { label: "CHF", icon: <LuSwissFranc/> },
  { label: "SGD", icon: <TbCurrencyDollarSingapore /> },
  { label: "KRW", icon: <BiWon/> },
  { label: "INR", icon: <PiCurrencyInrBold/> },
];


const Profile = () => {

  const walletBlance = 48.72

  const { theme, themeSwitch } = useTheme();
  const {account, chainName, connectWallet, disconnectWallet} = useWallet();
  const [balance, setBalance] = useState(walletBlance);
  const {convert, isLoding, convertedBalance,} = useCurrency();
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD')
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings , setShowSettings] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)
  const [nickname, setNickname] = useState("");  
  const [fullName, setFullName] = useState("")
  const settingsRef = useRef(null);
  
  useEffect(() => {
    setBalance(walletBlance);
  }, [balance]);

  const selectedCurrency = currencyOptions.find((c) => c.label  === currency)?.label;
  
  useEffect(()=>{
    if(currency){ 
      convert("USD", selectedCurrency, balance);
    }
  },[currency,balance])
 
  function shortenAddress(account) {
    if (!account || account.length === 0) return "Invalid Address";
    return account.slice(0, 5) + "..." + account.slice(-4);
  }
  

  function lastAddress(account) {
    if (!account || account.length !== 42) return "Invalid Address";
    return account.slice(0, 0) + account.slice(-4);
  }

  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (!account) return;
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
        setShowEditPage(false);
        setIsOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {

    const getSavedProfile = () => {
      return {
        nickname: localStorage.getItem("nickname") || "",
        fullName: localStorage.getItem("fullName") || "",
      };
    };
    
    const { nickname, fullName } = getSavedProfile();
    setNickname(nickname);
    setFullName(fullName);
  }, []);
  


  if(!account){
    return(
      <div className='absolute -mt-10  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col justify-center items-center'>
            <img className='h-80 w-80 object-cover' src="./pngwing.com.png" alt="" />
             <Btn
              onClick={connectWallet}
              text={'Connect wallet'}
              style={" font-bold text-shadowML h-[max-content] dark:text-white hover:shadow-[-6px_6px_#252525] shadow-[-3px_3px_1px_#252525] dark:hover:shadow-[-6px_6px_#FFA0A0] dark:shadow-[-3px_3px_1px_#FFA0A0] bg-gradient-to-r from-red-300 via-red-200 to-red-100 dark:from-red-600 dark:via-red-500 dark:to-red-400"}
              />
          </div>
      </div>
    )
  }

  return (
     <>
       <div className={`profile ${showSettings || showEditPage ? "opacity-50":""} px-6 mt-20 pb-6 w-full h-full flex flex-col items-center`}>
            <div className='p-2 profile-Info w-full h-[max-content] rounded-md bg-red-50/50 dark:bg-zinc-800/50 dark:border-zinc-700 backdrop-blur-[6px] shadow-md dark:shadow-zinc-800  border border-zinc-200'>
              <div
                className='w-full -z-10 rounded-md h-40 shadow-md bg-gradient-to-r from-red-400 to-red-300  dark:from-red-500 dark:to-red-400 relative overflow-hidden'>
                  <div 
                    className="absolute inset-0 w-full h-full opacity-40"
                    style={{
                      backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9ImEiIHg9IjAiIHk9IjAiPjxmZVR1cmJ1bGVuY2UgYmFzZUZyZXF1ZW5jeT0iLjIiIG51bU9jdGF2ZXM9IjIiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHR5cGU9ImZyYWN0YWxOb2lzZSIvPjxmZURpZmZ1c2VMaWdodGluZyBkaWZmdXNlQ29uc3RhbnQ9IjEiIHN1cmZhY2VTY2FsZT0iMyI+PGZlRGlzdGFudExpZ2h0IGF6aW11dGg9IjQ1IiBlbGV2YXRpb249IjYwIi8+PC9mZURpZmZ1c2VMaWdodGluZz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')",
                      mixBlendMode: "overlay"
                    }}
                  />
               </div>
               <div className='profile-wallet-info w-full flex justify-between gap-2 dark:text-zinc-200 pl-4 pr-1.5 pb-1'>
                  <div className='capitalize text-sm flex flex-col gap-1 font-[500]'>
                      <div className='h-20 w-20  -mt-14 rounded-md p-1 shadow-md border border-zinc-200 bg-white/30 '>
                         <div className='w-full h-full rounded-md overflow-hidden'>
                            <img 
                              className='h-full w-full object-cover' 
                              src="https://i.pinimg.com/474x/c2/8f/47/c28f47647cdeeec66573846cbbf6adc8.jpg" 
                              alt="" 
                              />
                         </div>
                       </div>
                       <div className='flex items-center font-semibold mt-0.5 text-[17px] '>
                          <span className='text-zinc-700 dark:text-zinc-400 '><CiAt strokeWidth={0.5}/></span>
                          {nickname ? nickname : 'deer'}
                       </div>
                       <div className='profile-user-Info flex gap-3'>
                            <div className='flex gap-1 items-center'>
                               <span className='text-zinc-600 font-[300] dark:text-zinc-400' >name</span>
                               <span>{fullName === "" ? "raindeer" : fullName }</span>
                            </div>
                            <div className='flex gap-1 items-center'>
                               <span className='text-zinc-600 font-[300] dark:text-zinc-400'>wallet</span>
                                {account ? <span>{shortenAddress(account)}</span> : <p className='text-zinc-400'>connect your crypto walllet.</p>}
                               <i 
                                 onClick={copyAddress}
                                 className='mb-0.5 ml-0.5 text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-100 hover:text-black'>
                                 <BiSolidCopy size={13}/> 
                               </i>
                               {copied && (
                                 <div className='absolute px-2 p-1 text-sm shadow-xl animate-bounce rounded-[2px] flex items-center gap-1 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200 text-zinc-800 bg-white border border-zinc-400'>
                                     <FcOk size={18}/>
                                     <span>Copied to clipboard !</span>
                                 </div>
                               )}
                             </div>
                             <div className='flex gap-1 '>
                                   <span className='text-zinc-600 font-[300] dark:text-zinc-400'>network</span>
                                    {chainName &&  <span>{chainName}</span>}
                              </div>
                        </div>
                       <div className='flex gap-4 items-center'>
                           <div className='flex flex-col'>
                              <span className='text-zinc-600 font-[300] dark:text-zinc-400'>Total NFTs</span>
                              <span className='ml-0.5'>14</span>
                           </div>
                           <div className='flex flex-col'>
                              <span className='text-zinc-600 font-[300] dark:text-zinc-400'>Total NFTs Value</span>
                              <span className='flex items-center gap-1 ml-0.5'>
                                  {isLoding ? <p className='text-zinc-400'>Processing . . . . </p>: convertedBalance}
                                  <span className='text-zinc-600 font-[400] dark:text-zinc-400'>
                                    {currencyOptions.find((c) => c.label === currency)?.icon}
                                  </span>
                              </span>
                           </div>
                       </div>
                  </div>
                   <div className='profile-Btns flex flex-col justify-between items-end mt-8'>
                      <div className='flex gap-4'>
                         <Btn 
                          onClick={()=>setShowEditPage(!showEditPage)}
                          text={"Edit"}
                          icon={<RiEdit2Fill />}
                          style={"pr-2 pl-2 h-[max-content] border-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 dark:shadow-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-700 shadow-md bg-zinc-100 active:scale-110 hover:bg-zinc-300 text-sm text-blue-700"}
                          />
                          <Btn 
                           onClick={()=>setShowSettings(!showSettings)}
                           icon={<MdSettingsSuggest size={20}/> }
                           style={"pl-1 pr-1 border-zinc-400 bg-zinc-100 dark:hover:bg-zinc-700 dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:shadow-zinc-800 text-zinc-700 h-[max-content] shadow-md active:scale-110 hover:bg-zinc-300  "}
                          />
                      </div>
                       <Btn 
                          onClick={disconnectWallet}
                          text={"Disconnect"}
                          style={"pl-2.5 pr-2.5 profile-wallet-Disconnect font-semibold mb-1 text-shadowML dark:text-shadowM text-sm shadow-[2px_2px_1px_#252525] active:scale-110 hover:shadow-[5px_5px_1px_#252525]  dark:hover:shadow-[-6px_6px_#FFA0A0] dark:shadow-[-3px_3px_1px_#FFA0A0] bg-gradient-to-r from-red-300 via-red-200 to-red-100 dark:from-red-600 dark:via-red-500 dark:to-red-400"}
                        />
                   </div>
               </div>
            </div>
            <div className='mt-6 p-2 profile-Info w-full h-[200vh] rounded-md  dark:bg-zinc-800/50 dark:border-zinc-700  bg-red-50/50 backdrop-blur-[6px] shadow-md dark:shadow-zinc-800 border border-zinc-200'>
              <div className='flex flex-wrap gap-2 justify-between  items-center pl-2.5'>
                  <div className='text-shadowML dark:red-shadow dark:text-zinc-200'>
                    Your NFT Collection
                  </div>
                  <div className='flex gap-1 w-[max-content] items-center justify-between p-1 border bg-red-200 dark:bg-red-400 dark:border-zinc-600 rounded border-zinc-300'>
                      <Btn 
                        icon={< TfiLayoutGrid2Alt size={19}/>}
                        style={"pr-1.5 pl-1.5 text-zinc-700 bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900 hover:bg-red-400"}
                      />
                      <Btn 
                        icon={< TfiLayoutGrid3Alt size={19}/>}
                        style={"pr-1.5 pl-1.5 text-zinc-700 bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900  hover:bg-red-400"}
                      />
                      <Btn 
                      onClick={themeSwitch}
                        icon={< ImMenu size={20}/>}
                        style={"pr-1.5 pl-1.5 text-zinc-700 bg-zinc-100  dark:bg-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900  hover:bg-red-400"}
                      />
                  </div>
               </div>
            </div>  
       </div>
       {showSettings && (
         <div 
           ref={settingsRef}
           className='settings mt-16 absolute z-10 p-2 h-80 w-60  bg-white border border-zinc-300 rounded-lg shadow-2xl shadow-zinc-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
           >
             <div
               onClick={()=>setShowSettings(false)}
               className='flex justify-center  items-center '>
                <div className='h-1 w-14 rounded-2xl bg-zinc-500'>
                </div> 
             </div>
             <div className='mt-3 flex flex-col gap-1'>
                 <div className='flex p-2  rounded-lg hover:bg-zinc-300 justify-between items-center'>
                      <span>Theme - <span className='text-zinc-500'>{theme}</span></span>
                      <button 
                        onClick={themeSwitch}
                        className={`cursor-pointer p-1 flex items-center rounded-full border w-16 shadow-xl border-zinc-400
                          ${theme == 'light' ? "bg-white" :"bg-zinc-800"}
                            `}
                        >
                         {theme == 'light' ? 
                           <i className='p-1 rounded-full bg-zinc-800 text-white translate-x-8'> <IoIosSunny /></i>
                            :
                            <i className='p-1 rounded-full bg-zinc-200 '> <MdDarkMode /></i>
                          }
                      </button>
                  </div>
                  <div className='flex p-2  rounded-lg hover:bg-zinc-300 justify-between items-center'>
                    <span>Currency - <span className='text-zinc-500'>{currency}</span></span>
                     <div className="relative">
                       <button
                         onClick={() => setIsOpen(!isOpen)}
                         className="flex items-center cursor-pointer justify-between border border-zinc-400 p-1 w-16 rounded-full shadow-xl bg-white"
                       >
                        
                        {currencyOptions.find((c) => c.label === currency)?.icon && (
                          <span className="p-1 rounded-full  bg-zinc-800 text-white ">
                            {currencyOptions.find((c) => c.label === currency)?.icon}
                          </span>
                        )}
                         <i><RiArrowDownSLine /></i>
                       </button>
                       {isOpen && (
                         <div
                           className="absolute right-0 mt-1 h-46 overflow-y-auto bg-white shadow-lg border border-zinc-400 rounded-lg p-1 ">
                           {currencyOptions.map((c) => (
                             <div
                               key={c.label}
                               className="flex items-center mt-0.5 gap-2 p-1 px-2 rounded-lg hover:bg-zinc-300 cursor-pointer"
                               onClick={() => {
                                 setCurrency(c.label);
                                 localStorage.setItem("currency", c.label);
                                 setIsOpen(false);
                               }}
                             >
                               {c.icon} {c.label}
                             </div>
                           ))}
                         </div>
                       )}
                     </div>
                  </div>
               </div>  
           </div>
          )}
          {showEditPage && (
             <div 
               ref={settingsRef}
               className='settings mt-16 absolute z-10 p-3 h-80 w-60  bg-white border border-zinc-300 rounded-lg shadow-2xl shadow-zinc-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
              >
              <div className='flex font-bold text-shadowM flex-col justify-center items-center '>
                 <GiDeerHead size={30} color='#4D0404'/>
                 <h1>REINDEER</h1>
              </div>
              <div className='mt-6 text-sm'>
                 <span className='ml-1 font-semibold text-zinc-600'>Nick Name</span>
                 <div className='flex gap-1 items-center hover:bg-zinc-300  p-1 border border-zinc-300 rounded-md '>
                   <CiAt strokeWidth={1}/>
                   <input 
                     type="text" 
                     placeholder='type nick name here ....'
                     className='outline-0 w-full '
                     value={nickname}
                     onChange={(e) =>(setNickname(e.target.value))}
                     />
                 </div>
               </div>
               <div className='mt-4 text-sm'>
                 <span className='ml-1 font-semibold text-zinc-600'>Full Name</span>
                 <div className='flex pl-2 gap-1 items-center hover:bg-zinc-300 p-1 border border-zinc-300 rounded-md '>
                   <input 
                     type="text" 
                     placeholder='full name here ....'
                     className='outline-0 w-full'
                     value={fullName}
                     onChange={(e) => (setFullName(e.target.value) )}
                     />
                 </div>
               </div>
               <div className='flex justify-center mt-10'>
                 <Btn
                  onClick={()=> (localStorage.setItem("nickname", nickname) ,localStorage.setItem("fullName", fullName),setShowEditPage(false))}
                  text={'Done'}
                  style={"text-sm border-zinc-500 shadow-lg hover:bg-blue-700 pl-2 pr-1 bg-blue-500 text-white"}
                  />
                </div>
            </div>
          )}
     </>
  )
}

export default Profile