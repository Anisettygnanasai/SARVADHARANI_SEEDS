'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Phone, Leaf } from 'lucide-react';
import { varieties } from '@/data/varieties';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string | React.ReactNode;
}

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
          <p className="mb-2">You can reach us directly at:</p>
          <ul className="space-y-1 mb-3">
            <li><strong>Phone:</strong> +91 9381027593, +91 8209574729</li>
            <li><strong>Email:</strong> sarvadharaniseeds024@gmail.com</li>
            <li><strong>Office:</strong> At-Panasaguda, Via Sikarpai, Kalyan Singpur, Rayagada, Odisha - 765017</li>
          </ul>
          <button 
            onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} 
            className="flex items-center gap-1.5 bg-deep-forest text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-paddy-gold transition-colors"
          >
            <Phone size={14} /> Open Contact Form
          </button>
        </div>
      );
    }

    // Company matching
    if (text.includes('company') || text.includes('about') || text.includes('story') || text.includes('who are you')) {
      return (
        <div>
          <p className="mb-3">Sarvadharani Seeds was founded in 2024 in Rayagada, Odisha with a mission to bring science-backed, premium rice seeds directly to farmers. We focus on 100% quality processing, farmer-centric innovation, and rigorous scientific standards.</p>
          <button 
            onClick={() => { const el = document.querySelector('#story'); el?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} 
            className="text-paddy-gold underline text-sm font-semibold hover:text-paddy-gold-600 transition-colors"
          >
            Read Our Full Story
          </button>
        </div>
      );
    }

    // Broad varieties matching
    if (text.includes('variety') || text.includes('varieties') || text.includes('rice') || text.includes('seed') || text.includes('recommend')) {
      return (
        <div>
          <p className="mb-3">We offer a premium range of certified rice varieties tailored for different soils and needs, including <strong>MTU-1001, MTU-1156, MTU-7029, SUVARNA, DHARANI</strong>, and more.</p>
          <button 
            onClick={() => { const el = document.querySelector('#varieties'); el?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} 
            className="flex items-center justify-center w-full gap-1.5 bg-paddy-gold text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-paddy-gold-400 hover:shadow-lg transition-all"
          >
            <Leaf size={16} /> Explore Rice Varieties
          </button>
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
            <a href={`/products/${v.id}`} className="text-paddy-gold underline text-sm font-semibold hover:text-paddy-gold-600">View Full Details</a>
          </div>
        );
      }
    }

    // Fallback
    return (
      <div>
        <p className="mb-3">I'm not quite sure about that. Our agricultural experts would be happy to help you!</p>
        <button 
          onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }} 
          className="flex items-center gap-1.5 bg-deep-forest text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-paddy-gold transition-colors"
        >
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
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-[4.5rem] right-0 w-[calc(100vw-3rem)] max-w-[340px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-paddy-gold-100 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-deep-forest text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-paddy-gold flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-jakarta font-bold text-sm">Sarvadharani AI</h3>
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

        <div className="flex flex-row-reverse gap-3 items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgba(200,152,30,0.3)] transition-colors duration-300 ${isOpen ? 'bg-earth-brown' : 'bg-paddy-gold'}`}
            aria-label="Toggle AI Assistant"
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </motion.button>
          
          <motion.a
            href="https://wa.me/919381027593"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgba(37,211,102,0.3)] transition-colors duration-300 bg-[#25D366] hover:bg-[#128C7E]"
            aria-label="Chat on WhatsApp"
          >
            <WhatsappIcon />
          </motion.a>
        </div>
      </div>
    </>
  );
}
