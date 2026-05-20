import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BLOG_DATA from '../data/blogData';

/* ─── color map ─── */
const CAT_COLORS = {
  purple: { bg: 'rgba(168,85,247,0.08)', text: '#c084fc' },
  blue:   { bg: 'rgba(100,180,255,0.08)', text: '#64b4ff' },
  green:  { bg: 'rgba(52,211,153,0.08)',  text: '#34d399' },
  orange: { bg: 'rgba(255,153,0,0.08)',   text: '#ff9900' },
};

function ArrowIcon({ className = '' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function Blog() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  /* split into featured + list */
  const featuredPost = BLOG_DATA.find((b) => b.featured) || BLOG_DATA[0];
  const listPosts = BLOG_DATA.filter((b) => b.slug !== featuredPost.slug);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-24 bg-background border-b border-white/10 overflow-hidden"
    >
      {/* Subtle grid background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,153,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 w-full px-container-padding max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <span
              className="font-label-sm text-[10px] text-primary-container tracking-widest uppercase px-3 py-1 rounded-sm border border-primary-container/20"
              style={{ background: 'rgba(255,153,0,0.08)' }}
            >
              $ ls /blogs
            </span>
            <h2 className="font-headline-lg text-[40px] text-white uppercase tracking-widest">
              Blogs
            </h2>
          </div>
        </motion.div>

        {/* ── Blog Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Featured Card */}
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="relative rounded-lg overflow-hidden border border-primary-container/15 p-6 flex flex-col justify-between min-h-[320px] group no-underline"
            style={{ background: '#111827' }}
          >
            {/* Decorative circle */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border border-primary-container/10 group-hover:border-primary-container/25 transition-colors duration-500" />

            <div>
              <span
                className="inline-block font-label-sm text-[9px] text-primary-container tracking-widest uppercase px-2 py-1 rounded-sm border border-primary-container/18 mb-4"
                style={{ background: 'rgba(255,153,0,0.08)' }}
              >
                ⚡ Featured
              </span>
              <h3 className="font-headline-lg text-[22px] text-white leading-tight tracking-wide mb-3">
                {featuredPost.title}
              </h3>
              <p className="font-body-md text-[12px] text-on-surface-variant leading-relaxed">
                {featuredPost.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-label-sm text-[9px] font-bold text-primary-container border border-primary-container/25"
                  style={{ background: 'rgba(255,153,0,0.1)' }}
                >
                  {featuredPost.initials}
                </div>
                <div>
                  <div className="font-body-md text-[11px] text-white font-medium">
                    {featuredPost.author}
                  </div>
                  <div className="font-label-sm text-[10px] text-on-surface-variant">
                    {featuredPost.readTime} · {featuredPost.category}
                  </div>
                </div>
              </div>
              <span className="bg-primary-container text-background font-label-sm text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-sm group-hover:opacity-85 transition-opacity">
                Read →
              </span>
            </div>
          </Link>

          {/* Blog List */}
          <div className="flex flex-col justify-between h-full">
            {listPosts.map((post, i) => {
              const color = CAT_COLORS[post.categoryColor] || CAT_COLORS.orange;
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex items-center justify-between gap-3 py-4 border-b border-white/15 last:border-b-0 cursor-pointer hover:pl-1 transition-all duration-200 no-underline"
                  >
                    <div>
                      <span
                        className="blog-category-tag"
                        style={{ background: color.bg, color: color.text }}
                      >
                        {post.category}
                      </span>
                      <div className="font-body-md text-[13px] text-white font-semibold leading-tight">
                        {post.title}
                      </div>
                      <div className="font-label-sm text-[10.5px] text-on-surface-variant mt-0.5">
                        {post.author}
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-primary-container/22 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-container group-hover:border-primary-container transition-all duration-200">
                      <ArrowIcon className="text-primary-container group-hover:text-background w-3 h-3 transition-colors duration-200" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* CSS for category color tags */}
      <style>{`
        .blog-category-tag {
          font-family: var(--font-label-sm);
          font-size: 8.5px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 2px;
          display: inline-block;
          margin-bottom: 4px;
        }
      `}</style>
    </section>
  );
}
