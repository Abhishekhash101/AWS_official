// ═══════════════════════════════════════════════════════════
//  AWS QUIZ DATA — All question banks & case studies
// ═══════════════════════════════════════════════════════════

// ── Regular Quizzes ─────────────────────────────────────────

export const QUIZZES = [
  {
    id: 'fundamentals',
    title: 'Cloud Combat 1.0 - Round 1',
    subtitle: 'Pick the Right DB! One scenario → one correct AWS DB service. 1 point per correct answer. +1 bonus if answered in under 5 seconds.',
    category: 'Beginner',
    questions: 5,
    duration: '6 min',
    topics: ['RDS', 'DynamoDB', 'ElastiCache', 'Aurora', 'Redshift', 'DocumentDB'],
    color: '#FF9900',
  },
  {
    id: 'advanced',
    title: 'Cloud Combat 1.0 - Round 2',
    subtitle: 'Design the Right Stack! Each startup has multiple data needs. Pick the correct combination of 2–3 AWS DB services. 3 pts full / 1 pt partial.',
    category: 'Intermediate',
    questions: 5,
    duration: '8 min',
    topics: ['RDS', 'Aurora', 'DynamoDB', 'ElastiCache', 'Redshift', 'DocumentDB'],
    color: '#00a8e0',
  },
  {
    id: 'security',
    title: 'Cloud Combat 1.0 - Round 3',
    subtitle: 'Defend Your Answer! A startup made a DB choice — challenge it. 5 pts for correct answer + solid justification.',
    category: 'Advanced',
    questions: 3,
    duration: '7 min',
    topics: ['DynamoDB', 'ElastiCache', 'Redshift', 'DocumentDB', 'Aurora', 'RDS'],
    color: '#a855f7',
  },
];

export const CASE_STUDIES = [
  {
    id: 'ecommerce',
    title: 'Food Delivery DB Architecture',
    subtitle: 'Design the database stack for a food delivery startup with relational, caching, and flexible schema needs',
    scenario: `A food delivery startup is scaling rapidly. They need: (1) user account storage with complex relational queries for profiles, order history, and payment info, (2) fast session caching with sub-millisecond reads for user sessions and recently viewed restaurants, (3) flexible restaurant menu storage where schema changes frequently as new restaurants onboard with different menu structures in JSON format. Design the right AWS database stack.`,
    questions: 3,
    duration: '10 min',
    tags: ['Relational', 'Caching', 'NoSQL'],
  },
  {
    id: 'serverless-pipeline',
    title: 'E-Commerce Platform Stack',
    subtitle: 'Build the data layer for an e-commerce platform handling catalogue, cart, and analytics',
    scenario: `An e-commerce platform handles 50,000 daily orders. They need: (1) a product catalogue with complex queries including joins across categories, suppliers, and pricing tiers, (2) cart data storage requiring fast reads/writes per user session with single-digit ms latency, (3) historical sales analytics running heavy SQL queries on terabytes of transaction logs for business intelligence dashboards. Choose the right combination of AWS database services.`,
    questions: 3,
    duration: '10 min',
    tags: ['SQL', 'NoSQL', 'Analytics'],
  },
  {
    id: 'disaster-recovery',
    title: 'Real-Time Multiplayer Game Stack',
    subtitle: 'Design the database architecture for a multiplayer game with leaderboards, sessions, and analytics',
    scenario: `A real-time multiplayer game has 2 million concurrent players. They need: (1) a leaderboard system with fast sorted lookups serving millions of score queries per second, (2) player session caching with sub-millisecond response times for active game state, (3) game statistics history and analytics for tracking player behaviour, match outcomes, and revenue metrics at massive scale. Select the optimal AWS database combination.`,
    questions: 3,
    duration: '10 min',
    tags: ['Leaderboard', 'Caching', 'Analytics'],
  },
];

// ── Question Banks ───────────────────────────────────────────

export const QUESTION_BANKS = {
  fundamentals: [
    {id: 1, category: 'Relational',
      question: 'A food delivery app stores user profiles, order history, and payment info with complex queries. Which AWS database service should they use?',
      options: ['DynamoDB', 'Amazon RDS', 'ElastiCache', 'Amazon Redshift'],
      correct: 1,
      explanation: 'Amazon RDS is the right choice for structured, relational data with complex queries. It supports SQL-based operations like JOINs across tables — ideal for user profiles, order history, and payment info.'
    },
    {
      id: 2, category: 'NoSQL',
      question: 'A gaming leaderboard needs to serve millions of score lookups per second with single-digit ms latency. Which AWS database should they use?',
      options: ['Amazon RDS', 'Amazon Redshift', 'DynamoDB', 'DocumentDB'],
      correct: 2,
      explanation: 'DynamoDB is a key-value and document NoSQL database designed for single-digit millisecond performance at any scale. It\'s lightning fast for simple lookups like leaderboard scores.'
    },
    {
      id: 3, category: 'Caching',
      question: 'An e-commerce site wants to cache repeated product search results so the database isn\'t hit every time. What should they use?',
      options: ['Amazon Aurora', 'Amazon Redshift', 'ElastiCache', 'DocumentDB'],
      correct: 2,
      explanation: 'ElastiCache is an in-memory caching service (Redis/Memcached) that sits in front of your database. It serves repeated reads at sub-millisecond speed, reducing load on the primary database.'
    },
    {
      id: 4, category: 'Aurora',
      question: 'A startup wants a MySQL-compatible database that auto-scales and is fully managed by AWS. Which service fits best?',
      options: ['Amazon RDS for MySQL', 'Amazon Aurora', 'DynamoDB', 'Amazon Redshift'],
      correct: 1,
      explanation: 'Amazon Aurora is MySQL and PostgreSQL compatible, fully managed, auto-scales storage up to 128 TB, and offers up to 5x the throughput of standard MySQL — with a serverless option available.'
    },
    {
      id: 5, category: 'Data Warehouse',
      question: 'A data analytics team runs heavy SQL queries on terabytes of historical transaction logs. Which AWS service is purpose-built for this?',
      options: ['Amazon RDS', 'DynamoDB', 'Amazon Redshift', 'ElastiCache'],
      correct: 2,
      explanation: 'Amazon Redshift is a fully managed data warehouse designed for OLAP (Online Analytical Processing). It can handle petabyte-scale analytical queries using columnar storage and massively parallel processing.'
    },
  ],

  advanced: [
    {
      id: 1, category: 'Stack Design',
      question: 'A food delivery startup needs: user account storage (relational), fast session caching, and flexible restaurant menu storage (JSON schema). Which combination of AWS services is correct?',
      options: [
        'DynamoDB + Redshift + Aurora',
        'RDS + ElastiCache + DocumentDB',
        'Aurora + DocumentDB + ElastiCache',
        'ElastiCache + RDS + Redshift'
      ],
      correct: 1,
      explanation: 'RDS handles relational user account data with SQL. ElastiCache provides sub-ms session caching. DocumentDB stores flexible JSON restaurant menus that change frequently. This is the ideal 3-service stack.'
    },
    {
      id: 2, category: 'Stack Design',
      question: 'An e-commerce platform needs: product catalogue with complex queries, cart data with fast reads/writes per user, and historical sales analytics. Which stack is correct?',
      options: [
        'RDS + ElastiCache + DocumentDB',
        'Aurora + DynamoDB + Redshift',
        'DynamoDB + DocumentDB + ElastiCache',
        'Redshift + ElastiCache + RDS'
      ],
      correct: 1,
      explanation: 'Aurora handles complex product catalogue queries (relational SQL). DynamoDB provides fast key-value reads/writes for cart data. Redshift is the data warehouse for heavy historical sales analytics.'
    },
    {
      id: 3, category: 'Stack Design',
      question: 'A social media app needs: user profiles and followers (relational), news feed caching (sub-ms), and activity logs at massive scale (NoSQL). Which combination works?',
      options: [
        'Aurora + Redshift + DocumentDB',
        'DynamoDB + ElastiCache + RDS',
        'RDS + ElastiCache + DynamoDB',
        'DocumentDB + Aurora + Redshift'
      ],
      correct: 2,
      explanation: 'RDS stores relational user profiles and follower relationships. ElastiCache caches the news feed for sub-ms reads. DynamoDB handles massive-scale NoSQL activity logs with high write throughput.'
    },
    {
      id: 4, category: 'Stack Design',
      question: 'A healthcare portal needs: patient records with ACID transactions, doctor notes in free-form JSON, and analytics on treatment outcomes. Which stack fits?',
      options: [
        'DynamoDB + ElastiCache + Aurora',
        'RDS + DocumentDB + Redshift',
        'Aurora + ElastiCache + DynamoDB',
        'DocumentDB + Redshift + ElastiCache'
      ],
      correct: 1,
      explanation: 'RDS provides ACID-compliant storage for patient records. DocumentDB stores free-form JSON doctor notes with flexible schema. Redshift runs analytical queries on treatment outcome data at scale.'
    },
    {
      id: 5, category: 'Stack Design',
      question: 'A real-time multiplayer game needs: leaderboard with fast sorted lookups, player session cache (sub-ms), and game stats history (analytics). Which combination is best?',
      options: [
        'RDS + DocumentDB + Aurora',
        'Aurora + ElastiCache + RDS',
        'DynamoDB + ElastiCache + Redshift',
        'Redshift + DocumentDB + DynamoDB'
      ],
      correct: 2,
      explanation: 'DynamoDB handles leaderboard data with fast sorted lookups at any scale. ElastiCache (Redis) provides sub-ms player session caching. Redshift powers game stats analytics and historical reporting.'
    },
  ],

  security: [
    {id: 1, category: 'Challenge',
      question: 'A startup chose DynamoDB to store user orders. Orders have complex joins with products, discounts, and user history. DynamoDB is NoSQL — it doesn\'t support JOINs. What should they have used instead?',
      options: [
        'ElastiCache — it\'s faster for complex queries',
        'RDS or Aurora — relational data with JOINs needs SQL',
        'Redshift — it handles joins at scale',
        'DocumentDB — it supports flexible queries'
      ],
      correct: 1,
      explanation: 'DynamoDB is a NoSQL key-value store — it does NOT support SQL JOINs. Orders with complex relationships across products, discounts, and users require a relational database like RDS or Aurora that supports full SQL operations.'
    },
    {
      id: 2, category: 'Challenge',
      question: 'You chose ElastiCache to store user profile data permanently for quick access. ElastiCache is in-memory — data is lost on restart. Is it the right PRIMARY store for profiles?',
      options: [
        'Yes — ElastiCache with Redis persistence is reliable enough',
        'No — use RDS for storage, ElastiCache only as a caching layer on top',
        'Yes — just enable Multi-AZ and it becomes durable',
        'No — use DynamoDB instead of ElastiCache entirely'
      ],
      correct: 1,
      explanation: 'ElastiCache is designed as a CACHING layer, not a primary data store. In-memory data can be lost on restarts or failures. Use RDS (or another persistent DB) as the primary store, and ElastiCache on top for speed.'
    },
    {
      id: 3, category: 'Challenge',
      question: 'A company uses Redshift to handle real-time user login session storage. Redshift is a data warehouse built for analytics, not OLTP. What\'s wrong with this choice?',
      options: [
        'Nothing — Redshift can handle sessions if you tune it right',
        'Redshift is too expensive for session data',
        'Wrong tool — use RDS or DynamoDB for transactional session data',
        'Redshift needs S3 integration to work with sessions'
      ],
      correct: 2,
      explanation: 'Redshift is optimized for OLAP (analytical queries on large datasets), NOT for OLTP (real-time transactional workloads like login sessions). Use RDS or DynamoDB for fast, transactional session storage.'
    },
  ],
};

// ── Case Study Question Banks ────────────────────────────────

export const CASE_STUDY_QUESTIONS = {
  ecommerce: {
    scenario: `A food delivery startup is scaling rapidly. They need: (1) user account storage with complex relational queries for profiles, order history, and payment info, (2) fast session caching with sub-millisecond reads for user sessions and recently viewed restaurants, (3) flexible restaurant menu storage where schema changes frequently as new restaurants onboard with different menu structures in JSON format.`,
    questions: [
      {
        id: 1, category: 'Relational',
        question: 'For the food delivery startup\'s user accounts, order history, and payment data requiring complex SQL queries and JOINs, which AWS database service is the best fit?',
        options: [
          'DynamoDB — fast NoSQL for all user data',
          'Amazon RDS — relational SQL database for structured data',
          'DocumentDB — flexible schema for user profiles',
          'Amazon Redshift — warehouse for order analytics'
        ],
        correct: 1,
        explanation: 'Amazon RDS is ideal for structured, relational data with complex queries. User profiles, order history, and payment info have clear relationships that benefit from SQL JOINs, foreign keys, and ACID transactions.'
      },
      {
        id: 2, category: 'Caching',
        question: 'For sub-millisecond session caching and recently viewed restaurants, which service should complement the primary database?',
        options: [
          'DynamoDB with DAX accelerator',
          'Amazon ElastiCache (Redis)',
          'Amazon Aurora with read replicas',
          'CloudFront edge caching'
        ],
        correct: 1,
        explanation: 'ElastiCache with Redis provides sub-millisecond in-memory reads, perfect for session data and recently viewed items. It acts as a caching layer in front of the primary database, reducing load and improving response times.'
      },
      {
        id: 3, category: 'Document Store',
        question: 'For flexible restaurant menu storage where each restaurant has a different JSON schema that changes frequently, which database is purpose-built for this?',
        options: [
          'Amazon RDS with JSON columns',
          'DynamoDB with document model',
          'Amazon DocumentDB (MongoDB-compatible)',
          'Amazon S3 with Athena queries'
        ],
        correct: 2,
        explanation: 'Amazon DocumentDB is a document database compatible with MongoDB, designed for flexible JSON schemas. Restaurant menus with varying structures and frequent schema changes are a perfect fit for a document store.'
      },
    ],
  },

  'serverless-pipeline': {
    scenario: `An e-commerce platform handles 50,000 daily orders. They need: (1) a product catalogue with complex queries including joins across categories, suppliers, and pricing tiers, (2) cart data storage requiring fast reads/writes per user session with single-digit ms latency, (3) historical sales analytics running heavy SQL queries on terabytes of transaction logs for business intelligence dashboards.`,
    questions: [
      {
        id: 1, category: 'Relational',
        question: 'For the product catalogue requiring complex SQL queries with joins across categories, suppliers, and pricing tiers, which AWS database should be used?',
        options: [
          'DynamoDB — NoSQL for fast product lookups',
          'Amazon Aurora — relational, auto-scaling, MySQL/PostgreSQL compatible',
          'Amazon Redshift — data warehouse for product data',
          'DocumentDB — flexible product schema'
        ],
        correct: 1,
        explanation: 'Amazon Aurora is the best fit for a product catalogue with complex relational queries. It\'s MySQL/PostgreSQL compatible, auto-scales, offers 5x MySQL throughput, and handles JOINs across categories, suppliers, and pricing tiers efficiently.'
      },
      {
        id: 2, category: 'NoSQL',
        question: 'For cart data requiring single-digit millisecond reads and writes per user session at scale, which database is optimal?',
        options: [
          'Amazon RDS with connection pooling',
          'ElastiCache for cart caching',
          'DynamoDB with on-demand capacity',
          'Aurora Serverless for flexible scaling'
        ],
        correct: 2,
        explanation: 'DynamoDB provides consistent single-digit millisecond performance at any scale. Cart data is key-value in nature (user ID → cart items), and DynamoDB\'s on-demand mode handles traffic spikes during sales events automatically.'
      },
      {
        id: 3, category: 'Analytics',
        question: 'For historical sales analytics with heavy SQL queries on terabytes of transaction logs, which AWS service is purpose-built for this workload?',
        options: [
          'Amazon RDS with read replicas',
          'DynamoDB with global secondary indexes',
          'Amazon Redshift — columnar data warehouse',
          'Amazon Athena with S3 data lake'
        ],
        correct: 2,
        explanation: 'Amazon Redshift is a columnar data warehouse designed for OLAP analytics. It uses massively parallel processing (MPP) to run complex SQL queries on terabytes of historical data — exactly what BI dashboards need.'
      },
    ],
  },

  'disaster-recovery': {
    scenario: `A real-time multiplayer game has 2 million concurrent players. They need: (1) a leaderboard system with fast sorted lookups serving millions of score queries per second, (2) player session caching with sub-millisecond response times for active game state, (3) game statistics history and analytics for tracking player behaviour, match outcomes, and revenue metrics at massive scale.`,
    questions: [
      {
        id: 1, category: 'Leaderboard',
        question: 'For the game\'s leaderboard requiring millions of sorted score lookups per second, which AWS database is the best choice?',
        options: [
          'Amazon RDS with indexed score column',
          'DynamoDB — high-throughput NoSQL with global secondary indexes',
          'ElastiCache Redis — sorted sets for rankings',
          'Amazon Redshift — analytical queries on scores'
        ],
        correct: 1,
        explanation: 'DynamoDB handles millions of requests per second with single-digit ms latency. Using a Global Secondary Index (GSI) on the score attribute enables fast sorted lookups. Its auto-scaling handles the massive concurrent player base.'
      },
      {
        id: 2, category: 'Session Cache',
        question: 'For player session caching requiring sub-millisecond response times for active game state during gameplay, which service is optimal?',
        options: [
          'DynamoDB with DAX',
          'Amazon ElastiCache (Redis) — in-memory sub-ms cache',
          'Amazon Aurora with connection pooling',
          'Amazon MemoryDB for Redis'
        ],
        correct: 1,
        explanation: 'ElastiCache with Redis delivers sub-millisecond in-memory reads and writes. It\'s ideal for active game state (player positions, health, inventory) that changes rapidly during gameplay and must be accessed instantly.'
      },
      {
        id: 3, category: 'Analytics',
        question: 'For game statistics history, tracking player behaviour, match outcomes, and revenue metrics at massive scale, which service should be used?',
        options: [
          'DynamoDB with on-demand mode',
          'Amazon RDS with materialized views',
          'Amazon Redshift — petabyte-scale analytics warehouse',
          'Amazon Athena with S3'
        ],
        correct: 2,
        explanation: 'Amazon Redshift is designed for large-scale analytics and business intelligence. It can handle petabytes of game data, running complex SQL queries across player behaviour, match outcomes, and revenue metrics for actionable insights.'
      },
    ],
  },
};
