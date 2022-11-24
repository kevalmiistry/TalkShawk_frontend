import React, { FC, useState } from 'react'
import FormOne from './FormOne'
import style from './SignUp.module.scss'
import FormTwo from './FormTwo'
import FormThree from './FormThree'
import useMultistepForm from '../../../Hooks/useMultistepForm'
import { AnimatePresence } from 'framer-motion'

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

const SignUp: FC = () => {
    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const [currentStepState, setCurrentStepState] = useState(0)

    const [formData, setFormData] = useState<AccountData>(INITIAL_DATA)

    /*** States for Form One ***/
    const [isEmailAvailable, setIsEmailAvailable] = useState(false)
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false)

    /*** States for Form Two ***/

    /*** States for Form Three ***/
    const [isPassValid, setIsPassValid] = useState(false)
    const [isPassSame, setIsPassSame] = useState(false)

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
        />,
        <FormThree
            updateFormData={updateFormData}
            {...formData}
            isPassValid={isPassValid}
            setIsPassValid={setIsPassValid}
            isPassSame={isPassSame}
            setIsPassSame={setIsPassSame}
        />,
    ])

    const nextStyle = {
        cursor:
            isEmailAvailable && isUsernameAvailable ? 'pointer' : 'not-allowed',
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
                {!isFirstPage ? (
                    <button
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
                {isLastPage ? (
                    isPassSame ? (
                        <button
                            // type="submit"
                            style={nextStyle}
                            onClick={() => {
                                next()
                                setCurrentStepState(currentStepIndex)
                            }}
                        >
                            Finish
                        </button>
                    ) : (
                        <button
                            disabled
                            className="disable"
                            style={{ cursor: 'not-allowed' }}
                            onClick={next}
                        >
                            Finish
                        </button>
                    )
                ) : isEmailAvailable && isUsernameAvailable ? (
                    <button
                        style={nextStyle}
                        onClick={() => {
                            next()
                            setCurrentStepState(currentStepIndex)
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        disabled
                        className="disable"
                        style={nextStyle}
                        onClick={next}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default SignUp
