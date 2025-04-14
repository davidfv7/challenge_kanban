'use client'
import React, {useState} from 'react';

import {Board} from '../../components/Board'



export default function Home() {
  return (
    <div className='h-screen'>
      <Board />
    </div>
  );
}