import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Field from "./Field"
import LoginButton from "./LoginButton"
import OtpModal from "./OtpModal"

export default function Auth({type} : Readonly<{type: "Login" | "Signup" | "Details"}>) {

  const getTitle = () => {
    if(type === "Signup") return "Sign Up"
    if(type === "Login") return "Login"
    return "Submit"
  }

  const getDescription = () => {
    if(type === "Signup") return "Create an account to access our services";
    if(type === "Login") return "Login to your account";
    return "Enter your details"
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{getTitle()}</CardTitle>
            <CardDescription className="text-center">
              {getDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form className="space-y-4">
             {type === "Signup" && <Field type="email" name="email" placeholder="Enter your email" label="Email" />}
             {type === "Details" && <Field type="text" name="username" placeholder="Enter your name" label="Name" />}
             {(type === "Login" || type === "Details") && <Field type="password" name="password" placeholder="Enter your password" label="Password" />}
             {type === "Details" && <Field type="tel" name="mobile" placeholder="Enter your mobile number" label="Mobile" />}
             <LoginButton type={type}  />
           </form>
          </CardContent>
          <CardFooter>
          {type === "Signup" ? <p className="text-center text-sm text-gray-600 mt-2 w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>: 
          type === "Login" && <p className="text-center text-sm text-gray-600 mt-2 w-full"> Don't have an account?{" "} <Link href="/signup" className="text-blue-600 hover:underline"> Signup </Link> </p>}
        </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-slate-200 p-8">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Our Service</h2>
          <blockquote className="text-xl italic">
            "The customer service I recieved was exceptional.The support team went above and beyond to address my concerns."
          </blockquote>
          <p className="mt-4 font-semibold">- Sudhakar Reddy</p>
        </div>
      </div>
      <OtpModal/>
    </div>
  )
}
