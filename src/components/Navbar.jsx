import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar-container neo-box neo-pill">
      <Link to="/" className="nav-brand">
        <span style={{ fontSize: '1.5rem' }}>📚</span> Maths for CS II
      </Link>
      <div className="nav-links">
        <Link to="/" style={{ textDecoration: location.pathname === '/' ? 'underline' : 'none' }}>Home</Link>
        <Link to="/syllabus" style={{ textDecoration: location.pathname.includes('/syllabus') || location.pathname.includes('/module') ? 'underline' : 'none' }}>Syllabus Guide</Link>
        <Link to="/mindmap" style={{ textDecoration: location.pathname === '/mindmap' ? 'underline' : 'none' }}>Concept Mind Map</Link>
        <Link to="/practice" style={{ textDecoration: location.pathname === '/practice' ? 'underline' : 'none' }}>Practice Exam</Link>
        <Link to="/chat" style={{ textDecoration: location.pathname === '/chat' ? 'underline' : 'none' }}>AI Doubt Solver</Link>
      </div>
      <Link to="/syllabus" className="btn-primary neo-box neo-pill neo-btn-interactive">Start Studying</Link>
    </nav>
  );
}
