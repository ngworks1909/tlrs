"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import { Order } from '@/components/orders/Orders';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchOrders = async (pageToFetch: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/fetchorders?page=${pageToFetch}&pageSize=10`, { method: 'GET' });
      const json = await response.json();

      if (!response.ok) {
        setHasMore(false);
      }

      const fetchedOrders: Order[] = json.orders;
      if (fetchedOrders.length === 0) {
        setHasMore(false);
      } else {
        setOrders(prevOrders => [...prevOrders, ...fetchedOrders]);
        setPage(pageToFetch);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const lastOrderElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchOrders(page + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const loadMoreOrders = () => {
    if (!loading && hasMore) {
      fetchOrders(page + 1);
    }
  };

  return { orders, loading, loadMoreOrders, hasMore, setOrders, lastOrderElementRef };
}