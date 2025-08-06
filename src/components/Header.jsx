import { useState, useEffect, useRef } from 'react';
import { searchWithAI } from '../services/api';

const Header = ({ 
  user,
  onSignIn,
  onSignOut,
  onAISearchClick, 
  onSearch, 
  showNotifications, 
  setShowNotifications, 
  showMessages, 
  setShowMessages, 
  showCart, 
  setShowCart,
  cartItems,
  removeFromCart,
  updateCartItemQuantity,
  getCartTotal,
  getCartItemCount,
  favorites,
  toggleFavorite,
  addToCart,
  clearAllFavorites
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIActive, setIsAIActive] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const headerRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (isAIActive) {
      // Trigger timeline for AI search
      onAISearchClick(searchQuery);
    } else {
      onSearch(searchQuery, false); // Existing logic for regular search
    }
  };

  const handleAIToggle = () => {
    setIsAIActive(!isAIActive);
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    setShowMessages(false);
    setShowCart(false);
    setShowFavorites(false);
    setShowProfileMenu(false);
  };

  const handleMessagesClick = () => {
    setShowMessages(!showMessages);
    setShowNotifications(false);
    setShowCart(false);
    setShowFavorites(false);
    setShowProfileMenu(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
    setShowNotifications(false);
    setShowMessages(false);
    setShowFavorites(false);
    setShowProfileMenu(false);
  };

  const handleFavoritesClick = () => {
    setShowFavorites(!showFavorites);
    setShowNotifications(false);
    setShowMessages(false);
    setShowCart(false);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
    setShowMessages(false);
    setShowCart(false);
    setShowFavorites(false);
  }

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowMessages(false);
        setShowCart(false);
        setShowFavorites(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowNotifications, setShowMessages, setShowCart, setShowFavorites, setShowProfileMenu]);

  return (
    <header ref={headerRef} className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">InfinitiumX</h1>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <form onSubmit={handleSearch} className="relative">
                <div className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                  isAIActive 
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-transparent bg-clip-padding'
                    : 'bg-white'
                }`}>
                  {/* Animated gradient border for AI mode */}
                  {isAIActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-pulse opacity-75">
                      <div className="absolute inset-[2px] rounded-lg bg-white"></div>
                    </div>
                  )}
                  
                  <div className="relative flex items-center">
                    {/* Search icon */}
                    <div className="absolute left-4 z-10">
                      {isAIActive ? (
                        <div className="relative">
                          <svg className="w-5 h-5 text-purple-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur opacity-30 animate-ping"></div>
                        </div>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      )}
                    </div>
                    
                    <input
                      type="text"
                      placeholder={isAIActive ? "✨ AI asistanına sorun..." : "🔍 Her şey burada!"}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-12 pr-16 py-3 text-sm font-medium placeholder-gray-500 bg-transparent focus:outline-none ${
                        isAIActive 
                          ? 'text-purple-800 placeholder-purple-400 border-0 focus:ring-0' 
                          : 'text-gray-700 border border-gray-300 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 shadow-sm'
                      }`}
                      style={{
                        background: isAIActive ? 'transparent' : 'white'
                      }}
                    />
                    
                    {/* Enhanced search button */}
                    <button 
                      type="submit"
                      className={`absolute right-2 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        isAIActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600'
                          : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                      }`}
                    >
                      {isAIActive ? (
                        <div className="relative">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <div className="absolute inset-0 bg-white opacity-20 rounded animate-ping"></div>
                        </div>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Search suggestions for AI mode */}
                {isAIActive && searchQuery.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <div className="p-3">
                      <p className="text-xs text-gray-500 mb-2">💡 Önerilen sorular:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Arkadaşımla akşam yemeğine çıkacağım beyaz tonda elbiseler öner',
                          'Düğünde neler giyebilirim?',
                          'Yeni gelenler ve beğenilenleri göster',
                          'Youtube kanalım için bana starter kit öner'
                        ].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(suggestion)}
                            className="px-3 py-1 text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full hover:from-purple-200 hover:to-pink-200 transition-all duration-200 transform hover:scale-105"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Enhanced AI Toggle */}
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isAIActive}
                  onChange={handleAIToggle}
                />
                
                {/* Animated container for AI toggle */}
                <div className={`relative transition-all duration-300 ${
                  isAIActive ? 'transform scale-110' : ''
                }`}>
                  {/* Colorful animated border when AI is active */}
                  {isAIActive && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 rounded-full blur-sm opacity-60 animate-spin" style={{animationDuration: '3s'}}></div>
                  )}
                  
                  {/* Main toggle */}
                  <div className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
                    isAIActive 
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg' 
                      : 'bg-gray-200'
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300`}>
                    
                    {/* Toggle button */}
                    <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-6 w-6 transition-all duration-300 flex items-center justify-center ${
                      isAIActive ? 'translate-x-5 shadow-md' : ''
                    }`}>
                      {isAIActive && (
                        <div className="relative">
                          <svg className="w-3 h-3 text-purple-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <div className="absolute inset-0 bg-purple-400 rounded-full blur opacity-40 animate-ping"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Sparkle effects when active */}
                    {isAIActive && (
                      <>
                        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute bottom-1 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                        <div className="absolute top-2 left-1 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                      </>
                    )}
                  </div>
                </div>
                
                <span className={`ml-3 text-sm font-medium transition-all duration-300 ${
                  isAIActive 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold' 
                    : 'text-gray-900'
                }`}>
                  {isAIActive ? '✨ AI Arama' : 'AI Arama'}
                </span>
                
                {/* Floating particles effect */}
                {isAIActive && (
                  <div className="absolute -top-2 -bottom-2 -left-2 -right-2 pointer-events-none">
                    <div className="absolute top-0 left-4 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '2s'}}></div>
                    <div className="absolute top-2 right-8 w-0.5 h-0.5 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.7s', animationDuration: '2.5s'}}></div>
                    <div className="absolute bottom-1 left-8 w-0.5 h-0.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '1.2s', animationDuration: '1.8s'}}></div>
                  </div>
                )}
              </label>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Favorites */}
              <button 
                onClick={handleFavoritesClick}
                className={`p-2 transition-colors relative ${showFavorites ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button 
                onClick={handleNotificationsClick}
                className={`p-2 transition-colors relative ${showNotifications ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v4.5l2.25 2.25a.75.75 0 0 1-.75 1.25H3a.75.75 0 0 1-.75-.75L4.5 14.25V9.75a6 6 0 0 1 6-6z" />
                </svg>
              </button>

              {/* Messages */}
              <button 
                onClick={handleMessagesClick}
                className={`p-2 transition-colors relative ${showMessages ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              {/* Cart */}
              <button 
                onClick={handleCartClick}
                className={`p-2 transition-colors relative ${showCart ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              </button>

              {/* Auth Section */}
              <div className="border-l border-gray-200 pl-4 ml-4">
                {user ? (
                  <div className="relative">
                    <button onClick={handleProfileClick} className="flex items-center space-x-2">
                      <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                    </button>
                    {showProfileMenu && (
                      <div className="absolute top-12 right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-4 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button onClick={onSignOut} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                           <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={onSignIn}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute top-16 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Yeni ürün eklendi</p>
                  <p className="text-xs text-gray-500 mt-1">iPhone 15 Pro Max stoklarımıza eklendi</p>
                  <p className="text-xs text-gray-400 mt-1">2 saat önce</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">İndirim fırsatı</p>
                  <p className="text-xs text-gray-500 mt-1">Samsung Galaxy S24'te %10 indirim</p>
                  <p className="text-xs text-gray-400 mt-1">5 saat önce</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sipariş durumu</p>
                  <p className="text-xs text-gray-500 mt-1">Siparişiniz kargoya verildi</p>
                  <p className="text-xs text-gray-400 mt-1">1 gün önce</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
              Tüm bildirimleri görüntüle
            </button>
          </div>
        </div>
      )}

      {/* Messages Panel */}
      {showMessages && (
        <div className="absolute top-16 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Mesajlar</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">MK</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Müşteri Hizmetleri</p>
                  <p className="text-xs text-gray-500 mt-1">Siparişinizle ilgili bilgi</p>
                  <p className="text-xs text-gray-400 mt-1">Yeni</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SS</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Satış Ekibi</p>
                  <p className="text-xs text-gray-500 mt-1">Özel teklif hakkında</p>
                  <p className="text-xs text-gray-400 mt-1">2 saat önce</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">TK</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Teknik Destek</p>
                  <p className="text-xs text-gray-500 mt-1">Ürün sorunuz hakkında</p>
                  <p className="text-xs text-gray-400 mt-1">1 gün önce</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
              Tüm mesajları görüntüle
            </button>
          </div>
        </div>
      )}

      {/* Cart Panel */}
      {showCart && (
        <div className="absolute top-16 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Sepetim ({getCartItemCount()})</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4" />
                </svg>
                <p className="text-gray-500">Sepetiniz boş</p>
                <p className="text-sm text-gray-400 mt-1">Alışverişe başlamak için ürün ekleyin</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                      <p className="text-sm font-semibold text-purple-600">{item.price} ₺</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button 
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-900">Toplam:</span>
                <span className="text-lg font-semibold text-purple-600">
                  {getCartTotal().toLocaleString('tr-TR')} ₺
                </span>
              </div>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Sepete Git
              </button>
            </div>
          )}
        </div>
      )}

      {/* Favorites Panel */}
      {showFavorites && (
        <div className="absolute top-16 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Favorilerim ({favorites.length})</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {favorites.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-gray-500">Favori listeniz boş</p>
                <p className="text-sm text-gray-400 mt-1">Beğendiğiniz ürünleri favorilere ekleyin</p>
              </div>
            ) : (
              favorites.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                      <p className="text-sm font-semibold text-purple-600">{item.price} ₺</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => toggleFavorite(item)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => addToCart && addToCart(item)}
                        className="text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {favorites.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={clearAllFavorites}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Favorileri Temizle
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;