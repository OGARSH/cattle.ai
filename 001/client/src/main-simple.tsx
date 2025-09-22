import { createRoot } from "react-dom/client";

function SimpleApp() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{fontSize: '3em', marginBottom: '20px'}}>🐄 Cattle AI</h1>
        <p style={{fontSize: '1.2em', color: '#4CAF50', fontWeight: 'bold'}}>
          ✅ React App Working!
        </p>
        <p>Time: {new Date().toLocaleString()}</p>
        <p>Location: {window.location.href}</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<SimpleApp />);