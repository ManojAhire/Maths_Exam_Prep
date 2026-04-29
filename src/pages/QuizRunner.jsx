import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { curriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import Latex from 'react-latex-next';

export default function QuizRunner() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { saveQuizScore, markSubmoduleComplete } = useProgress();

  // Find the quiz
  const { targetQuiz, parentSubId, parentModId } = useMemo(() => {
    for (const mod of curriculum) {
      if (mod.moduleQuiz?.id === quizId) return { targetQuiz: mod.moduleQuiz, parentModId: mod.id };
      for (const sub of mod.submodules) {
        if (sub.quiz?.id === quizId) return { targetQuiz: sub.quiz, parentSubId: sub.id, parentModId: mod.id };
      }
    }
    return {};
  }, [quizId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!targetQuiz) return <div style={{ paddingTop: '150px', textAlign: 'center' }}>Quiz Not Found</div>;

  const currentQ = targetQuiz.questions[currentIndex];

  const handleSelect = (idx) => {
    if (selectedOption !== null) return; // Prevent double clicking
    setSelectedOption(idx);
    
    const isCorrect = idx === currentQ.answer;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex + 1 < targetQuiz.questions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Finish Quiz
        saveQuizScore(quizId, score + (isCorrect ? 1 : 0), targetQuiz.questions.length);
        if (parentSubId) markSubmoduleComplete(parentSubId);
        setShowResults(true);
      }
    }, 1200);
  };

  if (showResults) {
    return (
      <section className="container" style={{ paddingTop: '150px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div className="neo-box neo-card-radius" style={{ padding: '50px', backgroundColor: 'var(--accent-yellow)' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Quiz Complete!</h1>
          <p style={{ fontSize: '2rem', fontWeight: 800 }}>{score} / {targetQuiz.questions.length}</p>
          <p style={{ marginBottom: '40px', fontWeight: 600 }}>Your progress has been dynamically tracked.</p>
          <button 
            onClick={() => navigate(`/module/${parentModId}`)}
            className="btn-primary neo-box neo-pill neo-btn-interactive"
          >
            Return to Module ➔
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{ paddingTop: '120px', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-blue)' }}>
        Question {currentIndex + 1} of {targetQuiz.questions.length}
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
