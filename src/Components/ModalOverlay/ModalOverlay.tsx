import React from 'react'
import ReactDOM from 'react-dom'
import '../../global.scss'
import S from './ModalOverlay.module.scss'
import { motion } from 'framer-motion'

type IProp = {
    children: JSX.Element
}
const ModalOverlay: React.FC<IProp> = ({ children }) => {
    return ReactDOM.createPortal(
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={S.overlay_main}
            >
                {children}
            </motion.div>
        </>,
        document.getElementById('portal')!
    )
}

export default ModalOverlay
