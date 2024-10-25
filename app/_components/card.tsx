import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostList({ posts }: { posts: Post[] }) {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>(posts.slice(0, 10));

  const handleLoadMore = () => {
    setVisiblePosts((currentPosts) =>
      currentPosts.concat(
        posts.slice(currentPosts.length, currentPosts.length + 10)
      )
    );
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <AnimatePresence>
        <motion.ul
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-4 px-0 dark:text-white'
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {visiblePosts.map((post, index) => (
            <motion.li
              key={post.id}
              className='flex flex-col gap-4 px-4 p-2 rounded-md bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 dark:bg-gradient-to-br dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 shadow-lg'
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index < 10 ? index * 0.1 : (index - 10) * 0.1,
              }}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.2 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.2 },
              }}
            >
              <span className='text-md font-medium'>{post.title}</span>
              <span className='text-sm'>{post.body}</span>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
      {visiblePosts.length < posts.length && (
        <Button size={'lg'} className='mt-4' onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
}
