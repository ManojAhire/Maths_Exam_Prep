import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { curriculum } from '../data/curriculum';
import { useMemo } from 'react';

export default function Home() {
  const { completedSubmodules, getGlobalReadiness } = useProgress();
  const navigate = useNavigate();

  const totalSubs = useMemo(() => {
    let count = 0;
    curriculum.forEach(m => count += m.submodules.length);
    return count;
  }, []);

  const readiness = getGlobalReadiness(totalSubs);

  const getNextSubmodulePath = () => {
    for (const mod of curriculum) {
      for (const sub of mod.submodules) {
        if (!completedSubmodules.includes(sub.id)) {
          return `/study/${mod.id}/${sub.id}`;
        }
      }
    }
    return '/'; 
  };

  return (
    <>
      <section className="container hero" style={{ paddingTop: '150px' }}>
        <div className="hero-content">
            <div className="badge hero-badge neo-border neo-shadow neo-pill">
              {totalSubs} Interactive Topics 🚀
            </div>
            <h1 className="human-font" style={{ fontSize: '4.5rem' }}>Maths-2 Compiler: Your Learning Hub.</h1>
            <p className="human-font" style={{ fontSize: '1.5rem', color: 'var(--text-gray)', fontWeight: 600, marginBottom: '30px' }}>
              Master every unit of your end-semester syllabus through live simulations, visualizers, and calculators. 
              Built for students, by someone who gets it.
            </p>
            <div className="hero-actions">
                <button 
                  onClick={() => navigate(`/module/${curriculum[0].id}`)} 
                  className="btn-primary neo-box neo-pill neo-btn-interactive"
                >
                  Start Learning ➔
                </button>
            </div>
        </div>

        <div className="hero-visual">
            <div className="float-badge target neo-border neo-shadow neo-pill">🎲</div>
            <div className="float-badge star neo-border neo-shadow neo-pill">📈</div>
            <div className="float-badge book neo-border neo-shadow neo-pill">🔢</div>
            
            <div className="progress-card neo-box neo-card-radius">
                <div className="progress-header">
                    <div className="progress-icon-box neo-border neo-shadow neo-card-radius">⚡</div>
                    <div className="progress-info">
                        <h3 className="human-font" style={{ fontSize: '1.8rem' }}>Mastery Progress</h3>
                        <p>{completedSubmodules.length} of {totalSubs} Topics Explored</p>
                    </div>
                </div>
                <div className="progress-bar-container">
                    <div className="progress-track" style={{ background: '#eee', height: '20px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #1a1a1a'}}>
                        <div className="progress-fill" style={{ width: `${readiness}%`, height: '100%', background: 'var(--primary-green)', transition: 'width 0.5s ease' }}></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="container features-section">
          <div className="course-grid">
            {curriculum.map(mod => (
              <div 
                key={mod.id} 
                className="course-card neo-box neo-card-radius neo-interactive"
                onClick={() => navigate(`/module/${mod.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="course-card-top">
                  <div className="card-icon neo-border neo-shadow" style={{ backgroundColor: mod.color }}>
                    {mod.icon}
                  </div>
                  <h3 className="human-font" style={{ fontSize: '1.8rem' }}>{mod.title}</h3>
                </div>
                <p className="human-font" style={{ color: 'var(--text-gray)', fontWeight: 500, fontSize: '1.2rem', marginBottom: '15px' }}>{mod.description}</p>
                <div className="card-view-btn">
                  Explore {mod.submodules.length} Topics ➔
                </div>
              </div>
            ))}
          </div>
      </section>
    </>
  );
}
