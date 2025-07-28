import { useState, useRef, useEffect } from 'react';

const AISearchModal = ({ isOpen, onClose, initialQuery = '' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Merhaba! TrendShop AI asistanıyım. Size nasıl yardımcı olabilirim? Hangi ürünü arıyorsunuz?',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Örnek ürün veritabanı
  const productDatabase = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      category: "Elektronik",
      brand: "Apple",
      price: "54.999",
      originalPrice: "59.999",
      discount: 8,
      rating: 4.8,
      reviewCount: 1247,
      savings: "5.000",
      isNew: true,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      tags: ["telefon", "iphone", "apple", "akıllı telefon", "elektronik", "mobil"]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra 256GB",
      category: "Elektronik",
      brand: "Samsung",
      price: "42.999",
      originalPrice: "47.999",
      discount: 10,
      rating: 4.7,
      reviewCount: 892,
      savings: "5.000",
      isNew: true,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      tags: ["telefon", "samsung", "galaxy", "akıllı telefon", "elektronik", "mobil"]
    },
    {
      id: 3,
      name: "Nike Air Max 270 Spor Ayakkabı",
      category: "Spor & Outdoor",
      brand: "Nike",
      price: "2.299",
      originalPrice: "2.899",
      discount: 21,
      rating: 4.6,
      reviewCount: 892,
      savings: "600",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      tags: ["ayakkabı", "nike", "spor", "koşu", "günlük", "rahat"]
    },
    {
      id: 4,
      name: "Elegance Uzun Akşam Elbisesi",
      category: "Moda & Giyim",
      brand: "Elegance",
      price: "899",
      originalPrice: "1.299",
      discount: 31,
      rating: 4.4,
      reviewCount: 156,
      savings: "400",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      tags: ["elbise", "akşam", "elegance", "kadın", "moda", "giyim"]
    },
    {
      id: 5,
      name: "MacBook Air M2 13\" 512GB",
      category: "Elektronik",
      brand: "Apple",
      price: "32.999",
      originalPrice: null,
      discount: null,
      rating: 4.9,
      reviewCount: 723,
      savings: null,
      isNew: true,
      isDiscounted: false,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      tags: ["laptop", "macbook", "apple", "bilgisayar", "elektronik", "iş"]
    },
    {
      id: 6,
      name: "PlayStation 5 Konsol",
      category: "Hobi & Oyuncak",
      brand: "Sony",
      price: "12.999",
      originalPrice: null,
      discount: null,
      rating: 4.7,
      reviewCount: 1543,
      savings: null,
      isNew: true,
      isDiscounted: false,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
      tags: ["oyun", "playstation", "konsol", "hobi", "eğlence", "gaming"]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, suggestedProducts]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Modal açıldığında initial query varsa otomatik olarak gönder
  useEffect(() => {
    if (isOpen && initialQuery.trim()) {
      setInputMessage(initialQuery);
      // Kısa bir gecikme ile otomatik gönder
      setTimeout(() => {
        handleSendMessage(initialQuery);
      }, 500);
    }
  }, [isOpen, initialQuery]);

  // AI ürün arama fonksiyonu
  const searchProducts = (query) => {
    const searchTerms = query.toLowerCase().split(' ');
    
    return productDatabase.filter(product => {
      const productText = `${product.name} ${product.category} ${product.brand} ${product.tags.join(' ')}`.toLowerCase();
      return searchTerms.some(term => productText.includes(term));
    }).sort((a, b) => {
      // Daha fazla eşleşme bulan ürünleri önce göster
      const aMatches = searchTerms.filter(term => 
        `${a.name} ${a.category} ${a.brand} ${a.tags.join(' ')}`.toLowerCase().includes(term)
      ).length;
      const bMatches = searchTerms.filter(term => 
        `${b.name} ${b.category} ${b.brand} ${b.tags.join(' ')}`.toLowerCase().includes(term)
      ).length;
      return bMatches - aMatches;
    });
  };

  // AI yanıt üretme fonksiyonu
  const generateAIResponse = (userQuery) => {
    const foundProducts = searchProducts(userQuery);
    
    if (foundProducts.length === 0) {
      return {
        message: `"${userQuery}" için ürün bulamadım. Daha spesifik bir arama yapabilir misiniz? Örneğin: "iPhone telefon", "Nike ayakkabı", "MacBook laptop" gibi.`,
        products: []
      };
    }
    
    const topProducts = foundProducts.slice(0, 3);
    const productNames = topProducts.map(p => p.name).join(', ');
    
    return {
      message: `"${userQuery}" için ${foundProducts.length} ürün buldum. İşte en uygun ${topProducts.length} tanesi: ${productNames}`,
      products: topProducts
    };
  };

  const handleSendMessage = async (query = null) => {
    const messageToSend = query || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // AI yanıtını simüle et
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageToSend);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.message,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setSuggestedProducts(aiResponse.products);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Asistan</h3>
              <p className="text-sm text-gray-600">AI önerileri: Telefonlar için bütçe aralığı, marka tercihi sorabilirsiniz.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-gray-600 transition-colors px-3 py-1 text-sm"
            >
              Küçült
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-sm">🤖</span>
                        </div>
                        <span className="text-sm text-gray-500">AI Asistan</span>
                      </div>
                    )}
                    
                    <div
                      className={`p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white ml-auto'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    
                    <div className={`text-xs text-gray-500 mt-1 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp.toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-sm">🤖</span>
                      </div>
                      <span className="text-sm text-gray-500">AI Asistan</span>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Hangi ürünü arıyorsunuz? Örn: iPhone telefon, Nike ayakkabı..."
                    className="w-full resize-none border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent max-h-32"
                    rows="1"
                    style={{
                      height: 'auto',
                      minHeight: '48px'
                    }}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Products */}
          {suggestedProducts.length > 0 && (
            <div className="w-80 border-l border-gray-200 p-4 overflow-y-auto">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Önerilen Ürünler</h4>
              <div className="space-y-4">
                {suggestedProducts.map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</h5>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-lg font-bold text-gray-900">{product.price} ₺</span>
                          {product.isDiscounted && (
                            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">%{product.discount} İndirim</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-black text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Sepete Ekle
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISearchModal; 