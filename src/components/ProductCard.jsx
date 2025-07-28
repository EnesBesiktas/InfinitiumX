const ProductCard = ({ product }) => {
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

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Yeni
          </span>
        )}
        {isDiscounted && (
          <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            %{discount} İndirim
          </span>
        )}
      </div>

      {/* Heart Icon */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
        <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{category}</span>
          <span className="text-sm font-medium text-purple-600">{brand}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">⭐</span>
            <span className="text-sm font-medium text-gray-700">{rating}</span>
            <span className="text-sm text-gray-500 ml-1">({reviewCount} değerlendirme)</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">{price} ₺</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">{originalPrice} ₺</span>
            )}
          </div>
        </div>

        {/* Savings */}
        {savings && (
          <div className="text-sm text-green-600 font-medium mb-3">
            {savings} ₺ tasarruf
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 