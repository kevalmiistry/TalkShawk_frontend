import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { motion } from 'framer-motion'
import React, { FC, useState } from 'react'
import { ToastState } from '../../../Context/ToastContext'
import S from './ForgetPassModal.module.scss'

type TProp = {
    setForgetPassModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ForgetPassModal: FC<TProp> = ({ setForgetPassModalOpen }) => {
    const { showToast } = ToastState()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [emailToSend, setEmailToSend] = useState('')
    const [isEmailvalid, setIsEmailvalid] = useState(false)
    const [data, setData] = useState({ success: true, message: '' })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailToSend(e.target.value)
        const RegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

        if (RegEx.test(e.target.value)) {
            setIsEmailvalid(true)
        } else {
            setIsEmailvalid(false)
        }
    }
    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            const url = process.env.REACT_APP_API_URL + '/user/sendemail'
            const { data } = await axios.patch(url, { email: emailToSend })
            setData(data)
            setIsSubmitting(false)
        } catch (error) {
            showToast({
                message: 'Something went wrong!',
                show: true,
                status: 'error',
            })
        }
    }

    const inputStyle = {
        border: emailToSend
            ? isEmailvalid
                ? '2px solid green'
                : '2px solid red'
            : 'none',
    }
    return (
        <>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className={S.modal_main}
            >
                <div className={S.close_wrapper}>
                    <FontAwesomeIcon
                        className="pointer"
                        icon={faClose}
                        onClick={() =>
                            !isSubmitting && setForgetPassModalOpen(false)
                        }
                    />
                </div>
                <h3>Forget Password</h3>
                <p className={S.p}>
                    Enter the email that you used to create an account, and we
                    will send an email to reset your account password.
                </p>
                <input
                    disabled={isSubmitting}
                    type="email"
                    className={S.input}
                    placeholder="Type in your email"
                    onChange={handleOnChange}
                    value={emailToSend}
                    style={inputStyle}
                />
                <div className={S.msg_btn_wrapper}>
                    <p
                        className={S.msg}
                        style={{ color: data.success ? 'green' : 'red' }}
                    >
                        {data?.message}
                    </p>
                    <button
                        disabled={isSubmitting || !isEmailvalid}
                        type="button"
                        className={`${S.btn} btn ${
                            isSubmitting || (!isEmailvalid ? 'disable' : '')
                        }`}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Email'}
                    </button>
                </div>
            </motion.div>
        </>
    )
}

export default ForgetPassModal
