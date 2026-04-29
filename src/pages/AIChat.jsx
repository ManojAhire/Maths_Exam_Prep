import { useState, useRef, useEffect } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I'm your CS Math Tutor AI. Ready to dominate your end-sem exams? What topic are you struggling with?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if(!input.trim() || isLoading) return;
    
    const userMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sectionContext: "General Study Hub",
          history: messages.map(m => ({ role: m.sender === 'ai' ? 'model' : 'user', parts: [{ text: m.text }] }))
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: data.text || "Sorry, I had a bit of a brain freeze. Can you try again?" 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: "I'm having trouble connecting to my brain (the server). Please check your internet or try again later!" 
      }]);
    } finally {
      setIsLoading(false);
    }
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
        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
          {isLoading && (
            <div style={{ alignSelf: 'flex-start', fontStyle: 'italic', color: 'var(--text-gray)' }}>
              AI is thinking...
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div style={{ padding: '20px', borderTop: '3px solid #1a1a1a', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={input}
            disabled={isLoading}
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
            disabled={isLoading}
            className="btn-primary neo-pill neo-btn-interactive"
            style={{ border: '3px solid #1a1a1a', boxShadow: '6px 6px 0px #1a1a1a', opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? '...' : 'Send ➔'}
          </button>
        </div>
      </div>
    </div>
  );
}
