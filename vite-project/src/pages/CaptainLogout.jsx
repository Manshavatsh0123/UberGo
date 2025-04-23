import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/captions/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('captain-token')
                navigate('/captainlogin')
            }
        }).catch((err) => {
            console.error('Logout error:', err)
            navigate('/captainlogin') // Optional fallback on error
        })
    }, [navigate, token])

    return <div>Logging out...</div>
}
export default CaptainLogout
