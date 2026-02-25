// src/components/AuthButton.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthButton = () => {
  const { user, isAdmin, loginWithGoogle, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  console.log('AuthButton render - user:', user, 'isAdmin:', isAdmin);

  if (!user) {
    return (
      <button
        onClick={loginWithGoogle}
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          padding: '9px 16px',
          borderRadius: '2px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.25s ease',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.color = '#F59E0B'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
      >
        {/* Google G icon */}
        <svg width="12" height="12" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign In
      </button>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 8px',
          borderRadius: '2px',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        {/* Avatar */}
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{ width: '28px', height: '28px', borderRadius: '50%', border: isAdmin ? '2px solid #F59E0B' : '2px solid rgba(255,255,255,0.15)' }}
          />
        ) : (
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: isAdmin ? '#F59E0B' : '#333',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 800, color: isAdmin ? '#000' : '#fff',
            border: isAdmin ? '2px solid #F59E0B' : '2px solid rgba(255,255,255,0.15)',
          }}>
            {user.email?.[0]?.toUpperCase()}
          </div>
        )}

        {/* Admin badge */}
        {isAdmin && (
          <span style={{
            background: '#F59E0B',
            color: '#000',
            fontSize: '7px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            padding: '2px 6px',
            borderRadius: '1px',
            textTransform: 'uppercase',
          }}>
            ADMIN
          </span>
        )}

        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}>▾</span>
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          background: 'rgba(10,10,10,0.98)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: '2px solid #F59E0B',
          borderRadius: '3px',
          padding: '12px 0',
          minWidth: '200px',
          zIndex: 200,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
          animation: 'dropIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {/* User info */}
          <div style={{ padding: '8px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#fff', fontSize: '12px', fontWeight: 600, marginBottom: '2px' }}>
              {user.displayName || 'User'}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: 400 }}>
              {user.email}
            </div>
            {isAdmin && (
              <div style={{
                marginTop: '8px',
                display: 'flex', alignItems: 'center', gap: '6px',
                color: '#F59E0B', fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
                Admin — Image editing enabled
              </div>
            )}
          </div>

          {/* Sign out */}
          <button
            onClick={() => { logout(); setMenuOpen(false); }}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              padding: '10px 16px',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign out
          </button>
        </div>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AuthButton;