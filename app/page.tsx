'use client';
import { setUserRole } from './_actions/setUserRole';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl font-bold mb-8'>Page d'accueil</h1>
        <div className='space-x-4'>
          <button
            onClick={() => setUserRole('user')}
            className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
          >
            Connecter en tant qu'utilisateur
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className='px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700'
          >
            Connecter en tant qu'admin
          </button>
        </div>
      </div>
    </main>
  );
}
