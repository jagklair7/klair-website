import { useEffect, useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'

const ADMIN_PASSWORD = 'klair2024!'
const SITE_URL = 'https://beta.klair.ca'

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', content: '', cover_url: '', author: 'Klair Team', published: false
}

// ── Toolbar Button ────────────────────────────────────────────────────────
function ToolBtn({ onClick, active, disabled, title, children }) {
  return (
    <button type="button" className={`rte-btn ${active ? 'rte-btn--active' : ''}`}
      onClick={onClick} disabled={disabled} title={title}>
      {children}
    </button>
  )
}

// ── Rich Text Editor ──────────────────────────────────────────────────────
function RichEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
    ],
    content: value || '',
    onUpdate({ editor }) { onChange(editor.getHTML()) },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || '')
  }, [value]) // eslint-disable-line

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  const setLink = useCallback(() => {
    const prev = editor.getAttributes('link').href
    const url = window.prompt('Link URL', prev || 'https://')
    if (url === null) return
    if (url === '') { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="rte">
      <div className="rte-toolbar">
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
        </ToolBtn>
        <div className="rte-sep" />
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</ToolBtn>
        <div className="rte-sep" />
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="15" height="15"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="15" height="15"><line x1="4" y1="12" x2="20" y2="12"/><path d="M17.5 6.5C17.5 4.6 15.5 3 12 3S6.5 4.6 6.5 6.5c0 2 1.5 3 5.5 3.5"/><path d="M6.5 17.5C6.5 19.4 8.5 21 12 21s5.5-1.6 5.5-3.5c0-2-1.5-3-5.5-3.5"/></svg>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </ToolBtn>
        <div className="rte-sep" />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="15" height="15"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="15" height="15"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
          <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </ToolBtn>
        <div className="rte-sep" />
        <ToolBtn onClick={setLink} active={editor.isActive('link')} title="Add link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </ToolBtn>
        <ToolBtn onClick={addImage} title="Insert image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </ToolBtn>
        <div className="rte-sep" />
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">—</ToolBtn>
      </div>
      <EditorContent editor={editor} className="rte-content" />
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────
export default function AdminBlog() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('blog_admin') === 'yes')
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // 'list' | 'edit' | 'share'
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [sharePost, setSharePost] = useState(null)
  const [copied, setCopied] = useState(null)

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function login() {
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem('blog_admin', 'yes')
      setAuthed(true)
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 1500)
    }
  }

  async function fetchPosts() {
    setLoading(true)
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { if (authed) fetchPosts() }, [authed])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value }
      if (name === 'title' && !editId) updated.slug = slugify(value)
      return updated
    })
  }

  function handleContentChange(html) {
    setForm(prev => ({ ...prev, content: html }))
  }

  function newPost() { setForm(EMPTY_FORM); setEditId(null); setView('edit') }

  function editPost(post) {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt || '', content: post.content || '', cover_url: post.cover_url || '', author: post.author || 'Klair Team', published: post.published })
    setEditId(post.id)
    setView('edit')
  }

  async function savePost() {
    if (!form.title || !form.slug) return
    setSaving(true)
    const payload = { ...form }
    let error
    if (editId) {
      ({ error } = await supabase.from('blog_posts').update(payload).eq('id', editId))
    } else {
      ({ error } = await supabase.from('blog_posts').insert(payload))
    }
    setSaving(false)
    if (error) {
      showToast('Error: ' + error.message, 'error')
    } else {
      showToast(editId ? 'Post updated!' : 'Post created!')
      fetchPosts()
      if (form.published) {
        setSharePost({ title: form.title, slug: form.slug, excerpt: form.excerpt })
        setView('share')
      } else {
        setView('list')
      }
    }
  }

  async function deletePost(id) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await supabase.from('blog_posts').delete().eq('id', id)
    showToast('Post deleted.')
    fetchPosts()
  }

  async function togglePublish(post) {
    await supabase.from('blog_posts').update({ published: !post.published }).eq('id', post.id)
    fetchPosts()
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  function generateCaptions(post) {
    const url = `${SITE_URL}/blog/${post.slug}`
    const excerpt = post.excerpt || post.title
    return {
      facebook: `📝 New on the Klair Blog!\n\n${post.title}\n\n${excerpt}\n\nRead the full post 👇\n${url}\n\n#KlairComputer #Edmonton #IT #TechTips`,
      instagram: `📝 New blog post!\n\n${post.title}\n\n${excerpt}\n\n🔗 Link in bio\n\n#KlairComputer #Edmonton #EdmontonBusiness #IT #ManagedIT #TechTips #SmallBusiness`,
      linkedin: `I just published a new article on the Klair blog:\n\n"${post.title}"\n\n${excerpt}\n\nRead it here: ${url}\n\n#IT #ManagedServices #Edmonton #TechTips #SmallBusiness`,
      twitter: `New on the Klair blog: "${post.title}"\n\n${excerpt.slice(0, 120)}${excerpt.length > 120 ? '…' : ''}\n\n${url}`,
    }
  }

  async function copyCaption(key, text) {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const PLATFORMS = [
    { key: 'facebook',  label: 'Facebook',    color: '#1877F2', url: 'https://www.facebook.com',            icon: '📘' },
    { key: 'instagram', label: 'Instagram',   color: '#E1306C', url: 'https://www.instagram.com',           icon: '📸' },
    { key: 'linkedin',  label: 'LinkedIn',    color: '#0A66C2', url: 'https://www.linkedin.com/feed',       icon: '💼' },
    { key: 'twitter',   label: 'X (Twitter)', color: '#000000', url: 'https://x.com/compose/tweet',         icon: '𝕏'  },
  ]

  // ── Login ────────────────────────────────────────────────────────────────
  if (!authed) return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .admin-login{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f172a 0%,#1e1040 50%,#3b0a1e 100%);padding:24px}
        .admin-login__card{background:white;border:1.5px solid var(--border);border-radius:20px;padding:48px 40px;width:100%;max-width:400px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.3)}
        .admin-login__logo{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:28px}
        .admin-login__logo-mark{width:40px;height:40px;background:var(--burgundy);border-radius:9px;display:flex;align-items:center;justify-content:center;color:white;font-family:'DM Serif Display',serif;font-size:20px}
        .admin-login__logo-name{font-family:'DM Serif Display',serif;font-size:18px;color:var(--dark)}
        .admin-login__divider{height:1px;background:var(--border);margin:0 0 28px}
        .admin-login__title{font-family:'DM Serif Display',serif;font-size:24px;color:var(--dark);margin-bottom:6px}
        .admin-login__sub{font-size:13px;color:var(--muted);margin-bottom:28px}
        .admin-login__input{font-family:'DM Sans',sans-serif;width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:10px;font-size:15px;outline:none;margin-bottom:14px;transition:border-color 0.15s;background:var(--off-white);box-sizing:border-box}
        .admin-login__input:focus{border-color:var(--burgundy);background:white;box-shadow:0 0 0 3px rgba(124,28,46,0.08)}
        .admin-login__input.error{border-color:#e53e3e;animation:shake 0.3s}
        @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        .admin-login__btn{width:100%;padding:13px;background:var(--burgundy);color:white;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:opacity 0.15s}
        .admin-login__btn:hover{opacity:0.9}
        .admin-login__back{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:13px;color:var(--muted);text-decoration:none;transition:color 0.15s}
        .admin-login__back:hover{color:var(--burgundy)}
      `}} />
      <div className="admin-login">
        <div className="admin-login__card">
          <div className="admin-login__logo">
            <div className="admin-login__logo-mark">K</div>
            <div className="admin-login__logo-name">Klair Computer</div>
          </div>
          <div className="admin-login__divider" />
          <div className="admin-login__title">Blog Admin</div>
          <div className="admin-login__sub">Enter your password to continue</div>
          <input className={`admin-login__input ${pwError ? 'error' : ''}`} type="password"
            placeholder="Password" value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()} autoFocus />
          <button className="admin-login__btn" onClick={login}>Enter</button>
          <div><a href="/" className="admin-login__back">← Back to website</a></div>
        </div>
      </div>
    </>
  )

  // ── Admin UI ─────────────────────────────────────────────────────────────
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .admin{min-height:100vh;background:var(--off-white);padding:88px 24px 48px}
        .admin__inner{max-width:1000px;margin:0 auto}
        .admin__header{display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;flex-wrap:wrap;gap:16px}
        .admin__title{font-family:'DM Serif Display',serif;font-size:32px;color:var(--dark)}
        .admin__btn{padding:10px 20px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;border:none;transition:all 0.15s}
        .admin__btn--primary{background:var(--burgundy);color:white}
        .admin__btn--primary:hover{opacity:0.9}
        .admin__btn--primary:disabled{opacity:0.5;cursor:not-allowed}
        .admin__btn--ghost{background:white;color:var(--dark);border:1.5px solid var(--border)}
        .admin__btn--ghost:hover{border-color:var(--burgundy);color:var(--burgundy)}
        .admin__btn--danger{background:#fee2e2;color:#b91c1c;border:none}
        .admin__btn--danger:hover{background:#fecaca}
        .admin__btn--sm{padding:6px 14px;font-size:12px}
        .admin__table{background:white;border:1.5px solid var(--border);border-radius:16px;overflow:hidden}
        .admin__table table{width:100%;border-collapse:collapse}
        .admin__table th{text-align:left;padding:14px 20px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);background:var(--off-white);border-bottom:1.5px solid var(--border)}
        .admin__table td{padding:14px 20px;font-size:14px;color:var(--dark);border-bottom:1px solid var(--border);vertical-align:middle}
        .admin__table tr:last-child td{border-bottom:none}
        .admin__table tr:hover td{background:#fafafa}
        .admin__badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700}
        .admin__badge--published{background:#d1fae5;color:#065f46}
        .admin__badge--draft{background:#f3f4f6;color:#6b7280}
        .admin__actions{display:flex;gap:8px}
        .admin__form-card{background:white;border:1.5px solid var(--border);border-radius:20px;padding:40px}
        .admin__form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
        .admin__field{display:flex;flex-direction:column;gap:6px}
        .admin__field--full{grid-column:1/-1}
        .admin__label{font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)}
        .admin__input{font-family:'DM Sans',sans-serif;font-size:14px;color:var(--dark);background:var(--off-white);border:1.5px solid var(--border);border-radius:10px;padding:10px 14px;outline:none;transition:all 0.15s;width:100%;box-sizing:border-box}
        .admin__input:focus{border-color:var(--burgundy);background:white;box-shadow:0 0 0 3px rgba(124,28,46,0.08)}
        .admin__textarea{font-family:'DM Sans',sans-serif;font-size:14px;color:var(--dark);background:var(--off-white);border:1.5px solid var(--border);border-radius:10px;padding:10px 14px;outline:none;transition:all 0.15s;width:100%;box-sizing:border-box;resize:vertical;min-height:80px}
        .admin__textarea:focus{border-color:var(--burgundy);background:white;box-shadow:0 0 0 3px rgba(124,28,46,0.08)}
        .admin__checkbox-row{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600;color:var(--dark);cursor:pointer}
        .admin__checkbox-row input{width:18px;height:18px;accent-color:var(--burgundy);cursor:pointer}
        .admin__form-footer{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;padding-top:24px;border-top:1.5px solid var(--border)}
        .admin__hint{font-size:11px;color:var(--muted);margin-top:4px}
        .admin__toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;color:white;z-index:9999;animation:fadeup 0.3s ease}
        .admin__toast--success{background:#065f46}
        .admin__toast--error{background:#b91c1c}
        @keyframes fadeup{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

        .rte{border:1.5px solid var(--border);border-radius:12px;overflow:hidden;background:white;transition:border-color 0.15s}
        .rte:focus-within{border-color:var(--burgundy);box-shadow:0 0 0 3px rgba(124,28,46,0.08)}
        .rte-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:2px;padding:8px 10px;background:var(--off-white);border-bottom:1.5px solid var(--border)}
        .rte-btn{display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:28px;padding:0 6px;border:none;background:transparent;border-radius:6px;cursor:pointer;color:var(--dark);font-size:13px;font-weight:700;font-family:'DM Sans',sans-serif;transition:background 0.12s,color 0.12s}
        .rte-btn:hover:not(:disabled){background:rgba(124,28,46,0.08);color:var(--burgundy)}
        .rte-btn--active{background:var(--burgundy)!important;color:white!important}
        .rte-btn:disabled{opacity:0.35;cursor:not-allowed}
        .rte-sep{width:1px;height:20px;background:var(--border);margin:0 4px}
        .rte-content{padding:20px 24px;min-height:320px;font-size:15px;line-height:1.75;color:var(--dark)}
        .rte-content .ProseMirror{outline:none;min-height:280px}
        .rte-content .ProseMirror p.is-editor-empty:first-child::before{content:attr(data-placeholder);color:#aaa;pointer-events:none;float:left;height:0}
        .rte-content h2{font-family:'DM Serif Display',serif;font-size:26px;margin:32px 0 12px;color:var(--dark);letter-spacing:-0.01em}
        .rte-content h3{font-size:18px;font-weight:700;margin:24px 0 10px}
        .rte-content p{margin-bottom:16px}
        .rte-content ul,.rte-content ol{margin:0 0 16px 24px}
        .rte-content li{margin-bottom:6px}
        .rte-content blockquote{border-left:4px solid var(--burgundy);padding:10px 20px;margin:20px 0;background:#fdf7f7;border-radius:0 8px 8px 0;font-style:italic;color:var(--muted)}
        .rte-content code{background:#f0f0f0;padding:2px 6px;border-radius:4px;font-size:13px;font-family:monospace}
        .rte-content pre{background:#1a1a2e;color:#e0e0e0;padding:16px 20px;border-radius:10px;overflow-x:auto;margin-bottom:16px}
        .rte-content pre code{background:none;padding:0}
        .rte-content img{max-width:100%;border-radius:8px;margin:16px 0}
        .rte-content a{color:var(--burgundy);text-decoration:underline}
        .rte-content hr{border:none;border-top:2px solid var(--border);margin:24px 0}

        .share-intro{background:white;border:1.5px solid var(--border);border-radius:16px;padding:28px 32px;margin-bottom:28px}
        .share-intro__icon{font-size:36px;margin-bottom:10px}
        .share-intro__title{font-family:'DM Serif Display',serif;font-size:22px;color:var(--dark);margin-bottom:6px}
        .share-intro__sub{font-size:14px;color:var(--muted);margin-bottom:12px}
        .share-intro__link{font-size:13px;font-weight:600;color:var(--burgundy);text-decoration:none;word-break:break-all}
        .share-intro__link:hover{text-decoration:underline}
        .share-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
        .share-card{background:white;border:1.5px solid var(--border);border-radius:16px;overflow:hidden;display:flex;flex-direction:column}
        .share-card__header{display:flex;align-items:center;gap:10px;padding:14px 20px;border-bottom:3px solid;background:var(--off-white)}
        .share-card__icon{font-size:20px}
        .share-card__label{font-size:15px;font-weight:700;flex:1}
        .share-card__open{font-size:11px;font-weight:700;color:white;padding:5px 12px;border-radius:20px;text-decoration:none;white-space:nowrap;transition:opacity 0.15s}
        .share-card__open:hover{opacity:0.85}
        .share-card__text{padding:16px 20px;font-size:13px;line-height:1.65;color:var(--dark);white-space:pre-wrap;word-break:break-word;flex:1;margin:0;font-family:'DM Sans',sans-serif;background:white}
        .share-card__copy{margin:0;padding:12px;border:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:white;cursor:pointer;transition:background 0.2s;border-top:1px solid var(--border)}
        .share-card__copy:hover{filter:brightness(1.1)}

        @media(max-width:760px){.share-grid{grid-template-columns:1fr}}
        @media(max-width:640px){
          .admin{padding:32px 16px}
          .admin__form-grid{grid-template-columns:1fr}
          .admin__field--full{grid-column:1}
          .admin__form-card{padding:24px 16px}
          .share-intro{padding:20px}
        }
      `}} />

      <Navbar />

      <div className="admin">
        <div className="admin__inner">

          {/* ── List view ── */}
          {view === 'list' && (
            <>
              <div className="admin__header">
                <div className="admin__title">Blog Posts</div>
                <button className="admin__btn admin__btn--primary" onClick={newPost}>+ New Post</button>
              </div>
              <div className="admin__table">
                {loading ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>Loading…</div>
                ) : posts.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>No posts yet. Create your first one!</div>
                ) : (
                  <table>
                    <thead>
                      <tr><th>Title</th><th>Status</th><th>Date</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      {posts.map(post => (
                        <tr key={post.id}>
                          <td>
                            <div style={{ fontWeight: 600 }}>{post.title}</div>
                            <div style={{ fontSize: 12, color: 'var(--muted)' }}>/blog/{post.slug}</div>
                          </td>
                          <td>
                            <span className={`admin__badge admin__badge--${post.published ? 'published' : 'draft'}`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td style={{ color: 'var(--muted)' }}>{formatDate(post.created_at)}</td>
                          <td>
                            <div className="admin__actions">
                              <button className="admin__btn admin__btn--ghost admin__btn--sm" onClick={() => editPost(post)}>Edit</button>
                              <button className="admin__btn admin__btn--ghost admin__btn--sm" onClick={() => togglePublish(post)}>
                                {post.published ? 'Unpublish' : 'Publish'}
                              </button>
                              <button className="admin__btn admin__btn--ghost admin__btn--sm"
                                onClick={() => { setSharePost({ title: post.title, slug: post.slug, excerpt: post.excerpt }); setView('share') }}>
                                Share
                              </button>
                              <button className="admin__btn admin__btn--danger admin__btn--sm" onClick={() => deletePost(post.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ── Edit view ── */}
          {view === 'edit' && (
            <>
              <div className="admin__header">
                <div className="admin__title">{editId ? 'Edit Post' : 'New Post'}</div>
                <button className="admin__btn admin__btn--ghost" onClick={() => setView('list')}>← Back</button>
              </div>
              <div className="admin__form-card">
                <div className="admin__form-grid">
                  <div className="admin__field admin__field--full">
                    <label className="admin__label">Title *</label>
                    <input className="admin__input" name="title" value={form.title}
                      onChange={handleChange} placeholder="Post title" />
                  </div>
                  <div className="admin__field">
                    <label className="admin__label">Slug *</label>
                    <input className="admin__input" name="slug" value={form.slug}
                      onChange={handleChange} placeholder="post-url-slug" />
                    <div className="admin__hint">URL: /blog/{form.slug || 'your-slug'}</div>
                  </div>
                  <div className="admin__field">
                    <label className="admin__label">Author</label>
                    <input className="admin__input" name="author" value={form.author}
                      onChange={handleChange} placeholder="Klair Team" />
                  </div>
                  <div className="admin__field admin__field--full">
                    <label className="admin__label">Cover Image URL</label>
                    <input className="admin__input" name="cover_url" value={form.cover_url}
                      onChange={handleChange} placeholder="https://..." />
                  </div>
                  <div className="admin__field admin__field--full">
                    <label className="admin__label">Excerpt</label>
                    <textarea className="admin__textarea" name="excerpt"
                      value={form.excerpt} onChange={handleChange}
                      placeholder="Short summary shown on the blog index…" />
                  </div>
                  <div className="admin__field admin__field--full">
                    <label className="admin__label">Content</label>
                    <RichEditor value={form.content} onChange={handleContentChange} />
                  </div>
                </div>
                <label className="admin__checkbox-row">
                  <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
                  Publish this post (visible on the blog)
                </label>
                <div className="admin__form-footer">
                  <button className="admin__btn admin__btn--ghost" onClick={() => setView('list')}>Cancel</button>
                  <button className="admin__btn admin__btn--primary" onClick={savePost}
                    disabled={saving || !form.title || !form.slug}>
                    {saving ? 'Saving…' : editId ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Share view ── */}
          {view === 'share' && sharePost && (
            <>
              <div className="admin__header">
                <div className="admin__title">Share Post</div>
                <button className="admin__btn admin__btn--ghost" onClick={() => setView('list')}>← Back to Posts</button>
              </div>
              <div className="share-intro">
                <div className="share-intro__icon">🎉</div>
                <div className="share-intro__title">"{sharePost.title}" is live!</div>
                <div className="share-intro__sub">Copy each caption below and paste it into your social channels.</div>
                <a href={`${SITE_URL}/blog/${sharePost.slug}`} target="_blank" rel="noopener noreferrer" className="share-intro__link">
                  🔗 {SITE_URL}/blog/{sharePost.slug}
                </a>
              </div>
              <div className="share-grid">
                {PLATFORMS.map(p => {
                  const captions = generateCaptions(sharePost)
                  return (
                    <div key={p.key} className="share-card">
                      <div className="share-card__header" style={{ borderBottomColor: p.color }}>
                        <span className="share-card__icon">{p.icon}</span>
                        <span className="share-card__label" style={{ color: p.color }}>{p.label}</span>
                        <a href={p.url} target="_blank" rel="noopener noreferrer"
                          className="share-card__open" style={{ background: p.color }}>
                          Open ↗
                        </a>
                      </div>
                      <pre className="share-card__text">{captions[p.key]}</pre>
                      <button className="share-card__copy"
                        style={{ background: copied === p.key ? '#065f46' : p.color }}
                        onClick={() => copyCaption(p.key, captions[p.key])}>
                        {copied === p.key ? '✓ Copied!' : 'Copy Caption'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </>
          )}

        </div>
      </div>

      {toast && <div className={`admin__toast admin__toast--${toast.type}`}>{toast.msg}</div>}
    </>
  )
}
