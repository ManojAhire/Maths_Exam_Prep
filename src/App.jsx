import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Syllabus from './pages/Syllabus'
import MindMap from './pages/MindMap'
import AIChat from './pages/AIChat'
import ModuleOverview from './pages/ModuleOverview'
import StudySubmodule from './pages/StudySubmodule'
import QuizRunner from './pages/QuizRunner'
import PracticeExam from './pages/PracticeExam'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/mindmap" element={<MindMap />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="/practice" element={<PracticeExam />} />
        <Route path="/module/:moduleId" element={<ModuleOverview />} />
        <Route path="/study/:moduleId/:subId" element={<StudySubmodule />} />
        <Route path="/quiz/:quizId" element={<QuizRunner />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
