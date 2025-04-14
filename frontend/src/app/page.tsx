'use client'
import React from 'react';

import Link from 'next/link'

import { useFetchProjects } from './hooks/useQueries'
export default function Home() {
  const [data] = useFetchProjects();
  return (
    <div className='flex h-screen'>
      <ul className='text-black text-xl m-auto relative'>
        {data.map((item:any) => {
          return (<li className='o-[10px] border-solid border-2 border-black mb-[5px]'>
            <Link href={`/project/${item.id}`}>{item.name}</Link>
          </li>)
        })}
      </ul>
    </div>
  )
}
