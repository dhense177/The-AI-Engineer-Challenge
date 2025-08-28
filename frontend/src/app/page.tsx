'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, User, Settings, Key, Zap, Eye, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function FortuneTellerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [displayedContent, setDisplayedContent] = useState('');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ensure client-side rendering to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    
    // Create floating incense particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8
    }));
    setParticles(newParticles);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // Auto-remove messages after fade-out
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => prev.slice(-3)); // Keep only last 3 messages
    }, 35000); // 35 seconds total (5s delay + 30s fade)

    return () => clearTimeout(timer);
  }, [messages.length]);

  // Function to display text character by character with delay
  const displayTextWithDelay = async (fullText: string) => {
    setDisplayedContent('');
    for (let i = 0; i <= fullText.length; i++) {
      setDisplayedContent(fullText.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const playCookieCrackSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoaW63k5Z1KFAxPps+');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const playPaperUnrollSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoaW63k5Z1KFAxPps+');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !apiKey.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');
    setDisplayedContent('');

    // Add user message to chat
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: 'You are a wise and mystical Chinese fortune teller. Respond with ancient wisdom, metaphors, and mystical language while still being helpful. Keep responses concise but profound. Use poetic language and speak as if you can see into the cosmic realm. Always end with a traditional Chinese fortune cookie style ending.',
          user_message: userMessage,
          api_key: apiKey,
          model: 'gpt-4.1-mini'
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Start the fortune cookie animation
      playCookieCrackSound();

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let accumulatedContent = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        accumulatedContent += chunk;
        setStreamingContent(accumulatedContent);
      }

      // Play paper unroll sound and display text
      playPaperUnrollSound();
      await displayTextWithDelay(accumulatedContent);

      // Add assistant message to chat
      const newAssistantMessage: Message = {
        role: 'assistant',
        content: accumulatedContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newAssistantMessage]);
      
      setStreamingContent('');
      setIsStreaming(false);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'The stars are not aligned. Please check your API key and try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsStreaming(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };



  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-amber-900 to-red-800 flex items-center justify-center">
        <div className="text-amber-200 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 relative overflow-hidden">
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
        /* Hide scrollbar when not needed */
        .scrollbar-thin:not(:hover)::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.2);
        }
      `}</style>
      {/* Cosmic Star Field Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-purple-950 to-slate-900 opacity-100"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.2),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(120,198,255,0.1),transparent_50%)]"></div>
      {/* Floating Mystical Balls */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          >
            <img 
              src="/ball_cropped.png" 
              alt="Mystical Ball" 
              className="w-10 h-10 opacity-100"
              onError={(e) => {
                console.error('Failed to load ball image:', e);
                // Fallback to a colored div if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <div 
              className="w-6 h-6 bg-gradient-to-r from-purple-400 to-red-500 rounded-full opacity-80"
              style={{ display: 'none' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black backdrop-blur-xl border-b border-purple-400/30 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
              🔮 Mystical Fortune Teller
              </h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 transition-all duration-300 border border-purple-400/50 hover:border-purple-300/70 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <Settings className="w-5 h-5 text-purple-200" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <div className={`lg:col-span-1 ${showSettings ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-black backdrop-blur-xl rounded-2xl p-6 border border-purple-400/30 shadow-2xl">
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-magenta-200 mb-4 flex items-center" style={{ fontFamily: 'Cinzel, serif' }}>
                Mystical Configuration
              </h2>
              
              <div className="space-y-4">
                                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                      <span>OpenAI API</span><Key className="w-5 h-5 ml-2 inline" />
                    </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 bg-black/40 border border-purple-400/50 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:shadow-lg focus:shadow-purple-500/25 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-[#111111] backdrop-blur-xl rounded-2xl border border-purple-400/30 h-[600px] flex flex-col shadow-2xl">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
                {messages.length === 0 && !isStreaming && (
                  <div className="text-center text-amber-300 py-12">
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-center'}`}
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: isStreaming ? 1 : [1, 1, 0]
                    }}
                    transition={{ 
                      duration: isStreaming ? 0 : 30,
                      times: isStreaming ? undefined : [0, 0.14, 1],
                      delay: isStreaming ? 0 : 5
                    }}
                  >
                    {message.role === 'user' ? (
                      <div className="max-w-2xl">
                        <motion.div
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          {/* User Message - Same format as response */}
                          <div className="max-w-xs sm:max-w-md">
                            <div className="bg-amber-50 rounded-2xl px-6 py-4 shadow-lg">
                              <div className="leading-relaxed text-purple-700 font-bold italic" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
                                {message.content}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      <div className="max-w-2xl">
                        <motion.div
                          className="relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          
                          {/* Fortune Paper */}
                          <div className="max-w-xs sm:max-w-md">
                            <div className="bg-amber-50 rounded-2xl px-6 py-4 shadow-lg">

                              <div className="leading-relaxed text-black font-bold italic" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
                                {message.content}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Streaming Fortune Cookie */}
                {isStreaming && streamingContent && (
                  <div className="flex justify-center">
                    <div className="max-w-4xl w-full">
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >

                        
                        {/* Fortune Paper - Emerging */}
                        <motion.div
                          className="max-w-xs sm:max-w-md mx-auto"
                          initial={{ height: 0, opacity: 0, y: -20 }}
                          animate={{ height: 'auto', opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                          <div className="bg-amber-50 rounded-2xl px-6 py-4 shadow-lg">
                            <div className="leading-relaxed text-black font-bold italic" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
                              {displayedContent}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="What is it that you desire?"
                      disabled={isLoading || !apiKey.trim()}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border-2 border-purple-400/50 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 italic"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    />

                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim() || !apiKey.trim()}
                    onMouseDown={() => setIsButtonPressed(true)}
                    onMouseUp={() => setIsButtonPressed(false)}
                    onMouseLeave={() => setIsButtonPressed(false)}
                    className="flex justify-center mb-4 transition-transform duration-150"
                  >
                    <div className="relative w-16 h-16">
                      {/* Left half of cookie */}
                      <motion.div
                        className="absolute inset-0 overflow-hidden"
                        animate={(isButtonPressed || isLoading || isStreaming) ? {
                          x: [-8, -12],
                          rotate: [-5, -15],
                        } : {
                          x: 0,
                          rotate: 0,
                        }}

                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <img 
                          src="/fortune-cookie-svgrepo-com.png" 
                          alt="Fortune Cookie Left" 
                          className="w-16 h-16"
                          style={{ 
                            clipPath: (isButtonPressed || isLoading || isStreaming) 
                              ? 'polygon(0 0, 0 100%, 48% 100%, 47% 85%, 49% 70%, 46% 55%, 48% 40%, 45% 25%, 47% 10%, 46% 0)'
                              : 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                          }}
                        />
                      </motion.div>
                      
                      {/* Right half of cookie */}
                      <motion.div
                        className="absolute inset-0 overflow-hidden"
                        animate={(isButtonPressed || isLoading || isStreaming) ? {
                          x: [8, 12],
                          rotate: [5, 15],
                        } : {
                          x: 0,
                          rotate: 0,
                        }}

                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <img 
                          src="/fortune-cookie-svgrepo-com.png" 
                          alt="Fortune Cookie Right" 
                          className="w-16 h-16"
                          style={{ 
                            clipPath: (isButtonPressed || isLoading || isStreaming) 
                              ? 'polygon(46% 0, 47% 10%, 45% 25%, 48% 40%, 46% 55%, 49% 70%, 47% 85%, 48% 100%, 100% 100%, 100% 0)'
                              : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                          }}
                        />
                      </motion.div>
                    </div>
                    

                    
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
