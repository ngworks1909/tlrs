import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">TLRS Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p>By accessing or using the TLRS app, you agree to be bound by these Terms and Conditions. If you do not agree to all the terms and conditions, you may not use our service.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">2. Description of Service</h2>
                <p>TLRS is an app that allows customers to view the status of their tailoring orders. This app is operated by a single tailor and is designed to provide updates and information about your custom clothing and alterations.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
                <p>To use the TLRS app, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">4. Order Status</h2>
                <p>The TLRS app provides information about the status of your tailoring orders. While we strive to keep this information accurate and up-to-date, occasional delays or errors may occur. The order status displayed in the app should be considered approximate.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">5. User Conduct</h2>
                <p>You agree not to use the TLRS app for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You are responsible for all activity that occurs under your user account.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">6. Intellectual Property</h2>
                <p>All content included on the TLRS app, such as text, graphics, logos, and software, is the property of TLRS and is protected by copyright laws.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
                <p>TLRS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. This includes any errors or omissions in any content, or any loss or damage incurred as a result of the use of any content posted, transmitted, or otherwise made available via the service.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
                <p>We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes via email or through the TLRS app.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">9. Privacy Policy</h2>
                <p>Your use of the TLRS app is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the app and informs users of our data collection practices.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">10. Contact Information</h2>
                <p>If you have any questions about these Terms and Conditions, please contact us at support@tlrs.com.</p>
              </section>

              <Separator />
              <section>
                <p className="text-sm text-gray-500">Last updated: {11/4/2024}</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}