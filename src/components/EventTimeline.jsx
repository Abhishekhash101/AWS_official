import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './EventTimeline.css';

/* ═══════════════════════════════════════════════════════════
   AWS Week Event Timeline — Kinetic Infrastructure Theme
   ═══════════════════════════════════════════════════════════ */

const timelineData = [
  {
    day: 'Day 1',
    title: 'Cloud Genesis 101',
    time: '7:00 – 9:00 pm',
    icon: 'cloud',
    points: [
      'Intro & welcome',
      'Computing evolution & on-premise infra',
      'What is cloud computing?',
      'Deployment & service models',
      'Why AWS — history & global infrastructure',
    ],
    quiz: {
      label: 'Cloud Combat 1.0',
      rounds: [
        'Round 1 — Basic · 5 qns · 5 pts · Top 70% advance',
        'Round 2 — Intermediate · 5 qns · 10 pts · Top 40% advance',
        'Round 3 — Advanced · 3 qns · 15 pts · Live winner reveal',
      ],
    },
  },
  {
    day: 'Day 2',
    title: 'Cloud Forge 102',
    time: '7:00 – 10:00 pm',
    icon: 'dns',
    points: [
      'AWS compute services overview',
      'EC2 fundamentals & use cases',
      'AMI, key pairs, security groups & IPs',
      'Launch an EC2 instance (live demo)',
      'EC2 vs Lambda — why go serverless',
      'AWS core architecture & event sources',
      'Lambda limitations & use cases',
      'Cloud Combat 2.0 — AWS Escape Room',
    ],
  },
  {
    day: 'Day 3',
    title: 'Data Nexus 103',
    time: '7:00 – 9:00 pm',
    icon: 'database',
    points: [
      'Database fundamentals & why they matter',
      'Structured vs unstructured data',
      'AWS DB services — SQL & NoSQL overview',
      'RDS — managed relational DB, multi-AZ, replicas',
      'DynamoDB — serverless NoSQL, key-value, scaling',
      'RDS vs DynamoDB comparison',
      'Cloud Combat 3.0 — Case Study Activity',
    ],
  },
  {
    day: 'Day 4',
    title: 'Guest Lecture',
    time: 'Special Session',
    icon: 'campaign',
    points: [
      'Industry expert speaker session',
      'Real-world AWS use cases & insights',
      'Career perspectives in cloud',
      'Open Q&A & networking',
    ],
  },
];

/* ── Single Timeline Card ── */
function TimelineCard({ item, index, isLeft }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="evt-tl-item"
      data-side={isLeft ? 'left' : 'right'}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Content Side */}
      <div className="evt-tl-content" style={{ order: isLeft ? 1 : 3 }}>
        <span className="evt-day-label">{item.day}</span>
        <p className="evt-day-title">{item.title}</p>
        <span className="evt-day-sub">{item.time}</span>

        <ul className="evt-day-points">
          {item.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        {/* Quiz Block (only Day 1) */}
        {item.quiz && (
          <div className="evt-quiz-block">
            <span className="evt-quiz-label">{item.quiz.label}</span>
            <div className="evt-quiz-rounds">
              {item.quiz.rounds.map((round, i) => (
                <span className="evt-round-pill" key={i}>{round}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Node */}
      <div className="evt-tl-node" style={{ order: 2 }}>
        <span className="material-symbols-outlined">{item.icon}</span>
      </div>

      {/* Empty Side */}
      <div className="evt-tl-empty" style={{ order: isLeft ? 3 : 1 }} />

      {/* Connector Line */}
      <div className="evt-tl-connector" data-side={isLeft ? 'left' : 'right'} />
    </motion.div>
  );
}

/* ── Main Export ── */
export default function EventTimeline() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <div className="evt-tl-wrap">
      {/* Section Header */}
      <motion.div
        ref={headerRef}
        className="evt-tl-header"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="evt-eyebrow">
          <span className="evt-eyebrow-dot" />
          4-Day Workshop Series
        </p>
        <h3 className="evt-tl-title">
          AWS <span>Week</span> Event Timeline
        </h3>
      </motion.div>

      {/* Timeline Body */}
      <div className="evt-tl-container">
        {/* Central Spine */}
        <div className="evt-tl-spine" />

        {timelineData.map((item, index) => (
          <TimelineCard
            key={item.day}
            item={item}
            index={index}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="evt-footer-bar"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>
          4 days · 3 technical sessions · Cloud Combat series · <strong>aws week</strong>
        </p>
      </motion.div>
    </div>
  );
}
