import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import SideButtons from './SideButtons'
import UpdateProfile from './UpdateProfile'
import UpdatePasswordButton from "./UpdatePasswordButton"
import { getServerSession } from "next-auth"
import { NEXT_AUTH_CONFIG } from "@/lib/auth"
import ProfileDetails from "./ProfileDetails"

export default async function Profile() {
  const session = await getServerSession(NEXT_AUTH_CONFIG)
  const name: string = session?.user.name;
  const avatar: string = session?.user.image;
  const email:string = session?.user.email;
  const mobile: string = session?.user.mobile
  const user = {name, email, mobile, avatar}

  return (
    <>
        {
            session && <>
            <ProfileDetails user = {user}/>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <SideButtons/>
          <div className="md:w-3/4 space-y-8 pb-8">
            <section id="account" className="space-y-6">
              <h1 className="text-4xl font-bold">Account</h1>
              <Separator />
              <Card className="bg-gray-50">
                <CardContent className="p-6 flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Edit Profile</h2>
                    <p className="text-muted-foreground">
                      Update your basic details like name, mobile number, profile photo
                    </p>
                  </div>
                  <UpdateProfile user = {user} />
                </CardContent>
              </Card>
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">Data Sharing</h2>
                  <p className="text-muted-foreground mt-2">
                    No details shared with any third parties
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="appearance" className="space-y-6">
              <h1 className="text-4xl font-bold">Appearance</h1>
              <Separator />
              <Card className="bg-gray-50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold">Themes</h2>
                  <p className="text-muted-foreground mt-2">
                    We're currently working on developing our themes to make your experience even better. Stay tuned for updates!
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="password" className="space-y-6">
              <h1 className="text-4xl font-bold">Password</h1>
              <Separator />
              <Card className="bg-gray-50">
                <CardContent className="p-6 flex justify-between items-start">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Update Password</h2>
                    <p className="text-muted-foreground">
                      Forgot your password or update password? Do it here
                    </p>
                  </div>
                  <UpdatePasswordButton/>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
            </>
        }
    </>
  )
}