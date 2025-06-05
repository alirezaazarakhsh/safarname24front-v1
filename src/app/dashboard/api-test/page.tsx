// This file is for only understanding how to work with fetchings with axios and react-query inside dashboards of this project
// Forcing next.js to render this component as client side component
// TODO: Remove this directory at build
'use client';

// Importing part
import Loading from '@/components/dashboard/ui/loading';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { ReactNode } from 'react';

// Defining type of returned data from api
type ApiReturnedType = {
  userId: number;
  id: number;
  title: string;
  complete: boolean;
}[];

// Creating and exporting ApiTest page as default
export default function ApiTest(): ReactNode {
  // Defining react query
  const todos = useApiQuery<ApiReturnedType>({
    url: 'https://jsonplaceholder.typicode.com/todos',
    queryKey: ['publicTodos', 'todo'],
  });

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px]'>
      <span className='text-cs08 font-bold text-black block text-right truncate mb-4'>
        Api Test
      </span>
      {todos.isLoading ? (
        <Loading />
      ) : (
        <pre>
          <p className='text-cs07 font-medium text-gray-400 text-right'>
            {JSON.stringify(todos.data, null, 2)}
          </p>
        </pre>
      )}
    </main>
  );
}
