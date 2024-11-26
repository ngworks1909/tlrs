"use client"

import React from 'react'
import { Input } from '../ui/input'
import { UserSearchState } from '@/atoms/UserSearchState'
import { useRecoilValue, useSetRecoilState } from 'recoil'
export default function UserSearch() {
    const searchTerm = useRecoilValue(UserSearchState)
    const setSearchTerm = useSetRecoilState(UserSearchState)
  return (
    <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
    />
  )
}
