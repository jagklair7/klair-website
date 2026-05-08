import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
    return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)', paddingTop: 80 }}>
        <div style={{ color: 'var(--muted)', fontSize: 16 }}>Loading…</div>
      </div>
    </>
  )

  if (notFound) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)', paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>404</div>
        <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--dark)', marginBottom: 8 }}>Post not found</div>
        <div style={{ color: 'var(--muted)', marginBottom: 24 }}>This post may have been removed or the URL is incorrect.</div>
        <Link to="/blog" style={{ color: 'var(--burgundy)', fontWeight: 700, fontSize: 15 }}>← Back to Blog</Link>
      </div>
      <Footer onPolicyClick={() => {}} />
    </>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .post-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e1040 50%, #3b0a1e 100%);
          padding: 120px 24px 56px;
          position: relative;
          overflow: hidden;
        }
        .post-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .post-hero__inner { max-width: 800px; margin: 0 auto; position: relative; }
        .post-hero__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          margin-bottom: 28px;
          transition: color 0.15s;
        }
        .post-hero__back:hover { color: white; }
        .post-hero__meta {
          display: flex; gap: 16px; flex-wrap: wrap;
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }
        .post-hero__meta span { color: rgba(255,255,255,0.6); }
        .post-hero__title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 5vw, 52px);
          color: white;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .post-cover {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
          transform: translateY(-32px);
        }
        .post-cover img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          display: block;
        }

        .post-body {
          background: var(--off-white);
          padding: 0 24px 96px;
        }
        .post-body__inner {
          max-width: 760px;
          margin: 0 auto;
        }
        .post-content {
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 48px 52px;
          font-size: 17px;
          line-height: 1.8;
          color: var(--dark);
        }
        .post-content h2 { font-family:'DM Serif Display',serif; font-size:28px; margin:40px 0 14px; color:var(--dark); letter-spacing:-0.01em; }
        .post-content h3 { font-size:20px; font-weight:700; margin:28px 0 10px; }
        .post-content p { margin-bottom:22px; }
        .post-content ul, .post-content ol { margin:0 0 22px 24px; }
        .post-content li { margin-bottom:8px; }
        .post-content a { color:var(--burgundy); text-decoration:underline; }
        .post-content blockquote { border-left:4px solid var(--burgundy); padding:12px 24px; margin:28px 0; background:rgba(124,28,46,0.04); border-radius:0 12px 12px 0; font-style:italic; color:var(--muted); }
        .post-content code { background:#f0f0f0; padding:2px 6px; border-radius:4px; font-size:14px; font-family:monospace; }
        .post-content pre { background:#1a1a2e; color:#e0e0e0; padding:20px 24px; border-radius:12px; overflow-x:auto; margin-bottom:22px; }
        .post-content pre code { background:none; padding:0; color:inherit; }
        .post-content img { max-width:100%; border-radius:12px; margin:20px 0; }
        .post-content hr { border:none; border-top:2px solid var(--border); margin:32px 0; }

        .post-footer {
          margin-top: 32px;
          padding: 24px 32px;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .post-footer__author { font-size: 14px; color: var(--muted); }
        .post-footer__author strong { color: var(--dark); }
        .post-footer__back {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700; color: var(--burgundy);
          text-decoration: none; transition: gap 0.15s;
        }
        .post-footer__back:hover { gap: 10px; }

        @media(max-width:640px) {
          .post-hero { padding: 110px 20px 48px; }
          .post-cover { padding: 0 20px; }
          .post-cover img { height: 220px; }
          .post-body { padding: 0 20px 64px; }
          .post-content { padding: 28px 20px; font-size: 15px; }
        }
      `}} />

      <Navbar />

      {/* Hero */}
      <div className="post-hero">
        <div className="post-hero__inner">
          <Link to="/blog" className="post-hero__back">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>
          <div className="post-hero__meta">
            <span>{formatDate(post.created_at)}</span>
            <span>By {post.author}</span>
          </div>
          <h1 className="post-hero__title">{post.title}</h1>
        </div>
      </div>

      {/* Cover image */}
      {post.cover_url && (
        <div className="post-cover">
          <img src={post.cover_url} alt={post.title} />
        </div>
      )}

      {/* Content */}
      <div className="post-body" style={{ paddingTop: post.cover_url ? 0 : 48 }}>
        <div className="post-body__inner">
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="post-footer">
            <div className="post-footer__author">
              Written by <strong>{post.author}</strong> · {formatDate(post.created_at)}
            </div>
            <Link to="/blog" className="post-footer__back">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      <Footer onPolicyClick={() => {}} />
    </>
  )
}
