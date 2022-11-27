import React, { FC, useState } from 'react'
import style from './Home.module.scss'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import { motion, AnimatePresence } from 'framer-motion'
import TSLogo from '../../Assets/talkshawk_logo.png'

const HomePage: FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isSignUp, setIsSignUp] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSwitch = () => {
        if (isLogin) {
            setIsLogin(!isLogin)
            setTimeout(() => {
                setIsSignUp(!isSignUp)
            }, 500)
        } else if (isSignUp) {
            setIsSignUp(!isSignUp)
            setTimeout(() => {
                setIsLogin(!isLogin)
            }, 500)
        }
    }
    return (
        <>
            <section className={style.home_main}>
                <div className={`${style.main_title}`}>
                    <h1>TalkShawk</h1>
                    <img src={TSLogo} alt="TalkShawk Main Logo" />
                </div>
                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    {isLogin && (
                        <motion.div
                            className={style.wrapper_div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Login
                                isSubmitting={isSubmitting}
                                setIsSubmitting={setIsSubmitting}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/*  */}
                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    {isSignUp && (
                        <motion.div
                            className={style.wrapper_div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <SignUp
                                isSubmitting={isSubmitting}
                                setIsSubmitting={setIsSubmitting}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isSubmitting && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleSwitch}
                        className={style.link}
                    >
                        {isLogin ? 'Signup' : 'Login'}?
                    </motion.button>
                )}
            </section>
        </>
    )
}

export default HomePage
