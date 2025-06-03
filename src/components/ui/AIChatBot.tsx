"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  MapPin,
  Star,
  Clock,
  Film,
  Ticket,
} from "lucide-react";
import { Button } from "./Button";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface MovieRecommendation {
  title: string;
  cinema: string;
  distance: string;
  rating: number;
  nextSession: string;
  reason: string;
}

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Merhaba! Ben CinefyAI asistanınızım. Size hangi konuda yardımcı olabilirim?",
      timestamp: new Date(),
      suggestions: [
        "Film önerisi istiyorum",
        "Yakın sinemaları göster",
        "Bugün hangi filmler var?",
        "IMAX seansları",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sampleRecommendations: MovieRecommendation[] = [
    {
      title: "Avatar: The Way of Water",
      cinema: "CinemaMaximum Zorlu",
      distance: "2.3km",
      rating: 4.8,
      nextSession: "14:30",
      reason: "IMAX deneyimi için mükemmel",
    },
    {
      title: "Spider-Man: No Way Home",
      cinema: "Cinebonus Akasya",
      distance: "5.7km",
      rating: 4.7,
      nextSession: "19:30",
      reason: "VIP koltuklar mevcut",
    },
    {
      title: "Top Gun: Maverick",
      cinema: "CGV Mars",
      distance: "8.2km",
      rating: 4.6,
      nextSession: "16:45",
      reason: "4DX deneyimi için ideal",
    },
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("film öner") || message.includes("öneri")) {
      const randomRec =
        sampleRecommendations[
          Math.floor(Math.random() * sampleRecommendations.length)
        ];
      return `Size özel tavsiyem: **${randomRec.title}** filmi! 

🎬 **${randomRec.cinema}** (${randomRec.distance} uzaklıkta)
⭐ ${randomRec.rating}/5.0 puan
🕐 En yakın seans: ${randomRec.nextSession}
💡 ${randomRec.reason}

Bilet almak için sinema sayfasına gidebilirsiniz!`;
    }

    if (
      message.includes("yakın") ||
      message.includes("mesafe") ||
      message.includes("sinema")
    ) {
      return `Size en yakın 3 sinema:

🏢 **CinemaMaximum Zorlu** - 2.3km
   ⭐ 4.8/5.0 | 🎬 15 film | 🎯 48 seans

🏢 **Cinebonus Akasya** - 5.7km  
   ⭐ 4.6/5.0 | 🎬 12 film | 🎯 36 seans

🏢 **CGV Mars** - 8.2km
   ⭐ 4.4/5.0 | 🎬 10 film | 🎯 32 seans

Hangi sinemayı tercih edersiniz?`;
    }

    if (
      message.includes("bugün") ||
      message.includes("film") ||
      message.includes("hangi")
    ) {
      return `Bugün vizyonda olan popüler filmler:

🔥 **Avatar: The Way of Water** - Bilim Kurgu
   📍 3 sinemada, 24 seans

🔥 **Spider-Man: No Way Home** - Aksiyon  
   📍 2 sinemada, 9 seans

🆕 **Top Gun: Maverick** - Aksiyon/Drama
   📍 2 sinemada, 5 seans

Hangi film ilginizi çekiyor?`;
    }

    if (
      message.includes("imax") ||
      message.includes("4dx") ||
      message.includes("vip")
    ) {
      return `Premium deneyimler için önerilerim:

🎭 **IMAX Seansları:**
   • Avatar: The Way of Water - CinemaMaximum Zorlu
   • Spider-Man - Cinebonus Akasya

🎢 **4DX Seansları:**  
   • Top Gun: Maverick - CGV Mars

👑 **VIP Koltuklar:**
   • Tüm filmler için mevcut
   • %20-30 daha rahat deneyim

Hangi deneyimi tercih edersiniz?`;
    }

    if (
      message.includes("fiyat") ||
      message.includes("bilet") ||
      message.includes("ücret")
    ) {
      return `Güncel bilet fiyatları:

💰 **Standart Koltuk:** ₺35-45
👑 **VIP Koltuk:** ₺55-65  
🎭 **IMAX:** ₺65-85
🎢 **4DX:** ₺75-95

🎯 **İndirimler:**
- Öğrenci: %25 indirim
- 65+ yaş: %30 indirim  
- Çarşamba günleri: %20 indirim

Bilet almak için hangi seansı tercih edersiniz?`;
    }

    if (message.includes("teşekkür") || message.includes("sağol")) {
      return `Rica ederim! 😊 Başka bir konuda yardımcı olabilirim. İyi seyirler dilerim! 🎬✨`;
    }

    // Varsayılan yanıt
    return `Size yardımcı olmaya çalışıyorum! Şu konularda sorular sorabilirsiniz:

🎬 Film önerileri
📍 Yakın sinemalar  
💰 Bilet fiyatları
🎭 IMAX/4DX seansları
👑 VIP deneyimler

Başka nasıl yardımcı olabilirim?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(inputValue),
        timestamp: new Date(),
        suggestions: [
          "Başka film öner",
          "Fiyatları göster",
          "En yakın sinema",
          "IMAX seansları",
        ],
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = (message: Message) => {
    const isBot = message.type === "bot";

    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
        <div
          className={`flex items-start space-x-2 max-w-[80%] ${
            isBot ? "" : "flex-row-reverse space-x-reverse"
          }`}>
          <div
            className={`p-2 rounded-full ${
              isBot ? "bg-purple-600" : "bg-blue-600"
            }`}>
            {isBot ? (
              <Bot className="h-4 w-4 text-white" />
            ) : (
              <User className="h-4 w-4 text-white" />
            )}
          </div>

          <div
            className={`rounded-2xl p-3 ${
              isBot ? "bg-white/10 text-white" : "bg-purple-600 text-white"
            }`}>
            <div className="text-sm leading-relaxed whitespace-pre-line">
              {message.content}
            </div>
            <div
              className={`text-xs mt-2 ${
                isBot ? "text-gray-400" : "text-purple-200"
              }`}>
              {formatTime(message.timestamp)}
            </div>

            {message.suggestions && (
              <div className="flex flex-wrap gap-2 mt-3">
                {message.suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 text-xs bg-purple-500/30 hover:bg-purple-500/50 rounded-full border border-purple-400/30 text-purple-200 hover:text-white transition-colors">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 ${
          isOpen ? "hidden" : "block"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}>
        <MessageCircle className="h-6 w-6 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">CinefyAI Asistan</h3>
                  <p className="text-green-400 text-xs">🟢 Çevrimiçi</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(renderMessage)}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-purple-600 rounded-full">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/10 rounded-2xl p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
