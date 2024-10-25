import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-4 px-0'>
        {Array.from({ length: 10 }).map((_, id) => (
          <Skeleton
            className='flex flex-col h-36 gap-4 px-4 py-2 bg-gradient-to-br to-black/35 from-slate-500/20 shadow-md rounded-md'
            key={id}
          >
            <Skeleton className='h-8 mb-1 w-2/4' />
            <Skeleton className='h-28 mb-1 w-full' />
          </Skeleton>
        ))}
      </ul>
      <Skeleton className='mx-auto mt-6 h-10 w-1/12' />
    </>
  );
}
