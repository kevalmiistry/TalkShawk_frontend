import { motion } from 'framer-motion'
import React, { FC } from 'react'
import TSLogo from '../../Assets/talkshawk_logo.png'
import S from './ForgetPassword.module.scss'
import { useParams } from 'react-router-dom'

type TProp = {}
const ForgetPassword: FC<TProp> = () => {
    const param = useParams()
    const token = param.token
    return (
        <>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={S.main}
            >
                <div className={`${S.main_title}`}>
                    <h1>TalkShawk</h1>
                    <img src={TSLogo} alt="TalkShawk Main Logo" />
                </div>
            </motion.section>
        </>
    )
}

export default ForgetPassword
