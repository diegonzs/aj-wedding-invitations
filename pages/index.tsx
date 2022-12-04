import { NextPage } from 'next'
import useSwr from 'swr'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AlreadyConfirmed } from '../components/home-steps/already-confirmed'
import { ConfirmationForm } from '../components/home-steps/confirmation-form'
import { Failed } from '../components/home-steps/failed'
import { InvitationCode } from '../components/home-steps/invitation-code/invitation-code'
import { Success } from '../components/home-steps/success'
import { Row } from '../types/row'

enum Step {
  Code,
  Confirm,
  FinalSuccess,
  FinalFailed,
  AlreadyConfirmed
}

const Home: NextPage = () => {
  const [step, setStep] = useState<Step>(Step.Code)
  
  const goToConfirm = () => setStep(Step.Confirm)
  const goToFinalSuccess = () => setStep(Step.FinalSuccess)
  const goToFinalFailed = () => setStep(Step.FinalFailed)
  const goToAlreadyConfirmed = () => setStep(Step.AlreadyConfirmed)

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col pb-5">
      <Image
        className="mb-24"
        src="/wedding-logo.svg"
        alt="Wedding Logo"
        width={189}
        height={266}
      />
      <div className="mb-8">
        {step === Step.Code && (
          <InvitationCode
            onSuccess={goToConfirm}
            onFailed={goToAlreadyConfirmed}
          />
        )}
        {step === Step.Confirm && (
          <ConfirmationForm
            onSuccess={goToFinalSuccess}
            onFailed={goToFinalFailed}
          />
        )}
        {step === Step.FinalSuccess && (
          <Success />
        )}
        {step === Step.FinalFailed && (
          <Failed />
        )}
        {step === Step.AlreadyConfirmed && (
          <AlreadyConfirmed />
        )}
      </div>
    </div>
  )
}

export default Home