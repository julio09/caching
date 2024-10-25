'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Card from './_components/card';
import Loading from './_components/loading';
import { ModeToggle } from './_components/toggle';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        { cache: 'force-cache' }
      );
      const postsResponse = await response.json();
      const timer = setInterval(() => {
        setPosts(postsResponse as Post[]);
        setLoading(false);
        clearInterval(timer);
      }, 2000);
    };

    fetchPosts();
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between border-b border-b-foreground pb-3 font-medium'>
        <div className='flex gap-4 items-end uppercase'>
          <Link href='/dashboard'>Dashboard</Link>
          <Link href='/post'>Post</Link>
          <Link href='/user'>User</Link>
        </div>
        <ModeToggle />
      </div>
      {loading ? <Loading /> : <Card posts={posts} />}
    </div>
  );
}
