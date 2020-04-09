import React, {useState, useEffect, useContext} from 'react'
import useHttp from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

const CreatePage = () => {
    const [link, setLink] = useState('')
    const history = useHistory()
    const auth = useContext(AuthContext)

    useEffect(()=>{
        window.M.updateTextFields()

    },[])

    const {request} = useHttp()
    const pressHandler = async event =>{
        if (event.key === 'Enter'){ 
            console.log('TOKEN', auth.token)
            try{
                const data = await request('/api/link/generate', 'POST', {
                    from: link, 
                }, {
                    Authorization : `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
                console.log('DATA', data)
            }catch (e) {
                 
            }            
        }               
    }

    return(
        <div className='row'>
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                 <div className="input-field">
                        <input 
                            id="email" 
                            type="text"
                            name="email"
                            placeholder="Вставьте ссылку"
                            className=""
                            value={link}
                            onChange = {e => setLink(e.target.value)}
                            onKeyPress = {pressHandler}
                            />
                        <label htmlFor="email">Ссыдка для сокращения</label>
                    </div>

            </div>
        </div>
    )
}
export default CreatePage