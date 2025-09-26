import { Dashboard } from '@/components/dashboard/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Secure App',
  description: 'Secure application dashboard',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔒 Secure Full-Stack Application
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A comprehensive full-stack application built with Next.js, NestJS, 
            PostgreSQL, and Redis, featuring enterprise-grade security measures 
            to prevent OWASP Top 10 vulnerabilities.
          </p>
        </div>
        
        <Dashboard />
      </div>
    </main>
  );
}