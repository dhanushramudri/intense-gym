// src/components/EditableImage.jsx
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEditableImage } from '../hooks/useEditableImage';

/**
 * Drop-in replacement for <img> that allows admins to click and replace the image.
 *
 * Usage:
 *   <EditableImage
 *     imageId="gallery-1"
 *     fallback="https://original-url.avif"
 *     alt="Crossfit"
 *     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
 *     className="gal-img"
 *   />
 */
const EditableImage = ({ imageId, fallback, alt, style, className, ...rest }) => {
    console.log('Rendering EditableImage:', { imageId, fallback });
  const { isAdmin } = useAuth();
  const { src, uploading, progress, uploadImage } = useEditableImage(imageId, fallback);
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
    e.target.value = ''; // reset so same file can be re-selected
  };

  if (!isAdmin) {
    return <img src={src} alt={alt} style={style} className={className} {...rest} />;
  }

  return (
    <div
      style={{ position: 'relative',width: '100%', height: '100%'}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{
          ...style,
          transition: (style?.transition || '') + ', filter 0.3s ease',
          filter: hovered ? 'brightness(0.55)' : (style?.filter || 'none'),
        }}
        className={className}
        {...rest}
      />

      {/* Edit overlay — only shown to admin on hover */}
      {hovered && !uploading && (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          <div style={{
            background: 'rgba(245,158,11,0.95)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}>
            {/* Pencil icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <span style={{
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '2px',
            backdropFilter: 'blur(8px)',
          }}>
            Click to replace
          </span>
        </div>
      )}

      {/* Upload progress overlay */}
      {uploading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 10,
        }}>
          {/* Progress ring */}
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
            <circle
              cx="28" cy="28" r="22"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.2s ease' }}
            />
            <text x="28" y="33" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700" fontFamily="DM Sans, sans-serif">
              {progress}%
            </text>
          </svg>
          <span style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>Uploading…</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default EditableImage;