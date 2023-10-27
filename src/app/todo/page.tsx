'use client';
import useSWR from 'swr';
import { ErrorData, TodosData } from '../fetch/type';
import fetcher from '../fetch/fetcher';

export default function TodoPage() {
  const { data, isLoading } = useSWR<TodosData[], ErrorData>(
    '/posts',
    fetcher,
    {
      onSuccess: (data) => {
        console.log('Success', data);
      },
      onError: (err) => {
        console.log('Error', err.info);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Todo Page</h2>
      <div>
        {data?.map(({ title, body }) => {
          return (
            <div>
              <h4>{title}</h4>
              <p>{body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
