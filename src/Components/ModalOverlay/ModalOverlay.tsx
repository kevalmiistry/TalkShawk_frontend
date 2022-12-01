import React from 'react'
import ReactDOM from 'react-dom'
import '../../global.scss'
import S from './ModalOverlay.module.scss'
import { motion } from 'framer-motion'

type IProp = {
    children: JSX.Element
    initial?: object
    animate?: object
    exit?: object
}
const ModalOverlay: React.FC<IProp> = ({
    children,
    initial,
    animate,
    exit,
}) => {
    return ReactDOM.createPortal(
        <>
            <motion.div
                initial={initial ? initial : { opacity: 0 }}
                animate={animate ? animate : { opacity: 1 }}
                exit={exit ? exit : { opacity: 0 }}
                className={S.overlay_main}
            >
                {children}
            </motion.div>
        </>,
        document.getElementById('portal')!
    )
}

export default ModalOverlay
