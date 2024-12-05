"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, Lock } from 'lucide-react'
import { OtpModalState } from '@/atoms/OtpModalState'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { toast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

const OTP_LENGTH = 6
const RESEND_COOLDOWN = 120 // 2 minutes in seconds

export default function OTPModal() {
  const setOtpState = useSetRecoilState(OtpModalState);
  const isOpen = useRecoilValue(OtpModalState)
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [activeIndex, setActiveIndex] = useState(0)
  const [canResend, setCanResend] = useState(true)
  const [cooldownTime, setCooldownTime] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!canResend) {
      const timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setCanResend(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [canResend])

  useEffect(() => {
    if (otp.every(digit => digit !== '') && otp.length === OTP_LENGTH) {
      verifyOTP()
    }
  }, [otp])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < OTP_LENGTH - 1) {
        setActiveIndex(index + 1)
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const onClose = () => {
    setOtpState(false)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newOtp = [...otp]
      if (newOtp[index]) {
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        newOtp[index - 1] = ''
        setOtp(newOtp)
        setActiveIndex(index - 1)
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleResend = async() => {
    try {
      if (canResend) {
        const email = localStorage.getItem('email')
        if(!email){
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          })
          onClose()
          setOtp(Array(OTP_LENGTH).fill(''))
          return
        }
        const response = await fetch('/api/auth/resend', {
          method: "POST",
          body: JSON.stringify({email})
        })

        const data = await response.json();
        if(data.success){
          toast({
            title: "OTP Sent",
            description: "Please check your email for the OTP.",
            className: "bg-green-500 text-white",
          })
          setOtp(Array(OTP_LENGTH).fill(''))
          setActiveIndex(0)
          inputRefs.current[0]?.focus()
        }
        else{
          toast({
            title: "Failed to resend OTP",
            description: data.message,
            variant: "destructive",
          })
        }
        
        
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })  
    }
    finally{
      setCanResend(false)
      setCooldownTime(RESEND_COOLDOWN)
    }
  }

  const verifyOTP = async () => {
    setIsVerifying(true)
    try {
      const email = localStorage.getItem("email")
      if(!email){
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
        onClose()
        setOtp(Array(OTP_LENGTH).fill(''))
      }
      const response = await fetch('/api/auth/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, otp: otp.join('') }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "OTP verified successfully!",
        })
        onClose()
        setOtp(Array(OTP_LENGTH).fill(''));
        localStorage.removeItem("email");
        localStorage.setItem("authId", data.authId)
        router.push('/details')
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        })
        // Reset OTP input
        setOtp(Array(OTP_LENGTH).fill(''))
        setActiveIndex(0)
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })

      setOtp(Array(OTP_LENGTH).fill(''))
      setActiveIndex(0)
      inputRefs.current[0]?.focus()
    } finally {
      setIsVerifying(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Verify Your Identity</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            We've sent a 6-digit code to your email. Please enter it below to verify your identity.
          </p>
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-center text-2xl font-bold"
                autoFocus={index === activeIndex}
                disabled={isVerifying}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <Button
            onClick={handleResend}
            disabled={!canResend || isVerifying}
            variant="default"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >

            {isVerifying ? <>Verifying...</>: <>
              {
                canResend ? <>RESEND OTP</> : <>
                  Resend in {formatTime(cooldownTime)}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              }
            </>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

