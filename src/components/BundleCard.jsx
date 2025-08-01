const BundleCard = ({ bundle, isAIRecommendation = false }) => {
  const { 
    id, 
    name, 
    category, 
    description,
    products, 
    totalPrice, 
    originalPrice, 
    discount, 
    savings,
    bundleType,
    features,
    isNew, 
    isDiscounted 
  } = bundle;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Heart Icon */}
      <button className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
        <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Bundle Header */}
      <div className="p-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
          {name}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">{category}</span>
          <span className="text-xs font-medium text-blue-600">{products.length} Ürün</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {products.slice(0, 4).map((product, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-8 h-8 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-600">{product.price} ₺</p>
              </div>
            </div>
          ))}
          {products.length > 4 && (
            <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
              <span className="text-xs text-gray-600">+{products.length - 4} ürün daha</span>
            </div>
          )}
        </div>

        {/* Bundle Features */}
        {isAIRecommendation && features && (
          <div className="mb-3 p-2 bg-blue-50 rounded border border-blue-200">
            <h4 className="text-xs font-semibold text-blue-800 mb-1.5">🎯 Neden Bu Sepeti Tercih Etmelisiniz?</h4>
            <ul className="space-y-0.5">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-blue-700 flex items-start">
                  <span className="mr-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price and Badges */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{totalPrice} ₺</span>
            {originalPrice && (
              <span className="text-xs text-gray-500 line-through">{originalPrice} ₺</span>
            )}
          </div>
          
          {/* Badges moved to price section */}
          <div className="flex flex-col gap-1">
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
            <span className="bg-blue-500 text-white text-xs font-medium px-1.5 py-0.5 rounded">
              📦 {bundleType}
            </span>
          </div>
        </div>

        {/* Savings */}
        {savings && (
          <div className="text-xs text-green-600 font-medium mb-3">
            {savings} ₺ tasarruf
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

export default BundleCard; 