// This file is for only understanding how to work with fetchings with axios and react-query inside dashboards of this project
// Forcing next.js to render this component as client side component
// TODO: Remove this directory at build
'use client';

// Importing part
import Loading from '@/components/dashboard/ui/loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode } from 'react';

// Defining type of returned data from api
type TodoAPIReturnType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}[];

// Defining fetching scripts
// Creating an instance for better axios support
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// A fetching function to do the fetch which has to be asnc and return typed value of fetched data
const fetchTodos = async (): Promise<TodoAPIReturnType[]> => {
  const res = await axiosInstance.get<TodoAPIReturnType[]>('/todos');
  return res.data;
};

// Creating and exporting ApiTest page as default
export default function ApiTest(): ReactNode {
  // Defining react query
  const todos = useQuery<TodoAPIReturnType[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
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
