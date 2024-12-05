"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AuthLoadingState } from '@/atoms/AuthLoadingState'
import { Loader2 } from 'lucide-react'
import {signIn} from 'next-auth/react'
import { UserState } from '@/atoms/UserState'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { OtpModalState } from '@/atoms/OtpModalState'

export default function LoginButton({type}: Readonly<{type: "Login" | "Signup" | "Details"}>) {
    const isLoading = useRecoilValue(AuthLoadingState);
    const {email, password, username, mobile} = useRecoilValue(UserState);
    const setOtpState = useSetRecoilState(OtpModalState);
    const router = useRouter()
    const setIsLoading = useSetRecoilState(AuthLoadingState)
    const {toast} = useToast()
    const handleSignup = async() => {
      setIsLoading(true)
      const response = await fetch('/api/auth/createuser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
      });
      const json = await response.json();
      if(json.success) {
        toast({
          title: "OTP Sent",
          description: "Please check your email for the OTP.",
          className: "bg-green-500 text-white"
        })
        localStorage.setItem("email", email);
        setOtpState(true);
      }
      else{
        toast({
          title: "Signup Failed",
          description: json.message,
          variant: "destructive",
        })
      }

      setIsLoading(false)
        // Handle signup logic here
    }

    const handleLogin = async() => {

      setIsLoading(true)
          const response = await signIn('credentials', {email: email, password: password, redirect: false});
          if(response?.ok){
            toast({
              title: "Login successful!",
              description: "You have successfully logged in.",
              className: "bg-green-500 text-white"
            })
            router.push(`/`);
            router.refresh()
          }
          else{
            toast({
              title: "Login Failed",
              description: "Please check your credentials and try again.",
              variant: "destructive",
            })
          }
          setIsLoading(false)

    }

    const handleSubmit = async() => {
      const authId = localStorage.getItem('authId');
      if(!authId){
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({authId, mobile, password, username})
      });
      const json = await response.json();
      if(json.success) {
        toast({
          title: "Signup successful",
          description: "You have successfully signed up",
          className: "bg-green-500 text-white"
        })
        localStorage.removeItem("authId");
        router.push('/login')
      }
      else{
        toast({
          title: "Signup Failed",
          description: json.message,
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }

    const handleClick = async() => {
      if(type === "Signup"){
        await handleSignup()
      }
      else if(type === "Login"){
        await handleLogin()
      }
      else{
        await handleSubmit()
      }
    }
  return (
    <Button type='submit' onClick={async(e) => {e.preventDefault(); await handleClick()}} className="w-full" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {type === "Login" ? 'Logging in...' : 'Signing up...'}
        </>
      ) : (
        type
      )}
    </Button>
  )
}
