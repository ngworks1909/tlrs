"use client"
import { AuthLoadingState } from '@/atoms/AuthLoadingState'
import { UserState } from '@/atoms/UserState'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Button } from '../ui/button'

export default function LoginButton({type}: Readonly<{type: "Login" | "Signup" | "Details"}>) {
    const isLoading = useRecoilValue(AuthLoadingState);
    const {email, password, username, mobile} = useRecoilValue(UserState);
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
        router.push('/otp')
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
          <svg className="w-5 h-5 mr-3 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          {type === "Login" ? 'Logging in...' : 'Signing up...'}
        </>
      ) : (
        <>{type === 'Details' ? 'Submit' : type === 'Login' ? 'Login' : 'Sign Up'}</>
      )}
    </Button>
  )
}
