import { useParams, useNavigate } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export default function ModuleOverview() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completedSubmodules } = useProgress();

  const mod = curriculum.find(m => m.id === moduleId);
  if (!mod) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Module Not Found</div>;

  return (
    <section className="container" style={{ paddingTop: '120px', maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
      <button 
        onClick={() => navigate('/')} 
        className="human-font"
        style={{ marginBottom: '20px', background: 'transparent', border: 'none', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', fontSize: '1.2rem' }}
      >
        ← Back to Home
      </button>

      <div className="section-header-wrapper" style={{ justifyContent: 'flex-start', textAlign: 'left', marginBottom: '20px' }}>
        <h2 className="section-title human-font" style={{ fontSize: '3.5rem', textAlign: 'left', margin: 0 }}>{mod.icon} {mod.title}</h2>
      </div>
      <p className="human-font" style={{ fontSize: '1.5rem', marginBottom: '40px', fontWeight: 500, color: 'var(--text-gray)' }}>{mod.description}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {mod.submodules.map((sub, idx) => {
          const isDone = completedSubmodules.includes(sub.id);
          
          return (
            <div 
              key={sub.id} 
              className="neo-box neo-card-radius neo-btn-interactive"
              onClick={() => navigate(`/study/${mod.id}/${sub.id}`)}
              style={{ padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}
            >
              <div>
                <p className="human-font" style={{ margin: 0, fontWeight: 800, color: 'var(--text-gray)', fontSize: '1.1rem' }}>Step {idx + 1}</p>
                <h3 className="human-font" style={{ margin: '5px 0 0 0', fontSize: '1.8rem' }}>{sub.title}</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button className="btn-secondary neo-box neo-pill" style={{ backgroundColor: mod.color, padding: '10px 20px', fontSize: '1rem' }}>
                  Play ➔
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}
