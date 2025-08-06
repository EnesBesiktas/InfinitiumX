import { useState, useEffect } from 'react';
import { searchWithAI } from '../services/api';

const SearchTimeline = ({ isVisible, searchQuery, onComplete, onCancel, onAdditionalQuery }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [additionalQuery, setAdditionalQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [additionalPrompts, setAdditionalPrompts] = useState([]);
  const [stepProgress, setStepProgress] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Arama başlatılıyor...",
      description: "AI asistanınız sorgunuzu analiz ediyor",
      icon: "🔍",
      action: 'initialize'
    },
    {
      id: 2,
      title: "Packages API'ye bağlanıyor",
      description: "Sunucu ile bağlantı kuruluyor",
      icon: "🔗",
      action: 'connect'
    },
    {
      id: 3,
      title: "AI analizi yapılıyor",
      description: "Yapay zeka ürünleri değerlendiriyor ve sıralıyor",
      icon: "🤖",
      action: 'analyze'
    },
    {
      id: 4,
      title: "Sonuçlar işleniyor",
      description: "En iyi öneriler sizin için derleniyor",
      icon: "✨",
      action: 'process'
    },
    {
      id: 5,
      title: "Arama tamamlandı!",
      description: "Ürünler ve paketler hazır",
      icon: "✅",
      action: 'complete'
    }
  ];

  const handleAdditionalPrompt = () => {
    if (additionalQuery.trim() && !isCompleted) {
      setAdditionalPrompts(prev => [...prev, additionalQuery.trim()]);
      setAdditionalQuery('');
      // Notify parent component about the additional query
      onAdditionalQuery(additionalQuery.trim());
    }
  };

  const performAISearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Step 1: Initialize
      setCurrentStep(0);
      setStepProgress(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Connect to API
      setCurrentStep(1);
      setStepProgress(25);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 3: AI Analysis - Make actual API call
      setCurrentStep(2);
      setStepProgress(50);
      
      // Combine original query with additional prompts
      const fullQuery = additionalPrompts.length > 0
        ? `${searchQuery}. Ek istekler: ${additionalPrompts.join(', ')}`
        : searchQuery;
      
      const response = await searchWithAI(fullQuery);
      
      // Step 4: Process results
      setCurrentStep(3);
      setStepProgress(75);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 5: Complete
      setCurrentStep(4);
      setStepProgress(100);
      
      // Process and structure the response data
      const processedResults = {
        products: response.products || [],
        packages: response.packages || [],
        bundles: response.bundles || [],
        query: fullQuery,
        totalResults: (response.products?.length || 0) + (response.packages?.length || 0) + (response.bundles?.length || 0),
        additionalPrompts: additionalPrompts
      };
      
      setSearchResults(processedResults);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsCompleted(true);
      setIsLoading(false);
      
      // Pass results back to parent component
      onComplete(processedResults);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || err.message || 'Arama sırasında bir hata oluştu');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setIsCompleted(false);
      setSearchResults(null);
      setError(null);
      setIsLoading(false);
      setAdditionalPrompts([]);
      setStepProgress(0);
      return;
    }

    performAISearch();
  }, [isVisible, searchQuery]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">


        {/* Timeline */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-500 ${
                  index < currentStep 
                    ? 'bg-green-500 text-white scale-110' 
                    : index === currentStep 
                    ? 'bg-purple-500 text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {index < currentStep ? '✓' : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-0.5 h-8 mt-2 transition-all duration-500 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h4 className={`font-semibold transition-all duration-500 ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.title}
                </h4>
                <p className={`text-sm transition-all duration-500 ${
                  index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
                
                {/* Progress Bar for Current Step */}
                {index === currentStep && !isCompleted && (
                  <div className="mt-2 bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-purple-500 h-1 rounded-full transition-all duration-500" 
                      style={{ width: `${stepProgress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        {/* Additional Query Input - Only show during search */}
        {!isCompleted && !error && (
          <div className="mt-8">
            <label htmlFor="additional-query" className="block text-sm font-medium text-gray-700 mb-2">
              Ek İstek Ekle (Arama devam ederken)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="additional-query"
                value={additionalQuery}
                onChange={(e) => setAdditionalQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && additionalQuery.trim()) {
                    handleAdditionalPrompt();
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Örn: daha ucuz seçenekler, belirli marka..."
                disabled={isCompleted}
              />
              <button
                onClick={handleAdditionalPrompt}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300"
                disabled={!additionalQuery.trim() || isCompleted}
              >
                Ekle
              </button>
            </div>
            
            {/* Show added prompts */}
            {additionalPrompts.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Eklenen istekler:</p>
                <div className="flex flex-wrap gap-2">
                  {additionalPrompts.map((prompt, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      {prompt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cancel Button */}
        <div className="text-center mt-4">
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Aramayı İptal Et
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-2">⚠️</span>
              <div>
                <h4 className="text-red-800 font-semibold">Arama Hatası</h4>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setError(null);
                performAISearch();
              }}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Tekrar Dene
            </button>
          </div>
        )}

        {/* Loading Animation */}
        {!isCompleted && !error && (
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">AI arama devam ediyor...</p>
            {currentStep < steps.length - 1 && (
              <p className="text-xs text-gray-400 mt-1">
                Bu sırada ek istekler ekleyebilirsiniz
              </p>
            )}
          </div>
        )}

        {/* Success Message */}
        {isCompleted && searchResults && (
          <div className="mt-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-green-500">🎉</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Arama Tamamlandı!</h4>
              <p className="text-gray-600 mb-2">
                Toplam {searchResults.totalResults || 0} sonuç bulundu
              </p>
              
              {/* Results breakdown */}
              <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
                {searchResults.products?.length > 0 && (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    {searchResults.products.length} Ürün
                  </span>
                )}
                {searchResults.packages?.length > 0 && (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                    {searchResults.packages.length} Paket
                  </span>
                )}
                {searchResults.bundles?.length > 0 && (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    {searchResults.bundles.length} Bundle
                  </span>
                )}
              </div>
              
              {additionalPrompts.length > 0 && (
                <p className="text-xs text-gray-500 mb-4">
                  {additionalPrompts.length} ek istek dahil edildi
                </p>
              )}
            </div>

            {/* Quick preview of results */}
            {searchResults.totalResults > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-32 overflow-y-auto">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Bulunan Sonuçlar:</h5>
                <div className="space-y-1 text-xs">
                  {searchResults.products?.slice(0, 3).map((product, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {product.name || product.title || `Ürün ${index + 1}`}
                    </div>
                  ))}
                  {searchResults.packages?.slice(0, 3).map((pkg, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      {pkg.name || pkg.title || `Paket ${index + 1}`}
                    </div>
                  ))}
                  {searchResults.bundles?.slice(0, 3).map((bundle, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      {bundle.name || bundle.title || `Bundle ${index + 1}`}
                    </div>
                  ))}
                  {searchResults.totalResults > 6 && (
                    <div className="text-gray-500 text-center pt-1">
                      +{searchResults.totalResults - 6} daha fazla sonuç...
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => onComplete(searchResults)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Tüm Sonuçları Görüntüle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTimeline; 