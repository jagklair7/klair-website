import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_url, author, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-CA', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .blog {
          padding: 96px 24px;
          background: var(--off-white);
          min-height: 60vh;
        }
        .blog__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .blog__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--burgundy);
          margin-bottom: 16px;
        }
        .blog__eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--burgundy);
          border-radius: 2px;
        }
        .blog__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 4vw, 44px);
          color: var(--dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .blog__sub {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 56px;
          max-width: 520px;
        }
        .blog__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .blog__card {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .blog__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          border-color: var(--burgundy);
        }
        .blog__card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          background: var(--burgundy-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
        }
        .blog__card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .blog__card-body {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .blog__card-meta {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
          display: flex;
          gap: 12px;
        }
        .blog__card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: var(--dark);
          line-height: 1.3;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .blog__card-excerpt {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
          flex: 1;
        }
        .blog__card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--burgundy);
          margin-top: 16px;
          letter-spacing: 0.02em;
        }
        .blog__empty {
          text-align: center;
          padding: 80px 24px;
          color: var(--muted);
          font-size: 16px;
        }
        .blog__loading {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .blog__skeleton {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          height: 360px;
          background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 540px) {
          .blog { padding: 64px 20px; }
          .blog__grid { grid-template-columns: 1fr; }
        }
      `}} />

      <section className="blog">
        <div className="blog__inner">
          <div className="blog__eyebrow">Insights</div>
          <h1 className="blog__heading">The Klair Blog</h1>
          <p className="blog__sub">
            IT tips, tech news, and insights for Edmonton businesses.
          </p>

          {loading ? (
            <div className="blog__loading">
              {[1,2,3].map(i => <div key={i} className="blog__skeleton" />)}
            </div>
          ) : posts.length === 0 ? (
            <div className="blog__empty">No posts yet — check back soon.</div>
          ) : (
            <div className="blog__grid">
              {posts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="blog__card">
                  <div className="blog__card-img">
                    {post.cover_url
                      ? <img src={post.cover_url} alt={post.title} />
                      : '📝'}
                  </div>
                  <div className="blog__card-body">
                    <div className="blog__card-meta">
                      <span>{formatDate(post.created_at)}</span>
                      <span>{post.author}</span>
                    </div>
                    <div className="blog__card-title">{post.title}</div>
                    {post.excerpt && (
                      <div className="blog__card-excerpt">{post.excerpt}</div>
                    )}
                    <span className="blog__card-cta">
                      Read more
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
