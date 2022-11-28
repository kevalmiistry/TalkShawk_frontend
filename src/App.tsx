import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Toast from './Components/Toast/Toast'
import { ChatProvider } from './Context/ChatContext'
import ToastProvider from './Context/ToastContext'
import './global.scss'
import ChatPage from './Pages/Chat/ChatPage'
import HomePage from './Pages/Home/HomePage'
import SignUpComplete from './Pages/SignUpComplete/SignUpComplete'
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail'

const App: FC = () => {
    return (
        <>
            <ToastProvider>
                <BrowserRouter>
                    <ChatProvider>
                        <Toast />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/chat" element={<ChatPage />} />
                            <Route
                                path="/signupcomplete"
                                element={<SignUpComplete />}
                            />
                            <Route
                                path="/verifyemail/:token"
                                element={<VerifyEmail />}
                            />
                        </Routes>
                    </ChatProvider>
                </BrowserRouter>
            </ToastProvider>
        </>
    )
}

export default App
