const Sidebar = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    { name: 'Tüm Kategoriler', count: 12847, active: selectedCategory === 'all' },
    { name: 'Elektronik', count: 2341, active: selectedCategory === 'Elektronik' },
    { name: 'Moda & Giyim', count: 3542, active: selectedCategory === 'Moda & Giyim' },
    { name: 'Ev & Yaşam', count: 1892, active: selectedCategory === 'Ev & Yaşam' },
    { name: 'Spor & Outdoor', count: 987, active: selectedCategory === 'Spor & Outdoor' },
    { name: 'Kitap & Müzik', count: 756, active: selectedCategory === 'Kitap & Müzik' },
    { name: 'Bebek & Çocuk', count: 1234, active: selectedCategory === 'Bebek & Çocuk' },
    { name: 'Kozmetik & Bakım', count: 834, active: selectedCategory === 'Kozmetik & Bakım' },
    { name: 'Otomobil & Motosiklet', count: 567, active: selectedCategory === 'Otomobil & Motosiklet' },
    { name: 'Hobi & Oyuncak', count: 694, active: selectedCategory === 'Hobi & Oyuncak' }
  ];

  const handleCategoryClick = (categoryName) => {
    const categoryKey = categoryName === 'Tüm Kategoriler' ? 'all' : categoryName;
    onCategorySelect(categoryKey);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategoriler</h2>
        
        <div className="space-y-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                category.active 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">
                  {index === 0 && '📋'}
                  {index === 1 && '💻'}
                  {index === 2 && '👕'}
                  {index === 3 && '🏠'}
                  {index === 4 && '⚽'}
                  {index === 5 && '📚'}
                  {index === 6 && '👶'}
                  {index === 7 && '💄'}
                  {index === 8 && '🚗'}
                  {index === 9 && '🎮'}
                </span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                category.active 
                  ? 'bg-white text-gray-900' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 