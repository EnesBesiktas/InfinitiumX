import { useState } from 'react';

const ProductDetail = ({ product, onClose, addToCart, toggleFavorite, isFavorite }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const {
    id,
    name,
    category,
    brand,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    savings,
    isNew,
    image,
    isDiscounted
  } = product;

  // Ürün resimleri (ana resim + ek resimler)
  const productImages = [
    image,
    image.replace('w=400&h=400', 'w=600&h=600'),
    image.replace('w=400&h=400', 'w=600&h=600&fit=crop&crop=center'),
    image.replace('w=400&h=400', 'w=600&h=600&fit=crop&crop=top')
  ];

  // Ürün özellikleri
  const getProductFeatures = () => {
    const features = {
      "iPhone 15 Pro Max 256GB": [
        { icon: "🚀", title: "A17 Pro Çip", description: "Maksimum performans için tasarlandı" },
        { icon: "📱", title: "6.7 inç Ekran", description: "Super Retina XDR teknolojisi" },
        { icon: "📸", title: "48MP Kamera", description: "5x optik zoom özelliği" },
        { icon: "🔋", title: "29 Saat Pil", description: "Video oynatma süresi" },
        { icon: "💎", title: "Titanyum Tasarım", description: "Premium görünüm ve dayanıklılık" }
      ],
      "Samsung Galaxy S24 Ultra 256GB": [
        { icon: "🖋️", title: "S Pen", description: "Not alma ve çizim için" },
        { icon: "📱", title: "6.8 inç Ekran", description: "Dynamic AMOLED 2X teknolojisi" },
        { icon: "📸", title: "200MP Kamera", description: "100x zoom özelliği" },
        { icon: "🔋", title: "5000mAh Batarya", description: "Hızlı şarj desteği" },
        { icon: "🛡️", title: "Gorilla Glass", description: "Armor koruma teknolojisi" }
      ],
      "Nike Air Max 270 Spor Ayakkabı": [
        { icon: "🫧", title: "Air Max 270", description: "Maksimum yastıklama için" },
        { icon: "👟", title: "Günlük Kullanım", description: "Rahatlık için tasarlandı" },
        { icon: "🦶", title: "Anatomik Taban", description: "Doğal ayak hareketi" },
        { icon: "🔄", title: "Nefes Alabilir", description: "Hafif malzeme kullanımı" },
        { icon: "🎨", title: "Modern Tasarım", description: "Şık ve trend görünüm" }
      ],
      "Elegance Uzun Akşam Elbisesi": [
        { icon: "👗", title: "Premium Saten", description: "Yüksek kalite kumaş" },
        { icon: "✨", title: "Şık Tasarım", description: "Zarif akşam modeli" },
        { icon: "🎯", title: "Vücut Hatları", description: "Vurgulayan kesim" },
        { icon: "💎", title: "Detaylı Nakış", description: "Özel süslemeler" },
        { icon: "🌟", title: "Özel Günler", description: "İdeal kullanım alanı" }
      ],
      "MacBook Air M2 13\" 512GB": [
        { icon: "⚡", title: "M2 Çip", description: "Ultra hızlı performans" },
        { icon: "🔋", title: "18 Saat Pil", description: "Uzun kullanım süresi" },
        { icon: "💻", title: "13.6 inç Ekran", description: "Liquid Retina teknolojisi" },
        { icon: "🎵", title: "4 Hoparlör", description: "Üstün ses kalitesi" },
        { icon: "📱", title: "Uyumluluk", description: "iPhone ve iPad ile" }
      ],
      "PlayStation 5 Konsol": [
        { icon: "🎮", title: "4K 120fps", description: "Oyun deneyimi" },
        { icon: "⚡", title: "SSD Teknolojisi", description: "Anında yükleme" },
        { icon: "🎧", title: "3D Ses", description: "Gerçekçi ses deneyimi" },
        { icon: "🎯", title: "DualSense", description: "Haptik geri bildirim" },
        { icon: "🌟", title: "Geriye Uyumlu", description: "Eski oyun desteği" }
      ]
    };

    return features[name] || [
      { icon: "✅", title: "Yüksek Kalite", description: "Premium malzeme kullanımı" },
      { icon: "⭐", title: "Müşteri Memnuniyeti", description: "Garantili kalite" },
      { icon: "🚚", title: "Hızlı Teslimat", description: "Aynı gün kargo" },
      { icon: "💯", title: "Güvenilir Marka", description: "Kalite garantisi" },
      { icon: "🎯", title: "İhtiyaca Uygun", description: "Doğru seçim" }
    ];
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Miktar kadar ürün ekle
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sol Taraf - Resimler */}
            <div className="space-y-4">
              {/* Ana Resim */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Küçük Resimler */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-purple-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sağ Taraf - Ürün Bilgileri */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {isNew && (
                  <span className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    Yeni
                  </span>
                )}
                {isDiscounted && (
                  <span className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    %{discount} İndirim
                  </span>
                )}
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {category}
                </span>
              </div>

              {/* Ürün Adı ve Marka */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                <p className="text-lg text-purple-600 font-semibold">{brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span className="font-medium text-gray-700">{rating}</span>
                  <span className="text-gray-500 ml-1">({reviewCount} değerlendirme)</span>
                </div>
              </div>

              {/* Fiyat */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">{price} ₺</span>
                  {originalPrice && (
                    <span className="text-xl text-gray-500 line-through">{originalPrice} ₺</span>
                  )}
                </div>
                {savings && (
                  <p className="text-green-600 font-medium">{savings} ₺ tasarruf</p>
                )}
              </div>

              {/* Miktar Seçimi */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Miktar</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-900 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Sepete Ekle ({quantity})
                </button>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isFavorite(id)
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <svg className="w-6 h-6" fill={isFavorite(id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Ürün Özellikleri */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ürün Özellikleri</h3>
                <div className="space-y-3">
                  {getProductFeatures().map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teslimat Bilgileri */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teslimat & İade</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Ücretsiz Kargo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">14 Gün İade</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">Güvenli Ödeme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 