import { useNavigate } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export default function Syllabus() {
  const navigate = useNavigate();
  const { completedSubmodules } = useProgress();

  return (
    <section className="container courses-section" style={{ paddingTop: '120px' }}>
      <div className="section-header-wrapper">
        <div className="badge neo-border neo-shadow neo-pill" style={{ backgroundColor: 'var(--accent-lavender)' }}>
          Curriculum Master Tree
        </div>
        <h2 className="section-title">Explore Modules</h2>
      </div>
      
      <div className="course-grid">
        {curriculum.map((mod) => {
          // Calculate how many submodules in this module are completed
          const totalSubs = mod.submodules.length;
          const completedCount = mod.submodules.filter(s => completedSubmodules.includes(s.id)).length;

          return (
            <div 
              key={mod.id} 
              className="course-card neo-box neo-card-radius neo-btn-interactive"
              onClick={() => navigate(`/module/${mod.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="course-card-top">
                  <div className="card-icon neo-border neo-shadow neo-card-radius" style={{ backgroundColor: mod.color }}>
                    {mod.icon}
                  </div>
                  <h3 className="human-font" style={{ fontSize: '1.8rem', flex: 1, paddingRight: '10px', lineHeight: 1.3 }}>{mod.title}</h3>
              </div>
              <p className="human-font" style={{ marginTop: '10px', fontSize: '1.2rem', opacity: 0.9, fontWeight: 500 }}>{mod.description}</p>
              
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800 }}>{completedCount} / {totalSubs} Units Done</span>
                <div className="card-view-btn" style={{ fontWeight: 800, textDecoration: 'underline', textDecorationThickness: '3px' }}>
                  Enter Module ➔
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
