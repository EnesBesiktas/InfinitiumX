import { useState, useEffect } from 'react';

const SearchTimeline = ({ isVisible, searchQuery, onComplete, onCancel, onAdditionalQuery }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [additionalQuery, setAdditionalQuery] = useState('');

  const steps = [
    {
      id: 1,
      title: "Arama başlatılıyor...",
      description: "AI asistanınız sorgunuzu analiz ediyor",
      icon: "🔍",
      duration: 10000
    },
    {
      id: 2,
      title: "Veritabanı taranıyor",
      description: "Milyonlarca ürün arasından en uygunları bulunuyor",
      icon: "📊",
      duration: 12000
    },
    {
      id: 3,
      title: "AI analizi yapılıyor",
      description: "Yapay zeka ürünleri değerlendiriyor ve sıralıyor",
      icon: "🤖",
      duration: 13000
    },
    {
      id: 4,
      title: "Sonuçlar hazırlanıyor",
      description: "En iyi öneriler sizin için derleniyor",
      icon: "✨",
      duration: 15000
    },
    {
      id: 5,
      title: "Arama tamamlandı!",
      description: `Sonuçlar hazır`,
      icon: "✅",
      duration: 5000
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setIsCompleted(false);
      return;
    }

    let timeout;
    const startTimeline = () => {
      steps.forEach((step, index) => {
        timeout = setTimeout(() => {
          setCurrentStep(index);
          
          // Son adımda tamamlandı işaretini koy
          if (index === steps.length - 1) {
            setTimeout(() => {
              setIsCompleted(true);
              onComplete();
            }, step.duration);
          }
        }, steps.slice(0, index).reduce((acc, s) => acc + s.duration, 0));
      });
    };

    startTimeline();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
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
                {index === currentStep && (
                  <div className="mt-2 bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div className="bg-purple-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        {/* Additional Query Input */}
        <div className="mt-8">
          <label htmlFor="additional-query" className="block text-sm font-medium text-gray-700 mb-2">Ek İstek Ekle</label>
          <div className="flex gap-2">
            <input
              type="text"
              id="additional-query"
              value={additionalQuery}
              onChange={(e) => setAdditionalQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Örn: daha ucuz seçenekler..."
            />
            <button
              onClick={() => onAdditionalQuery(additionalQuery)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300"
              disabled={!additionalQuery.trim()}
            >
              Gönder
            </button>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="text-center mt-4">
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Aramayı İptal Et
          </button>
        </div>

        {/* Loading Animation */}
        {!isCompleted && (
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Lütfen bekleyin...</p>
          </div>
        )}

        {/* Success Message */}
        {isCompleted && (
          <div className="mt-8 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-green-500">🎉</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Arama Tamamlandı!</h4>
            <p className="text-gray-600">Sonuçlarınız hazır</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTimeline; 