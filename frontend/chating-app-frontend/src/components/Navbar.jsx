import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function Navbar() {
      const {authUser} = useAuthStore()
  return (
    <div>
       <h1>this is navebar</h1>
    </div>
  )
}

export default Navbar
