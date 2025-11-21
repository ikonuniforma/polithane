import { useState, useEffect } from 'react';
import { Save, RotateCcw, TestTube, History, Copy, Download, Upload, Play } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const AlgorithmSettings = () => {
  // Algorithm State
  const [algorithm, setAlgorithm] = useState({
    // Kullanıcı Tipi Çarpanları
    userTypeMultipliers: {
      normal: 1,
      party_member: 5,
      opponent_party_member: 10,
      politician_district: 15,
      politician_provincial: 20,
      politician_mp: 50,
      politician_party_vice: 75,
      politician_party_chair: 100,
      ex_politician: 30,
      media: 25,
    },
    
    // Aksiyon Ağırlıkları
    actionWeights: {
      view: 1,
      like: 5,
      comment: 10,
      share: 50,
    },
    
    // Zaman Faktörleri
    timeFactors: {
      freshPostBonus: 1.5,      // İlk 24 saat %50 bonus
      freshPostHours: 24,
      decayRate: 0.05,          // Günlük %5 azalma
      maxAgeDays: 30,           // 30 günden eski postlar puan kazanmaz
    },
    
    // Gündem Faktörleri
    agendaFactors: {
      trendingMultiplier: 2.0,  // Trend olan gündemler 2x
      hotMultiplier: 1.5,       // Hot gündemler 1.5x
    },
    
    // Verification Badge Bonusu
    verificationBonus: 1.2,     // Doğrulanmış hesaplar %20 bonus
    
    // Engagement Thresholds
    engagementThresholds: {
      viral: 10000,             // 10k+ viral kabul edilir
      trending: 5000,           // 5k+ trending
      popular: 1000,            // 1k+ popüler
    },
  });

  // Test Data
  const [testData, setTestData] = useState({
    views: 1000,
    likes: 50,
    comments: 10,
    shares: 5,
    userType: 'politician_mp',
    isVerified: true,
    ageTotalHours: 12,
    isTrending: false,
  });

  const [calculatedScore, setCalculatedScore] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [savedVersions, setSavedVersions] = useState([]);

  // Calculate Polit Score based on algorithm
  const calculateScore = () => {
    const { userTypeMultipliers, actionWeights, timeFactors, agendaFactors, verificationBonus } = algorithm;
    const { views, likes, comments, shares, userType, isVerified, ageTotalHours, isTrending } = testData;
    
    const userMultiplier = userTypeMultipliers[userType] || 1;
    
    // Base Score
    const viewScore = views * actionWeights.view * userMultiplier;
    const likeScore = likes * actionWeights.like * userMultiplier;
    const commentScore = comments * actionWeights.comment * userMultiplier;
    const shareScore = shares * actionWeights.share * userMultiplier;
    
    let baseScore = viewScore + likeScore + commentScore + shareScore;
    
    // Time Bonus
    let timeBonus = 0;
    if (ageTotalHours <= timeFactors.freshPostHours) {
      timeBonus = baseScore * (timeFactors.freshPostBonus - 1);
    }
    
    // Agenda Multiplier
    let agendaMultiplier = 1;
    if (isTrending) {
      agendaMultiplier = agendaFactors.trendingMultiplier;
    }
    
    // Verification Bonus
    let verBonus = 0;
    if (isVerified) {
      verBonus = baseScore * (verificationBonus - 1);
    }
    
    // Total Score
    const totalScore = Math.round((baseScore + timeBonus + verBonus) * agendaMultiplier);
    
    // Breakdown
    const newBreakdown = [
      { label: 'Görüntülenme', value: Math.round(viewScore), formula: `${views} × ${actionWeights.view} × ${userMultiplier}` },
      { label: 'Beğeni', value: Math.round(likeScore), formula: `${likes} × ${actionWeights.like} × ${userMultiplier}` },
      { label: 'Yorum', value: Math.round(commentScore), formula: `${comments} × ${actionWeights.comment} × ${userMultiplier}` },
      { label: 'Paylaşım', value: Math.round(shareScore), formula: `${shares} × ${actionWeights.share} × ${userMultiplier}` },
      { label: 'Temel Puan', value: Math.round(baseScore), formula: 'Toplam aksiyon puanı' },
      { label: 'Zaman Bonusu', value: Math.round(timeBonus), formula: `${timeFactors.freshPostBonus}x (ilk ${timeFactors.freshPostHours} saat)` },
      { label: 'Doğrulama Bonusu', value: Math.round(verBonus), formula: `${verificationBonus}x bonus` },
      { label: 'Gündem Çarpanı', value: agendaMultiplier, formula: isTrending ? 'Trending' : 'Normal' },
      { label: 'TOPLAM POLİT PUAN', value: totalScore, formula: 'Final hesaplama', isTotal: true },
    ];
    
    setBreakdown(newBreakdown);
    setCalculatedScore(totalScore);
  };

  // Auto calculate when test data changes
  useEffect(() => {
    calculateScore();
  }, [testData, algorithm]);

  // Save algorithm version
  const handleSave = () => {
    const version = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      algorithm: { ...algorithm },
      description: `Versiyon ${savedVersions.length + 1}`,
    };
    
    setSavedVersions(prev => [version, ...prev]);
    
    // TODO: Save to backend
    alert('Algoritma kaydedildi!');
  };

  // Reset to default
  const handleReset = () => {
    if (confirm('Algoritma varsayılan ayarlara döndürülecek. Emin misiniz?')) {
      // Reset logic
      alert('Varsayılan ayarlara döndürüldü');
    }
  };

  // Export algorithm as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(algorithm, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `polithane-algorithm-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container-main">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Polit Puan Algoritması</h1>
              <p className="text-gray-600">Platformun kalp atışını buradan yönetin</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button onClick={handleExport} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Dışa Aktar
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Sıfırla
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Algorithm Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Type Multipliers */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kullanıcı Tipi Çarpanları</h3>
              <p className="text-sm text-gray-600 mb-4">
                Her kullanıcı tipinin etkileşimlerinin ne kadar değerli olduğunu belirler
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(algorithm.userTypeMultipliers).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setAlgorithm(prev => ({
                        ...prev,
                        userTypeMultipliers: {
                          ...prev.userTypeMultipliers,
                          [key]: parseFloat(e.target.value) || 0
                        }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                      step="0.1"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Weights */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Aksiyon Ağırlıkları</h3>
              <p className="text-sm text-gray-600 mb-4">
                Her etkileşim tipinin temel puan değeri
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(algorithm.actionWeights).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                      {key}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setAlgorithm(prev => ({
                        ...prev,
                        actionWeights: {
                          ...prev.actionWeights,
                          [key]: parseFloat(e.target.value) || 0
                        }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                      step="1"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Time Factors */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zaman Faktörleri</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Taze Post Bonusu (Çarpan)
                  </label>
                  <input
                    type="number"
                    value={algorithm.timeFactors.freshPostBonus}
                    onChange={(e) => setAlgorithm(prev => ({
                      ...prev,
                      timeFactors: {
                        ...prev.timeFactors,
                        freshPostBonus: parseFloat(e.target.value) || 1
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                    step="0.1"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Taze Post Süresi (Saat)
                  </label>
                  <input
                    type="number"
                    value={algorithm.timeFactors.freshPostHours}
                    onChange={(e) => setAlgorithm(prev => ({
                      ...prev,
                      timeFactors: {
                        ...prev.timeFactors,
                        freshPostHours: parseInt(e.target.value) || 24
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                    step="1"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Agenda Factors */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gündem Faktörleri</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trending Çarpanı
                  </label>
                  <input
                    type="number"
                    value={algorithm.agendaFactors.trendingMultiplier}
                    onChange={(e) => setAlgorithm(prev => ({
                      ...prev,
                      agendaFactors: {
                        ...prev.agendaFactors,
                        trendingMultiplier: parseFloat(e.target.value) || 1
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                    step="0.1"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hot Çarpanı
                  </label>
                  <input
                    type="number"
                    value={algorithm.agendaFactors.hotMultiplier}
                    onChange={(e) => setAlgorithm(prev => ({
                      ...prev,
                      agendaFactors: {
                        ...prev.agendaFactors,
                        hotMultiplier: parseFloat(e.target.value) || 1
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                    step="0.1"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Test Panel */}
          <div className="space-y-6">
            {/* Test Calculator */}
            <div className="bg-gradient-to-br from-primary-blue to-blue-600 rounded-xl border border-blue-300 p-6 text-white sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Algoritma Test Edici</h3>
                <TestTube className="w-6 h-6" />
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Views */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Görüntülenme</label>
                  <input
                    type="number"
                    value={testData.views}
                    onChange={(e) => setTestData(prev => ({ ...prev, views: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                </div>
                
                {/* Likes */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Beğeni</label>
                  <input
                    type="number"
                    value={testData.likes}
                    onChange={(e) => setTestData(prev => ({ ...prev, likes: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                </div>
                
                {/* Comments */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Yorum</label>
                  <input
                    type="number"
                    value={testData.comments}
                    onChange={(e) => setTestData(prev => ({ ...prev, comments: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                </div>
                
                {/* Shares */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Paylaşım</label>
                  <input
                    type="number"
                    value={testData.shares}
                    onChange={(e) => setTestData(prev => ({ ...prev, shares: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                </div>
                
                {/* User Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Kullanıcı Tipi</label>
                  <select
                    value={testData.userType}
                    onChange={(e) => setTestData(prev => ({ ...prev, userType: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  >
                    {Object.keys(algorithm.userTypeMultipliers).map(type => (
                      <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
                
                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Yaş (saat)</label>
                  <input
                    type="number"
                    value={testData.ageTotalHours}
                    onChange={(e) => setTestData(prev => ({ ...prev, ageTotalHours: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                </div>
                
                {/* Checkboxes */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={testData.isVerified}
                      onChange={(e) => setTestData(prev => ({ ...prev, isVerified: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Doğrulanmış</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={testData.isTrending}
                      onChange={(e) => setTestData(prev => ({ ...prev, isTrending: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Trending</span>
                  </label>
                </div>
              </div>
              
              {/* Result */}
              <div className="bg-white/20 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-sm font-semibold mb-1">HESAPLANAN POLİT PUAN</div>
                <div className="text-4xl font-black">{calculatedScore.toLocaleString('tr-TR')} P.</div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Puan Dağılımı</h3>
              
              <div className="space-y-2">
                {breakdown.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      item.isTotal ? 'bg-primary-blue text-white font-bold' : 'bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="text-xs opacity-75">{item.formula}</div>
                    </div>
                    <div className="text-lg font-bold">
                      {typeof item.value === 'number' ? item.value.toLocaleString('tr-TR') : item.value}
                      {!item.isTotal && ' P.'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
