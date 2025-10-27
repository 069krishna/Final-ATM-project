'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, User, Send } from 'lucide-react';
import { chat, type ChatMessage } from '@/ai/flows/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chat({
        history: messages,
        prompt: input,
      });
      const assistantMessage: ChatMessage = { role: 'model', content: response };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <Card className="flex-grow flex flex-col shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
              <Bot className="h-6 w-6" />
              <div>
                  <CardTitle>AI Financial Assistant</CardTitle>
                  <CardDescription>Ask me anything about finance!</CardDescription>
              </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col gap-4">
            <ScrollArea className="flex-grow h-[calc(100vh-20rem)] pr-4">
                <div className="space-y-6">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground pt-10">
                        <p>No messages yet. Start a conversation!</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'model' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                    )}
                    <div className={`p-3 rounded-lg max-w-lg ${ message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted' }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                         <Avatar className="h-8 w-8">
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3">
                         <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot /></AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg bg-muted">
                            <p className="text-sm">Thinking...</p>
                        </div>
                    </div>
                )}
                </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 border-t">
                <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                autoFocus
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
