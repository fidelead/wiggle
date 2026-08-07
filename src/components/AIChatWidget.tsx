"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, PawPrint } from "lucide-react";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const PREDEFINED_RESPONSES = [
    "¡Esa es una excelente pregunta sobre nutrición! 🍖",
    "Nuestros collares de cuero son ideales para eso. ✨",
    "¡Guau! Me encanta esa idea. 🐾",
    "Te recomendaría revisar nuestra colección de juguetes interactivos. 🎾",
    "¡Por supuesto! Hacemos envíos prioritarios a todo el país. 🚚",
    "Nuestras camas ortopédicas son perfectas para el descanso de tu peludo.  ঘুমের",
    "Mmm... déjame pensar... ¡Sí, tenemos talla para tu mascota! 📏"
];

export default function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([
                    {
                        id: 'init',
                        text: "¡Hola! Soy WiggleBot 🐾. ¿En qué puedo ayudar a tu mascota hoy?",
                        sender: 'bot',
                        timestamp: new Date()
                    }
                ]);
                setIsTyping(false);
            }, 1000);
        }
    }, [isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // TODO: Replace this with real API call to OpenAI/Gemini
        await simulateAIResponse();
    };

    const simulateAIResponse = async () => {
        // Simulate network delay
        setTimeout(() => {
            const randomResponse = PREDEFINED_RESPONSES[Math.floor(Math.random() * PREDEFINED_RESPONSES.length)];

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="pointer-events-auto w-[350px] h-[500px] mb-4 bg-[#121212]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-salmon to-purple-500 flex items-center justify-center shadow-lg">
                                    <PawPrint className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-wide">WiggleBot</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[10px] text-white/60">En línea</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-salmon text-white rounded-br-none shadow-lg'
                                                : 'bg-[#2a2a2a] text-white/90 rounded-bl-none border border-white/5'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[#2a2a2a] px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1 items-center h-[44px]">
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4], y: [0, -4, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                                        />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe tu mensaje..."
                                    className="w-full bg-[#1a1a1a] text-white text-sm rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-1 focus:ring-salmon/50 border border-white/10 placeholder:text-white/30 transition-shadow"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 p-2 bg-salmon rounded-full text-white hover:bg-salmon/90 disabled:opacity-50 disabled:hover:bg-salmon transition-colors shadow-lg"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto p-4 rounded-full shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 group
                    ${isOpen ? 'bg-[#121212] text-white rotate-90' : 'bg-salmon text-white hover:shadow-salmon/40 hover:shadow-2xl'}
                `}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
