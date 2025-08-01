import { useState, useEffect } from 'react';

const SearchTimeline = ({ isVisible, searchQuery, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Arama başlatılıyor...",
      description: "AI asistanınız sorgunuzu analiz ediyor",
      icon: "🔍",
      duration: 1000
    },
    {
      id: 2,
      title: "Veritabanı taranıyor",
      description: "Milyonlarca ürün arasından en uygunları bulunuyor",
      icon: "📊",
      duration: 1500
    },
    {
      id: 3,
      title: "AI analizi yapılıyor",
      description: "Yapay zeka ürünleri değerlendiriyor ve sıralıyor",
      icon: "🤖",
      duration: 2000
    },
    {
      id: 4,
      title: "Sonuçlar hazırlanıyor",
      description: "En iyi öneriler sizin için derleniyor",
      icon: "✨",
      duration: 1000
    },
    {
      id: 5,
      title: "Arama tamamlandı!",
      description: `"${searchQuery}" için sonuçlar hazır`,
      icon: "✅",
      duration: 500
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AI Arama Yapılıyor</h3>
          <p className="text-gray-600">"{searchQuery}" için en iyi sonuçları buluyoruz</p>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
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