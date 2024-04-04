import React, { useEffect, useState, useRef, ElementRef } from 'react';
import { Companion } from '@prisma/client';
import ChatMessage, { ChatMessageProps } from './chat-message';

interface ChatMessagesProp {
    companion: Companion;
    isLoading: boolean;
    messages: ChatMessageProps[];
}

const ChatMessages: React.FC<ChatMessagesProp> = ({ companion, isLoading, messages }) => {
    
    //will replace when the AI chatting is actually integrated.
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true: false);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);
        
        return() => {
            clearTimeout(timeout);
        }
        
    }, []);
    
    //automatically scroll to bottom when new messages are loaded
    const scrollRef = useRef<ElementRef<'div'>>(null);
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length])
  
    return (
    <div className='flex-1 overflow-y-auto pr-4'>
        {/* initial message */}
        <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role='system'
        content={`Hello, I am ${companion.name}, ${companion.description}`}
        />
        {/* mapping from database when user had/having convos */}
        {messages.map((message) => (
            <ChatMessage 
                key={message.content}
                role={message.role}
                content={message.content}
                src={message.src}
            />
        ))}
        {/*for when AI is thinking... 🧠*/}
        {isLoading && (
            <ChatMessage 
                role='system'
                src={companion.src}
                isLoading
            />
        )}
    <div ref={scrollRef} />
    </div>
    
  )
}

export default ChatMessages
