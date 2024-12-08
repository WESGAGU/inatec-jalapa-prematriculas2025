"use client"
import ViewDatosEstudiantes from '@/components/view-datos-estudiantes';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerPrematriculas() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <ViewDatosEstudiantes />
    </div>
  );
}