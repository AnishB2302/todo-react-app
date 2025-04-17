import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-green-700 text-white py-2">
        <div className="logo">
            <span className="font-bold text-1xl  mx-8 ">Ta-Da! - Your Ultimate To-Do App</span>
        </div>
        {/* <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold transition-all ">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all ">Your Tasks</li>
        </ul> */}
    </nav>
  )
}

export default Navbar