import React, { FC, useState } from 'react'
import FormOne from './FormOne'
import style from './SignUp.module.scss'
import FormTwo from './FormTwo'
import FormThree from './FormThree'
import useMultistepForm from '../../../Hooks/useMultistepForm'
import { AnimatePresence } from 'framer-motion'
import whiteSpinner from '../../../Assets/white_spinner.gif'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type TProp = {
    isSubmitting: boolean
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}
type AccountData = {
    email: string
    username: string
    name: string
    password: string
    cpassword: string
}

const INITIAL_DATA = {
    email: '',
    username: '',
    name: '',
    password: '',
    cpassword: '',
}

const SignUp: FC<TProp> = ({ isSubmitting, setIsSubmitting }) => {
    document.title = 'TalkShawk | Signup'
    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const [currentStepState, setCurrentStepState] = useState(0)

    const [formData, setFormData] = useState<AccountData>(INITIAL_DATA)

    /*** States for Form One ***/
    const [isEmailAvailable, setIsEmailAvailable] = useState(false)
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)

    /*** States for Form Two ***/
    const [pic, setPic] = useState<string | null>(null)

    /*** States for Form Three ***/
    const [isPassValid, setIsPassValid] = useState(false)
    const [isPassSame, setIsPassSame] = useState(false)

    // useMultistepForm Hook Start
    const {
        theStep,
        next,
        back,
        currentStepIndex,
        isFirstPage,
        isLastPage,
        stepsLength,
    } = useMultistepForm([
        <FormOne
            updateFormData={updateFormData}
            {...formData}
            isEmailAvailable={isEmailAvailable}
            setIsEmailAvailable={setIsEmailAvailable}
            isUsernameAvailable={isUsernameAvailable}
            setIsUsernameAvailable={setIsUsernameAvailable}
        />,
        <FormTwo
            updateFormData={updateFormData}
            {...formData}
            currentStepState={currentStepState}
            pic={pic}
            setPic={setPic}
        />,
        <FormThree
            updateFormData={updateFormData}
            {...formData}
            isPassValid={isPassValid}
            setIsPassValid={setIsPassValid}
            isPassSame={isPassSame}
            setIsPassSame={setIsPassSame}
            isSubmitting={isSubmitting}
        />,
    ])
    // useMultistepForm Hook End

    const nextStyle = {
        cursor:
            isEmailAvailable && isUsernameAvailable ? 'pointer' : 'not-allowed',
    }

    const nev = useNavigate()
    // Fetch createuser API Function
    const handleCreateUser = async () => {
        setIsSubmitting(true)

        const url = process.env.REACT_APP_API_URL + '/user/createuser'

        const { data } = await axios.post(url, {
            name: formData.name === '' ? formData.username : formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            pic: pic,
        })

        if (data.success) {
            nev('/signupcomplete')
        }
    }

    return (
        <div className={`${style.signup_main}`}>
            <div className={style.progress}>
                {currentStepIndex + 1 + '/' + stepsLength}
            </div>
            <form>
                <AnimatePresence
                    initial={false}
                    onExitComplete={() => null}
                    exitBeforeEnter={true}
                >
                    {theStep}
                </AnimatePresence>
            </form>
            <div className={`flex between ${style.bottom_btns}`}>
                {/* Back Starts */}
                {!isFirstPage ? (
                    <button
                        disabled={isSubmitting}
                        className={`${style.back_btn} ${
                            isSubmitting && 'disable'
                        }`}
                        onClick={() => {
                            back()
                            setCurrentStepState(currentStepIndex)
                        }}
                    >
                        Back
                    </button>
                ) : (
                    <div></div>
                )}

                {/* Next & Finish Starts */}
                {isLastPage ? (
                    <button
                        disabled={isSubmitting || !isPassSame}
                        className={`${style.next_btn} ${
                            isSubmitting || !isPassSame ? 'disable' : ''
                        }`}
                        style={nextStyle}
                        onClick={() => {
                            next()
                            handleCreateUser()
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <span>Submiting&nbsp;</span>
                                <img
                                    src={whiteSpinner}
                                    alt="spinning gif"
                                    style={{ width: '1rem' }}
                                />
                            </>
                        ) : (
                            'Finish'
                        )}
                    </button>
                ) : (
                    <button
                        disabled={!isEmailAvailable || !isUsernameAvailable}
                        className={`${style.next_btn} ${
                            !isEmailAvailable || !isUsernameAvailable
                                ? 'disable'
                                : ''
                        }`}
                        style={nextStyle}
                        onClick={() => {
                            next()
                            setCurrentStepState(currentStepIndex)
                        }}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default SignUp
