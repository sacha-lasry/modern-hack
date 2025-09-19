'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-xl flex flex-col">
        <CardHeader>
          <CardTitle>AI Chat Assistant</CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-col">
          {/* Messages Container */}
          <div className="space-y-3 mb-4 min-h-[100px]">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card
                  className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <CardContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <div key={`${message.id}-${i}`} className="whitespace-pre-wrap">
                              {part.text}
                            </div>
                          );
                        default:
                          return null;
                      }
                    })}
                  </CardContent>
                </Card>
              </div>
            ))}
            
            {messages.length === 0 && (
              <div className="flex justify-center items-center text-muted-foreground">
                <p>Start a conversation by typing a message below</p>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage({ text: input });
                setInput('');
              }
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              placeholder="Type your message..."
              onChange={e => setInput(e.currentTarget.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-1 w-1" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}