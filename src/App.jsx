import React from 'react'
import Nav from './Pages/Nav/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Leaderboard from './Pages/Leaderboard/Leaderboard'
import Explore from './Pages/Explore/Explore'
import About from './Pages/About/About'
import Profile from './Pages/Profile/Profile'

const App = () => {

  return (
    <>
      <main className="w-full h-[max-content] min-h-[118vh] inset-0 dark:bg-zinc-900"
       >
         <header>
            <Nav/>
         </header>
           <div className='App-Content pt-2'>
              <Routes>
                 <Route 
                   path='/' element={<Home/>}
                   />
                 <Route 
                   path='explore' element={<Explore/>}
                   />
                 <Route 
                   path='leaderboard' element={<Leaderboard/>}
                   />
                 <Route 
                   path='about' element={<About/>}
                   />
                 <Route 
                   path='/profile'element={<Profile/>}
                   />
               </Routes>
            </div>
       </main>
     </>
  )
}

export default App