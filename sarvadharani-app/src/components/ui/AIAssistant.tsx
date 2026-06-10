'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Phone } from 'lucide-react';
import { varieties } from '@/data/varieties';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string | React.ReactNode;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hello! I'm the Sarvadharani Assistant. I can help you with information about our seed varieties, company, or contact details. What would you like to know?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const generateResponse = (input: string): string | React.ReactNode => {
    const text = input.toLowerCase();

    // Contact matching
    if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('call') || text.includes('address') || text.includes('where')) {
      return (
        <div>
          <p className="mb-2">You can reach us at:</p>
          <ul className="space-y-1 mb-2">
            <li><strong>Phone:</strong> +91 9381027593, +91 8209574729</li>
            <li><strong>Email:</strong> sarvadharaniseeds024@gmail.com</li>
            <li><strong>Office:</strong> At-Panasaguda, Via Sikarpai, Kalyan Singpur, Rayagada, Odisha - 765017</li>
          </ul>
          <button onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView(); setIsOpen(false); }} className="text-paddy-gold underline text-sm font-semibold">Go to Contact Form</button>
        </div>
      );
    }

    // Variety specific matching
    for (const v of varieties) {
      if (text.includes(v.id.toLowerCase()) || text.includes(v.name.toLowerCase())) {
        if (text.includes('duration') || text.includes('long')) {
          return `${v.name} takes about ${v.duration} to mature.`;
        }
        if (text.includes('yield')) {
          return `${v.name} has a yield potential of ${v.yieldPotential}.`;
        }
        return (
          <div>
            <p className="mb-2"><strong>{v.name}</strong> - {v.tagline}</p>
            <p className="mb-2">{v.description}</p>
            <ul className="text-sm list-disc pl-4 space-y-1 mb-2">
              <li>Duration: {v.duration}</li>
              <li>Yield: {v.yieldPotential}</li>
              <li>Grain: {v.grainType}</li>
            </ul>
            <a href={`/products/${v.id}`} className="text-paddy-gold underline text-sm font-semibold">View Full Details</a>
          </div>
        );
      }
    }

    // Recommendation matching
    if (text.includes('recommend') || text.includes('what variety') || text.includes('which variety') || text.includes('suit me')) {
      return "We have varieties for all needs! For the highest yield, consider MTU-7029. If you need something very fast, PRATHIBA finishes in 110-115 days. For premium export quality, try SUVARNA or LALIT. You can also contact our experts for a personalized recommendation.";
    }

    if (text.includes('company') || text.includes('about') || text.includes('story')) {
      return "Sarvadharani Seeds was founded in 2024 in Rayagada, Odisha with a mission to bring science-backed, premium rice seeds directly to farmers. We currently offer 9 certified varieties and partner with over 500 farmers.";
    }

    // Fallback
    return (
      <div>
        <p className="mb-2">I'm not quite sure about that. Our agricultural experts would be happy to help you!</p>
        <button onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView(); setIsOpen(false); }} className="flex items-center gap-1 text-paddy-gold font-semibold underline text-sm">
          <Phone size={14} /> Contact Us
        </button>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking
    setTimeout(() => {
      const responseContent = generateResponse(inputValue);
      const botMessage: Message = { id: (Date.now() + 1).toString(), role: 'bot', content: responseContent };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-16 right-0 w-[340px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-paddy-gold-100 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-deep-forest text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-paddy-gold flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-jakarta font-bold text-sm">Sarvadharani Assistant</h3>
                    <p className="font-inter text-[10px] text-white/70">Always here to help</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ivory">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm font-inter ${msg.role === 'user' ? 'bg-paddy-gold text-white rounded-tr-sm' : 'bg-white border border-paddy-gold-100 text-deep-forest shadow-sm rounded-tl-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-paddy-gold-100">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about varieties, contacts..."
                    className="flex-1 bg-ivory border border-paddy-gold-100 rounded-full px-4 py-2.5 text-sm font-inter focus:outline-none focus:border-paddy-gold transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-full bg-paddy-gold text-white flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-paddy-gold-light transition-colors"
                  >
                    <Send size={16} className="ml-1" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-300 ${isOpen ? 'bg-earth-brown' : 'bg-paddy-gold'}`}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </>
  );
}
