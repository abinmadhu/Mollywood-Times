import React from 'react'
import { assets } from '../../assets/assets'
import { adminNavlinks } from '../../constants'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  const user={
    firstName: "Admin", 
    lastName: "User",
    imageUrl: assets.profile
  }
  return (
    <div className=' flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/30 text-sm'>
      <img src={user.imageUrl} alt="sidebar" className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto'/>
      <p className='mt-3 text-base max-md:hidden'>
        {user.firstName} {user.lastName}
      </p>
      <div className='w-full mt-5'>
        {adminNavlinks.map((link, index) => (
          <NavLink key={index} to={link.path} end className={({isActive}) => `relative flex items-center max-md:justify-center gap-2 py-3 min-md:pl-10 text-gray-400 ${isActive && 'bg-secondary/15 text-white group'}`}>
            {({isActive}) => (
              <>
              <link.icon className='w-5 h-5'/>
              <p className='max-md:hidden'>{link.name}</p>
              <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-secondary'}`}/>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  ) 
}

export default AdminSidebar