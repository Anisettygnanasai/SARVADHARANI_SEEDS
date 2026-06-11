'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Phone, Leaf } from 'lucide-react';
import { varieties } from '@/data/varieties';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string | React.ReactNode;
}

interface AIChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatInterface({ isOpen, onClose }: AIChatInterfaceProps) {
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

    // 1. Greetings & Small Talk
    if (/(hi|hello|hey|greetings|good morning|good afternoon)/.test(text)) {
      return "Hello! Welcome to Sarvadharani Seeds. How can I assist you today? You can ask me about our rice varieties, our company story, or how to contact us.";
    }
    if (/(how are you|who are you|what are you)/.test(text)) {
      return "I'm the Sarvadharani AI Assistant! I'm here to help you navigate our premium rice seed offerings, learn about our farming practices, and connect with our team. What would you like to explore?";
    }
    if (/(thanks|thank you)/.test(text)) {
      return "You're very welcome! Let me know if there's anything else you need.";
    }

    // 2. Buying / Pricing / Dealers
    if (/(buy|price|cost|purchase|dealer|distributor)/.test(text)) {
      return (
        <div>
          <p className="mb-3">For pricing, bulk purchases, or to become a dealer, please contact our sales team directly. We offer competitive rates for premium certified seeds.</p>
          <button 
            onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} 
            className="flex items-center gap-1.5 bg-deep-forest text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-paddy-gold transition-colors"
          >
            <Phone size={14} /> Get a Quote
          </button>
        </div>
      );
    }

    // 3. Farmers / Testimonials / Yield
    if (/(farmer|testimonial|review|grow|yield|harvest)/.test(text) && !text.includes('variety')) {
      return "Our seeds have consistently delivered 15-20% higher yields for farmers across Odisha and Andhra Pradesh. We work closely with our farming community to ensure they get the best results. Check out our 'Farmer Stories' section on the homepage!";
    }

    // 4. Team / Founders
    if (/(founder|team|owner|manage|director|who owns)/.test(text)) {
      return "Sarvadharani Seeds is managed by a dedicated team of agricultural experts and visionaries based in Rayagada, Odisha. We are passionate about empowering farmers with high-quality, scientifically processed seeds.";
    }

    // 5. Processing / Quality / Science
    if (/(process|quality|science|test|facility|lab)/.test(text)) {
      return "Quality is our top priority! We use state-of-the-art processing facilities to clean, sort, and test our seeds. Every batch undergoes rigorous germination and purity tests to ensure 100% reliability for our farmers.";
    }

    // 6. Sustainability / Environment
    if (/(sustainab|environment|eco|green)/.test(text)) {
      return "We believe in sustainable agriculture. Our practices focus on reducing chemical dependency, promoting soil health, and offering robust seed varieties that require fewer resources while delivering maximum yield.";
    }

    // 7. Contact matching
    if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('call') || text.includes('address') || text.includes('where') || text.includes('location')) {
      return (
        <div>
          <p className="mb-2">You can reach us directly at:</p>
          <ul className="space-y-1 mb-3">
            <li><strong>Phone:</strong> +91 9381027593, +91 8209574729</li>
            <li><strong>Email:</strong> sarvadharaniseeds024@gmail.com</li>
            <li><strong>Office:</strong> At-Panasaguda, Via Sikarpai, Kalyan Singpur, Rayagada, Odisha - 765017</li>
          </ul>
          <button 
            onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} 
            className="flex items-center gap-1.5 bg-deep-forest text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-paddy-gold transition-colors"
          >
            <Phone size={14} /> Open Contact Form
          </button>
        </div>
      );
    }

    // 8. Company matching
    if (text.includes('company') || text.includes('about') || text.includes('story') || text.includes('history')) {
      return (
        <div>
          <p className="mb-3">Sarvadharani Seeds was founded in 2024 in Rayagada, Odisha with a mission to bring science-backed, premium rice seeds directly to farmers. We focus on 100% quality processing, farmer-centric innovation, and rigorous scientific standards.</p>
          <button 
            onClick={() => { const el = document.querySelector('#story'); el?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} 
            className="text-paddy-gold underline text-sm font-semibold hover:text-paddy-gold-600 transition-colors"
          >
            Read Our Full Story
          </button>
        </div>
      );
    }

    // 9. Variety specific matching
    let foundVariety = false;
    for (const v of varieties) {
      if (text.includes(v.id.toLowerCase()) || text.includes(v.name.toLowerCase()) || text.replace(/[- ]/g, '').includes(v.id.toLowerCase().replace(/[- ]/g, ''))) {
        foundVariety = true;
        if (text.includes('duration') || text.includes('long') || text.includes('time') || text.includes('days')) {
          return `${v.name} takes about ${v.duration} to mature. It's a great choice for this cycle!`;
        }
        if (text.includes('yield') || text.includes('produce') || text.includes('output')) {
          return `${v.name} has an excellent yield potential of ${v.yieldPotential}.`;
        }
        if (text.includes('grain') || text.includes('type') || text.includes('size')) {
          return `The grain type for ${v.name} is ${v.grainType}.`;
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

    // 10. Broad varieties matching (if no specific variety matched)
    if (/(variety|varieties|rice|seed|recommend|best|types|options|catalog)/.test(text) && !foundVariety) {
      return (
        <div>
          <p className="mb-3">We offer a premium range of certified rice varieties tailored for different soils and needs. Our top performers include <strong>MTU-1001, MTU-1156, MTU-7029, SUVARNA, and DHARANI</strong>.</p>
          <button 
            onClick={() => { const el = document.querySelector('#varieties'); el?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} 
            className="flex items-center justify-center w-full gap-1.5 bg-paddy-gold text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:bg-paddy-gold-400 hover:shadow-lg transition-all"
          >
            <Leaf size={16} /> Explore All Varieties
          </button>
        </div>
      );
    }

    // 11. Fallback (Smarter)
    return (
      <div>
        <p className="mb-3">That's an interesting question! While I'm still learning about everything we do at Sarvadharani Seeds, our agricultural experts know all the answers.</p>
        <p className="mb-3">Would you like to speak directly with our team?</p>
        <button 
          onClick={() => { const el = document.querySelector('#contact'); el?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} 
          className="flex items-center gap-1.5 bg-deep-forest text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-paddy-gold transition-colors"
        >
          <Phone size={14} /> Connect With Experts
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-[4.5rem] right-0 w-[calc(100vw-3rem)] max-w-[340px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-paddy-gold-100 flex flex-col overflow-hidden z-[100]"
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
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
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
  );
}
