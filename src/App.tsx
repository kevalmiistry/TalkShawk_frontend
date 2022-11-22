import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.scss'
import ChatPage from './Pages/Chat/ChatPage'
import HomePage from './Pages/Home/HomePage'

const App: FC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chat" element={<ChatPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
