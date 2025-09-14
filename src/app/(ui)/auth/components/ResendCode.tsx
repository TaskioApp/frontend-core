/** @format */
'use client'
import { Button } from '@taskio/ui-kit'
import { JSX, useEffect, useState } from 'react'
import { LoginResponse } from '@/auth/services/interfaces'

const initialTime = 3

type ResendCodeProps = {
	onResendCode: () => Promise<LoginResponse>
}

const ResendCode: React.FC<ResendCodeProps> = ({ onResendCode }: ResendCodeProps): JSX.Element => {
	const [time, setTime] = useState<number>(initialTime)

	useEffect(() => {
		if (time <= 0) return

		const interval = setInterval(() => {
			setTime(prev => prev - 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [time])

	const handleClick = () => {
		setTime(initialTime)
		onResendCode()
	}

	return (
		<div>
			{time > 0 && <span>{time}</span>}
			{time === 0 && <Button isLink onClick={handleClick}>Resend Code?</Button>}
		</div>
	)
}
export default ResendCode
