import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Users,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

function About() {
  const { Theme } = useTheme();

  const isDark = Theme === 'dark';

  const features = [
    {
      icon: ShoppingBag,
      title: 'Premium Products',
      desc: 'Carefully curated products with quality assurance and modern trends in mind.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      desc: 'Quick and reliable delivery service designed for smooth shopping experiences.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      desc: 'Multiple secure payment methods with trusted transaction protection.',
    },
    {
      icon: BadgeCheck,
      title: 'Trusted Brand',
      desc: 'Built to provide transparency, affordability, and long-term customer trust.',
    },
  ];

  const stats = [
    {
      number: '10K+',
      label: 'Happy Customers',
    },
    {
      number: '500+',
      label: 'Products',
    },
    {
      number: '50+',
      label: 'Brands',
    },
    {
      number: '24/7',
      label: 'Support',
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'
      }`}
    >
      {/* HERO SECTION */}
      <section className='max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-20'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
              <Sparkles size={16} />
              <span className='text-sm font-medium'>About DealKart</span>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-black leading-tight'>
              Smart Shopping.
              <br />
              Better Deals.
            </h1>

            <p
              className={`mt-6 text-base md:text-lg leading-relaxed max-w-xl ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              DealKart is a modern ecommerce platform focused on providing
              affordable pricing, premium quality products, and a seamless
              shopping experience for every customer.
            </p>

            <div className='flex flex-wrap gap-4 mt-8'>
              <button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isDark
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Explore Products
              </button>

              <button
                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? 'border-gray-700 hover:bg-gray-900'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-3xl overflow-hidden border p-8 md:p-10 ${
              isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className='absolute top-0 right-0 w-40 h-40 rounded-full bg-gray-300/10 blur-3xl'></div>

            <div className='relative z-10'>
              <div className='flex items-center gap-4 mb-8'>
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    isDark ? 'bg-black' : 'bg-gray-100'
                  }`}
                >
                  <ShoppingBag size={30} />
                </div>

                <div>
                  <h2 className='text-2xl font-bold'>DealKart</h2>
                  <p
                    className={`${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    Minimal Ecommerce Experience
                  </p>
                </div>
              </div>

              <div className='space-y-5'>
                <div
                  className={`rounded-2xl p-5 ${
                    isDark ? 'bg-black' : 'bg-gray-100'
                  }`}
                >
                  <h3 className='font-semibold text-lg mb-2'>Our Mission</h3>
                  <p
                    className={`leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    To make online shopping affordable, trusted, and enjoyable
                    with modern technology and user-first experiences.
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-5 ${
                    isDark ? 'bg-black' : 'bg-gray-100'
                  }`}
                >
                  <h3 className='font-semibold text-lg mb-2'>Our Vision</h3>
                  <p
                    className={`leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Building the next-generation ecommerce platform with speed,
                    simplicity, and transparency.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className='max-w-7xl mx-auto px-4 md:px-6 pb-20'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-3xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h2 className='text-3xl md:text-4xl font-black'>
                {item.number}
              </h2>

              <p
                className={`mt-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className='max-w-7xl mx-auto px-4 md:px-6 pb-24'>
        <div className='text-center mb-14'>
          <h2 className='text-3xl md:text-4xl font-black'>
            Why Choose DealKart?
          </h2>

          <p
            className={`mt-4 max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Everything designed with simplicity, trust, and premium shopping
            experience in mind.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-2 ${
                  isDark
                    ? 'bg-gray-900 border-gray-800 hover:bg-gray-950'
                    : 'bg-white border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                    isDark ? 'bg-black' : 'bg-gray-100'
                  }`}
                >
                  <Icon size={26} />
                </div>

                <h3 className='text-xl font-bold mb-3'>
                  {feature.title}
                </h3>

                <p
                  className={`leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TEAM / CTA */}
      <section className='max-w-7xl mx-auto px-4 md:px-6 pb-20'>
        <div
          className={`rounded-[2rem] border overflow-hidden relative p-8 md:p-14 ${
            isDark
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className='absolute -top-10 -right-10 w-52 h-52 rounded-full bg-gray-300/10 blur-3xl'></div>

          <div className='relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10'>
            <div>
              <div className='flex items-center gap-3 mb-5'>
                <Users size={26} />
                <span className='font-semibold'>Growing Community</span>
              </div>

              <h2 className='text-3xl md:text-5xl font-black leading-tight max-w-3xl'>
                Join thousands of users shopping smarter with DealKart.
              </h2>

              <p
                className={`mt-5 max-w-2xl text-base md:text-lg leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Discover trending products, amazing offers, and a premium
                shopping experience built for modern customers.
              </p>
            </div>

            <button
              className={`px-8 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 ${
                isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
