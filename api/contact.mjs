import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
// manually parse body if needed
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  }
  const { name, email, phone, company, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'Klair Website <noreply@klair.ca>',
      to: 'info@klair.ca',
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

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: err.message });
  }
}