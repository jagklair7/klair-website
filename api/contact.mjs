import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log('METHOD:', req.method);
  console.log('BODY TYPE:', typeof req.body);
  console.log('BODY:', JSON.stringify(req.body));
  console.log('API KEY EXISTS:', !!process.env.RESEND_API_KEY);

  if (req.method !== 'POST') return res.status(405).end();

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }

  // fix: destructure from parsed body, not req.body
  const { name, email, phone, company, service, message } = body;

  console.log('FIELDS:', { name, email, message });

  if (!name || !email || !message) {
    console.log('MISSING FIELDS - returning 400');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await resend.emails.send({
      from: 'Klair Website <noreply@digital1now.com>',
      to: 'info@digital1now.com',
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>` : ''}
          ${company ? `<tr><td><strong>Company</strong></td><td>${company}</td></tr>` : ''}
          ${service ? `<tr><td><strong>Service</strong></td><td>${service}</td></tr>` : ''}
          <tr><td><strong>Message</strong></td><td>${message}</td></tr>
        </table>
      `,
    });
    console.log('Resend result:', JSON.stringify(result));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}