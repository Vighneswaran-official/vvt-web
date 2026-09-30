import { useState, useCallback } from 'react';

/**
 * Custom React hook for form submission with WhatsApp & Email intimation.
 * Notifies:
 * - WhatsApp: +91 89250 73448
 * - Email: vogueventurestechnologies@gmail.com
 *
 * @param {Function} onSuccess — callback receiving form data on valid submit
 */
export function useFormSubmit(onSuccess) {
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formElement = e.target;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    const targetPhoneDigits = '918925073448';
    const targetEmail = 'vogueventurestechnologies@gmail.com';

    // Format message for WhatsApp
    const waLines = [
      '🚀 *NEW INQUIRY — VOGUE VENTURES TECHNOLOGIES*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${data.name || 'N/A'}`,
      `🏢 *Company / Brand:* ${data.brand || 'N/A'}`,
      `📧 *Email:* ${data.email || 'N/A'}`,
      `📞 *Phone:* ${data.phone || 'N/A'}`,
      `🎯 *Service:* ${data.service || 'N/A'}`,
    ];
    if (data.message && data.message.trim()) {
      waLines.push(`💬 *Message:* ${data.message.trim()}`);
    }
    waLines.push('━━━━━━━━━━━━━━━━━━━━━━━━━');
    waLines.push('Sent via VVT Website');

    const waText = encodeURIComponent(waLines.join('\n'));
    const waUrl = `https://wa.me/${targetPhoneDigits}?text=${waText}`;

    // Format mailto URL
    const mailSubject = encodeURIComponent(
      `New Lead: ${data.name} (${data.brand || 'Brand'}) — ${data.service || 'Growth Services'}`
    );
    const mailBodyLines = [
      'Hello Vogue Ventures Technologies Team,',
      '',
      'A new inquiry has been submitted via the VVT website:',
      '',
      `• Name: ${data.name || 'N/A'}`,
      `• Company / Brand: ${data.brand || 'N/A'}`,
      `• Email: ${data.email || 'N/A'}`,
      `• Phone: ${data.phone || 'N/A'}`,
      `• Requested Service: ${data.service || 'N/A'}`,
    ];
    if (data.message && data.message.trim()) {
      mailBodyLines.push(`• Requirements: ${data.message.trim()}`);
    }
    mailBodyLines.push('');
    mailBodyLines.push('--');
    mailBodyLines.push('Vogue Ventures Technologies (VVT)');

    const mailBody = encodeURIComponent(mailBodyLines.join('\n'));
    const mailUrl = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;

    // Auto-open WhatsApp chat with prefilled message
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked, provided direct button fallback:', err);
    }

    // Auto-trigger mailto client
    try {
      const mailLink = document.createElement('a');
      mailLink.href = mailUrl;
      mailLink.style.display = 'none';
      document.body.appendChild(mailLink);
      mailLink.click();
      document.body.removeChild(mailLink);
    } catch (err) {
      console.warn('Mail client trigger error:', err);
    }

    setFeedback({
      ...data,
      waUrl,
      mailUrl,
      targetPhone: '+91 89250 73448',
      targetEmail,
    });

    if (onSuccess) {
      onSuccess(data);
    }
  }, [onSuccess]);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return { feedback, handleSubmit, clearFeedback };
}
