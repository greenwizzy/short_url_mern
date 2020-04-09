import React from 'react'
import { useState } from 'react'
import useHttp from '../hooks/http.hook'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { Loader } from '../components/Loader'
import {LinkList} from '../components/LinkList'

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetch_links = useCallback( async ()=>{
        try {
            const fetched = await request('/api/link/', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {
            
        }
    }, [token, request])


    useEffect( ()=>{
        fetch_links()
    },[fetch_links])

    if(loading){
        return(
            <Loader/>
        )
    }

    return(
        <>
            {!loading && <LinkList links={links}/> }
        </>
    )
}

export default LinksPage