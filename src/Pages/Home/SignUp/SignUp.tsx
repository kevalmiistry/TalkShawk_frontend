import React, { FC, useState } from 'react'
import FormOne from './FormOne'
import style from './SignUp.module.scss'
import FormTwo from './FormTwo'
import FormThree from './FormThree'
import useMultistepForm from '../../../Hooks/useMultistepForm'
import { AnimatePresence } from 'framer-motion'
import whiteSpinner from '../../../Assets/white_spinner.gif'

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
    const [pic, setPic] = useState<string | null>(null)

    /*** States for Form Three ***/
    const [isPassValid, setIsPassValid] = useState(false)
    const [isPassSame, setIsPassSame] = useState(false)

    // State for Submitting Form also for Form three
    const [isSubmitting, setIsSubmitting] = useState(false)
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

    const nextStyle = {
        cursor:
            isEmailAvailable && isUsernameAvailable ? 'pointer' : 'not-allowed',
    }
    const handleCreateUser = async () => {}

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
                    // isPassSame ? (
                    // Finish or Submitting Done----------------------
                    <button
                        disabled={isSubmitting || !isPassSame}
                        className={`${style.next_btn} ${
                            isSubmitting || !isPassSame ? 'disable' : ''
                        }`}
                        style={nextStyle}
                        onClick={() => {
                            next()
                            setCurrentStepState(currentStepIndex)
                            handleCreateUser()
                            setIsSubmitting(true)
                            console.log('Final Finish Clicked')
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <span>Submiting&nbsp;</span>
                                <img
                                    src={whiteSpinner}
                                    style={{ width: '1rem' }}
                                />
                            </>
                        ) : (
                            'Finish'
                        )}
                    </button>
                ) : (
                    // ) : (
                    //     // Finish or Submitting Done----------------------
                    //     <button
                    //         className={style.next_btn + ' disable'}
                    //         disabled
                    //         style={{ cursor: 'not-allowed' }}
                    //         onClick={next}
                    //     >
                    //         Finish
                    //     </button>
                    // )
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
