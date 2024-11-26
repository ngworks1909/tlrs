import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import Field from "./Field"
import LoginButton from "./LoginButton"

export default function Auth() {

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Login to access our services
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form className="space-y-4">
             <Field type="email" name="email" placeholder="Enter your email" label="Email" />
             <Field type="password" name="password" placeholder="Enter your password" label="Password" />
             <LoginButton/>
           </form>
          </CardContent>
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
    </div>
  )
}
