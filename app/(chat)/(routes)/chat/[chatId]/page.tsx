import React from 'react'
import { redirect } from 'next/navigation';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import ChatClient from './components/client';

interface ChatIdPageProps {
    //Not a search param, so params not searchParams
    params: {
        chatId: string;
    }
}

const ChatIdPage: React.FC<ChatIdPageProps> = async ({ params }) => {
  
    const { userId } = auth();

    if(!userId) return redirectToSignIn();

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
                where: {
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    if(!companion) return redirect('/')
  
    return (
    <div>
      <ChatClient companion={companion} />
    </div>
  )
}

export default ChatIdPage
