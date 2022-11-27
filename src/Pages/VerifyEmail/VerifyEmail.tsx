import axios from 'axios'
import { useEffect, useState, FC } from 'react'
import { useParams } from 'react-router-dom'
import whiteSpinner from '../../Assets/white_spinner.gif'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

type ResponseObject = {
    success: boolean
    message: string
}
const VerifyEmail: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<ResponseObject | null>(null)
    const nev = useNavigate()

    const param = useParams()
    const token = param.token

    async function fetchAPI() {
        setIsLoading(true)
        let url = 'http://localhost:5000/api/user/verify'
        const config = {
            headers: {
                'auth-token': token,
            },
        }
        try {
            const { data } = await axios.patch(url, {}, config)
            setResponse(data)
        } catch (error) {
            console.error(error)
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }

    useEffect(() => {
        fetchAPI()
        // eslint-disable-next-line
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {isLoading && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '3rem',
                        }}
                    >
                        <span>Verifying</span>
                        <img
                            style={{ width: '4rem', marginLeft: '0.5rem' }}
                            alt="spinning gif"
                            src={whiteSpinner}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        fontSize: '1.8rem',
                        color: response?.success ? 'green' : 'red',
                        textAlign: 'center',
                    }}
                >
                    <span>{response?.message}</span>
                    {response?.success && (
                        <button
                            onClick={() => nev('/')}
                            style={{
                                display: 'block',
                                background: 'teal',
                                marginTop: '1.5rem',
                            }}
                            className="btn"
                        >
                            Login
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    )
}

export default VerifyEmail
