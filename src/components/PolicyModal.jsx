import { useEffect } from 'react'

export default function PolicyModal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="policy-modal-overlay" role="dialog" aria-modal="true">
      <div className="policy-modal-shell">
        <button type="button" className="policy-modal-close" onClick={onClose} aria-label="Close policy">
          ×
        </button>
        <div className="policy-modal-content">{children}</div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .policy-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.8);
          display: grid;
          place-items: center;
          padding: 32px;
          z-index: 9999;
        }
        .policy-modal-shell {
          width: min(100%, 980px);
          max-height: min(100%, 90vh);
          overflow: auto;
          background: white;
          border-radius: 24px;
          box-shadow: 0 32px 120px rgba(15, 23, 42, 0.35);
          position: relative;
          padding: 32px;
        }
        .policy-modal-close {
          position: absolute;
          right: 20px;
          top: 20px;
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 999px;
          background: #0f172a;
          color: white;
          font-size: 22px;
          cursor: pointer;
          line-height: 1;
        }
        .policy-modal-close:hover {
          background: #111827;
        }
        .policy-modal-content {
          display: block;
          color: #0f172a;
        }
        .policy-modal-content .policy {
          background: transparent;
          padding: 0;
          min-height: auto;
        }
      `}} />
    </div>
  )
}
