import { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I'm your CS Math Tutor AI. Ready to dominate your end-sem exams? What topic are you struggling with?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if(!input.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: input }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: `That's a great question about "${input}". As your CS tutor, I'd explain it like this: Think about how a computer actually processes it! Does this make sense based on the notes?` 
      }]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div style={{ padding: '120px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="section-header-wrapper">
        <div className="badge neo-border neo-shadow neo-pill" style={{ backgroundColor: 'var(--accent-mint)' }}>
          Always Available
        </div>
        <h2 className="section-title">Doubt Solving AI Tutor</h2>
      </div>

      <div className="neo-box neo-card-radius" style={{ display: 'flex', flexDirection: 'column', height: '60vh', backgroundColor: '#fff' }}>
        
        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? 'var(--accent-blue)' : 'var(--bg-color)',
              border: '3px solid #1a1a1a',
              borderRadius: '12px',
              padding: '15px 20px',
              maxWidth: '80%',
              boxShadow: '4px 4px 0px #1a1a1a',
              fontWeight: 600
            }}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div style={{ padding: '20px', borderTop: '3px solid #1a1a1a', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Bayes Theorem, PMF, Logic Gates..."
            style={{ 
              flex: 1, 
              padding: '15px', 
              border: '3px solid #1a1a1a', 
              borderRadius: '9999px',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: 'Outfit',
              outline: 'none'
            }}
          />
          <button 
            onClick={handleSend}
            className="btn-primary neo-pill neo-btn-interactive"
            style={{ border: '3px solid #1a1a1a', boxShadow: '6px 6px 0px #1a1a1a' }}
          >
            Send ➔
          </button>
        </div>
      </div>
    </div>
  );
}
