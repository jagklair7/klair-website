import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
    return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .blog-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e1040 50%, #3b0a1e 100%);
          padding: 140px 24px 80px;
          position: relative;
          overflow: hidden;
        }
        .blog-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .blog-hero__inner { max-width: 1200px; margin: 0 auto; position: relative; }
        .blog-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
        }
        .blog-hero__eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--burgundy);
          border-radius: 50%;
        }
        .blog-hero__heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 60px);
          color: white;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
        }
        .blog-hero__heading span { color: #f87171; }
        .blog-hero__sub {
          font-size: 17px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 480px;
        }
        .blog-body { background: var(--off-white); padding: 72px 24px 96px; }
        .blog-body__inner { max-width: 1200px; margin: 0 auto; }
        .blog-featured {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 56px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .blog-featured:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .blog-featured__img {
          min-height: 380px;
          background: linear-gradient(135deg, #1e1040, #3b0a1e);
          display: flex; align-items: center; justify-content: center;
          font-size: 64px; overflow: hidden;
        }
        .blog-featured__img img { width: 100%; height: 100%; object-fit: cover; }
        .blog-featured__body {
          padding: 48px 40px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .blog-featured__badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(124,28,46,0.08); color: var(--burgundy);
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 5px 12px; border-radius: 20px; margin-bottom: 20px; width: fit-content;
        }
        .blog-featured__title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(22px, 3vw, 32px);
          color: var(--dark); line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 16px;
        }
        .blog-featured__excerpt { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 28px; flex: 1; }
        .blog-featured__meta { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .blog-featured__author { font-size: 13px; color: var(--muted); }
        .blog-featured__author strong { color: var(--dark); }
        .blog-featured__cta { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--burgundy); }
        .blog-section-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 24px;
          display: flex; align-items: center; gap: 12px;
        }
        .blog-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .blog-card {
          background: white; border: 1.5px solid var(--border); border-radius: 20px;
          overflow: hidden; text-decoration: none; display: flex; flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .blog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.09); border-color: var(--burgundy); }
        .blog-card__img {
          width: 100%; height: 190px;
          background: linear-gradient(135deg, #1e1040, #3b0a1e);
          display: flex; align-items: center; justify-content: center;
          font-size: 44px; overflow: hidden; flex-shrink: 0;
        }
        .blog-card__img img { width: 100%; height: 100%; object-fit: cover; }
        .blog-card__body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
        .blog-card__meta { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; display: flex; gap: 12px; }
        .blog-card__title { font-family: 'DM Serif Display', serif; font-size: 19px; color: var(--dark); line-height: 1.3; margin-bottom: 10px; letter-spacing: -0.01em; }
        .blog-card__excerpt { font-size: 14px; color: var(--muted); line-height: 1.6; flex: 1; }
        .blog-card__cta { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; color: var(--burgundy); margin-top: 16px; }
        .blog-empty { text-align: center; padding: 80px 24px; color: var(--muted); }
        .blog-empty__icon { font-size: 48px; margin-bottom: 16px; }
        .blog-empty__title { font-family: 'DM Serif Display', serif; font-size: 24px; color: var(--dark); margin-bottom: 8px; }
        .blog-loading { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        .blog-skeleton { height: 340px; border-radius: 20px; background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @media(max-width:900px) {
          .blog-featured { grid-template-columns: 1fr; }
          .blog-featured__img { min-height: 240px; }
          .blog-featured__body { padding: 32px 28px; }
        }
        @media(max-width:540px) {
          .blog-hero { padding: 120px 20px 60px; }
          .blog-body { padding: 48px 20px 64px; }
          .blog-grid { grid-template-columns: 1fr; }
        }
      `}} />

      <Navbar />

      <div className="blog-hero">
        <div className="blog-hero__inner">
          <div className="blog-hero__eyebrow">Insights & Tips</div>
          <h1 className="blog-hero__heading">The Klair<br /><span>Blog.</span></h1>
          <p className="blog-hero__sub">
            IT tips, cybersecurity insights, and tech news for Edmonton businesses — straight from our team.
          </p>
        </div>
      </div>

      <div className="blog-body">
        <div className="blog-body__inner">
          {loading ? (
            <div className="blog-loading">
              {[1,2,3].map(i => <div key={i} className="blog-skeleton" />)}
            </div>
          ) : posts.length === 0 ? (
            <div className="blog-empty">
              <div className="blog-empty__icon">✍️</div>
              <div className="blog-empty__title">No posts yet</div>
              <div>Check back soon — we're working on it.</div>
            </div>
          ) : (
            <>
              {featured && (
                <>
                  <div className="blog-section-label">Featured Post</div>
                  <Link to={`/blog/${featured.slug}`} className="blog-featured">
                    <div className="blog-featured__img">
                      {featured.cover_url ? <img src={featured.cover_url} alt={featured.title} /> : '📝'}
                    </div>
                    <div className="blog-featured__body">
                      <div className="blog-featured__badge">⭐ Latest Post</div>
                      <div className="blog-featured__title">{featured.title}</div>
                      {featured.excerpt && <div className="blog-featured__excerpt">{featured.excerpt}</div>}
                      <div className="blog-featured__meta">
                        <div className="blog-featured__author">
                          By <strong>{featured.author}</strong> · {formatDate(featured.created_at)}
                        </div>
                        <span className="blog-featured__cta">
                          Read post
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </>
              )}
              {rest.length > 0 && (
                <>
                  <div className="blog-section-label">All Posts</div>
                  <div className="blog-grid">
                    {rest.map(post => (
                      <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
                        <div className="blog-card__img">
                          {post.cover_url ? <img src={post.cover_url} alt={post.title} /> : '📝'}
                        </div>
                        <div className="blog-card__body">
                          <div className="blog-card__meta">
                            <span>{formatDate(post.created_at)}</span>
                            <span>{post.author}</span>
                          </div>
                          <div className="blog-card__title">{post.title}</div>
                          {post.excerpt && <div className="blog-card__excerpt">{post.excerpt}</div>}
                          <span className="blog-card__cta">
                            Read more
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Footer onPolicyClick={() => {}} />
    </>
  )
}
