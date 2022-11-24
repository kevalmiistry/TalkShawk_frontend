import React, { FC, useState } from 'react'
import style from './SignUp.module.scss'
import { motion } from 'framer-motion'
import CropAndUpload from '../../../Components/CropAndUpload/CropAndUpload'
import ModalOverlay from '../../../Components/ModalOverlay/ModalOverlay'

type TProp = {
    updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    currentStepState: number
}
const FormTwo: FC<TProp> = ({ updateFormData, name, currentStepState }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <motion.div
            initial={{ translateX: currentStepState === 0 ? '150%' : '-150%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '-150%' }}
            className={style.single_form}
        >
            <div>
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    name="name"
                    onChange={updateFormData}
                    value={name}
                />
                <div className={style.small_msg}></div>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => setOpenModal(true)}
                    className={style.upload_btn}
                >
                    Upload Profile Photo
                </button>

                {openModal ? (
                    <ModalOverlay>
                        <CropAndUpload setOpenModal={setOpenModal} />
                    </ModalOverlay>
                ) : (
                    <></>
                )}

                <div className={style.small_msg}></div>
            </div>
        </motion.div>
    )
}

export default FormTwo
