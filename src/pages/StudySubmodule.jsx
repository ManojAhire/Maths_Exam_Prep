import { useParams, useNavigate } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import PlaygroundWidget from '../components/PlaygroundWidget';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { useState } from 'react';

export default function StudySubmodule() {
  const { moduleId, subId } = useParams();
  const navigate = useNavigate();
  const [videoIdx, setVideoIdx] = useState(0);

  const mod = curriculum.find(m => m.id === moduleId);
  const sub = mod?.submodules.find(s => s.id === subId);

  if (!sub) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Topic Not Found</div>;

  const playgrounds = Array.isArray(sub.playground) ? sub.playground : [sub.playground];
  const videoId = sub.videos?.[videoIdx] || sub.video;
  
  const diffColors = {
    easy: '#3b82f6', // Blue
    medium: '#eab308', // Yellow
    hard: '#ef4444' // Red
  };
  const mainColor = diffColors[sub.difficulty] || '#1a1a1a';

  const switchVideo = () => {
    if (sub.videos && sub.videos.length > 1) {
      setVideoIdx((videoIdx + 1) % sub.videos.length);
    }
  };

  return (
    <section className="container" style={{ paddingTop: '120px', maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
      <button 
        onClick={() => navigate(`/module/${moduleId}`)} 
        className="human-font"
        style={{ marginBottom: '20px', background: 'transparent', border: 'none', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline', fontSize: '1.2rem' }}
      >
        ← Back to {mod.title}
      </button>

      <div className="neo-box neo-card-radius" style={{ padding: '40px', backgroundColor: '#fff', border: `4px solid #1a1a1a` }}>
        <h1 className="human-font" style={{ fontSize: '4rem', marginBottom: '10px', lineHeight: 1, color: mainColor }}>{sub.title}</h1>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', alignItems: 'center' }}>
          <span className="badge neo-border neo-pill" style={{ background: mainColor, color: '#fff', fontSize: '0.9rem', padding: '8px 20px' }}>
            {sub.difficulty.toUpperCase()}
          </span>
          <span className="human-font" style={{ fontSize: '1.3rem', color: 'var(--text-gray)', fontWeight: 800 }}>
            {playgrounds.length} Interactive Tools for You
          </span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {playgrounds.map((pg, idx) => (
            <div key={`${sub.id}-pg-${idx}`} style={{ borderTop: idx > 0 ? '6px dashed #eee' : 'none', paddingTop: idx > 0 ? '80px' : '0' }}>
              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ width: '40px', height: '40px', background: mainColor, color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', border: '3px solid #000' }}>{idx+1}</div>
                 <h2 className="human-font" style={{ fontSize: '2.2rem' }}>Activity: {pg.config.topic}</h2>
              </div>
              <PlaygroundWidget type={pg.type} config={pg.config} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: '100px', padding: '40px', background: '#fdfdf7', border: '4px solid #000', boxShadow: `15px 15px 0px ${mainColor}` }}>
          <h4 className="human-font" style={{ marginBottom: '25px', fontSize: '2.5rem', color: mainColor, fontWeight: 900 }}>Teacher's Notes</h4>
          <div className="math-notes-content" style={{ fontSize: '1.6rem', color: '#1a1a1a', lineHeight: 1.6 }}>
            <Latex>{sub.content}</Latex>
          </div>
        </div>

        {videoId && (
          <div style={{ marginTop: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
               <h4 className="human-font" style={{ fontSize: '2.5rem', fontWeight: 900 }}>🎬 Video Guide</h4>
               {sub.videos?.length > 1 && (
                 <button 
                  onClick={switchVideo}
                  className="neo-box neo-pill neo-btn-interactive human-font"
                  style={{ background: 'var(--accent-mint)', padding: '10px 20px', fontWeight: 800, fontSize: '1.1rem' }}
                 >
                   Try another video? 🔄
                 </button>
               )}
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', border: '5px solid #1a1a1a', boxShadow: '15px 15px 0px #1a1a1a', background: '#000' }}>
              <iframe 
                key={videoId}
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Topic Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <button 
            onClick={() => navigate(`/module/${moduleId}`)}
            className="btn-primary neo-box neo-pill neo-btn-interactive human-font"
            style={{ padding: '25px 100px', fontSize: '2rem', background: mainColor, color: '#fff', fontWeight: 900, border: '5px solid #000' }}
          >
            I've got this! ➔
          </button>
        </div>
      </div>
    </section>
  );
}



