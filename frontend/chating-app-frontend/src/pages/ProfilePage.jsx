import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function ProfilePage() {
    const { authUser } = useAuthStore()
    return (
        <div>
            <h1>this is Profile page</h1>
        </div>
    )
}

export default ProfilePage
