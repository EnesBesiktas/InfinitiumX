import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductsGrid from './components/ProductsGrid';
import AISearchModal from './components/AISearchModal';

function App() {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [aiSearchQuery, setAiSearchQuery] = useState('');

  const handleAISearchClick = () => {
    setIsAIModalOpen(true);
  };

  const handleCloseAIModal = () => {
    setIsAIModalOpen(false);
    setAiSearchQuery(''); // Modal kapandığında AI arama sorgusunu sıfırla
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('all'); // Arama yapıldığında kategori filtresini sıfırla
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Kategori seçildiğinde arama sorgusunu sıfırla
  };

  const handleAISearch = (query) => {
    setAiSearchQuery(query);
    setIsAIModalOpen(true);
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
          <ProductsGrid 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      <AISearchModal 
        isOpen={isAIModalOpen} 
        onClose={handleCloseAIModal}
        initialQuery={aiSearchQuery}
      />
    </div>
  );
}

export default App; 