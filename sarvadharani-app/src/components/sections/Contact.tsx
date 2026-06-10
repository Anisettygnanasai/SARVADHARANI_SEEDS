'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

// Inline SVG social icons (lucide-react version agnostic)
const SocialFacebook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const SocialTwitter = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4l11.733 16H20L8.267 4H4z"/><path d="M4 20l6.768-6.768M20 4l-6.768 6.768" stroke="currentColor" strokeWidth="1.5"/></svg>;
const SocialInstagram = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>;
const SocialYoutube = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
const SocialLinkedin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const contactInfo = [
  { icon: Phone, label: 'Managing Partners', value: '+91 9381027593, +91 8209574729, +91 7288950911', sub: 'Call us directly', color: '#C8981E' },
  { icon: Mail, label: 'Email', value: 'sarvadharaniseeds024@gmail.com', sub: 'We reply promptly', color: '#3D6B4F' },
  { icon: MapPin, label: 'Office Address', value: 'At-Panasaguda, Via Sikarpai', sub: 'Kalyan Singpur Block, Rayagada, Odisha - 765017', color: '#6B4C2A' },
];

const socials = [
  { icon: SocialInstagram, label: 'Instagram', href: 'https://www.instagram.com/sarvadharani_seeds', color: '#E1306C' },
  { icon: SocialYoutube, label: 'YouTube', href: 'https://youtube.com/@sarvadharaniseeds', color: '#FF0000' },
];

type FormStatus = 'idle' | 'loading' | 'success';

export function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '', interest: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setFormStatus('success');
    } catch (error) {
      console.error(error);
      setFormStatus('idle');
      alert('Failed to send message. Please try again or call us directly.');
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'linear-gradient(180deg, #FDFAF4 0%, #F5EDE4 100%)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="label-text">Get in Touch</span>
          <span className="gold-divider mx-auto mt-3 mb-6 block" />
          <h2 className="section-heading mb-5">
            Start Your Journey to<br />
            <span className="gradient-text">Better Harvests</span>
          </h2>
          <p className="body-text text-lg">
            Whether you&apos;re a farmer looking for seeds, a dealer seeking partnership, or a researcher exploring collaboration — we&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="card-base p-5 md:p-8 lg:p-10">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-20 h-20 rounded-full bg-natural-green-50 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={40} className="text-natural-green" />
                  </motion.div>
                  <h3 className="font-cormorant text-3xl font-bold text-deep-forest mb-3">
                    Message Received!
                  </h3>
                  <p className="body-text max-w-sm">
                    Thank you for reaching out. Our team will contact you within 24 hours. We look forward to growing together.
                  </p>
                  <button
                    onClick={() => { setFormStatus('idle'); setFormData({ name: '', email: '', phone: '', subject: '', message: '', interest: '' }); }}
                    className="mt-8 btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                  <h3 className="font-jakarta font-bold text-xl text-deep-forest mb-6">Send Us a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FloatingInput id="contact-name" label="Full Name *" name="name" type="text" value={formData.name} onChange={handleChange} required />
                    <FloatingInput id="contact-email" label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FloatingInput id="contact-phone" label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    <div className="relative">
                      <select
                        id="contact-interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 pt-6 pb-2 rounded-xl border-2 border-paddy-gold-100 bg-ivory font-inter text-sm text-deep-forest focus:border-paddy-gold focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select Interest</option>
                        <option value="seed-purchase">Seed Purchase</option>
                        <option value="dealer">Dealer Partnership</option>
                        <option value="research">Research Collaboration</option>
                        <option value="farmer-program">Farmer Program</option>
                        <option value="other">Other</option>
                      </select>
                      <label className="absolute top-2 left-4 font-inter text-xs font-semibold text-paddy-gold uppercase tracking-wide">
                        I&apos;m interested in
                      </label>
                    </div>
                  </div>

                  <FloatingInput id="contact-subject" label="Subject *" name="subject" type="text" value={formData.subject} onChange={handleChange} required />

                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder=" "
                      className="w-full px-4 pt-6 pb-2 rounded-xl border-2 border-paddy-gold-100 bg-ivory font-inter text-sm text-deep-forest focus:border-paddy-gold focus:outline-none transition-colors resize-none peer"
                    />
                    <label
                      htmlFor="contact-message"
                      className="absolute top-2 left-4 font-inter text-xs font-semibold text-paddy-gold uppercase tracking-wide pointer-events-none"
                    >
                      Your Message *
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'loading'}
                    className="w-full btn-primary py-4 justify-center text-base disabled:opacity-70"
                    id="contact-submit"
                  >
                    {formStatus === 'loading' ? (
                      <span className="flex items-center gap-3 justify-center">
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Send size={18} />
                        Send Message
                      </span>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Cards */}
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="card-base p-4 md:p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${info.color}15` }}>
                    <Icon size={22} style={{ color: info.color }} />
                  </div>
                  <div>
                    <div className="label-text mb-1">{info.label}</div>
                    <div className="font-jakarta font-bold text-deep-forest text-sm">{info.value}</div>
                    <div className="font-inter text-xs text-warm-gray mt-0.5">{info.sub}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-2xl overflow-hidden h-64 relative bg-ivory shadow-sm"
            >
              <iframe
                src="https://maps.google.com/maps?q=Kalyan%20Singpur,%20Rayagada,%20Odisha&t=&z=10&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sarvadharani Seeds Location"
                className="absolute inset-0"
              />
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="card-base p-5"
            >
              <div className="label-text mb-4">Follow Our Journey</div>
              <div className="flex gap-3 flex-wrap">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-rice-white border border-paddy-gold-100 hover:border-paddy-gold-300 transition-colors"
                      style={{ color: s.color }}
                      aria-label={s.label}
                      id={`social-${s.label.toLowerCase()}`}
                    >
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({
  id, label, name, type, value, onChange, required,
}: {
  id: string; label: string; name: string; type: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="w-full px-4 pt-6 pb-2 rounded-xl border-2 border-paddy-gold-100 bg-ivory font-inter text-sm text-deep-forest focus:border-paddy-gold focus:outline-none transition-colors peer"
      />
      <label
        htmlFor={id}
        className="absolute top-2 left-4 font-inter text-xs font-semibold text-paddy-gold uppercase tracking-wide pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}
