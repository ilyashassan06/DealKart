import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock3,
  MessageSquare,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

function Contact() {
  const { Theme } = useTheme();

  const isDark = Theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Add backend / email integration here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@dealkart.com',
      desc: 'We usually reply within 24 hours.',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 98765 43210',
      desc: 'Available Mon - Sat, 9 AM to 8 PM.',
    },
    {
      icon: MapPin,
      title: 'Visit Office',
      value: 'Patna, Bihar, India',
      desc: 'DealKart Headquarters.',
    },
    {
      icon: Clock3,
      title: 'Working Hours',
      value: '09:00 AM - 08:00 PM',
      desc: 'Sunday support available online.',
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}
    >
      {/* HERO */}
      <section className='max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-20'>
        <div className='text-center max-w-3xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
                isDark
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'
              }`}
            >
              <MessageSquare size={16} />
              <span className='text-sm font-medium'>Contact DealKart</span>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-black leading-tight'>
              We'd Love To
              <br />
              Hear From You.
            </h1>

            <p
              className={`mt-6 text-base md:text-lg leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Have questions, feedback, or need support? Our team is here to
              help you with everything related to DealKart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className='max-w-7xl mx-auto px-4 md:px-6 pb-24'>
        <div className='grid lg:grid-cols-5 gap-8'>
          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='lg:col-span-2 space-y-5'
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-gray-900 border-gray-800 hover:bg-gray-950'
                      : 'bg-white border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className='flex items-start gap-4'>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                        isDark ? 'bg-black' : 'bg-gray-100'
                      }`}
                    >
                      <Icon size={24} />
                    </div>

                    <div>
                      <h3 className='text-lg font-bold'>{item.title}</h3>

                      <p className='mt-1 font-medium'>{item.value}</p>

                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`lg:col-span-3 rounded-[2rem] border p-6 md:p-10 ${
              isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className='mb-8'>
              <h2 className='text-3xl font-black'>Send Message</h2>

              <p
                className={`mt-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Fill out the form below and our team will contact you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-5'>
                <div>
                  <label className='block mb-2 font-medium'>Full Name</label>

                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter your name'
                    className={`w-full rounded-2xl border px-5 py-4 outline-none transition-all duration-300 ${
                      isDark
                        ? 'bg-black border-gray-800 placeholder:text-gray-500 focus:border-gray-600'
                        : 'bg-gray-50 border-gray-200 placeholder:text-gray-400 focus:border-gray-400'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className='block mb-2 font-medium'>Email Address</label>

                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter your email'
                    className={`w-full rounded-2xl border px-5 py-4 outline-none transition-all duration-300 ${
                      isDark
                        ? 'bg-black border-gray-800 placeholder:text-gray-500 focus:border-gray-600'
                        : 'bg-gray-50 border-gray-200 placeholder:text-gray-400 focus:border-gray-400'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block mb-2 font-medium'>Subject</label>

                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder='Write subject'
                  className={`w-full rounded-2xl border px-5 py-4 outline-none transition-all duration-300 ${
                    isDark
                      ? 'bg-black border-gray-800 placeholder:text-gray-500 focus:border-gray-600'
                      : 'bg-gray-50 border-gray-200 placeholder:text-gray-400 focus:border-gray-400'
                  }`}
                  required
                />
              </div>

              <div>
                <label className='block mb-2 font-medium'>Message</label>

                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='6'
                  placeholder='Write your message...'
                  className={`w-full rounded-2xl border px-5 py-4 outline-none resize-none transition-all duration-300 ${
                    isDark
                      ? 'bg-black border-gray-800 placeholder:text-gray-500 focus:border-gray-600'
                      : 'bg-gray-50 border-gray-200 placeholder:text-gray-400 focus:border-gray-400'
                  }`}
                  required
                />
              </div>

              <button
                type='submit'
                className={`w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
