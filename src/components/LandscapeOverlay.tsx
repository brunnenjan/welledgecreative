// src/components/LandscapeOverlay.tsx
"use client";

export default function LandscapeOverlay() {
  return (
    <>
      <div className="landscape-overlay">
        <div className="landscape-overlay-content">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="landscape-icon"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
          <p className="landscape-message">
            Please rotate your device to portrait mode for the best experience.
          </p>
        </div>
      </div>

      <style jsx>{`
        .landscape-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 10, 0.98);
          z-index: 9999;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        @media only screen and (max-width: 768px) and (orientation: landscape) {
          .landscape-overlay {
            display: flex;
          }
        }

        .landscape-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
          color: #ffffff;
        }

        .landscape-icon {
          color: #f58222;
          animation: rotate-device 2s ease-in-out infinite;
        }

        .landscape-message {
          font-size: 1.125rem;
          font-weight: 500;
          line-height: 1.6;
          max-width: 400px;
          color: #ededed;
        }

        @keyframes rotate-device {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-15deg);
          }
          75% {
            transform: rotate(15deg);
          }
        }
      `}</style>
    </>
  );
}
