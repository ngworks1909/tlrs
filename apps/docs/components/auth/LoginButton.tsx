"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AuthLoadingState } from '@/atoms/AuthLoadingState'
import {signIn} from 'next-auth/react'
import { UserState } from '@/atoms/UserState'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function LoginButton() {
    const isLoading = useRecoilValue(AuthLoadingState);
    const {email, password} = useRecoilValue(UserState);
    const router = useRouter()
    const setIsLoading = useSetRecoilState(AuthLoadingState)
    const {toast} = useToast()

  return (
    <Button type='submit' onClick={async(e)=>{
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
          description: "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }} className="w-full" disabled={isLoading}>
      {isLoading ? (
        <>
          <svg className="w-5 h-5 mr-3 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          Logging in ...
        </>
      ) : (
        "Login"
      )}
    </Button>
  )
}
