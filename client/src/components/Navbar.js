import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const navigation = useNavigate()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    navigation('/')
  }

  return (
      <nav className="bg-sky-500 shadow-md absolute top-0 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to='/' className="text-white text-xl font-bold">URL Simplifier</Link>
            </div>
            <div className="flex space-x-4">
              <Link to='/create' className="px-3 py-2 rounded-md text-white hover:bg-sky-700">Create</Link>
              <Link to='/links' className="px-3 py-2 rounded-md text-white hover:bg-sky-700">Links</Link>
              <button onClick={logoutHandler} className="px-3 py-2 rounded-md text-white hover:bg-sky-700">Log Out</button>
            </div>
          </div>
        </div>
      </nav>
  )
}
