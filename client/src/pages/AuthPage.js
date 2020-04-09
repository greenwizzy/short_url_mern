import React, {useState, useEffect, useContext} from 'react'
import useHttp from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(()=>{
        console.log(error)
        message(error)
        clearError()
        
    }, [error, clearError, message])
    


    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message)
        } catch(e){

        }
    }

    const authHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch(e){

        }
    }


    return(
     <div className='row'>
         <div className="col s6 offset-s3">
            <h1>Сократи ссылку</h1>
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title ">Авторизация</span>
                    <div>
                    <div className="input-field">
                        <input 
                            placeholder=""
                            id="email" 
                            type="text"
                            name="email"
                            className="yellow-input"
                            value = {form.email}
                            onChange = {changeHandler}
                            />
                        <label htmlFor="email">Введите email</label>
                    </div>
                    <div className="input-field">
                        <input 
                            placeholder=""
                            id="password" 
                            type="password"
                            name="password"
                            className="yellow-input"
                            onChange={changeHandler}
                            value={form.password}
                            />
                        <label htmlFor="password">Введите пароль</label>
                    </div>
                    
                    </div>
                 </div>

                <div className="card-action">
                   <button className='btn yellow darken-4' disabled={loading} onClick={authHandler}>Войти</button>

                   <button 
                    className='btn grey lighten-1 black-text'
                    onClick={registerHandler }  
                    disabled={loading}  
                    >Регистрация</button>
                </div>
            </div>
         </div>
    </div>
    )
}

export default AuthPage 