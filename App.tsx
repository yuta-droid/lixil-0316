
import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  Trophy, 
  ArrowRight,
  ChevronLeft,
  ExternalLink,
  QrCode,
  X,
  Star,
  Award,
  Download,
  Share2
} from 'lucide-react';
import { 
  GENERAL_CHECKLIST, 
  SEMI_LATENT_CHECKLIST, 
  LATENT_CHECKLIST, 
  DIAGNOSIS_QUESTIONS 
} from './constants';
import { UserSegment, ChecklistItem } from './types';

type ViewState = 'step1' | 'step2';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('step1');
  const [segment, setSegment] = useState<UserSegment>('unknown');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [currentDiagnosisIndex, setCurrentDiagnosisIndex] = useState(0);
  const [diagnosisAnswers, setDiagnosisAnswers] = useState<UserSegment[]>([]);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [showGacha, setShowGacha] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  // 完了状況の計算
  const segmentChecklist = useMemo(() => {
    if (segment === 'semi-latent') return SEMI_LATENT_CHECKLIST;
    if (segment === 'latent') return LATENT_CHECKLIST;
    return [];
  }, [segment]);

  const segmentCompletedCount = segmentChecklist.filter(item => completedIds.includes(item.id)).length;
  const isStep2Finished = segmentChecklist.length > 0 && segmentCompletedCount === segmentChecklist.length;
  const isAllFinished = isStep2Finished; // Step 1 is now an LP, so completion depends on Step 2 only for the final reward

  const groupedMissions = useMemo(() => {
    const groups: { name: string; items: ChecklistItem[] }[] = [];
    segmentChecklist.forEach(item => {
      const sub = item.subCategory || 'その他';
      let group = groups.find(g => g.name === sub);
      if (!group) {
        group = { name: sub, items: [] };
        groups.push(group);
      }
      group.items.push(item);
    });
    return groups;
  }, [segmentChecklist]);

  const [activeInputItem, setActiveInputItem] = useState<ChecklistItem | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // チェック項目のトグル
  const toggleItem = (id: string) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleItemClick = (item: ChecklistItem) => {
    if (item.type === 'input') {
      setActiveInputItem(item);
      return;
    }

    if (completedIds.includes(item.id)) return;

    if (item.type === 'link') {
      if (item.url) {
        window.open(item.url, '_blank');
        toggleItem(item.id);
      } else if (item.urls && item.urls.length > 0) {
        // If multiple URLs, we might want to show a choice, 
        // but for now let's just open the first one or show a menu.
        // The user said "サイト遷移後にステップをクリア", so let's just open the first one for simplicity 
        // or we can handle it in the card.
        // Actually, let's make the card show multiple buttons if urls exists.
      }
    } else {
      toggleItem(item.id);
    }
  };

  const handleSaveInput = () => {
    if (activeInputItem) {
      toggleItem(activeInputItem.id);
      setActiveInputItem(null);
    }
  };

  const handleDiagnosisOptionClick = (target: UserSegment) => {
    const newAnswers = [...diagnosisAnswers, target];
    setDiagnosisAnswers(newAnswers);

    if (currentDiagnosisIndex < DIAGNOSIS_QUESTIONS.length - 1) {
      setCurrentDiagnosisIndex(prev => prev + 1);
    } else {
      setIsDiagnosing(true);
      setShowDiagnosis(false);
      
      // Simulate diagnosis process
      setTimeout(() => {
        const latentCount = newAnswers.filter(a => a === 'latent').length;
        const finalSegment = latentCount >= 3 ? 'latent' : 'semi-latent';
        
        setSegment(finalSegment);
        setIsDiagnosing(false);
        setView('step2');
      }, 2500);
    }
  };

  const goToStep2 = () => {
    if (segment === 'unknown') {
      setCurrentDiagnosisIndex(0);
      setDiagnosisAnswers([]);
      setShowDiagnosis(true);
    } else {
      setView('step2');
    }
  };

  // QRスキャン成功のシミュレーション
  const simulateQRScan = () => {
    const incompleteItems = segmentChecklist.filter(item => !completedIds.includes(item.id));
    if (incompleteItems.length > 0) {
      const targetId = incompleteItems[0].id;
      toggleItem(targetId);
      setShowQRScanner(false);
    } else {
      setShowQRScanner(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 text-gray-800 bg-white">
      {/* Progress Area / Hero Area */}
      <div className="bg-white px-6 pb-6">
        {view === 'step2' && segment !== 'unknown' && (
          <div className="mb-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-50 border border-orange-100">
              <Star size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-sm font-black text-orange-600 tracking-wider uppercase">
                {segment === 'semi-latent' ? 'タイプA：夢ひろがる 準備フェーズ' : 'タイプB：確実に進めたい 行動フェーズ'}
              </span>
            </div>
          </div>
        )}
        
        {view === 'step1' ? (
          <div className="pt-2">
            <h2 className="text-2xl font-black leading-tight text-gray-900 mb-3 text-center">
              次にやるべきことが分かる！<br />診断コンテンツ
            </h2>
            <p className="text-sm text-gray-500 font-medium leading-relaxed text-center">
              憧れの暮らしに期待が膨らむリフォーム。<br />
              だけど、何をすれば良いかわからない悩みも...
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-end mb-2">
              <h2 className="text-xl font-bold leading-tight whitespace-pre-wrap">
                あなたにぴったりのリフォーム検討計画
              </h2>
              <div className="text-right">
                <span className="text-xs font-bold text-orange-600">
                  {`${segmentCompletedCount}/${segmentChecklist.length}`}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 flex rounded bg-orange-100">
              <div 
                style={{ width: `${(segmentCompletedCount / (segmentChecklist.length || 1)) * 100}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-500"
              ></div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <main className="px-6 mt-2">
        {view === 'step1' ? (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100">
              <p className="text-[13px] text-orange-800 font-bold leading-relaxed text-center">
                簡単なチェックで、<br />
                あなた専用のToDoリストが完成！<br />
                憧れの暮らしをスムーズに叶えましょう。
              </p>
            </div>

            <div className="flex justify-center py-4">
              <div className="w-full bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800&h=500" 
                  alt="Family Illustration" 
                  className="w-full rounded-2xl object-cover aspect-[16/10]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="pt-4 pb-8">
              <button 
                onClick={goToStep2}
                className="w-full bg-[#F36F21] text-white py-5 rounded-2xl font-black shadow-xl shadow-orange-200 flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform animate-bounce-subtle"
              >
                <span className="text-lg">今すぐ診断をはじめる</span>
                <span className="text-[10px] opacity-80 font-bold">無料であなた専用のToDoを作成</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white p-4 rounded-2xl border border-orange-100 mb-6 flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                <HelpCircle size={20} />
              </div>
              <p className="text-xs font-medium text-gray-600 leading-snug">
                診断に基づいたミッションです。<br />
                <span className="text-orange-500 font-bold">情報の記入やサイトの訪問によって条件達成となります。</span>
              </p>
            </div>
            
            <div className="space-y-10">
              {groupedMissions.map((group) => {
                const groupCompletedCount = group.items.filter(item => completedIds.includes(item.id)).length;
                const progress = (groupCompletedCount / group.items.length) * 100;
                
                return (
                  <div key={group.name} className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                          <span className="w-1.5 h-4 bg-orange-500 rounded-full"></span>
                          {group.name}
                        </h3>
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                          {groupCompletedCount} / {group.items.length}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {group.items.map(item => (
                        <ChecklistCard 
                          key={item.id}
                          item={item} 
                          completed={completedIds.includes(item.id)}
                          onClick={() => handleItemClick(item)}
                          onToggle={() => toggleItem(item.id)}
                          isMission={true}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for Completion */}
      {isAllFinished && view === 'step2' && (
        <div className="fixed bottom-6 left-0 right-0 px-6 animate-slide-up z-30">
          <button 
            onClick={() => setShowGacha(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-[#F36F21] text-white py-4 rounded-full font-bold shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform ring-4 ring-orange-100"
          >
            <Award className="text-yellow-300 animate-pulse" />
            <span>ミッションコンプリート！特典を受け取る</span>
          </button>
        </div>
      )}

      {/* QR Scanner Simulation */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-6 backdrop-blur-md">
           <button onClick={() => setShowQRScanner(false)} className="absolute top-6 right-6 text-white p-2">
             <X size={32} />
           </button>
           <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative overflow-hidden mb-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
              <QrCode size={120} className="text-white/20" />
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500"></div>
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-orange-500 shadow-[0_0_10px_orange] animate-scan-line"></div>
           </div>
           <p className="text-white font-bold text-center mb-8 leading-relaxed">
             オフラインに設置された<br />QRコードをスキャンしてください
           </p>
           <button onClick={simulateQRScan} className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold animate-pulse">
             [ シミュレーション: スキャン成功 ]
           </button>
        </div>
      )}

      {/* Input Modal */}
      {activeInputItem && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">内容を入力</h3>
              <button onClick={() => setActiveInputItem(null)} className="text-gray-400 p-1">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm font-bold text-[#F36F21] mb-4">{activeInputItem.title}</p>
            
            <div className="space-y-4 mb-6">
              {activeInputItem.inputs ? (
                activeInputItem.inputs.map(input => (
                  <div key={input.key}>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">{input.label}</label>
                    <textarea
                      className="w-full p-3 rounded-xl border-2 border-gray-100 focus:border-orange-500 focus:outline-none text-sm min-h-[80px] resize-none"
                      placeholder={input.placeholder}
                      value={inputValues[`${activeInputItem.id}_${input.key}`] || ''}
                      onChange={(e) => setInputValues(prev => ({ ...prev, [`${activeInputItem.id}_${input.key}`]: e.target.value }))}
                    />
                  </div>
                ))
              ) : (
                <textarea
                  className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 focus:outline-none text-sm min-h-[120px] resize-none"
                  placeholder={activeInputItem.inputPlaceholder}
                  value={inputValues[activeInputItem.id] || ''}
                  onChange={(e) => setInputValues(prev => ({ ...prev, [activeInputItem.id]: e.target.value }))}
                />
              )}
            </div>

            <button 
              onClick={handleSaveInput}
              className="w-full bg-[#F36F21] text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
            >
              {completedIds.includes(activeInputItem.id) ? '変更を保存' : '保存して完了'}
            </button>
          </div>
        </div>
      )}

      {/* Diagnosis Modal */}
      {showDiagnosis && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
               <div className="text-[10px] font-bold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                 Question {currentDiagnosisIndex + 1}
               </div>
               <div className="flex gap-1.5">
                 {DIAGNOSIS_QUESTIONS.map((_, i) => (
                   <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= currentDiagnosisIndex ? 'bg-orange-500' : 'bg-gray-100'}`} />
                 ))}
               </div>
            </div>
            <h3 className="text-lg font-bold mb-6 text-center leading-tight min-h-[3rem]">
              {DIAGNOSIS_QUESTIONS[currentDiagnosisIndex].question}
            </h3>
            <div className="space-y-3">
              {DIAGNOSIS_QUESTIONS[currentDiagnosisIndex].options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleDiagnosisOptionClick(option.targetSegment)}
                  className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-orange-500 active:bg-orange-50 transition-all group flex items-center justify-between"
                >
                  <span className="font-bold text-sm text-gray-700">{option.text}</span>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-orange-500 shrink-0 ml-2" />
                </button>
              ))}
            </div>
            {currentDiagnosisIndex > 0 && (
              <button 
                onClick={() => {
                  setCurrentDiagnosisIndex(prev => prev - 1);
                  setDiagnosisAnswers(prev => prev.slice(0, -1));
                }}
                className="mt-6 w-full text-center text-xs text-gray-400 font-bold py-2 hover:text-gray-600"
              >
                前の質問に戻る
              </button>
            )}
          </div>
        </div>
      )}

      {/* Diagnosing Loading Modal */}
      {isDiagnosing && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <HelpCircle className="text-orange-500 animate-pulse" size={32} />
            </div>
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2 animate-pulse">診断中...</h2>
          <p className="text-sm text-gray-500 font-medium text-center leading-relaxed">
            あなたにぴったりのプランを<br />
            シミュレーションしています
          </p>
          
          <div className="mt-12 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 animate-progress-loading"></div>
          </div>
        </div>
      )}

      {/* Reworked Gacha/Reward Modal (Rich Style) */}
      {showGacha && (
        <div className="fixed inset-0 bg-[#F36F21] z-[100] flex flex-col items-center justify-start overflow-y-auto px-6 py-12">
          {/* Confetti Background Simulation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-4 h-4 rounded-sm animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  backgroundColor: ['#FFFFFF', '#FFD700', '#FFA500'][i % 3],
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Close Button */}
          <button onClick={() => setShowGacha(false)} className="absolute top-6 right-6 text-white/80 p-2 z-10">
            <X size={28} />
          </button>

          <div className="w-full max-w-sm flex flex-col items-center text-center">
            {/* Header Graphics */}
            <div className="relative mb-8 pt-4">
              <div className="absolute -top-4 -left-4 text-yellow-300 animate-pulse"><Star size={40} fill="currentColor" /></div>
              <div className="absolute top-10 -right-8 text-white animate-bounce-subtle"><Star size={24} fill="currentColor" /></div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-full p-6 ring-8 ring-white/5 relative z-10">
                <Trophy size={80} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
              </div>
            </div>

            <h2 className="text-white text-3xl font-black mb-2 tracking-tight">MISSION CLEAR!</h2>
            <p className="text-white/90 font-medium text-sm mb-10 leading-relaxed">
              おめでとうございます！<br />
              理想の住まいづくりへの第一歩、完璧にクリアです！
            </p>

            {/* Reward Ticket Style Card */}
            <div className="w-full bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-scale-in flex flex-col">
              <div className="bg-gray-900 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-[#F36F21] rounded-sm flex items-center justify-center"><span className="text-white font-bold text-[8px]">L</span></div>
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">LIXIL Reward Ticket</span>
                </div>
                <span className="text-gray-500 text-[8px] font-mono">NO. 8234-LX-2024</span>
              </div>
              
              <div className="p-8 relative">
                {/* Decorative cutouts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F36F21] rounded-full"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F36F21] rounded-full"></div>
                
                <div className="border-2 border-dashed border-gray-100 p-6 rounded-2xl bg-orange-50/30">
                  <div className="text-[#F36F21] text-xs font-bold mb-2 tracking-widest uppercase">Special Reward</div>
                  <div className="text-3xl font-black text-gray-900 mb-1">QUO CARD</div>
                  <div className="text-4xl font-black text-[#F36F21] mb-4">¥1,000</div>
                  <div className="h-px bg-gray-200 w-full mb-4"></div>
                  <div className="flex justify-center gap-8 text-[10px] font-bold text-gray-400">
                    <div>Valid Through<br/><span className="text-gray-900">2025/12/31</span></div>
                    <div>Location<br/><span className="text-gray-900">ショールーム</span></div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 flex flex-col gap-3">
                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
                  <Download size={18} />
                  <span>チケットを保存する</span>
                </button>
                <button className="w-full bg-orange-50 text-orange-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  <Share2 size={18} />
                  <span>結果をシェアする</span>
                </button>
              </div>
            </div>

            <p className="mt-8 text-white/70 text-xs leading-relaxed max-w-[280px]">
              この画面をLIXILショールームのスタッフへ提示して、特典をお受け取りください。
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes scan-line { 0% { top: 0; } 100% { top: 100%; } }
        @keyframes float { 
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes progress-loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
        .animate-scan-line { animation: scan-line 2s infinite linear; }
        .animate-float { animation: float linear infinite; }
        .animate-progress-loading { animation: progress-loading 2.5s ease-in-out forwards; }
      `}</style>
    </div>
  );
};

interface ChecklistCardProps {
  item: ChecklistItem;
  completed: boolean;
  onClick: () => void;
  onToggle: () => void;
  isMission?: boolean;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ item, completed, onClick, onToggle, isMission }) => {
  const handleUrlClick = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank');
    if (!completed) onToggle();
  };

  return (
    <div 
      onClick={onClick}
      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
        completed 
          ? 'bg-white border-orange-500 shadow-md ring-4 ring-orange-50' 
          : 'bg-white border-white shadow-sm hover:border-gray-200'
      }`}
    >
      <div className="flex gap-4">
        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          completed ? 'bg-orange-500 border-orange-500' : 'border-gray-200 bg-white'
        }`}>
          {completed && <CheckCircle2 size={16} className="text-white" />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-bold text-[15px] leading-tight ${completed ? 'text-gray-900' : 'text-gray-700'}`}>
              {item.title}
            </h4>
            {item.type === 'link' && !completed && <ExternalLink size={14} className="text-orange-400" />}
          </div>
          <p className={`text-xs leading-relaxed font-medium mb-3 ${completed ? 'text-gray-400' : 'text-gray-500'}`}>
            {item.description}
          </p>
          
          {item.type === 'link' && !completed && (
            <div className="flex flex-wrap gap-2 mt-2">
              {item.url && (
                <button 
                  onClick={(e) => handleUrlClick(item.url!, e)}
                  className="text-[10px] bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 border border-orange-100"
                >
                  サイトを見る <ExternalLink size={10} />
                </button>
              )}
              {item.urls?.map((u, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => handleUrlClick(u.url, e)}
                  className="text-[10px] bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 border border-orange-100"
                >
                  {u.label} <ExternalLink size={10} />
                </button>
              ))}
            </div>
          )}

          {item.type === 'input' && (
            <div className="mt-2">
              <span className={`text-[10px] px-3 py-1.5 rounded-lg font-bold border ${
                completed 
                  ? 'bg-gray-50 text-gray-500 border-gray-100' 
                  : 'bg-blue-50 text-blue-600 border-blue-100'
              }`}>
                {completed ? '入力内容を確認する' : '入力を開始する'}
              </span>
            </div>
          )}
          
          {/* QR label removed */}
        </div>
      </div>
      
      {/* Stamp Effect when completed */}
      {completed && (
        <div className="absolute top-2 right-2 opacity-[0.03] rotate-12 pointer-events-none text-orange-600">
          <CheckCircle2 size={72} strokeWidth={1} />
        </div>
      )}
    </div>
  );
};

export default App;
