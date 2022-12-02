import React, { useState, FC } from 'react'
import style from './Login.module.scss'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastState } from '../../../Context/ToastContext'

type TProp = {
    isSubmitting: boolean
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}
type FormData = {
    email: string
    password: string
    username: string
}

const Login: FC<TProp> = ({ isSubmitting, setIsSubmitting }) => {
    document.title = 'TalkShawk | Login'
    const [type, setType] = useState('email')
    const nev = useNavigate()
    const { showToast } = ToastState()

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        username: '',
    })

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = async () => {
        const url = process.env.REACT_APP_API_URL + '/user/login'
        const dataToSend = {
            type: type,
            email_username:
                type === 'email' ? formData.email : formData.username,
            password: formData.password,
        }
        setIsSubmitting(true)
        const { data } = await axios.post(url, dataToSend)
        setIsSubmitting(false)
        if (data.success) {
            localStorage.setItem('talkshawk_user', JSON.stringify(data.user))
            showToast({
                message: data.message,
                status: data.success ? 'success' : 'error',
                show: true,
            })
            nev('/chat')
        } else {
            showToast({
                message: data.message,
                status: data.success ? 'success' : 'error',
                show: true,
            })
        }
    }

    const emailStyle = {
        border: type === 'email' ? '1px solid teal' : '1px solid #111',
    }
    const usernameStyle = {
        border: type === 'username' ? '1px solid teal' : '1px solid #111',
    }
    return (
        <div className={`${style.login_main}`}>
            <form className={style.form}>
                <div className="flex around">
                    <span style={emailStyle} onClick={() => setType('email')}>
                        Email
                    </span>
                    <span
                        style={usernameStyle}
                        onClick={() => setType('username')}
                    >
                        Username
                    </span>
                </div>
                {type === 'email' ? (
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={onChangeHandler}
                    />
                ) : (
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={onChangeHandler}
                    />
                )}
                <motion.input
                    whileFocus={{ scale: 1.05 }}
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                />
                <motion.button
                    disabled={isSubmitting}
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    whileFocus={{ scale: 1.05 }}
                    type="button"
                    className={`btn ${style.login_btn}`}
                    onClick={handleLogin}
                >
                    {isSubmitting ? 'Loggin in...' : 'Login'}
                </motion.button>
            </form>
        </div>
    )
}

export default Login
