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

export default function LoginButton({type}: {type: "Login" | "Signup"}) {
    const isLoading = useRecoilValue(AuthLoadingState);
    const {username, email, password, mobile} = useRecoilValue(UserState);
    const router = useRouter()
    const setIsLoading = useSetRecoilState(AuthLoadingState)
    const {toast} = useToast()
    const handleSignup = async() => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, username, password, mobile})
      });
      const json = await response.json();
      if(json.success) {
        toast({
          title: "Signup successful!",
          description: "You have successfully signed up.",
          className: "bg-green-500 text-white"
        })
        router.push('/login');
      }
      else{
        toast({
          title: "Signup Failed",
          description: json.error,
          variant: "destructive",
        })
      }
        // Handle signup logic here
    }
  return (
    <Button type='submit' onClick={type === 'Signup'? async(e)=> {
       e.preventDefault()
       await handleSignup() 
      }:async(e)=>{
      e.preventDefault(); 
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
          description: "Login failed. Please check your credentials and try again.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }} className="w-full" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {type === "Signup" ? 'Signing up...' : 'Logging in'}
        </>
      ) : (
        type
      )}
    </Button>
  )
}
