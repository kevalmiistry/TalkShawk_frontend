import React, { useState, FC } from 'react'
import style from './Login.module.scss'
import { motion } from 'framer-motion'

const Login: FC = () => {
    const [type, setType] = useState('email')

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
                    />
                ) : (
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type="text"
                        placeholder="Enter Username"
                    />
                )}
                <motion.input
                    whileFocus={{ scale: 1.05 }}
                    type="password"
                    placeholder="Enter Password"
                />
                <motion.button
                    // @ts-ignore
                    disabled={''}
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    whileFocus={{ scale: 1.05 }}
                    type="button"
                    onClick={() => console.log('Clicked' + Math.random())}
                    className={`btn ${style.login_btn}`}
                >
                    Login
                </motion.button>
            </form>
        </div>
    )
}

export default Login
