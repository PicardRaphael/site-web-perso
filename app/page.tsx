'use client';
import { UserRole } from '@src/domain/entities/UserEntity';
import { useCreateRoleUser } from '@src/interface/hooks/useCreateRoleUser';

export default function Home() {
  const createRoleUser = useCreateRoleUser();
  const handleCreate = async (role: UserRole) => {
    const result = await createRoleUser.mutateAsync(role);
    return result;
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl font-bold mb-8'>Page d&apos;accueil</h1>
        <div className='space-x-4'>
          <button
            onClick={() => handleCreate(UserRole.USER)}
            className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
          >
            Connecter en tant qu&apos;utilisateur
          </button>
          <button
            onClick={() => handleCreate(UserRole.ADMIN)}
            className='px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700'
          >
            Connecter en tant qu&apos;admin
          </button>
        </div>
      </div>
    </main>
  );
}
