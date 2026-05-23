import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import awsIcon from '../assets/aws_icon.jpeg';

const ALL_QUESTIONS = [
  {
    id: 1, category: 'EC2',
    question: 'Which EC2 pricing model lets you bid on spare capacity and is the most cost-effective for fault-tolerant workloads?',
    options: ['On-Demand', 'Reserved', 'Spot', 'Dedicated Host'],
    correct: 2,
    explanation: 'Spot Instances use spare EC2 capacity at up to 90% discount. They can be interrupted by AWS with a 2-minute warning, making them ideal for fault-tolerant, flexible workloads.'
  },
  {
    id: 2, category: 'S3',
    question: 'What S3 feature automatically moves objects between storage classes based on access patterns to reduce costs?',
    options: ['S3 Replication', 'S3 Intelligent-Tiering', 'S3 Lifecycle Policy', 'S3 Transfer Acceleration'],
    correct: 1,
    explanation: 'S3 Intelligent-Tiering automatically moves objects between frequent and infrequent access tiers based on changing access patterns, with no retrieval fees.'
  },
  {
    id: 3, category: 'IAM',
    question: 'Which IAM entity should be used to grant an EC2 instance permission to access other AWS services securely?',
    options: ['IAM User with Access Keys', 'IAM Group', 'IAM Role', 'Root Account'],
    correct: 2,
    explanation: 'IAM Roles are used to grant AWS services permissions to other AWS services. For EC2, an Instance Profile wraps the role — no long-term credentials are stored on the instance.'
  },
  {
    id: 4, category: 'VPC',
    question: 'What VPC component acts as a virtual firewall controlling inbound and outbound traffic at the subnet level?',
    options: ['Security Group', 'Network ACL', 'Route Table', 'Internet Gateway'],
    correct: 1,
    explanation: 'Network ACLs (NACLs) are stateless firewalls at the subnet level. Security Groups are stateful and operate at the instance level. NACLs evaluate rules in order by number.'
  },
  {
    id: 5, category: 'Lambda',
    question: 'What is the maximum execution timeout for a single AWS Lambda function invocation?',
    options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'],
    correct: 2,
    explanation: 'AWS Lambda has a maximum execution timeout of 15 minutes (900 seconds) per invocation. For longer processes, consider Step Functions or ECS tasks.'
  },
  {
    id: 6, category: 'RDS',
    question: 'Which RDS feature provides automatic failover to a standby replica in a different Availability Zone?',
    options: ['Read Replica', 'Multi-AZ Deployment', 'Aurora Global Database', 'RDS Proxy'],
    correct: 1,
    explanation: 'Multi-AZ deployments maintain a synchronous standby replica in a different AZ. During failure, RDS automatically fails over to the standby with minimal downtime.'
  },
  {
    id: 7, category: 'CloudFront',
    question: 'What is the name of the global network of servers that CloudFront uses to cache and deliver content?',
    options: ['Availability Zones', 'Edge Locations', 'Regional Edge Caches', 'Local Zones'],
    correct: 1,
    explanation: 'CloudFront uses Edge Locations (400+) worldwide to cache content close to users, reducing latency. Regional Edge Caches sit between origin and Edge Locations for additional caching.'
  },
  {
    id: 8, category: 'DynamoDB',
    question: 'In DynamoDB, what combination of attributes uniquely identifies each item in a table with a composite primary key?',
    options: ['Sort Key only', 'Partition Key only', 'Partition Key + Sort Key', 'Global Secondary Index'],
    correct: 2,
    explanation: 'A composite primary key consists of a Partition Key (determines the partition) and a Sort Key (orders items within that partition). Together they must be unique across all items.'
  },
  {
    id: 9, category: 'SQS',
    question: 'Which SQS queue type guarantees that messages are processed exactly once and delivered in order?',
    options: ['Standard Queue', 'Dead Letter Queue', 'FIFO Queue', 'Delay Queue'],
    correct: 2,
    explanation: 'FIFO queues guarantee exactly-once processing and strict message ordering. Standard queues offer maximum throughput with at-least-once delivery and best-effort ordering.'
  },
  {
    id: 10, category: 'CloudWatch',
    question: 'What CloudWatch feature allows you to automatically scale resources in response to metric thresholds?',
    options: ['CloudWatch Logs', 'CloudWatch Alarms', 'CloudWatch Events', 'CloudWatch Dashboards'],
    correct: 1,
    explanation: 'CloudWatch Alarms monitor metrics and trigger actions like Auto Scaling policies, SNS notifications, or EC2 actions when thresholds are breached.'
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Screens ──────────────────────────────────────────────────
const SCREEN = { START: 'start', QUIZ: 'quiz', RESULTS: 'results' };

export default function AwsQuiz() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(SCREEN.START);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);   // index of chosen option
  const [answers, setAnswers] = useState([]);        // true/false per question
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isMoving, setIsMoving] = useState(false);  // pac-man chomping only while sliding
  const movingTimer = useRef(null);
  const containerRef = useRef(null);
  const [gridState, setGridState] = useState({ x: 0, y: 0, size: 1, isVisible: false });

  // Trigger chomp for exactly the transition duration
  function triggerMove() {
    clearTimeout(movingTimer.current);
    setIsMoving(true);
    movingTimer.current = setTimeout(() => setIsMoving(false), 650);
  }

  // Grid hover effect
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const snappedX = Math.floor((e.clientX - rect.left) / 80) * 80;
    const snappedY = Math.floor((e.clientY - rect.top) / 80) * 80;
    if (!gridState.isVisible || snappedX !== gridState.x || snappedY !== gridState.y) {
      const sizes = [1, 2, 4];
      setGridState({ x: snappedX, y: snappedY, size: sizes[Math.floor(Math.random() * sizes.length)], isVisible: true });
    }
  };

  function startQuiz() {
    const q = shuffleArray(ALL_QUESTIONS);
    setQuestions(q);
    setCurrentIdx(0);
    setSelected(null);
    setAnswers([]);
    setScore(0);
    setShowExplanation(false);
    setScreen(SCREEN.QUIZ);
  }

  function handleSelect(idx) {
    if (selected !== null) return; // already answered
    setSelected(idx);
    setShowExplanation(true);
    const isCorrect = idx === questions[currentIdx].correct;
    setAnswers((prev) => [...prev, isCorrect]);
    if (isCorrect) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentIdx + 1 >= questions.length) {
      setScreen(SCREEN.RESULTS);
    } else {
      triggerMove();
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }

  function handleBack() {
    if (currentIdx === 0) return;
    triggerMove();
    // Going back — remove last answer
    setAnswers((prev) => prev.slice(0, -1));
    if (answers[answers.length - 1]) setScore((s) => s - 1);
    setCurrentIdx((i) => i - 1);
    setSelected(null);
    setShowExplanation(false);
  }

  const q = questions[currentIdx];
  const progress = questions.length ? ((currentIdx) / questions.length) * 100 : 0;
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;

  // ── Option state styles ───────────────────────────────────
  function optionStyle(idx) {
    if (selected === null) return { border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' };
    if (idx === q.correct) return { border: '1px solid #639922', background: 'rgba(99,153,34,0.18)', color: '#a8e063' };
    if (idx === selected && idx !== q.correct) return { border: '1px solid #E24B4A', background: 'rgba(226,75,74,0.18)', color: '#f87171' };
    return { border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', opacity: 0.45 };
  }

  function letterBadgeStyle(idx) {
    if (selected === null) return { background: 'rgba(255,255,255,0.08)', color: '#dbc2ad' };
    if (idx === q.correct) return { background: '#639922', color: '#fff' };
    if (idx === selected && idx !== q.correct) return { background: '#E24B4A', color: '#fff' };
    return { background: 'rgba(255,255,255,0.06)', color: '#dbc2ad' };
  }

  const scoreMsg = pct >= 90 ? '🏆 Cloud Architect!' : pct >= 70 ? '⚡ Well done!' : pct >= 50 ? '📘 Keep learning!' : '🔄 Try again!';

  // ── Shared grid background layer ─────────────────────────
  const GridLayer = () => (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    >
      <div
        className="absolute hidden md:block pointer-events-none mix-blend-screen"
        style={{
          backgroundColor: '#FF9900',
          left: `${gridState.x}px`,
          top: `${gridState.y}px`,
          width: `${80 * gridState.size}px`,
          height: `${80 * gridState.size}px`,
          opacity: gridState.isVisible ? 0.18 : 0,
          transition: 'opacity 150ms ease-out',
        }}
      />
    </div>
  );

  // ═══════════════════════════════════════════════════════════
  // START SCREEN
  // ═══════════════════════════════════════════════════════════
  if (screen === SCREEN.START) {
    return (
      <div
        className="min-h-screen bg-[#0A0C10] text-[#f1dfd1] flex flex-col relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setGridState((s) => ({ ...s, isVisible: false }))}
      >
        <GridLayer />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0C10]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src={awsIcon} alt="AWS" className="w-7 h-7 rounded-full object-cover" />
            <span className="font-mono text-sm text-[#dbc2ad] tracking-widest uppercase">AWS QUIZ</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="font-mono text-xs text-[#dbc2ad] border border-white/10 px-4 py-2 hover:border-[#FF9900]/50 hover:text-[#FF9900] transition-all uppercase tracking-widest"
          >
            ← Exit
          </button>
        </nav>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
          {/* Orange accent blocks */}
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-[#FF9900] opacity-10 hidden md:block pointer-events-none" />
          <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-[#FF9900] opacity-10 hidden md:block pointer-events-none" />

          <div className="max-w-xl w-full text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 font-mono text-xs text-[#dbc2ad] uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FF9900] animate-pulse" />
              Cloud Knowledge Test
            </div>

            <h1 className="font-mono text-5xl md:text-6xl font-bold text-white tracking-widest leading-tight mb-6">
              AWS<br /><span className="text-[#FF9900]">QUIZ</span>
            </h1>

            <p className="text-[#dbc2ad] text-base leading-relaxed mb-10 border-l-2 border-[#FF9900] pl-5 text-left">
              Test your AWS cloud knowledge across 10 domains — EC2, S3, IAM, VPC, Lambda, RDS, CloudFront, DynamoDB, SQS, and CloudWatch.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[['10', 'Questions'], ['4', 'Options Each'], ['Instant', 'Feedback']].map(([v, l]) => (
                <div key={l} className="border border-white/10 bg-white/3 p-4 text-center">
                  <div className="font-mono text-2xl font-bold text-[#FF9900]">{v}</div>
                  <div className="font-mono text-[10px] text-[#dbc2ad] uppercase tracking-widest mt-1">{l}</div>
                </div>
              ))}
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-[#FF9900] text-[#111] font-mono text-sm font-bold px-8 py-4 hover:bg-[#ffc082] transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
            >
              INITIATE QUIZ
              <span className="material-symbols-outlined text-base">terminal</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // RESULTS SCREEN
  // ═══════════════════════════════════════════════════════════
  if (screen === SCREEN.RESULTS) {
    return (
      <div
        className="min-h-screen bg-[#0A0C10] text-[#f1dfd1] flex flex-col relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setGridState((s) => ({ ...s, isVisible: false }))}
      >
        <GridLayer />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0C10]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src={awsIcon} alt="AWS" className="w-7 h-7 rounded-full object-cover" />
            <span className="font-mono text-sm text-[#dbc2ad] tracking-widest uppercase">AWS QUIZ — Results</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="font-mono text-xs text-[#dbc2ad] border border-white/10 px-4 py-2 hover:border-[#FF9900]/50 hover:text-[#FF9900] transition-all uppercase tracking-widest"
          >
            ← Home
          </button>
        </nav>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-lg w-full">

            {/* Score Ring + Headline */}
            <div className="border border-white/10 bg-white/3 p-6 mb-4 flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                  <circle
                    cx="45" cy="45" r="38" fill="none" stroke="#FF9900" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - pct / 100)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 45 45)"
                    style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-white">{score}/10</span>
              </div>
              <div>
                <div className="font-mono text-4xl font-bold text-white">{pct}%</div>
                <div className="font-mono text-sm text-[#dbc2ad] mt-1">{scoreMsg}</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Correct', val: score, color: '#a8e063', bg: 'rgba(99,153,34,0.12)', border: '#639922' },
                { label: 'Wrong', val: 10 - score, color: '#f87171', bg: 'rgba(226,75,74,0.12)', border: '#E24B4A' },
                { label: 'Total', val: 10, color: '#f1dfd1', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)' },
                { label: 'Score', val: `${pct}%`, color: '#FF9900', bg: 'rgba(255,153,0,0.12)', border: 'rgba(255,153,0,0.4)' },
              ].map((s) => (
                <div key={s.label} className="p-3 text-center" style={{ border: `1px solid ${s.border}`, background: s.bg }}>
                  <div className="font-mono text-[10px] text-[#dbc2ad] uppercase tracking-widest mb-1">{s.label}</div>
                  <div className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Answer trail */}
            <div className="border border-white/10 bg-white/3 p-4 mb-4">
              <div className="font-mono text-[10px] text-[#dbc2ad] uppercase tracking-widest mb-3">Answer Trail</div>
              <div className="flex gap-2">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className="flex-1 h-2.5 rounded-full"
                    style={{ background: correct ? '#639922' : '#E24B4A' }}
                    title={`Q${i + 1}: ${correct ? 'Correct' : 'Wrong'}`}
                  />
                ))}
              </div>
              <div className="font-mono text-[10px] text-[#dbc2ad] mt-2 italic">Green = correct · Red = wrong</div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startQuiz}
                className="border border-white/15 bg-white/3 text-[#f1dfd1] font-mono text-xs py-3 hover:border-white/30 transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Try Again
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-[#FF9900] text-[#111] font-mono text-xs py-3 hover:bg-[#ffc082] transition-colors uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // QUIZ SCREEN
  // ═══════════════════════════════════════════════════════════
  return (
    <div
      className="min-h-screen bg-[#0A0C10] text-[#f1dfd1] flex flex-col relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGridState((s) => ({ ...s, isVisible: false }))}
    >
      <GridLayer />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0C10]/80 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <img src={awsIcon} alt="AWS" className="w-7 h-7 rounded-full object-cover" />
          <span className="font-mono text-sm text-[#dbc2ad] tracking-widest uppercase">AWS QUIZ</span>
        </div>
        <button
          onClick={() => setScreen(SCREEN.START)}
          className="font-mono text-xs text-[#dbc2ad] border border-white/10 px-4 py-2 hover:border-[#FF9900]/50 hover:text-[#FF9900] transition-all uppercase tracking-widest"
        >
          ← Exit
        </button>
      </nav>

      {/* Pac-Man Progress Bar */}
      <div className="relative z-10 px-6 pt-5 pb-0 flex-shrink-0">
        <style>{`
          @keyframes pacman-chomp {
            0%   { clip-path: polygon(50% 50%, 100% 15%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 85%); }
            25%  { clip-path: polygon(50% 50%, 100% 50%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 50%); }
            50%  { clip-path: polygon(50% 50%, 100% 85%, 100% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 15%); }
            75%  { clip-path: polygon(50% 50%, 100% 50%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 50%); }
            100% { clip-path: polygon(50% 50%, 100% 15%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 85%); }
          }
          @keyframes dot-eaten {
            0%   { opacity: 1; transform: scale(1); }
            80%  { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
          }
        `}</style>
        <div className="max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-[#dbc2ad] uppercase tracking-widest">Q {currentIdx + 1} of {questions.length}</span>
            <span className="font-mono text-xs text-[#dbc2ad] uppercase tracking-widest">{Math.round(progress)}% complete</span>
          </div>

          {/* Track */}
          <div className="relative w-full h-5 flex items-center">
            {/* Background track */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center">
              <div className="w-full h-[6px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {/* Dots on the remaining track */}
            <div className="absolute inset-0 flex items-center pointer-events-none">
              {Array.from({ length: 10 }).map((_, i) => {
                const dotPct = ((i + 0.5) / 10) * 100;
                const isEaten = dotPct <= progress;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: `${dotPct}%`, transform: 'translateX(-50%)' }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: isEaten ? 'transparent' : 'rgba(255,255,255,0.25)',
                        transition: 'background 0.3s ease',
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Eaten / filled track */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[6px] rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #FF9900cc, #FF9900)',
                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />

            {/* Pac-Man */}
            {progress > 0 && progress < 100 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{
                  left: `${progress}%`,
                  transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '20px',
                  height: '20px',
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#FF9900',
                    // chomp only while sliding; idle = mouth slightly open (static clip)
                    animation: isMoving ? 'pacman-chomp 0.45s linear infinite' : 'none',
                    clipPath: isMoving ? undefined : 'polygon(50% 50%, 100% 20%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 80%)',
                    boxShadow: '0 0 8px rgba(255,153,0,0.6)',
                  }}
                />
              </div>
            )}

            {/* Done state — full solid bar, no pac-man */}
            {progress >= 100 && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[6px] rounded-full"
                style={{ background: '#FF9900', boxShadow: '0 0 8px rgba(255,153,0,0.5)' }}
              />
            )}
          </div>
        </div>
      </div>


      {/* Quiz Card */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-xl w-full">

          {/* Category + Question */}
          <div className="border border-white/10 bg-white/3 p-5 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] bg-[#FF9900]/20 text-[#FF9900] border border-[#FF9900]/40 px-2 py-0.5 uppercase tracking-widest">
                {q.category}
              </span>
              <span className="font-mono text-[10px] text-[#dbc2ad] uppercase tracking-widest">Question {currentIdx + 1}</span>
            </div>
            <p className="font-mono text-sm md:text-base text-white leading-relaxed font-bold">
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2.5 mb-3">
            {q.options.map((opt, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group"
                  style={{
                    ...optionStyle(idx),
                    cursor: selected !== null ? 'default' : 'pointer',
                    borderRadius: '2px',
                  }}
                >
                  <span
                    className="w-7 h-7 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 rounded-sm"
                    style={letterBadgeStyle(idx)}
                  >
                    {letters[idx]}
                  </span>
                  <span className="font-mono text-sm leading-snug">{opt}</span>
                  {selected !== null && idx === q.correct && (
                    <span className="ml-auto material-symbols-outlined text-[#a8e063] text-base flex-shrink-0">check_circle</span>
                  )}
                  {selected === idx && idx !== q.correct && (
                    <span className="ml-auto material-symbols-outlined text-[#f87171] text-base flex-shrink-0">cancel</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <div
            className="overflow-hidden transition-all duration-400"
            style={{ maxHeight: showExplanation ? '120px' : '0', opacity: showExplanation ? 1 : 0 }}
          >
            <div className="border-l-2 border-[#FF9900] bg-white/3 pl-4 py-3 pr-4 mb-3">
              <div className="font-mono text-[10px] text-[#FF9900] uppercase tracking-widest mb-1">Explanation</div>
              <p className="font-mono text-xs text-[#dbc2ad] leading-relaxed">{q.explanation}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleBack}
              disabled={currentIdx === 0}
              className="flex items-center gap-2 border border-white/10 px-5 py-2.5 font-mono text-xs text-[#dbc2ad] hover:border-white/25 transition-all uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={selected === null}
              className="flex items-center gap-2 bg-[#FF9900] text-[#111] px-5 py-2.5 font-mono text-xs font-bold hover:bg-[#ffc082] transition-colors uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-[#dbc2ad]"
            >
              {currentIdx + 1 === questions.length ? 'See Results' : 'Next'}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
