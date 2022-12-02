import { useEffect, FC, useState } from 'react'
import S from './SignUpComplete.module.scss'
import successGIF from '../../Assets/success.gif'
import TSLogo from '../../Assets/TalkShawk_Logo.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SignUpComplete: FC = () => {
    const [showMessage, setShowMessage] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setShowMessage(true)
        }, 2500)
    }, [])

    return (
        <div className={S.container}>
            {!showMessage && (
                <div className={S.success_gif_cont}>
                    <img
                        className={S.success_gif}
                        src={successGIF}
                        alt="loading gif"
                    />
                </div>
            )}

            {showMessage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className={S.logo}>
                        <h1>TalkShawk</h1>
                        <img src={TSLogo} alt="TalkShawk Main Logo" />
                    </div>
                    <div className={S.box}>
                        <h1>SignUp Complete!🥳</h1>
                        <p>An Email should be sent to you for Verification.</p>
                        <p>
                            After completing the verification you can Login to
                            your account .
                        </p>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <button className={`btn ${S.login_btn}`}>
                                Login
                            </button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default SignUpComplete
