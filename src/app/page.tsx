'use client';

import dynamic from 'next/dynamic';

// Import the client-only Board component
const ClientBoard = dynamic(() => import('@/components/board/ClientBoard'), {
  ssr: false
});

export default function Home() {
  return <ClientBoard />;
}
