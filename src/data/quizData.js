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
    id: 'food-delivery',
    title: 'CASE 1: Broken Food App',
    subtitle: 'A startup just launched. Everything worked during testing, but on launch day, systems begin failing one by one. Fix the serverless architecture before the startup crashes.',
    color: '#34d399',
    questions: 4,
    duration: '5m',
    difficulty: 'Hard',
    tags: ['Serverless', 'S3', 'Lambda', 'API Gateway']
  },
  {
    id: 'photo-app',
    title: 'CASE 2: The Failed Photo App',
    subtitle: 'A startup called SnapUp launched. Its serverless photo workflow is failing. Fix the architecture.',
    color: '#f472b6',
    questions: 4,
    duration: '5m',
    difficulty: 'Hard',
    tags: ['S3', 'Lambda', 'SQS', 'Stateless']
  },
  {
    id: 'smart-campus',
    title: 'CASE 3: Smart Campus Crisis',
    subtitle: 'Our university launches a smart campus app. Attendance, notifications, assignments, event reminders. The serverless backend starts failing.',
    color: '#60a5fa',
    questions: 4,
    duration: '5m',
    difficulty: 'Hard',
    tags: ['EventBridge', 'Lambda', 'SNS']
  }
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
  'food-delivery': {
    scenario: 'A startup, GoodFoods, just launched. Everything worked during testing, but on launch day, systems begin failing one by one. Escape the rooms by fixing the serverless architecture before the startup crashes.',
    questions: [
      {
        question: 'ROOM 1: Users upload restaurant menu images, but nothing happens after upload. No image compression. No processing. The Lambda function exists. What is the most likely issue?',
        options: [
          'Lambda memory too low',
          'No S3 trigger configured',
          'API Gateway timeout',
          'Wrong database'
        ],
        correct: 1,
        explanation: 'If the Lambda exists but doesn\'t run, the trigger (event source mapping) connecting S3 to Lambda is missing.',
        category: 'ROOM 1'
      },
      {
        question: 'ROOM 2: Users submit food orders and Lambda processes payment validation. But it says - "Request timed out". Execution logs show: Function keeps getting terminated. What is the likely issue?',
        options: [
          'Lambda timeout exceeded',
          'Wrong IAM role',
          'Missing API Gateway',
          'Wrong runtime language'
        ],
        correct: 0,
        explanation: 'Lambda functions have a configurable timeout (default 3 seconds, up to 15 mins). If payment processing takes longer than the configured timeout, the function is terminated.',
        category: 'ROOM 2'
      },
      {
        question: 'ROOM 3: A food festival goes viral and 10,000+ users hit the app. Team panics, expecting servers to crash. Why is Lambda suitable here?',
        options: [
          'It provides unlimited database storage',
          'It handles automatic scaling and event-driven burst handling',
          'It guarantees zero latency for all requests',
          'It uses physical hardware instead of virtualized resources'
        ],
        correct: 1,
        explanation: 'Lambda automatically scales by spawning concurrent executions to handle sudden bursts of event-driven traffic.',
        category: 'ROOM 3'
      },
      {
        question: 'ROOM 4: Users report: First request is slow. Later requests are fast. What explains this?',
        options: [
          'Database lag',
          'Cold start latency',
          'IAM delay',
          'Broken trigger'
        ],
        correct: 1,
        explanation: 'When a Lambda function has not been used recently, AWS needs to initialize a new execution environment. This initial delay is known as a cold start.',
        category: 'ROOM 4'
      }
    ]
  },
  'photo-app': {
    scenario: 'A startup called SnapUp launched. Its serverless photo workflow is failing. Escape the rooms by fixing the architecture.',
    questions: [
      {
        question: 'ROOM 1: Users upload photos. Nothing happens. Which AWS service should trigger Lambda?',
        options: [
          'S3',
          'EC2',
          'CloudFront',
          'IAM'
        ],
        correct: 0,
        explanation: 'S3 Event Notifications can automatically trigger Lambda functions when new objects (like photos) are uploaded.',
        category: 'ROOM 1'
      },
      {
        question: 'ROOM 2: The team uses Lambda for 2-hour video rendering. Everything fails. Why?',
        options: [
          'Lambda does not support video processing',
          'Lambda max execution time limitation',
          'Lambda cannot access S3 for large files',
          'S3 cannot trigger Lambda for video files'
        ],
        correct: 1,
        explanation: 'Lambda has a hard maximum execution time limit of 15 minutes. A 2-hour task will always be terminated prematurely.',
        category: 'ROOM 2'
      },
      {
        question: 'ROOM 3: Users expect Lambda to remember previous photo edits. But each execution behaves like a fresh start. Why?',
        options: [
          'Lambda requires a custom IAM role to save state',
          'The Lambda memory setting is too low',
          'Lambda is stateless',
          'They used the wrong programming language'
        ],
        correct: 2,
        explanation: 'Lambda functions are inherently stateless. Each invocation runs in a fresh or reused container, so state must be stored externally (e.g., in DynamoDB).',
        category: 'ROOM 3'
      },
      {
        question: 'ROOM 4: A Lambda function executes whenever a message is added to a queue for background processing. Which service most likely triggered it?',
        options: [
          'SQS',
          'S3',
          'RDS',
          'CloudFormation'
        ],
        correct: 0,
        explanation: 'Amazon SQS (Simple Queue Service) is used for message queuing and natively integrates as an event source for Lambda.',
        category: 'ROOM 4'
      }
    ]
  },
  'smart-campus': {
    scenario: 'Our university launches a smart campus app. Attendance, notifications, assignments, event reminders. The serverless backend starts failing.',
    questions: [
      {
        question: 'ROOM 1: Daily reminder emails never send. Which trigger should invoke Lambda every day?',
        options: [
          'API Gateway',
          'EventBridge (CloudWatch Events)',
          'EC2',
          'DynamoDB'
        ],
        correct: 1,
        explanation: 'Amazon EventBridge allows you to create schedule-based rules (like cron jobs) to trigger Lambda functions automatically.',
        category: 'ROOM 1'
      },
      {
        question: 'ROOM 2: Attendance reports crash. Reason: Memory exhausted. What happened?',
        options: [
          'Lambda memory allocation insufficient',
          'EC2 instance ran out of RAM',
          'DynamoDB exceeded write capacity',
          'The database was too large to process'
        ],
        correct: 0,
        explanation: 'Lambda allows you to configure the amount of memory allocated to your function. If your code requires more memory to process large reports, it will crash with an out of memory error.',
        category: 'ROOM 2'
      },
      {
        question: 'ROOM 3: Students submit assignments and need an instant confirmation email. Arrange the following in the correct order: Frontend, Lambda, SNS, S3.',
        options: [
          'Frontend → SNS → Lambda',
          'Frontend → S3 → SNS',
          'Frontend → Lambda → SNS',
          'Lambda → SNS → Frontend'
        ],
        correct: 2,
        explanation: 'The frontend hits a serverless API (via API Gateway to Lambda). The Lambda function processes the submission and publishes a message to SNS, which delivers the email.',
        category: 'ROOM 3'
      },
      {
        question: 'ROOM 4: Team deployed an always-running EC2 instance just for tiny event-driven notifications. Why is this inefficient?',
        options: [
          'EC2 cannot send notifications',
          'Lambda is more cost-efficient for event-driven workloads',
          'EC2 instances cannot connect to SNS',
          'EC2 does not support event-driven code'
        ],
        correct: 1,
        explanation: 'An always-on EC2 instance incurs charges 24/7 even when idle. Lambda is purely pay-per-execution, making it significantly cheaper for sparse, event-driven tasks.',
        category: 'ROOM 4'
      }
    ]
  }
};
