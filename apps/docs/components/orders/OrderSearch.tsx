"use client"
import React from 'react'
import { Input } from '../ui/input'
import { OrderSearchState } from '@/atoms/OrderSearchState'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function OrderSearch() {
   const searchQuery = useRecoilValue(OrderSearchState)
   const setSearchQuery = useSetRecoilState(OrderSearchState)
  return (
    <Input
        type="text"
        placeholder="Search by Order ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full text-sm"
    />
  )
}
