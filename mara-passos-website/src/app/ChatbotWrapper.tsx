"use client"; // Isso diz ao Next.js que este é um Client Component

import dynamic from 'next/dynamic';

// Aqui sim podemos usar o ssr: false com segurança
const Chatbot = dynamic(() => import('./Chatbot'), { 
  ssr: false 
});

export default function ChatbotWrapper() {
  return <Chatbot />;
}