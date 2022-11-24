import React from 'react'
import ReactDOM from 'react-dom'
import '../../global.scss'
import S from './ModalOverlay.module.scss'

type IProp = {
    children: JSX.Element
}
const ModalOverlay: React.FC<IProp> = ({ children }) => {
    return ReactDOM.createPortal(
        <>
            <div className={S.overlay_main}>{children}</div>
        </>,
        document.getElementById('portal')!
    )
}

export default ModalOverlay
