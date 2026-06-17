import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, Button, Typography, Row, Col, Select, Tag, Progress, Segmented } from 'antd';
import { Keyboard, RefreshCw, Play, Award, AlertCircle, CheckCircle, TrendingUp, Target, Clock } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

import { ENGLISH, HINDI } from '../../utils/typingPassages';

// ─── Passage Bank ─────────────────────────────────────────────────
const EXAMS = {
  ssc_chsl: 'SSC CHSL',
  ssc_cgl: 'SSC CGL',
  court: 'Court Clerk',
  cpct: 'CPCT',
  railway: 'Railway',
};

const DURATIONS = [60, 120, 180, 300];

const BENCHMARKS = [
  { name: 'SSC CHSL', english: 35, hindi: null },
  { name: 'Court Clerk', english: 30, hindi: 30 },
  { name: 'CPCT', english: 30, hindi: 25 },
  { name: 'Railway', english: 25, hindi: 25 },
];

const getPassage = (lang, durationInSeconds = 60) => {
  const pool = lang === 'hindi' ? HINDI : ENGLISH;
  // Assume a fast typing speed of 100 WPM to generate enough words
  const targetWords = Math.ceil((durationInSeconds / 60) * 100);
  
  let combined = "";
  let currentWords = 0;
  
  while (currentWords < targetWords) {
    const randomSentence = pool[Math.floor(Math.random() * pool.length)];
    combined += (combined ? " " : "") + randomSentence;
    currentWords += randomSentence.split(/\s+/).length;
  }
  
  return combined;
};

export default function TypingTest() {
  const [lang, setLang] = useState('english');
  const [exam, setExam] = useState('ssc_chsl');
  const [duration, setDuration] = useState(60);

  const [passage, setPassage] = useState(() => getPassage('english', 60));
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | running | done
  const [timeLeft, setTimeLeft] = useState(60);
  const [result, setResult] = useState(null);
  const [allowBackspace, setAllowBackspace] = useState(true);

  // Refs to avoid stale closures in timer
  const typedRef = useRef('');
  const passageRef = useRef(passage);
  const phaseRef = useRef('idle');
  const timerRef = useRef(null);
  const textareaRef = useRef(null);
  const startTimeRef = useRef(null);
  const activeCharRef = useRef(null);
  const passageContainerRef = useRef(null);

  // Keep refs in sync with state
  useEffect(() => { typedRef.current = typed; }, [typed]);
  useEffect(() => { passageRef.current = passage; }, [passage]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Navbar Auto-Hide Logic when typing
  useEffect(() => {
    let timeoutId = null;

    const showNavbar = () => {
      window.dispatchEvent(new CustomEvent('toggle-navbar', { detail: { hide: false } }));
    };

    const hideNavbar = () => {
      if (phase === 'running') {
        window.dispatchEvent(new CustomEvent('toggle-navbar', { detail: { hide: true } }));
      }
    };

    const handleMouseMove = () => {
      showNavbar();
      if (timeoutId) clearTimeout(timeoutId);
      if (phase === 'running') {
        timeoutId = setTimeout(hideNavbar, 2000);
      }
    };

    if (phase === 'running') {
      hideNavbar();
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      showNavbar();
    }

    return () => {
      showNavbar();
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [phase]);

  // When user types, hide the navbar immediately (if mouse is not moving)
  useEffect(() => {
    if (phase === 'running' && typed.length > 0) {
      window.dispatchEvent(new CustomEvent('toggle-navbar', { detail: { hide: true } }));
    }
  }, [typed, phase]);

  // Auto-scroll passage container instead of browser window viewport
  useEffect(() => {
    if (activeCharRef.current && passageContainerRef.current && phase === 'running') {
      const container = passageContainerRef.current;
      const activeChar = activeCharRef.current;
      
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const charTop = activeChar.offsetTop;
      const charHeight = activeChar.offsetHeight;
      
      // If the character is near the bottom of the container viewport, scroll down smoothly
      if (charTop + charHeight > containerTop + containerHeight - 40) {
        container.scrollTo({
          top: charTop - containerHeight / 2,
          behavior: 'smooth'
        });
      } else if (charTop < containerTop + 20) {
        // If it's near the top, scroll up smoothly
        container.scrollTo({
          top: charTop - 20,
          behavior: 'smooth'
        });
      }
    }
  }, [typed, phase]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const computeResult = useCallback((finalTyped, timeTaken) => {
    const currentPassage = passageRef.current;
    const words = finalTyped.trim().split(/\s+/).filter(Boolean).length;
    const wpm = timeTaken > 0 ? Math.round((words / timeTaken) * 60) : 0;
    let correct = 0;
    for (let i = 0; i < finalTyped.length; i++) {
      if (finalTyped[i] === currentPassage[i]) correct++;
    }
    const errors = finalTyped.length - correct;
    const accuracy = finalTyped.length > 0
      ? Math.round((correct / finalTyped.length) * 100)
      : 100;
    setResult({ wpm, accuracy, errors, correct, chars: finalTyped.length });
    setPhase('done');
  }, []);

  const reset = useCallback(() => {
    stopTimer();
    const p = getPassage(lang, duration);
    setPassage(p);
    setTyped('');
    typedRef.current = '';
    setTimeLeft(duration);
    setPhase('idle');
    setResult(null);
    startTimeRef.current = null;
  }, [lang, exam, duration, stopTimer]);

  // Reset when config changes
  useEffect(() => { reset(); }, [lang, exam, duration]); // eslint-disable-line

  const startTest = () => {
    // Stop any existing timer
    stopTimer();

    // Get a fresh passage and sync ref immediately
    const p = getPassage(lang, duration);
    passageRef.current = p;
    setPassage(p);

    // Reset all state synchronously
    setTyped('');
    typedRef.current = '';
    setTimeLeft(duration);
    setResult(null);

    // Start the test - sync ref immediately so handleInput can use it
    phaseRef.current = 'running';
    setPhase('running');
    startTimeRef.current = Date.now();
    let remaining = duration;

    timerRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);

      if (remaining <= 0) {
        stopTimer();
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        computeResult(typedRef.current, elapsed);
      }
    }, 1000);

    setTimeout(() => textareaRef.current?.focus(), 80);
  };

  const handleInput = (e) => {
    if (phaseRef.current !== 'running') return;
    const value = e.target.value;

    // Don't allow typing beyond passage length
    if (value.length > passageRef.current.length) return;

    setTyped(value);

    // Auto-finish if completed
    if (value.length >= passageRef.current.length) {
      stopTimer();
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      computeResult(value, elapsed);
    }
  };

  const handleKeyDown = (e) => {
    if (phaseRef.current !== 'running') return;
    if (e.key === 'Backspace' && !allowBackspace) {
      e.preventDefault();
    }
  };

  const getCurrentWordRange = () => {
    const cursor = typed.length;
    if (cursor >= passage.length) return [-1, -1];
    
    let start = cursor;
    while (start > 0 && passage[start - 1] !== ' ') {
      start--;
    }
    
    let end = cursor;
    while (end < passage.length && passage[end] !== ' ') {
      end++;
    }
    
    return [start, end];
  };

  // Cleanup on unmount
  useEffect(() => () => stopTimer(), [stopTimer]);

  // ─── Render helpers ────────────────────────────────────────────
  const timerPct = Math.round((timeLeft / duration) * 100);
  const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 30 ? '#f59e0b' : '#00f2ff';

  const liveWPM = phase === 'running' && typed.length > 0 && startTimeRef.current
    ? (() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000 || 1;
        const words = typed.trim().split(/\s+/).filter(Boolean).length;
        return Math.round((words / elapsed) * 60);
      })()
    : 0;

  const liveAcc = phase === 'running' && typed.length > 0
    ? (() => {
        let c = 0;
        for (let i = 0; i < typed.length; i++) if (typed[i] === passage[i]) c++;
        return Math.round((c / typed.length) * 100);
      })()
    : 100;

  const examOptions = Object.entries(EXAMS);

  return (
    <div className="max-w-5xl mx-auto py-24 px-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
          <Keyboard size={16} className="text-primary" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">SSC • CGL • CHSL • Court • CPCT • Railway</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Typing Test Pro</h1>
        <Paragraph className="!text-gray-400 text-lg">Hindi & English — Real exam paragraphs — WPM + Accuracy</Paragraph>
      </div>

      {/* Config */}
      <Card className="glass-card !p-6 mb-6 border-none">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <Text className="text-gray-500 text-xs font-black uppercase tracking-widest shrink-0">Language</Text>
            <Segmented
              value={lang}
              onChange={v => { setLang(v); setExam(Object.keys(EXAMS)[0]); }}
              options={[{ label: '🇬🇧 English', value: 'english' }, { label: '🇮🇳 Hindi', value: 'hindi' }]}
              className="!bg-white/5"
            />
          </div>
          <div className="flex items-center gap-3">
            <Text className="text-gray-500 text-xs font-black uppercase tracking-widest shrink-0">Exam</Text>
            <Select value={exam} onChange={setExam} className="!w-36" dropdownStyle={{ backgroundColor: '#1a1a1a' }}>
              {examOptions.map(([k, label]) => <Option key={k} value={k}>{label}</Option>)}
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Text className="text-gray-500 text-xs font-black uppercase tracking-widest shrink-0">Time</Text>
            <Segmented
              value={duration}
              onChange={setDuration}
              options={DURATIONS.map(d => ({ label: `${d}s`, value: d }))}
              className="!bg-white/5"
            />
          </div>
          <div className="flex items-center gap-3">
            <Text className="text-gray-500 text-xs font-black uppercase tracking-widest shrink-0">Backspace</Text>
            <Segmented
              value={allowBackspace ? 'allowed' : 'blocked'}
              onChange={v => setAllowBackspace(v === 'allowed')}
              options={[{ label: 'Allowed', value: 'allowed' }, { label: 'Blocked', value: 'blocked' }]}
              className="!bg-white/5"
            />
          </div>
          <Button icon={<RefreshCw size={15} />} onClick={reset}
            className="!bg-white/5 !border-white/10 !text-gray-400 !rounded-xl">New Text</Button>
        </div>
      </Card>

      {/* Live stats (only while running) */}
      {phase === 'running' && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'WPM', value: liveWPM, color: 'text-primary', bg: 'bg-primary/5 border-primary/10' },
            { label: 'Time Left', value: `${timeLeft}s`, color: timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white', bg: 'bg-white/[0.02] border-white/5' },
            { label: 'Accuracy', value: `${liveAcc}%`, color: 'text-secondary', bg: 'bg-secondary/5 border-secondary/10' },
          ].map(s => (
            <div key={s.label} className={`glass-card ${s.bg} p-5 text-center rounded-2xl border`}>
              <Text className="text-gray-500 uppercase text-[10px] font-black tracking-widest block mb-2">{s.label}</Text>
              <div className={`text-3xl sm:text-4xl font-black ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── TYPING AREA ─────────────────────────────────────────── */}
      {phase !== 'done' && (
        <Card className="glass-card !p-6 sm:!p-8 mb-6">
          {phase === 'running' && (
            <div className="mb-6">
              <Progress percent={timerPct} showInfo={false} strokeColor={timerColor}
                trailColor="rgba(255,255,255,0.05)" size={['100%', 5]} />
            </div>
          )}

          {/* Passage */}
          <div
            ref={passageContainerRef}
            className="font-mono text-base sm:text-lg leading-loose mb-6 p-5 bg-black/20 rounded-2xl border border-white/5 select-none overflow-y-auto cursor-text relative"
            style={{ maxHeight: '250px', fontFamily: lang === 'hindi' ? '"Noto Sans Devanagari", sans-serif' : 'monospace' }}
            onClick={() => textareaRef.current?.focus()}
          >
            {(() => {
              const [wordStart, wordEnd] = getCurrentWordRange();
              return passage.split('').map((ch, i) => {
                let cls = 'text-gray-500'; // not yet typed
                if (i < typed.length) {
                  cls = typed[i] === ch ? 'text-green-400 font-bold' : 'text-red-400 bg-red-500/10 rounded';
                }
                const isCursor = i === typed.length && phase === 'running';
                const isCurrentWord = i >= wordStart && i < wordEnd && phase === 'running';
                return (
                  <span 
                    key={i} 
                    ref={isCursor ? activeCharRef : null}
                    className={`${cls} ${isCursor ? 'border-l-2 border-primary bg-primary/20 animate-pulse' : ''} ${isCurrentWord && !isCursor ? 'bg-white/10 px-[1px] rounded-sm' : ''}`}
                  >
                    {ch}
                  </span>
                );
              });
            })()}
          </div>

          {/* Input / Start */}
          {phase === 'idle' ? (
            <div className="text-center">
              <Button type="primary" size="large" className="neon-button !h-14 !px-12 !text-lg"
                icon={<Play size={18} />} onClick={startTest}>
                Start Typing Test
              </Button>
              <Text className="text-gray-600 block mt-3 text-sm">Press Start, then type the paragraph above</Text>
            </div>
          ) : (
            <div className="text-center relative">
              <Text className="text-primary font-bold uppercase tracking-widest text-xs block mb-3 animate-pulse">
                ↑ Keep your eyes on the paragraph above ↑
              </Text>
              <textarea
                ref={textareaRef}
                value={typed}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={e => e.preventDefault()}
                placeholder={lang === 'hindi' ? 'यहाँ टाइप करें लेकिन ऊपर देखें...' : 'Type here but look up...'}
                className="w-full bg-[#0c0721]/80 border-2 border-white/10 focus:border-primary/60 rounded-2xl p-4 text-slate-100 caret-primary text-base sm:text-lg font-mono focus:outline-none resize-none transition-all placeholder-gray-700/50"
                style={{ height: '70px', fontFamily: lang === 'hindi' ? '"Noto Sans Devanagari", sans-serif' : 'monospace' }}
                rows={1}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          )}
        </Card>
      )}

      {/* ── RESULTS ─────────────────────────────────────────────── */}
      {phase === 'done' && result && (
        <Card className="glass-card !p-8 sm:!p-10 mb-8 border-primary/20 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_rgba(0,242,255,0.2)]">
              <Award size={38} className="text-primary" />
            </div>
            <Title level={2} className="!text-white !mb-2">Test Complete!</Title>
            <Text className="text-gray-500">{EXAMS[exam]} · {lang === 'hindi' ? 'Hindi' : 'English'} · {duration}s</Text>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <TrendingUp size={26} />, label: 'WPM', value: result.wpm, color: 'text-primary', bg: 'bg-primary/5 border-primary/10' },
              { icon: <Target size={26} />, label: 'Accuracy', value: `${result.accuracy}%`, color: 'text-secondary', bg: 'bg-secondary/5 border-secondary/10' },
              { icon: <CheckCircle size={26} />, label: 'Correct', value: result.correct, color: 'text-green-400', bg: 'bg-green-500/5 border-green-500/10' },
              { icon: <AlertCircle size={26} />, label: 'Errors', value: result.errors, color: 'text-red-400', bg: 'bg-red-500/5 border-red-500/10' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} border rounded-3xl p-5 sm:p-6 text-center`}>
                <div className={`${s.color} flex justify-center mb-3`}>{s.icon}</div>
                <div className={`text-4xl font-black ${s.color} mb-1`}>{s.value}</div>
                <Text className="text-gray-500 uppercase text-[10px] font-black tracking-widest">{s.label}</Text>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div className="text-center mb-8">
            {result.wpm >= 35
              ? <Tag className="!px-6 !py-2 !rounded-full !text-base font-black !bg-green-500/10 !border-green-500/20 !text-green-400">🏆 Excellent — Exam Ready!</Tag>
              : result.wpm >= 25
              ? <Tag className="!px-6 !py-2 !rounded-full !text-base font-black !bg-blue-500/10 !border-blue-500/20 !text-blue-400">👍 Good — Keep Practicing</Tag>
              : <Tag className="!px-6 !py-2 !rounded-full !text-base font-black !bg-orange-500/10 !border-orange-500/20 !text-orange-400">📚 Needs More Practice</Tag>
            }
          </div>

          {/* Benchmarks */}
          <div className="p-6 bg-white/5 rounded-3xl border border-white/5 mb-8">
            <Text className="text-gray-500 uppercase text-[10px] font-black tracking-widest block mb-4">Exam Benchmarks</Text>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BENCHMARKS.map((b, i) => {
                const req = lang === 'hindi' ? b.hindi : b.english;
                if (!req) return null;
                const pass = result.wpm >= req;
                return (
                  <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-xl">
                    <div>
                      <Text className="text-white font-bold text-sm block">{b.name}</Text>
                      <Text className="text-gray-600 text-xs">{req} WPM</Text>
                    </div>
                    {pass
                      ? <CheckCircle size={18} className="text-green-400 shrink-0" />
                      : <AlertCircle size={18} className="text-gray-700 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          <Button type="primary" block size="large" className="neon-button !h-14 !text-lg"
            icon={<RefreshCw size={18} />} onClick={reset}>
            Try Again
          </Button>
        </Card>
      )}

      {/* Benchmarks info (idle) */}
      {phase === 'idle' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { name: 'SSC CHSL', wpm: '35 WPM', lang: 'English' },
            { name: 'Court Clerk', wpm: '30 WPM', lang: 'Hindi / English' },
            { name: 'CPCT', wpm: '30 WPM', lang: 'Hindi' },
            { name: 'Railway', wpm: '25 WPM', lang: 'English' },
          ].map((b, i) => (
            <div key={i} className="glass-card border-none bg-white/[0.02] p-5 rounded-2xl">
              <Text className="text-primary font-black text-xl block">{b.wpm}</Text>
              <Text className="text-white font-bold text-sm block mt-1">{b.name}</Text>
              <Text className="text-gray-600 text-xs">{b.lang}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
