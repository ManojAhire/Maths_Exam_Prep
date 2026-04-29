import React, { useState, useMemo, useEffect, useRef } from 'react';
import Latex from 'react-latex-next';

// --- MATH UTILS ---
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const nCr = (n, r) => Math.round(fact(n) / (fact(r) * fact(n - r)));
const nPr = (n, r) => Math.round(fact(n) / fact(n - r));

const distributions = {
  normal: (x, mean, std) => {
    const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(std, 2));
    return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  },
  poisson: (k, lambda) => {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k);
  },
  binomial: (k, n, p) => {
    return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  },
  bernoulli: (k, p) => (k === 1 ? p : 1 - p),
  exponential: (x, lambda) => (x >= 0 ? lambda * Math.exp(-lambda * x) : 0),
  geometric: (k, p) => Math.pow(1 - p, k - 1) * p,
  uniform: (x, a, b) => (x >= a && x <= b ? 1 / (b - a) : 0)
};

// --- COMPONENTS ---

const GameChallenge = ({ config }) => {
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [target, setTarget] = useState(Math.floor(Math.random() * 10) + 2);
  const [feedback, setFeedback] = useState('');
  const type = config.gameType || 'calc';

  const checkAns = () => {
    let correct = false;
    const val = parseFloat(input);
    if (type === 'derivative-match') correct = val === target * 2;
    else if (type === 'area-match') correct = val === Math.round((target * target * target) / 3);
    else if (type === 'prob-calc') correct = val === 50;
    else if (type === 'dist-guess') correct = val === target;
    else if (type === 'sampling-guess') correct = val === 30;
    else if (type === 'z-match') correct = val === 1.96 || val === 1.64;
    else correct = val === target * target;
    
    if (correct) {
      setScore(score + 10);
      setFeedback('🎉 EXCELLENT! Next level...');
      setTarget(Math.floor(Math.random() * 15) + 2);
      setInput('');
    } else {
      setFeedback('❌ WRONG! Try again.');
    }
  };

  return (
    <div className="neo-box" style={{ padding: '30px', background: 'var(--accent-yellow)', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '10px' }}>🎮 UNIQUE CHALLENGE: {config.topic}</h3>
      <div style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '2px' }}>RANK: {score > 50 ? 'LEGEND' : 'PRO'} | SCORE: {score}</div>
      <div style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '20px' }}>
        {type === 'derivative-match' ? <Latex>{`What is $\\frac{d}{dx} (${target}x^2)$ at $x=1$?`}</Latex> : 
         type === 'area-match' ? <Latex>{`Approx area under $x^2$ from $0$ to $${target}$?`}</Latex> :
         type === 'prob-calc' ? <Latex>{`What is $P(A)$ if odds are $1:1$ in percentage?`}</Latex> :
         type === 'sampling-guess' ? <Latex>{`What is the standard 'large' $n$ for CLT?`}</Latex> :
         type === 'z-match' ? <Latex>{`Typical Z-score for $\\alpha=0.05$ (2-tail)?`}</Latex> :
         <Latex>{`Solve for target $x = ${target}$`}</Latex>}
      </div>
      <input 
        type="number" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        className="neo-box"
        style={{ padding: '15px', width: '150px', fontSize: '2rem', textAlign: 'center', marginBottom: '20px', border: '4px solid #000' }}
      />
      <div style={{ marginBottom: '20px', fontWeight: 900, fontSize: '1.2rem', color: feedback.includes('🎉') ? '#059669' : '#dc2626' }}>{feedback}</div>
      <button onClick={checkAns} className="btn-primary neo-box neo-pill neo-btn-interactive" style={{ background: '#000', color: '#fff', padding: '15px 30px' }}>
        VERIFY ANSWER ➔
      </button>
    </div>
  );
};

const CalculusVisualizer = ({ config }) => {
  const [x, setX] = useState(2);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.strokeStyle = '#cbd5e1';
    ctx.moveTo(0, 150); ctx.lineTo(400, 150);
    ctx.moveTo(200, 0); ctx.lineTo(200, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    for (let i = -100; i <= 100; i++) {
      const px = i / 10;
      const py = config.func === 'x^2' ? px * px : (px * px * px - 3 * px);
      const cx = 200 + px * 20;
      const cy = 150 - py * 20;
      if (i === -100) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    const ty = config.func === 'x^2' ? x * x : (x * x * x - 3 * x);
    ctx.beginPath();
    ctx.fillStyle = '#ef4444';
    ctx.arc(200 + x * 20, 150 - ty * 20, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();

    if (config.mode === 'tangent') {
      const slope = config.func === 'x^2' ? 2 * x : (3 * x * x - 3);
      ctx.beginPath();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      const x1 = x - 1, y1 = ty - slope;
      const x2 = x + 1, y2 = ty + slope;
      ctx.moveTo(200 + x1 * 20, 150 - y1 * 20);
      ctx.lineTo(200 + x2 * 20, 150 - y2 * 20);
      ctx.stroke();
    }
  }, [x, config.func, config.mode]);

  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>📈 {config.topic} (Interactive Graph)</h3>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
           <label style={{ fontWeight: 800 }}>Slide to Trace: {x}</label>
           <input type="range" min="-4" max="4" step="0.1" value={x} onChange={e => setX(parseFloat(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div className="neo-box" style={{ padding: '10px', background: 'var(--accent-mint)', minWidth: '140px', textAlign: 'center' }}>
           <strong style={{ fontSize: '0.8rem' }}><Latex>{`$f(x) = ${config.func}$`}</Latex></strong>
           <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{(config.func === 'x^2' ? x*x : x*x*x-3*x).toFixed(2)}</div>
        </div>
      </div>
      <canvas ref={canvasRef} width="400" height="300" style={{ width: '100%', height: '250px', border: '4px solid #000', background: '#fdfbf7', borderRadius: '8px' }} />
    </div>
  );
};

const DistributionVisualizer = ({ config }) => {
  const [p1, setP1] = useState(config.distType === 'normal' ? 0 : 0.5);
  const [p2, setP2] = useState(config.distType === 'normal' ? 1 : 10);
  const isCDF = config.mode === 'CDF';

  const dataPoints = useMemo(() => {
    const points = [];
    if (['normal', 'exponential', 'uniform'].includes(config.distType)) {
      const range = config.distType === 'normal' ? 8 : (config.distType === 'uniform' ? Math.max(p2 + 2, 5) : 10);
      const start = config.distType === 'normal' ? p1 - 4 : 0;
      let cumulative = 0;
      for (let i = 0; i <= 50; i++) {
        const x = start + (i / 50) * range;
        let y = 0;
        if (config.distType === 'normal') y = distributions.normal(x, p1, p2 || 0.1);
        if (config.distType === 'exponential') y = distributions.exponential(x, p1);
        if (config.distType === 'uniform') y = distributions.uniform(x, p1, p2);
        if (isCDF) { cumulative += y * (range / 50); points.push({ x: x.toFixed(2), y: Math.min(cumulative, 1) }); }
        else points.push({ x: x.toFixed(2), y });
      }
    } else {
      const maxK = config.distType === 'binomial' ? p2 : 20;
      let cumulative = 0;
      for (let k = 0; k <= maxK; k++) {
        let y = 0;
        if (config.distType === 'poisson') y = distributions.poisson(k, p1 * 10);
        if (config.distType === 'binomial') y = distributions.binomial(k, p2, p1);
        if (config.distType === 'bernoulli') { if(k <= 1) y = distributions.bernoulli(k, p1); else continue; }
        if (config.distType === 'geometric') y = distributions.geometric(k + 1, p1);
        if (isCDF) { cumulative += y; points.push({ x: k, y: cumulative }); }
        else points.push({ x: k, y });
      }
    }
    return points;
  }, [config.distType, p1, p2, isCDF]);

  const maxVal = isCDF ? 1.1 : Math.max(...dataPoints.map(p => p.y), 0.01);

  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>📈 {config.topic} {isCDF ? '(CDF)' : '(PDF/PMF)'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div><label style={{ fontWeight: 800 }}><Latex>{`$\\theta_1$`}</Latex>: {Number(p1).toFixed(2)}</label><input type="range" min={config.distType === 'normal' ? -5 : 0.01} max={config.distType === 'normal' ? 5 : 1} step="0.01" value={p1} onChange={e => setP1(parseFloat(e.target.value))} style={{ width: '100%' }} /></div>
        <div><label style={{ fontWeight: 800 }}><Latex>{`$\\theta_2$`}</Latex>: {Number(p2).toFixed(2)}</label><input type="range" min="0.1" max={config.distType === 'binomial' ? 20 : 10} step="0.1" value={p2} onChange={e => setP2(parseFloat(e.target.value))} style={{ width: '100%' }} /></div>
      </div>
      <div style={{ height: '220px', background: 'var(--bg-color)', border: '4px solid #1a1a1a', display: 'flex', alignItems: 'flex-end', padding: '10px', gap: '2px' }}>
        {dataPoints.map((p, i) => (<div key={i} style={{ flex: 1, background: isCDF ? 'var(--accent-lavender)' : 'var(--primary-green)', height: `${(p.y / maxVal) * 90}%`, border: '1px solid #1a1a1a' }} />))}
      </div>
    </div>
  );
};

const ProbabilitySimulator = ({ config }) => {
  const [trials, setTrials] = useState([]);
  const addTrial = () => setTrials(prev => [Math.random() > 0.5 ? 'A' : 'B', ...prev].slice(0, 40));
  const countA = trials.filter(t => t === 'A').length;
  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>🎲 {config.topic}</h3>
      <button onClick={addTrial} className="btn-primary neo-box neo-pill neo-btn-interactive" style={{ width: '100%', marginBottom: '20px' }}>RUN SIMULATION ➔</button>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {trials.map((t, i) => (<div key={i} className="neo-box" style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: t === 'A' ? 'var(--accent-blue)' : 'var(--accent-mint)', fontWeight: 900 }}>{t}</div>))}
      </div>
      {trials.length > 0 && (<div style={{ marginTop: '20px', fontWeight: 900, fontSize: '1.2rem' }}>P(A) CONVERGENCE: {((countA / trials.length) * 100).toFixed(1)}%</div>)}
    </div>
  );
};

const StatsCalculator = ({ config }) => {
  const [input, setInput] = useState("10, 20, 30, 40, 50");
  const stats = useMemo(() => {
    const nums = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return null;
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (nums.length - 1);
    return { mean, stdDev: Math.sqrt(variance) };
  }, [input]);
  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>🧮 {config.topic}</h3>
      <textarea value={input} onChange={e => setInput(e.target.value)} style={{ width: '100%', height: '60px', padding: '10px', border: '3px solid #1a1a1a', marginBottom: '15px' }} />
      {stats && (
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="neo-box" style={{ flex: 1, padding: '15px', background: 'var(--accent-blue)', textAlign: 'center' }}><Latex>{`$\\bar{X} = ${stats.mean.toFixed(2)}$`}</Latex></div>
          <div className="neo-box" style={{ flex: 1, padding: '15px', background: 'var(--accent-pink)', textAlign: 'center' }}><Latex>{`$s = ${stats.stdDev.toFixed(2)}$`}</Latex></div>
        </div>
      )}
    </div>
  );
};

const DataAnalyzer = ({ config }) => {
  const [corr, setCorr] = useState(config.noise ? 0.2 : 0.8);
  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>📊 {config.topic}</h3>
      <label><Latex>{`$r = ${corr}$`}</Latex></label>
      <input type="range" min="-1" max="1" step="0.01" value={corr} onChange={e => setCorr(parseFloat(e.target.value))} style={{ width: '100%', marginBottom: '20px' }} />
      <div style={{ height: '150px', border: '3px solid #000', position: 'relative', background: '#f9f9f9' }}>
        {Array.from({ length: 40 }).map((_, i) => {
          const x = Math.random();
          const y = corr * x + (1 - Math.abs(corr)) * (Math.random() - 0.5) * 2;
          return <div key={i} style={{ position: 'absolute', width: '6px', height: '6px', background: 'var(--primary-green)', borderRadius: '50%', left: `${x * 90}%`, bottom: `${(y + 1) * 45}%`, border: '1px solid #1a1a1a' }} />
        })}
      </div>
    </div>
  );
};

const SamplingSimulator = ({ config }) => {
  const [size, setSize] = useState(30);
  const [means, setMeans] = useState([]);
  const pullSample = () => {
    let sum = 0;
    for(let i=0; i<size; i++) sum += config.popType === 'skewed' ? Math.pow(Math.random(), 2) * 100 : Math.random() * 100;
    setMeans(prev => [sum/size, ...prev].slice(0, 100));
  };
  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>🌀 {config.topic}</h3>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label><Latex>{`$n = ${size}$`}</Latex></label>
          <input type="range" min="5" max="200" value={size} onChange={e => setSize(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>
        <button onClick={pullSample} className="btn-secondary neo-box neo-pill" style={{ padding: '10px 20px', background: 'var(--accent-yellow)' }}>PULL $n$</button>
      </div>
      <div style={{ height: '100px', background: '#eee', display: 'flex', alignItems: 'flex-end', gap: '1px', border: '2px solid #000', borderRadius: '4px', overflow: 'hidden' }}>
         {means.map((m, i) => (<div key={i} style={{ flex: 1, background: config.mode === 'convergence' ? 'var(--primary-green)' : 'var(--accent-pink)', height: `${m}%`, border: '1px solid #1a1a1a', transition: 'height 0.3s ease' }} />))}
      </div>
      {config.mode === 'convergence' && <div style={{ marginTop: '10px', fontSize: '0.8rem', fontWeight: 800 }}>Law of Large Numbers: Means converging as trials increase.</div>}
    </div>
  );
};

const HypothesisTester = ({ config }) => {
  const [z, setZ] = useState(1.96);
  const p = 2 * (1 - 0.5 * (1 + Math.erf(Math.abs(z) / Math.sqrt(2))));
  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>⚖️ {config.topic}</h3>
      <label><Latex>{`$Z = ${z}$`}</Latex></label>
      <input type="range" min="-4" max="4" step="0.01" value={z} onChange={e => setZ(parseFloat(e.target.value))} style={{ width: '100%', marginBottom: '20px' }} />
      <div className="neo-box" style={{ padding: '20px', background: p < 0.05 ? 'var(--primary-green)' : 'var(--accent-pink)', textAlign: 'center' }}>
        <div style={{ fontWeight: 800 }}>P-VALUE</div>
        <div style={{ fontSize: '2rem', fontWeight: 900 }}>{p.toFixed(4)}</div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '5px' }}>{p < 0.05 ? 'REJECT NULL' : 'FAIL TO REJECT'}</div>
      </div>
    </div>
  );
};

const VennDiagram = ({ config }) => {
  const [overlap, setOverlap] = useState(30);
  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>⭕ {config.topic}</h3>
      <input type="range" min="0" max="80" value={overlap} onChange={e => setOverlap(parseInt(e.target.value))} style={{ width: '80%', marginBottom: '20px' }} />
      <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
         <div style={{ width: '120px', height: '120px', background: 'rgba(59, 130, 246, 0.5)', borderRadius: '50%', border: '3px solid #3b82f6', position: 'absolute', left: `calc(50% - ${120 - overlap/2}px)` }}></div>
         <div style={{ width: '120px', height: '120px', background: 'rgba(239, 68, 68, 0.5)', borderRadius: '50%', border: '3px solid #ef4444', position: 'absolute', left: `calc(50% - ${overlap/2}px)` }}></div>
      </div>
      <div style={{ marginTop: '10px', fontWeight: 800 }}>
        <Latex>{`$P(A \\cap B)$ Correlation: ${overlap}%`}</Latex>
      </div>
    </div>
  );
};

const TreeDiagram = ({ config }) => {
  const [p, setP] = useState(0.6);
  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>🌿 {config.topic}</h3>
      <input type="range" min="0" max="1" step="0.1" value={p} onChange={e => setP(parseFloat(e.target.value))} style={{ width: '80%', marginBottom: '20px' }} />
      <div style={{ height: '150px', position: 'relative', border: '2px dashed #ccc', padding: '20px' }}>
         <div style={{ fontWeight: 900 }}>ROOT</div>
         <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
            <div className="neo-box" style={{ padding: '10px', background: 'var(--accent-blue)' }}>A ({p})</div>
            <div className="neo-box" style={{ padding: '10px', background: 'var(--accent-pink)' }}>B ({(1-p).toFixed(1)})</div>
         </div>
      </div>
      <div style={{ marginTop: '10px' }}><Latex>{`Total Expectation: $1.0$`}</Latex></div>
    </div>
  );
};

const CombinatoricsPlayground = ({ config }) => {
  const [n, setN] = useState(6);
  const [r, setR] = useState(3);
  const isComb = config.topic.toLowerCase().includes('combination');
  const val = isComb ? nCr(n, r) : nPr(n, r);

  return (
    <div className="neo-box" style={{ padding: '25px', background: '#fff' }}>
      <h3 style={{ marginBottom: '15px' }}>🔢 {config.topic}</h3>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>n: {n}</label>
          <input type="range" min="1" max="12" value={n} onChange={e => setN(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <label>r: {r}</label>
          <input type="range" min="0" max={n} value={r} onChange={e => setR(parseInt(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>
      <div className="neo-box" style={{ padding: '20px', background: 'var(--accent-yellow)', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{val}</div>
        <div style={{ fontWeight: 800 }}>{isComb ? 'Combinations' : 'Permutations'}</div>
      </div>
    </div>
  );
};

export default function PlaygroundWidget({ type, config }) {
  switch (type) {
    case 'game-challenge': return <GameChallenge config={config} />;
    case 'calculus-visualizer': return <CalculusVisualizer config={config} />;
    case 'distribution-visualizer': return <DistributionVisualizer config={config} />;
    case 'probability-simulator': return <ProbabilitySimulator config={config} />;
    case 'stats-calculator': return <StatsCalculator config={config} />;
    case 'data-analyzer': return <DataAnalyzer config={config} />;
    case 'sampling-simulator': return <SamplingSimulator config={config} />;
    case 'hypothesis-tester': return <HypothesisTester config={config} />;
    case 'venn-diagram': return <VennDiagram config={config} />;
    case 'tree-diagram': return <TreeDiagram config={config} />;
    case 'combinatorics-playground': return <CombinatoricsPlayground config={config} />;
    default: return <StatsCalculator config={config} />;
  }
}
