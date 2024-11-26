"use client"

import { UserSearchState } from '@/atoms/UserSearchState'
import { UserType, useUsers } from '@/hooks/useUsers'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import UserSkeleton from '../skeletons/UserSkeleton'
import { Button } from '../ui/button'
import { ArrowUp } from 'lucide-react'
import UserCard from './UserCard'

export default function UserGrid() {
    const searchTerm = useRecoilValue(UserSearchState)
    const { users, loading, loadMoreUsers, hasMore, lastUserElementRef } = useUsers()
    const [showBackToTop, setShowBackToTop] = useState(false)
    const filteredUsers = users.filter((user: UserType) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm)
    )

    useEffect(() => {
        const handleScroll = () => {
          setShowBackToTop(window.scrollY > 300)
          if ((window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) && hasMore) {
            loadMoreUsers()
          }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }, [loadMoreUsers, hasMore])
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && users.length === 0 ? (
          Array.from({ length: 6 }).map((_, index) => (
            <UserSkeleton key={index} />
          ))
        ) : (
          filteredUsers.map((user: UserType, index: number) => (
            <div
            key={user.userId}
            ref={index === filteredUsers.length - 1 ? lastUserElementRef : null}
          >
            <UserCard user={user} />
            </div>
          ))
        )}
      </div>

      {loading && users.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <UserSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No users found matching the search criteria.</p>
      )}

      {showBackToTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}
