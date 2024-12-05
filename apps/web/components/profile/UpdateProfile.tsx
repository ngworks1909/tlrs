"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from 'lucide-react'
import {uploadPicture} from '@repo/firebase/uploadfile'
import { signOut, useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'


interface ProfileData {
  name: string;
  email: string;
  mobile: string;
  avatar: string;
}

export default function UpdateProfile({user}: {user: ProfileData}) {
      const {toast} = useToast()
      const [profile, setProfile] = useState<ProfileData>(user)
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [formData, setFormData] = useState<ProfileData>({ ...profile })
      const [isFormValid, setIsFormValid] = useState(false)
      const [previewImage, setPreviewImage] = useState<string | null>(null);
      const [isUpdating, setIsUpdating] = useState(false)
      const updateButtonRef = useRef<HTMLButtonElement>(null);

      const validateForm = (data: ProfileData) => {
        const isNameValid = data.name.length >= 4
        const isMobileValid = /^[0-9]{10}$/.test(data.mobile)
        setIsFormValid((isNameValid && isMobileValid) || !previewImage)
      }

      const session:any = useSession();
      const userId: string = session.data?.user.id
    
      const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdating(true)
        if (isFormValid) {
          setProfile(formData)
          const response = await fetch('/api/auth/updateuser', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({url: formData.avatar, name: formData.name, mobile: formData.mobile})
          });
          const json = await response.json();
          if(json.success){
            await signOut();
            toast({
                title: "Update successful!",
                description: "You have successfully updated your details. Login again.",
                className: "bg-green-500 text-white"
            })
          }
          else{
            toast({
                title: "Update Failed",
                description: `${json.message}`,
                variant: "destructive",
            })
            setIsModalOpen(false)
          }

          setIsUpdating(false)

        }
      }
    
      const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
        const url = await uploadPicture(file, userId);
        setPreviewImage(url)
        setFormData(prev => ({ ...prev, avatar: url }))
        validateForm({ ...formData, avatar: url })
        }
      }

      useEffect(() => {
        if (isUpdating && updateButtonRef.current) {
          updateButtonRef.current.classList.add('animate-bounce')
          setTimeout(() => {
            if (updateButtonRef.current) {
              updateButtonRef.current.classList.remove('animate-bounce')
            }
          }, 1000)
        }
      }, [isUpdating])
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" onClick={() => setIsModalOpen(true)}>Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-6">
                        <div className="flex flex-col items-center">
                          <div className="relative group cursor-pointer">
                            <Avatar className="w-32 h-32">
                              <AvatarImage 
                                src={previewImage || formData.avatar} 
                                alt={formData.name} 
                                className="object-cover"
                              />
                              <AvatarFallback>{formData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <label 
                              htmlFor="avatar-upload" 
                              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Camera className="w-8 h-8 text-white" />
                              <input
                                type="file"
                                id="avatar-upload"
                                accept="image/*"
                                onChange={async(e) => {await handleImageChange(e)}}
                                className="sr-only"
                              />
                            </label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">Click to change profile photo</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData(prev => ({ ...prev, name: e.target.value }))
                              validateForm({ ...formData, name: e.target.value })
                            }}
                            placeholder="Enter name"
                            minLength={4}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile</Label>
                          <Input
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '')
                              setFormData(prev => ({ ...prev, mobile: value }))
                              validateForm({ ...formData, mobile: value })
                            }}
                            placeholder="Enter mobile number"
                            maxLength={10}
                            required
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button type="button" variant="ghost" onClick={() => {
                            setIsModalOpen(false)
                            setPreviewImage(null)
                            setFormData({ ...profile })
                          }}>
                            Close
                          </Button>
                          <Button type="submit" ref={updateButtonRef} onClick={async(e) => {await handleSubmit(e)}} disabled={!isFormValid || isUpdating}>
                            {isUpdating ? 'Updating...': 'Update'}
                          </Button>
                        </div>
                      </form>
          </DialogContent>
      </Dialog>
  )
}
