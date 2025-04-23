import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/Captaincontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)




    useEffect(() => {
        if (!token) {
            navigate('/captainlogin')
            return
        }
    
        axios.get(`${import.meta.env.VITE_BASE_URL}/captions/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
        .catch(err => {
            localStorage.removeItem('token')
            navigate('/captainlogin')
        })
    }, [token])
    

    return (
        <>
            {isLoading ? <p>Loading...</p> : children}
        </>
    )
}

export default CaptainProtectWrapper