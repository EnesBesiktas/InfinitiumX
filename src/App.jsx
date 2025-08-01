import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductsGrid from './components/ProductsGrid';
import AIChat from './components/AIChat';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState([]);
  const [aiBundleResults, setAiBundleResults] = useState([]);

  const handleAISearch = (query) => {
    setAiSearchQuery(query);
    setSearchQuery(query); // AI arama sorgusunu normal arama sorgusuna da set et
    setSelectedCategory('all'); // Kategori filtresini sıfırla
    setShowAIChat(true); // AI chat alanını göster
    
    // AI arama sonuçlarını simüle et
    const aiResults = simulateAISearch(query);
    setAiSearchResults(aiResults);
  };

  // AI Chat'ten gelen arama sonuçlarını işle
  const handleAIChatSearch = (query, products = [], bundles = []) => {
    setSearchQuery(query);
    setAiSearchResults(products);
    setAiBundleResults(bundles);
  };

  const simulateAISearch = (query) => {
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

  const handleCloseAIChat = () => {
    setShowAIChat(false);
    setAiSearchResults([]); // AI chat kapandığında sonuçları temizle
    setAiBundleResults([]); // Bundle sonuçlarını da temizle
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('all'); // Arama yapıldığında kategori filtresini sıfırla
    setAiSearchResults([]); // Normal arama yapıldığında AI sonuçlarını temizle
    setAiBundleResults([]); // Bundle sonuçlarını da temizle
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Kategori seçildiğinde arama sorgusunu sıfırla
    setAiSearchResults([]); // Kategori seçildiğinde AI sonuçlarını temizle
    setAiBundleResults([]); // Bundle sonuçlarını da temizle
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAISearchClick={handleAISearch} 
        onSearch={handleSearch}
      />
      
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <div className="flex-1">
          {/* AI Chat alanı - sadece AI arama yapıldığında göster */}
          <AIChat 
            isVisible={showAIChat} 
            onClose={handleCloseAIChat}
            onAISearch={handleAIChatSearch}
          />
          
          <ProductsGrid 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            aiSearchResults={aiSearchResults}
            aiBundleResults={aiBundleResults}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 