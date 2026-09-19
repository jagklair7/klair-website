import { useState } from 'react'

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const testimonials = [
    {
      quote: "Klair has been managing our IT for over 5 years. When our server went down on a Friday night, they had us back up within 2 hours. That kind of response is why we don't look anywhere else.",
      name: "David M.",
      role: "Operations Manager",
      company: "Edmonton Manufacturing Co.",
      avatar: "👨‍💼",
      rating: 5,
    },
    {
      quote: "We switched to Klair after our previous IT company took 3 days to respond to a critical issue. The difference was night and day. Fast, professional, and they actually explain what they're doing.",
      name: "Sarah K.",
      role: "Office Manager",
      company: "Calgary Law Firm",
      avatar: "👩‍💼",
      rating: 5,
    },
    {
      quote: "The Hotel TV Portal they built for us completely transformed our guest experience. Our front desk staff love it, our guests love it, and it just works. No more calling IT every week.",
      name: "James T.",
      role: "General Manager",
      company: "Ramada Edmonton",
      avatar: "🏨",
      rating: 5,
    },
    {
      quote: "Klair set up our entire Microsoft 365 environment and trained our team. What would have taken weeks with another vendor was done in days. Their knowledge of the full stack is impressive.",
      name: "Priya R.",
      role: "CEO",
      company: "Digital Marketing Agency",
      avatar: "👩‍💻",
      rating: 5,
    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .testimonials {
          padding: 96px 24px;
          background: var(--off-white);
          overflow: hidden;
        }
        .testimonials__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .testimonials__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--navy);
          margin-bottom: 16px;
        }
        .testimonials__eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--navy);
          border-radius: 2px;
        }
        .testimonials__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          color: var(--dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 56px;
          max-width: 480px;
        }
        .testimonials__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .testimonials__featured {
          background: linear-gradient(135deg, #0f172a 0%, #1a237e 60%, #7c1c2e 100%);
          border-radius: 24px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          min-height: 360px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .testimonials__featured::before {
          content: '"';
          position: absolute;
          top: -20px; left: 32px;
          font-family: 'DM Serif Display', serif;
          font-size: 200px;
          color: rgba(255,255,255,0.05);
          line-height: 1;
          pointer-events: none;
        }
        .testimonials__stars {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }
        .testimonials__star { color: #fbbf24; font-size: 16px; }
        .testimonials__quote {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          line-height: 1.6;
          color: white;
          font-style: italic;
          flex: 1;
          margin-bottom: 32px;
        }
        .testimonials__author {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .testimonials__avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.15);
        }
        .testimonials__name {
          font-size: 15px;
          font-weight: 700;
          color: white;
          margin-bottom: 2px;
        }
        .testimonials__role {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }
        .testimonials__company {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
        }
        .testimonials__list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .testimonials__item {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .testimonials__item:hover {
          border-color: var(--burgundy);
          box-shadow: 0 4px 24px rgba(124,28,46,0.08);
        }
        .testimonials__item--active {
          border-color: var(--burgundy) !important;
          background: var(--burgundy-muted);
          box-shadow: 0 4px 24px rgba(124,28,46,0.1);
        }
        .testimonials__item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .testimonials__item-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .testimonials__item-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--off-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .testimonials__item--active .testimonials__item-avatar {
          background: white;
        }
        .testimonials__item-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 1px;
        }
        .testimonials__item-company {
          font-size: 11px;
          color: var(--muted);
        }
        .testimonials__item-stars {
          display: flex;
          gap: 2px;
        }
        .testimonials__item-star { color: #fbbf24; font-size: 12px; }
        .testimonials__item-quote {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .testimonials__item--active .testimonials__item-quote {
          color: var(--burgundy);
        }
        .testimonials__dots {
          display: flex;
          gap: 8px;
          margin-top: 32px;
          justify-content: center;
        }
        .testimonials__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0;
        }
        .testimonials__dot--active {
          background: var(--burgundy);
          width: 24px;
          border-radius: 4px;
        }
        @media (max-width: 900px) {
          .testimonials__layout { grid-template-columns: 1fr; }
          .testimonials__featured { min-height: auto; }
        }
        @media (max-width: 540px) {
          .testimonials { padding: 64px 20px; }
          .testimonials__featured { padding: 32px 24px; }
          .testimonials__quote { font-size: 17px; }
        }
      `}} />

      <section id="testimonials" className="testimonials">
        <div className="testimonials__inner">
          <div className="testimonials__eyebrow">Client Stories</div>
          <h2 className="testimonials__heading">
            Trusted by businesses<br />across Alberta.
          </h2>

          <div className="testimonials__layout">
            {/* Featured testimonial */}
            <div className="testimonials__featured">
              <div>
                <div className="testimonials__stars">
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <span key={i} className="testimonials__star">★</span>
                  ))}
                </div>
                <div className="testimonials__quote">
                  "{testimonials[active].quote}"
                </div>
              </div>
              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  {testimonials[active].avatar}
                </div>
                <div>
                  <div className="testimonials__name">{testimonials[active].name}</div>
                  <div className="testimonials__role">{testimonials[active].role}</div>
                  <div className="testimonials__company">{testimonials[active].company}</div>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="testimonials__list">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`testimonials__item ${i === active ? 'testimonials__item--active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <div className="testimonials__item-top">
                    <div className="testimonials__item-author">
                      <div className="testimonials__item-avatar">{t.avatar}</div>
                      <div>
                        <div className="testimonials__item-name">{t.name}</div>
                        <div className="testimonials__item-company">{t.company}</div>
                      </div>
                    </div>
                    <div className="testimonials__item-stars">
                      {[...Array(t.rating)].map((_, j) => (
                        <span key={j} className="testimonials__item-star">★</span>
                      ))}
                    </div>
                  </div>
                  <div className="testimonials__item-quote">"{t.quote}"</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}