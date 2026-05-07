import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (!data) setNotFound(true)
      else setPost(data)
      setLoading(false)
    }
    fetchPost()
  }, [slug])

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-CA', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  if (loading) return (
    <div style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--muted)' }}>
      Loading…
    </div>
  )

  if (notFound) return (
    <div style={{ padding: '120px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>404</div>
      <div style={{ color: 'var(--muted)', marginBottom: 24 }}>Post not found.</div>
      <Link to="/blog" style={{ color: 'var(--burgundy)', fontWeight: 700 }}>← Back to Blog</Link>
    </div>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .post {
          padding: 80px 24px 96px;
          background: var(--off-white);
          min-height: 60vh;
        }
        .post__inner {
          max-width: 760px;
          margin: 0 auto;
        }
        .post__back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--burgundy);
          text-decoration: none;
          margin-bottom: 40px;
          letter-spacing: 0.02em;
          transition: gap 0.15s;
        }
        .post__back:hover { gap: 10px; }
        .post__cover {
          width: 100%;
          height: 380px;
          object-fit: cover;
          border-radius: 20px;
          margin-bottom: 40px;
        }
        .post__meta {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 16px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .post__title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 5vw, 48px);
          color: var(--dark);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 40px;
        }
        .post__divider {
          height: 2px;
          background: var(--border);
          border-radius: 2px;
          margin-bottom: 40px;
        }
        .post__content {
          font-size: 17px;
          line-height: 1.8;
          color: var(--dark);
        }
        .post__content h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          margin: 48px 0 16px;
          color: var(--dark);
          letter-spacing: -0.01em;
        }
        .post__content h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 32px 0 12px;
          color: var(--dark);
        }
        .post__content p {
          margin-bottom: 24px;
        }
        .post__content ul, .post__content ol {
          margin: 0 0 24px 24px;
        }
        .post__content li {
          margin-bottom: 8px;
        }
        .post__content a {
          color: var(--burgundy);
          text-decoration: underline;
        }
        .post__content blockquote {
          border-left: 4px solid var(--burgundy);
          padding: 12px 24px;
          margin: 32px 0;
          background: var(--burgundy-muted);
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: var(--muted);
        }
        .post__content code {
          background: #f0f0f0;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 14px;
          font-family: monospace;
        }
        .post__content pre {
          background: #1a1a2e;
          color: #e0e0e0;
          padding: 20px 24px;
          border-radius: 12px;
          overflow-x: auto;
          margin-bottom: 24px;
        }
        .post__content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .post__content img {
          max-width: 100%;
          border-radius: 12px;
          margin: 24px 0;
        }
        .post__footer {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: gap;
          gap: 16px;
        }
        .post__author {
          font-size: 14px;
          color: var(--muted);
        }
        .post__author strong {
          color: var(--dark);
        }
        @media (max-width: 540px) {
          .post { padding: 64px 20px; }
          .post__cover { height: 220px; }
        }
      `}} />

      <article className="post">
        <div className="post__inner">
          <Link to="/blog" className="post__back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>

          {post.cover_url && (
            <img src={post.cover_url} alt={post.title} className="post__cover" />
          )}

          <div className="post__meta">
            <span>{formatDate(post.created_at)}</span>
            <span>{post.author}</span>
          </div>

          <h1 className="post__title">{post.title}</h1>
          <div className="post__divider" />

          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="post__footer">
            <div className="post__author">
              Written by <strong>{post.author}</strong>
            </div>
            <Link to="/blog" className="post__back" style={{ marginBottom: 0 }}>
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
