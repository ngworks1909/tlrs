"use client"

import { useState, useEffect, useCallback, useRef } from 'react';

export type UserType = {
    userId: string;
    username: string;
    email: string;
    mobile: string;
    image: string;
    _count: {
        orders: number;
    }
}

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchUsers = async (pageToFetch: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/fetchusers?page=${pageToFetch}&pageSize=10`, { method: 'GET' });
      const json = await response.json();

      if (!response.ok) {
        setHasMore(false);
      }

      const fetchedUsers: UserType[] = json.users;
      console.log(fetchedUsers)
      if (fetchedUsers.length === 0) {
        setHasMore(false);
      } else {
        setUsers(prevUsers => [...prevUsers, ...fetchedUsers]);
        setPage(pageToFetch);
      }
    } catch (error) {
      setHasMore(false);
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const lastUserElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchUsers(page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const loadMoreUsers = () => {
    if (!loading && hasMore) {
      fetchUsers(page + 1);
    }
  };

  return { users, loading, loadMoreUsers, hasMore, setUsers, lastUserElementRef };
}