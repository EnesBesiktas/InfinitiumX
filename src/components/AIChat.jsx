import { useState, useRef, useEffect } from 'react';
import SearchTimeline from './SearchTimeline';

const AIChat = ({ isVisible, onClose, onAISearch }) => {
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
  const [showTimeline, setShowTimeline] = useState(false);
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
    },
    // Gaming Setup ürünleri
    {
      id: 7,
      name: "Logitech G Pro X Gaming Klavye",
      category: "Elektronik",
      brand: "Logitech",
      price: "2.499",
      originalPrice: "2.999",
      discount: 17,
      rating: 4.8,
      reviewCount: 456,
      savings: "500",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      tags: ["klavye", "gaming", "logitech", "oyun", "rgb", "mekanik"]
    },
    {
      id: 8,
      name: "Razer DeathAdder V3 Pro Mouse",
      category: "Elektronik",
      brand: "Razer",
      price: "1.899",
      originalPrice: "2.299",
      discount: 17,
      rating: 4.7,
      reviewCount: 234,
      savings: "400",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      tags: ["mouse", "gaming", "razer", "oyun", "kablosuz", "hassas"]
    },
    {
      id: 9,
      name: "Blue Yeti USB Mikrofon",
      category: "Elektronik",
      brand: "Blue",
      price: "1.299",
      originalPrice: "1.599",
      discount: 19,
      rating: 4.6,
      reviewCount: 189,
      savings: "300",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=400&fit=crop",
      tags: ["mikrofon", "blue", "usb", "streaming", "yayın", "ses"]
    },
    {
      id: 10,
      name: "Samsung Odyssey G7 27\" Gaming Monitör",
      category: "Elektronik",
      brand: "Samsung",
      price: "8.999",
      originalPrice: "10.999",
      discount: 18,
      rating: 4.8,
      reviewCount: 567,
      savings: "2.000",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      tags: ["monitör", "gaming", "samsung", "240hz", "curved", "oyun"]
    },
    {
      id: 11,
      name: "Intel Core i7-13700K İşlemci",
      category: "Elektronik",
      brand: "Intel",
      price: "12.999",
      originalPrice: "14.999",
      discount: 13,
      rating: 4.9,
      reviewCount: 345,
      savings: "2.000",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
      tags: ["işlemci", "intel", "core", "i7", "gaming", "performans"]
    },
    {
      id: 12,
      name: "NVIDIA RTX 4070 Ti Ekran Kartı",
      category: "Elektronik",
      brand: "NVIDIA",
      price: "24.999",
      originalPrice: "28.999",
      discount: 14,
      rating: 4.8,
      reviewCount: 234,
      savings: "4.000",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop",
      tags: ["ekran kartı", "nvidia", "rtx", "4070", "gaming", "ray tracing"]
    }
  ];

  // Bundle veritabanı
  const bundleDatabase = [
    {
      id: 1,
      name: "Gaming Setup - Fiyat Performans",
      category: "Gaming Setup",
      description: "Bütçe dostu oyuncu setup'ı",
      bundleType: "Fiyat Performans",
      products: [
        productDatabase.find(p => p.name.includes("Logitech G Pro X")),
        productDatabase.find(p => p.name.includes("Razer DeathAdder")),
        productDatabase.find(p => p.name.includes("Blue Yeti")),
        productDatabase.find(p => p.name.includes("Samsung Odyssey")),
        productDatabase.find(p => p.name.includes("Intel Core i7")),
        productDatabase.find(p => p.name.includes("RTX 4070"))
      ].filter(Boolean),
      totalPrice: "51.644",
      originalPrice: "61.844",
      discount: 16,
      savings: "10.200",
      features: [
        "💰 Bütçe dostu fiyat performans oranı",
        "🎮 Tüm modern oyunlar için yeterli performans",
        "🔧 Kolay kurulum ve uyumluluk",
        "⭐ Müşteri memnuniyeti garantili ürünler"
      ],
      isNew: true,
      isDiscounted: true
    },
    {
      id: 2,
      name: "Gaming Setup - Premium",
      category: "Gaming Setup",
      description: "En yüksek performanslı oyuncu setup'ı",
      bundleType: "Premium",
      products: [
        productDatabase.find(p => p.name.includes("Logitech G Pro X")),
        productDatabase.find(p => p.name.includes("Razer DeathAdder")),
        productDatabase.find(p => p.name.includes("Blue Yeti")),
        productDatabase.find(p => p.name.includes("Samsung Odyssey")),
        productDatabase.find(p => p.name.includes("Intel Core i7")),
        productDatabase.find(p => p.name.includes("RTX 4070"))
      ].filter(Boolean),
      totalPrice: "51.644",
      originalPrice: "61.844",
      discount: 16,
      savings: "10.200",
      features: [
        "🚀 Maksimum oyun performansı",
        "🎯 4K 240fps oyun deneyimi",
        "🎧 Profesyonel ses kalitesi",
        "💎 Premium malzeme kalitesi"
      ],
      isNew: true,
      isDiscounted: true
    },
    {
      id: 3,
      name: "Gaming Setup - Başlangıç",
      category: "Gaming Setup",
      description: "Yeni başlayan oyuncular için ideal",
      bundleType: "Başlangıç",
      products: [
        productDatabase.find(p => p.name.includes("Logitech G Pro X")),
        productDatabase.find(p => p.name.includes("Razer DeathAdder")),
        productDatabase.find(p => p.name.includes("Blue Yeti")),
        productDatabase.find(p => p.name.includes("Samsung Odyssey"))
      ].filter(Boolean),
      totalPrice: "14.696",
      originalPrice: "17.896",
      discount: 18,
      savings: "3.200",
      features: [
        "🎮 Temel oyun ihtiyaçları için yeterli",
        "💰 Uygun fiyat aralığı",
        "📈 İleride yükseltme imkanı",
        "🎯 Kolay kullanım ve kurulum"
      ],
      isNew: false,
      isDiscounted: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

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

  // Bundle arama fonksiyonu
  const searchBundles = (query) => {
    const searchTerms = query.toLowerCase().split(' ');
    
    return bundleDatabase.filter(bundle => {
      const bundleText = `${bundle.name} ${bundle.category} ${bundle.description} ${bundle.bundleType}`.toLowerCase();
      return searchTerms.some(term => bundleText.includes(term));
    });
  };

  // AI yanıt üretme fonksiyonu
  const generateAIResponse = (userQuery) => {
    const foundProducts = searchProducts(userQuery);
    const foundBundles = searchBundles(userQuery);
    
    // Çoğul arama terimleri kontrol et
    const pluralTerms = ['setup', 'oyuncu', 'gaming', 'bilgisayar', 'sistem', 'kombin', 'set'];
    const isPluralSearch = pluralTerms.some(term => userQuery.toLowerCase().includes(term));
    
    if (foundBundles.length > 0 && isPluralSearch) {
      // Bundle önerisi
      const bundleNames = foundBundles.map(b => b.name).join(', ');
      return {
        message: `"${userQuery}" için ${foundBundles.length} farklı sepet önerisi buldum: ${bundleNames}`,
        products: [],
        bundles: foundBundles
      };
    } else if (foundProducts.length === 0) {
      return {
        message: `"${userQuery}" için ürün bulamadım. Daha spesifik bir arama yapabilir misiniz? Örneğin: "iPhone telefon", "Nike ayakkabı", "oyuncu setup" gibi.`,
        products: [],
        bundles: []
      };
    } else {
      // Tekil ürün önerisi
      const topProducts = foundProducts.slice(0, 3);
      const productNames = topProducts.map(p => p.name).join(', ');
      
      return {
        message: `"${userQuery}" için ${foundProducts.length} ürün buldum. İşte en uygun ${topProducts.length} tanesi: ${productNames}`,
        products: foundProducts,
        bundles: []
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setShowTimeline(true);

    // Timeline tamamlandığında çalışacak fonksiyon
    const handleTimelineComplete = () => {
      setShowTimeline(false);
      
      // AI yanıtını simüle et
      setTimeout(() => {
        const aiResponse = generateAIResponse(inputMessage);
        
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponse.message,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);

        // AI arama sonuçlarını ana sayfaya aktar
        if (aiResponse.products.length > 0) {
          onAISearch(inputMessage, aiResponse.products);
        } else if (aiResponse.bundles.length > 0) {
          onAISearch(inputMessage, [], aiResponse.bundles);
        }
      }, 500);
    };

    // Timeline'ı başlat
    setTimeout(() => {
      handleTimelineComplete();
    }, 6000); // 6 saniye timeline süresi
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs">🤖</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">AI Asistan</h3>
              <p className="text-xs text-gray-600">Size nasıl yardımcı olabilirim?</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-48 overflow-y-auto p-3 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'ai' && (
                  <div className="flex items-center mb-1">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center mr-1">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                    <span className="text-xs text-gray-500">AI Asistan</span>
                  </div>
                )}
                
                <div
                  className={`p-2 rounded-lg text-xs ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
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
              <div className="max-w-[85%]">
                <div className="flex items-center mb-1">
                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center mr-1">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <span className="text-xs text-gray-500">AI Asistan</span>
                </div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Hangi ürünü arıyorsunuz? Örn: iPhone telefon, oyuncu setup, Nike ayakkabı..."
                className="w-full resize-none border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent max-h-20 text-xs"
                rows="1"
                style={{
                  height: 'auto',
                  minHeight: '32px'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-purple-600 text-white p-1.5 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search Timeline */}
      <SearchTimeline 
        isVisible={showTimeline}
        searchQuery={inputMessage}
        onComplete={() => {
          setShowTimeline(false);
        }}
      />
    </>
  );
};

export default AIChat; 