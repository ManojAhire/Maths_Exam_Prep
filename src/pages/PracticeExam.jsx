import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllQuestions } from '../data/curriculum';
import Latex from 'react-latex-next';

export default function PracticeExam() {
  const navigate = useNavigate();

  // Generate 10 random questions on mount
  const questions = useMemo(() => {
    const all = getAllQuestions();
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
    }
    // Return up to 10
    return all.slice(0, 10);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  if (questions.length === 0) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>No questions available in the curriculum.</div>;

  const currentQ = questions[currentIndex];

  const handleSelect = (idx) => {
    if (selectedOption !== null) return; 
    setSelectedOption(idx);
    
    const isCorrect = idx === currentQ.answer;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 1200);
  };

  if (showResults) {
    return (
      <section className="container" style={{ paddingTop: '150px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div className="neo-box neo-card-radius" style={{ padding: '50px', backgroundColor: 'var(--accent-lavender)' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Practice Exam Finished!</h1>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{score} / {questions.length}</p>
          <p style={{ marginBottom: '40px', fontWeight: 600 }}>Great job studying random concepts.</p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary neo-box neo-pill neo-btn-interactive"
          >
            Return Home ➔
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{ paddingTop: '120px', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-mint)' }}>
        <span>Random Exam Simulator</span>
        <span>Question {currentIndex + 1} of {questions.length}</span>
      </div>

      <div className="neo-box neo-card-radius" style={{ padding: '40px', backgroundColor: '#fff', border: '4px solid #1a1a1a' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', lineHeight: 1.3 }}>
          <Latex>{currentQ.text}</Latex>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {currentQ.options.map((opt, idx) => {
            let bgColor = 'var(--bg-color)';
            if (selectedOption !== null) {
              if (idx === currentQ.answer) bgColor = 'var(--primary-green)';
              else if (idx === selectedOption) bgColor = 'var(--accent-pink)';
            }

            return (
              <div 
                key={idx}
                className={`neo-box neo-card-radius ${selectedOption === null ? 'neo-btn-interactive' : ''}`}
                onClick={() => handleSelect(idx)}
                style={{ 
                  padding: '20px', 
                  fontSize: '1.2rem', 
                  fontWeight: 600, 
                  cursor: selectedOption === null ? 'pointer' : 'default',
                  backgroundColor: bgColor,
                  color: (bgColor === 'var(--primary-green)' || bgColor === 'var(--accent-pink)') ? '#fff' : '#1a1a1a'
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
