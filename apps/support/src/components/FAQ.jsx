import { useState } from 'react'
import './FAQ.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is the typical response time for tickets?',
      answer: 'We aim to respond to all support tickets within 2 hours during business hours (8 AM - 6 PM MT). Critical tickets are prioritized and addressed immediately.',
    },
    {
      question: 'How can I check the status of my ticket?',
      answer: 'You will receive a confirmation email with your ticket number. Use this number to reference your issue. You can also call us directly for urgent matters.',
    },
    {
      question: 'What should I include in my support ticket?',
      answer: 'Include a clear subject line, detailed description of the issue, steps to reproduce the problem, screenshots if applicable, and any error messages you\'ve encountered.',
    },
    {
      question: 'Do you offer phone support?',
      answer: 'Yes! For urgent issues, call us at 1-780-555-KLAIR. For non-urgent matters, using this support ticketing system helps us respond more efficiently.',
    },
    {
      question: 'Is there a SLA for critical issues?',
      answer: 'Yes. Critical tickets receive immediate attention, typically within 15 minutes. Our team will engage directly and provide hourly updates until resolved.',
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq" id="faq">
      <div className="faq__container">
        <h2 className="faq__title">Frequently Asked Questions</h2>
        <div className="faq__list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq__item">
              <button
                className="faq__question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`faq__icon ${openIndex === index ? 'open' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openIndex === index && (
                <div className="faq__answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
