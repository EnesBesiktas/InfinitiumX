const ProductCard = ({ product, isAIRecommendation = false }) => {
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

  // AI önerileri için ürün özellikleri
  const getProductFeatures = () => {
    const features = {
      "iPhone 15 Pro Max 256GB": [
        "🚀 A17 Pro çip ile maksimum performans",
        "📱 6.7 inç Super Retina XDR ekran",
        "📸 48MP ana kamera + 5x optik zoom",
        "🔋 29 saat video oynatma süresi",
        "💎 Titanyum tasarım ile premium görünüm"
      ],
      "Samsung Galaxy S24 Ultra 256GB": [
        "🖋️ S Pen ile not alma ve çizim",
        "📱 6.8 inç Dynamic AMOLED 2X ekran",
        "📸 200MP ana kamera + 100x zoom",
        "🔋 5000mAh batarya + hızlı şarj",
        "🛡️ Gorilla Glass Armor koruma"
      ],
      "Nike Air Max 270 Spor Ayakkabı": [
        "🫧 Air Max 270 birimi ile maksimum yastıklama",
        "👟 Günlük kullanım için tasarlandı",
        "🦶 Anatomik taban ile rahatlık",
        "🔄 Hafif ve nefes alabilir malzeme",
        "🎨 Modern ve şık tasarım"
      ],
      "Elegance Uzun Akşam Elbisesi": [
        "👗 Premium saten kumaş kalitesi",
        "✨ Şık ve zarif akşam tasarımı",
        "🎯 Vücut hatlarını vurgulayan kesim",
        "💎 Detaylı nakış ve süslemeler",
        "🌟 Özel günler için ideal"
      ],
      "MacBook Air M2 13\" 512GB": [
        "⚡ M2 çip ile ultra hızlı performans",
        "🔋 18 saat pil ömrü",
        "💻 13.6 inç Liquid Retina ekran",
        "🎵 4 hoparlörlü ses sistemi",
        "📱 iPhone ve iPad ile uyumlu"
      ],
      "PlayStation 5 Konsol": [
        "🎮 4K 120fps oyun deneyimi",
        "⚡ SSD ile anında yükleme",
        "🎧 3D ses teknolojisi",
        "🎯 DualSense kontrolcü ile haptik geri bildirim",
        "🌟 Geriye uyumlu oyun desteği"
      ]
    };

    return features[name] || [
      "✅ Yüksek kalite malzeme",
      "⭐ Müşteri memnuniyeti garantili",
      "🚚 Hızlı teslimat",
      "💯 Güvenilir marka",
      "🎯 İhtiyacınıza uygun seçim"
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {isNew && (
          <span className="bg-green-500 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            Yeni
          </span>
        )}
        {isDiscounted && (
          <span className="bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            %{discount} İndirim
          </span>
        )}
        {isAIRecommendation && (
          <span className="bg-purple-500 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            🤖 AI Önerisi
          </span>
        )}
      </div>

      {/* Heart Icon */}
      <button className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
        <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image || "/api/placeholder/300/300"} 
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-600">{category}</span>
          <span className="text-xs font-medium text-purple-600">{brand}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1 text-sm">⭐</span>
            <span className="text-xs font-medium text-gray-700">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{price} ₺</span>
            {originalPrice && (
              <span className="text-xs text-gray-500 line-through">{originalPrice} ₺</span>
            )}
          </div>
        </div>

        {/* Savings */}
        {savings && (
          <div className="text-xs text-green-600 font-medium mb-2">
            {savings} ₺ tasarruf
          </div>
        )}

        {/* AI Önerileri için Özellik Açıklamaları */}
        {isAIRecommendation && (
          <div className="mb-2 p-2 bg-purple-50 rounded border border-purple-200">
            <h4 className="text-xs font-semibold text-purple-800 mb-1.5">🤖 Neden Bu Ürünü Almalısınız?</h4>
            <ul className="space-y-0.5">
              {getProductFeatures().slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-purple-700 flex items-start">
                  <span className="mr-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="w-full bg-black text-white py-2 px-3 rounded font-medium hover:bg-gray-800 transition-colors flex items-center justify-center text-sm">
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 