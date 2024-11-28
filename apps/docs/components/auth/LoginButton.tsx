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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in ...
        </>
      ) : (
        "Login"
      )}
    </Button>
  )
}
