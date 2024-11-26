"use client"
import { UserState } from '@/atoms/UserState'
import { ChangeEvent } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { PasswordState } from '@/atoms/PasswordState'

type PropTypes = {
    type: string,
    name: string,
    placeholder: string,
    label: string,
}

export default function Field({type, placeholder, name, label}: PropTypes) {
  const setUser = useSetRecoilState(UserState);
  const showPassword = useRecoilValue(PasswordState);
  const setShowPassword = useSetRecoilState(PasswordState)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let val = e.target.value;
    setUser(prevUser => ({...prevUser, [name]:val}));
  }
  return (
    <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
          {
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          }
          <Input
            id={name}
            placeholder={placeholder}
            type={name !== "password" ? type: showPassword ? "text": "password"}
            onChange={handleChange}
            className="pl-10"
            required
          />
          {
            name === "password" && <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
          }
        </div>
    </div>
  )
}