import ProductCard from './ProductCard';

const ProductsGrid = ({ searchQuery = '', selectedCategory = 'all', aiSearchResults = [] }) => {
  // Sample product data based on figma design
  const allProducts = [
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
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    },
    {
      id: 2,
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
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
      id: 3,
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
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop"
    },
    {
      id: 4,
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
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop"
    },
    {
      id: 5,
      name: "Kahve Makinesi Deluxe",
      category: "Ev & Yaşam",
      brand: "DeLonghi",
      price: "1.899",
      originalPrice: "2.299",
      discount: 17,
      rating: 4.3,
      reviewCount: 334,
      savings: "400",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop"
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
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop"
    },
    {
      id: 7,
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
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
    },
    {
      id: 8,
      name: "Adidas Ultraboost 22 Spor Ayakkabı",
      category: "Spor & Outdoor",
      brand: "Adidas",
      price: "3.299",
      originalPrice: "3.899",
      discount: 15,
      rating: 4.5,
      reviewCount: 567,
      savings: "600",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop"
    },
    {
      id: 9,
      name: "Zara Klasik Gömlek",
      category: "Moda & Giyim",
      brand: "Zara",
      price: "299",
      originalPrice: "399",
      discount: 25,
      rating: 4.2,
      reviewCount: 234,
      savings: "100",
      isNew: false,
      isDiscounted: true,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop"
    }
  ];

  // Filtreleme fonksiyonu
  const filterProducts = () => {
    // AI arama sonuçları varsa onları göster
    if (aiSearchResults.length > 0) {
      return aiSearchResults;
    }

    let filtered = allProducts;

    // Kategori filtreleme
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Arama filtreleme
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const products = filterProducts();

  // Başlık belirleme
  const getTitle = () => {
    if (aiSearchResults.length > 0) {
      return `AI Arama Sonuçları: "${searchQuery}"`;
    }
    if (searchQuery.trim()) {
      return `"${searchQuery}" için arama sonuçları`;
    }
    if (selectedCategory !== 'all') {
      return `${selectedCategory} Kategorisi`;
    }
    return 'Tüm Ürünler';
  };

  // Açıklama belirleme
  const getDescription = () => {
    if (aiSearchResults.length > 0) {
      return `AI asistanı ${products.length} ürün buldu`;
    }
    if (searchQuery.trim()) {
      return `${products.length} ürün bulundu`;
    }
    if (selectedCategory !== 'all') {
      return `${products.length} ürün bulundu`;
    }
    return `${products.length} ürün bulundu`;
  };

  return (
    <main className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{getTitle()}</h2>
        <p className="text-gray-600">{getDescription()}</p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAIRecommendation={aiSearchResults.length > 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ürün bulunamadı</h3>
          <p className="text-gray-600">
            {searchQuery.trim() 
              ? `"${searchQuery}" için ürün bulunamadı. Farklı anahtar kelimeler deneyebilirsiniz.`
              : 'Bu kategoride ürün bulunamadı.'
            }
          </p>
        </div>
      )}
    </main>
  );
};

export default ProductsGrid; 