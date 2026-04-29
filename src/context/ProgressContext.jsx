import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [completedSubmodules, setCompletedSubmodules] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState({});
  const [score, setScore] = useState(0);

  // Load from local storage
  useEffect(() => {
    const savedSubmodules = JSON.parse(localStorage.getItem('completedSubmodules') || '[]');
    const savedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
    const savedScore = parseInt(localStorage.getItem('globalScore') || '0', 10);
    
    setCompletedSubmodules(savedSubmodules);
    setCompletedQuizzes(savedQuizzes);
    setScore(savedScore);
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('completedSubmodules', JSON.stringify(completedSubmodules));
    localStorage.setItem('completedQuizzes', JSON.stringify(completedQuizzes));
    localStorage.setItem('globalScore', score.toString());
  }, [completedSubmodules, completedQuizzes, score]);

  const markSubmoduleComplete = (submoduleId) => {
    if (!completedSubmodules.includes(submoduleId)) {
      setCompletedSubmodules(prev => [...prev, submoduleId]);
    }
  };

  const saveQuizScore = (quizId, correctAnswers, totalQuestions) => {
    setCompletedQuizzes(prev => ({
      ...prev,
      [quizId]: { correct: correctAnswers, total: totalQuestions }
    }));
    setScore(prev => prev + correctAnswers * 10);
  };

  const getGlobalReadiness = (totalSubmodules) => {
    if (totalSubmodules === 0) return 0;
    return Math.round((completedSubmodules.length / totalSubmodules) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      completedSubmodules,
      completedQuizzes,
      score,
      markSubmoduleComplete,
      saveQuizScore,
      getGlobalReadiness
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
