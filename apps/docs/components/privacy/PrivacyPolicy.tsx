import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
  return (
      <Card className="max-w-4xl mx-auto mb-20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">TLRS Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p>Welcome to TLRS. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our TLRS mobile application.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                <p>We collect personal information that you provide to us when you register for an account, such as your name, email address, and phone number. We also collect information about your tailoring orders, including measurements, fabric preferences, and order status.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Provide, operate, and maintain the TLRS app</li>
                  <li>Improve, personalize, and expand our app</li>
                  <li>Understand and analyze how you use our app</li>
                  <li>Communicate with you, including for customer service</li>
                  <li>Send you updates about your order status</li>
                </ul>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
                <p>We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes. We may share information with service providers who assist us in operating our app and conducting our business.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
                <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">6. Your Data Protection Rights</h2>
                <p>You have the right to access, update, or delete the information we have on you. You can do this by logging into your account settings or by contacting us directly.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">7. Children's Privacy</h2>
                <p>Our app is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">8. Changes to This Privacy Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
              </section>

              <Separator />

              <section>
                <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at privacy@tlrs.com.</p>
              </section>

              <Separator />

              <section>
                <p className="text-sm text-gray-500">Last updated: {'11/4/2024'}</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
  )
}