// ═══════════════════════════════════════════════════════════
//  AWS QUIZ DATA — All question banks & case studies
// ═══════════════════════════════════════════════════════════

// ── Regular Quizzes ─────────────────────────────────────────

export const QUIZZES = [
  {
    id: 'fundamentals',
    title: 'AWS Fundamentals',
    subtitle: 'Core services every cloud engineer must know',
    category: 'Beginner',
    questions: 10,
    duration: '8 min',
    topics: ['EC2', 'S3', 'IAM', 'VPC', 'Lambda'],
    color: '#FF9900',
  },
  {
    id: 'advanced',
    title: 'AWS Advanced',
    subtitle: 'Databases, messaging, monitoring & beyond',
    category: 'Intermediate',
    questions: 10,
    duration: '10 min',
    topics: ['RDS', 'DynamoDB', 'SQS', 'SNS', 'CloudWatch'],
    color: '#00a8e0',
  },
  {
    id: 'security',
    title: 'AWS Security & Networking',
    subtitle: 'IAM deep-dive, KMS, Shield, WAF & VPC design',
    category: 'Advanced',
    questions: 10,
    duration: '12 min',
    topics: ['KMS', 'Shield', 'WAF', 'GuardDuty', 'PrivateLink'],
    color: '#a855f7',
  },
];

export const CASE_STUDIES = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform Migration',
    subtitle: 'Migrate a monolith retail app to AWS cloud-native architecture',
    scenario: `GlobalMart is a fast-growing online retailer currently running a monolithic application on a single on-premises server. During peak sales (Black Friday), the site crashes due to traffic spikes. Their database holds 50 TB of product data. They want to migrate to AWS with goals of: 99.99% uptime, auto-scaling, sub-100ms latency globally, and a managed database that handles failover automatically. They also process 10,000 orders/day through a legacy queue system that sometimes loses messages.`,
    questions: 3,
    duration: '10 min',
    tags: ['Migration', 'Scalability', 'HA'],
  },
  {
    id: 'serverless-pipeline',
    title: 'Serverless Data Pipeline',
    subtitle: 'Design a real-time IoT data ingestion and analytics system',
    scenario: `SmartCity Inc. deploys 50,000 IoT sensors across a metropolitan area that emit telemetry data (temperature, air quality, traffic density) every 30 seconds — that's ~1.67 million events/minute. They need to: (1) ingest the stream reliably without data loss, (2) run real-time anomaly detection (temperature > 80°C triggers alerts), (3) store raw data cheaply for 2 years, (4) generate hourly dashboards without managing any servers. Their team has no DevOps experience.`,
    questions: 3,
    duration: '10 min',
    tags: ['Serverless', 'IoT', 'Analytics'],
  },
  {
    id: 'disaster-recovery',
    title: 'Multi-Region Disaster Recovery',
    subtitle: 'Design a DR strategy for a financial services application',
    scenario: `FinCore Bank runs its core transaction processing system in us-east-1. Regulatory requirements mandate an RTO (Recovery Time Objective) of 1 hour and RPO (Recovery Point Objective) of 15 minutes. The system uses an Aurora PostgreSQL database (2 TB), a fleet of 20 EC2 instances behind an ALB, S3 buckets storing customer statements, and Lambda functions for transaction processing. A recent outage caused 4 hours of downtime and cost $2M in penalties. The CTO needs a cost-effective multi-region DR plan.`,
    questions: 3,
    duration: '10 min',
    tags: ['Disaster Recovery', 'Multi-Region', 'RTO/RPO'],
  },
];

// ── Question Banks ───────────────────────────────────────────

export const QUESTION_BANKS = {
  fundamentals: [
    {
      id: 1, category: 'EC2',
      question: 'Which EC2 pricing model lets you bid on spare capacity and is the most cost-effective for fault-tolerant workloads?',
      options: ['On-Demand', 'Reserved', 'Spot', 'Dedicated Host'],
      correct: 2,
      explanation: 'Spot Instances use spare EC2 capacity at up to 90% discount. They can be interrupted with a 2-minute warning, making them ideal for fault-tolerant workloads.'
    },
    {
      id: 2, category: 'S3',
      question: 'What S3 feature automatically moves objects between storage classes based on access patterns to reduce costs?',
      options: ['S3 Replication', 'S3 Intelligent-Tiering', 'S3 Lifecycle Policy', 'S3 Transfer Acceleration'],
      correct: 1,
      explanation: 'S3 Intelligent-Tiering automatically moves objects between frequent and infrequent access tiers based on access patterns, with no retrieval fees.'
    },
    {
      id: 3, category: 'IAM',
      question: 'Which IAM entity should be used to grant an EC2 instance permission to access other AWS services securely?',
      options: ['IAM User with Access Keys', 'IAM Group', 'IAM Role', 'Root Account'],
      correct: 2,
      explanation: 'IAM Roles are used to grant AWS services permissions to other AWS services. An Instance Profile wraps the role — no long-term credentials are stored on the instance.'
    },
    {
      id: 4, category: 'VPC',
      question: 'What VPC component acts as a virtual firewall controlling inbound and outbound traffic at the subnet level?',
      options: ['Security Group', 'Network ACL', 'Route Table', 'Internet Gateway'],
      correct: 1,
      explanation: 'Network ACLs (NACLs) are stateless firewalls at the subnet level. They evaluate rules in order by number and apply to all traffic entering/leaving the subnet.'
    },
    {
      id: 5, category: 'Lambda',
      question: 'What is the maximum execution timeout for a single AWS Lambda function invocation?',
      options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'],
      correct: 2,
      explanation: 'AWS Lambda has a maximum execution timeout of 15 minutes (900 seconds) per invocation. For longer processes, consider Step Functions or ECS.'
    },
    {
      id: 6, category: 'CloudFront',
      question: 'What is the name of the global network of servers that CloudFront uses to cache and deliver content?',
      options: ['Availability Zones', 'Edge Locations', 'Regional Edge Caches', 'Local Zones'],
      correct: 1,
      explanation: 'CloudFront uses Edge Locations (400+) worldwide to cache content close to users. Regional Edge Caches sit between origin and Edge Locations for additional caching.'
    },
    {
      id: 7, category: 'EC2',
      question: 'Which EC2 feature allows you to automatically adjust the number of instances based on demand?',
      options: ['Elastic Load Balancing', 'Auto Scaling Groups', 'EC2 Fleet', 'Placement Groups'],
      correct: 1,
      explanation: 'Auto Scaling Groups automatically launch or terminate EC2 instances based on defined scaling policies, ensuring you have the right capacity at the right time.'
    },
    {
      id: 8, category: 'S3',
      question: 'What S3 storage class is most cost-effective for data that is accessed less than once per quarter?',
      options: ['S3 Standard-IA', 'S3 Glacier Instant Retrieval', 'S3 Glacier Deep Archive', 'S3 One Zone-IA'],
      correct: 2,
      explanation: 'S3 Glacier Deep Archive is the lowest-cost AWS storage class, designed for data accessed once or twice per year with a standard retrieval time of 12 hours.'
    },
    {
      id: 9, category: 'IAM',
      question: 'What is the principle of least privilege in AWS IAM?',
      options: [
        'Give all users admin access for efficiency',
        'Grant only the permissions required to perform a specific task',
        'Share credentials between services for simplicity',
        'Use root account for all administrative tasks'
      ],
      correct: 1,
      explanation: 'Least privilege means granting users and services only the permissions they need to perform their job — nothing more. This minimizes the blast radius of security incidents.'
    },
    {
      id: 10, category: 'VPC',
      question: 'Which AWS service allows instances in a private subnet to initiate outbound internet traffic without exposing them to inbound connections?',
      options: ['Internet Gateway', 'NAT Gateway', 'VPC Peering', 'Transit Gateway'],
      correct: 1,
      explanation: 'A NAT Gateway allows instances in private subnets to connect to the internet for outbound traffic (e.g., software updates) while preventing inbound connections.'
    },
  ],

  advanced: [
    {
      id: 1, category: 'RDS',
      question: 'Which RDS feature provides automatic failover to a standby replica in a different Availability Zone?',
      options: ['Read Replica', 'Multi-AZ Deployment', 'Aurora Global Database', 'RDS Proxy'],
      correct: 1,
      explanation: 'Multi-AZ deployments maintain a synchronous standby replica in a different AZ. RDS automatically fails over to the standby with minimal downtime during failure.'
    },
    {
      id: 2, category: 'DynamoDB',
      question: 'In DynamoDB, what combination uniquely identifies each item in a table with a composite primary key?',
      options: ['Sort Key only', 'Partition Key only', 'Partition Key + Sort Key', 'Global Secondary Index'],
      correct: 2,
      explanation: 'A composite primary key uses a Partition Key (determines partition) and Sort Key (orders items within that partition). Both together must be unique across all items.'
    },
    {
      id: 3, category: 'SQS',
      question: 'Which SQS queue type guarantees messages are processed exactly once and delivered in strict order?',
      options: ['Standard Queue', 'Dead Letter Queue', 'FIFO Queue', 'Delay Queue'],
      correct: 2,
      explanation: 'FIFO queues guarantee exactly-once processing and strict ordering. Standard queues offer max throughput with at-least-once delivery and best-effort ordering.'
    },
    {
      id: 4, category: 'CloudWatch',
      question: 'What CloudWatch feature allows you to automatically scale resources in response to metric thresholds?',
      options: ['CloudWatch Logs', 'CloudWatch Alarms', 'CloudWatch Events', 'CloudWatch Dashboards'],
      correct: 1,
      explanation: 'CloudWatch Alarms monitor metrics and trigger actions like Auto Scaling policies, SNS notifications, or EC2 actions when thresholds are breached.'
    },
    {
      id: 5, category: 'SNS',
      question: 'What is the primary difference between Amazon SQS and Amazon SNS?',
      options: [
        'SQS is for email, SNS is for SMS',
        'SQS is pull-based (polling), SNS is push-based (pub/sub)',
        'SQS supports ordering, SNS does not',
        'SNS stores messages, SQS delivers them'
      ],
      correct: 1,
      explanation: 'SQS is a pull-based message queue where consumers poll for messages. SNS is a push-based pub/sub system that fans out messages to multiple subscribers instantly.'
    },
    {
      id: 6, category: 'ElastiCache',
      question: 'Which ElastiCache engine supports advanced data structures like sorted sets, hashes, and pub/sub messaging?',
      options: ['Memcached', 'Redis', 'DynamoDB Accelerator', 'Aurora Cache'],
      correct: 1,
      explanation: 'Redis supports rich data structures (strings, hashes, lists, sets, sorted sets), persistence, replication, and pub/sub. Memcached is simpler, multi-threaded caching only.'
    },
    {
      id: 7, category: 'DynamoDB',
      question: 'What is DynamoDB\'s on-demand capacity mode best suited for?',
      options: [
        'Predictable, steady-state traffic patterns',
        'Unpredictable traffic with unknown workload peaks',
        'Read-heavy workloads needing caching',
        'Large batch processing jobs'
      ],
      correct: 1,
      explanation: 'On-demand mode automatically scales to handle any request rate. You pay per request, making it ideal for unpredictable or spiky traffic patterns.'
    },
    {
      id: 8, category: 'RDS',
      question: 'What does an RDS Read Replica provide that Multi-AZ does NOT?',
      options: [
        'Automatic failover',
        'Synchronous replication',
        'Read scalability for query offloading',
        'Cross-AZ redundancy'
      ],
      correct: 2,
      explanation: 'Read Replicas use asynchronous replication and allow you to offload read traffic from the primary DB, improving read performance. Multi-AZ is for HA/failover only.'
    },
    {
      id: 9, category: 'CloudWatch',
      question: 'What is the default retention period for CloudWatch Logs if no retention policy is set?',
      options: ['7 days', '30 days', '90 days', 'Never expires'],
      correct: 3,
      explanation: 'By default, CloudWatch Logs are kept indefinitely (never expire). You must explicitly set a retention policy (1 day to 10 years) to control storage costs.'
    },
    {
      id: 10, category: 'SQS',
      question: 'What is the maximum message retention period in Amazon SQS?',
      options: ['1 day', '4 days', '14 days', '30 days'],
      correct: 2,
      explanation: 'SQS can retain messages for a maximum of 14 days (default is 4 days). Messages not consumed within the retention period are automatically deleted.'
    },
  ],

  security: [
    {
      id: 1, category: 'KMS',
      question: 'What is the primary purpose of AWS Key Management Service (KMS)?',
      options: [
        'Managing SSH keys for EC2 instances',
        'Creating and controlling cryptographic keys for data encryption',
        'Storing application secrets and API keys',
        'Managing SSL/TLS certificates'
      ],
      correct: 1,
      explanation: 'AWS KMS creates and manages cryptographic keys (CMKs) used to encrypt data across AWS services. It integrates with S3, EBS, RDS, Lambda, and more.'
    },
    {
      id: 2, category: 'Shield',
      question: 'What does AWS Shield Advanced provide over AWS Shield Standard?',
      options: [
        'Basic DDoS protection at no cost',
        '24/7 DRT access, financial protection, and advanced attack detection',
        'Web application firewall rules',
        'Network ACL management'
      ],
      correct: 1,
      explanation: 'Shield Advanced adds: 24/7 DDoS Response Team (DRT) access, cost protection against DDoS-related scaling charges, advanced attack visibility, and WAF integration.'
    },
    {
      id: 3, category: 'WAF',
      question: 'At which layer of the OSI model does AWS WAF operate?',
      options: ['Layer 3 (Network)', 'Layer 4 (Transport)', 'Layer 7 (Application)', 'Layer 2 (Data Link)'],
      correct: 2,
      explanation: 'AWS WAF operates at Layer 7 (Application layer), allowing you to inspect and filter HTTP/S requests based on rules like IP addresses, headers, body content, and SQL injection patterns.'
    },
    {
      id: 4, category: 'GuardDuty',
      question: 'What data sources does Amazon GuardDuty analyze to detect threats?',
      options: [
        'Only CloudTrail logs',
        'VPC Flow Logs, DNS logs, and CloudTrail events',
        'Only VPC Flow Logs',
        'Application logs and OS-level events'
      ],
      correct: 1,
      explanation: 'GuardDuty analyzes VPC Flow Logs (network traffic), DNS query logs, and CloudTrail management/data events to identify malicious activity using ML and threat intelligence.'
    },
    {
      id: 5, category: 'IAM',
      question: 'What is the purpose of an IAM Permission Boundary?',
      options: [
        'Sets the maximum permissions an IAM entity can ever have',
        'Blocks all access from non-corporate IP addresses',
        'Encrypts IAM policies at rest',
        'Limits the number of IAM users in an account'
      ],
      correct: 0,
      explanation: 'Permission Boundaries set the maximum permissions an IAM user or role can have. Even if their identity-based policies grant broader access, the boundary caps what they can actually do.'
    },
    {
      id: 6, category: 'Secrets Manager',
      question: 'What is the key advantage of AWS Secrets Manager over storing credentials in environment variables?',
      options: [
        'Secrets Manager is free to use',
        'Automatic credential rotation without application code changes',
        'Faster retrieval time',
        'Supports only database credentials'
      ],
      correct: 1,
      explanation: 'Secrets Manager can automatically rotate credentials (RDS passwords, API keys) on a schedule. The application always retrieves the latest secret, eliminating manual rotation risk.'
    },
    {
      id: 7, category: 'PrivateLink',
      question: 'What problem does AWS PrivateLink solve?',
      options: [
        'Speeds up data transfer between regions',
        'Allows private connectivity to AWS services without traversing the public internet',
        'Provides dedicated fiber connections to on-premises',
        'Encrypts data in transit between EC2 instances'
      ],
      correct: 1,
      explanation: 'PrivateLink creates private endpoints in your VPC for AWS services and third-party SaaS. Traffic stays on the AWS network and never traverses the public internet.'
    },
    {
      id: 8, category: 'CloudTrail',
      question: 'What is the difference between CloudTrail Management Events and Data Events?',
      options: [
        'Management Events are paid; Data Events are free',
        'Management Events log API calls on resources; Data Events log operations performed on resources',
        'Management Events are real-time; Data Events are delayed',
        'There is no difference'
      ],
      correct: 1,
      explanation: 'Management Events capture control plane operations (create/delete/modify resources). Data Events capture data plane operations (S3 object-level access, Lambda invocations) — enabled separately.'
    },
    {
      id: 9, category: 'VPC',
      question: 'What is the purpose of VPC Flow Logs?',
      options: [
        'Logging HTTP requests to your application',
        'Capturing IP traffic metadata going to and from network interfaces in your VPC',
        'Monitoring CPU and memory of EC2 instances',
        'Tracking CloudFormation stack changes'
      ],
      correct: 1,
      explanation: 'VPC Flow Logs capture IP traffic metadata (source/dest IP, port, protocol, action: ACCEPT/REJECT) at the VPC, subnet, or ENI level. Useful for security analysis and troubleshooting.'
    },
    {
      id: 10, category: 'Security Hub',
      question: 'What is AWS Security Hub\'s primary function?',
      options: [
        'A SIEM that stores all security logs',
        'Centralized security posture management aggregating findings from multiple AWS security services',
        'A firewall for all outbound VPC traffic',
        'A DDoS mitigation service'
      ],
      correct: 1,
      explanation: 'Security Hub aggregates, organizes, and prioritizes security findings from GuardDuty, Inspector, Macie, and partner solutions, giving a unified view of your security posture.'
    },
  ],
};

// ── Case Study Question Banks ────────────────────────────────

export const CASE_STUDY_QUESTIONS = {
  ecommerce: {
    scenario: `GlobalMart is a fast-growing online retailer running a monolithic app on a single on-premises server. During Black Friday, the site crashes from traffic spikes. Their database holds 50 TB of product data. Goals: 99.99% uptime, auto-scaling, sub-100ms global latency, managed DB with automatic failover, and a reliable order queue that never loses messages.`,
    questions: [
      {
        id: 1, category: 'Architecture',
        question: 'To handle Black Friday traffic spikes automatically, which combination of AWS services should GlobalMart use for their web tier?',
        options: [
          'A single large EC2 instance with more RAM',
          'Auto Scaling Group + Application Load Balancer + CloudFront',
          'Elastic Beanstalk only — it auto-manages everything',
          'Route 53 weighted routing between two fixed EC2 instances'
        ],
        correct: 1,
        explanation: 'ALB distributes traffic, Auto Scaling dynamically adds/removes EC2 instances based on load, and CloudFront caches static assets at edge locations — together they handle any traffic spike without pre-provisioning.'
      },
      {
        id: 2, category: 'Database',
        question: 'For GlobalMart\'s 50 TB product database requiring automatic failover and sub-second reads, what is the best AWS solution?',
        options: [
          'Amazon RDS MySQL with a Read Replica',
          'Amazon Aurora with Multi-AZ and Read Replicas',
          'Amazon DynamoDB with on-demand capacity',
          'Amazon Redshift for all product queries'
        ],
        correct: 1,
        explanation: 'Aurora offers 5x MySQL throughput, automatically replicates 6 copies across 3 AZs, provides sub-10ms failover (vs. RDS 60-120s), and supports up to 15 read replicas — ideal for this high-availability requirement.'
      },
      {
        id: 3, category: 'Messaging',
        question: 'To replace the legacy order queue that loses messages, ensuring each of GlobalMart\'s 10,000 daily orders is processed exactly once in the correct sequence, which service is best?',
        options: [
          'Amazon SQS Standard Queue',
          'Amazon SNS topic with email subscription',
          'Amazon SQS FIFO Queue',
          'Amazon Kinesis Data Streams'
        ],
        correct: 2,
        explanation: 'SQS FIFO guarantees exactly-once processing and strict ordering — critical for financial transactions. Standard SQS offers at-least-once delivery which could cause duplicate order processing.'
      },
    ],
  },

  'serverless-pipeline': {
    scenario: `SmartCity Inc. has 50,000 IoT sensors emitting ~1.67 million events/minute. Requirements: (1) ingest stream reliably without data loss, (2) real-time anomaly detection (temp > 80°C triggers alerts), (3) store raw data cheaply for 2 years, (4) hourly dashboards with zero server management. Team has no DevOps experience.`,
    questions: [
      {
        id: 1, category: 'Ingestion',
        question: 'Which AWS service is best suited to reliably ingest 1.67 million IoT events per minute without data loss?',
        options: [
          'Amazon SQS Standard Queue',
          'Amazon Kinesis Data Streams',
          'Amazon API Gateway with Lambda',
          'Amazon MQ with ActiveMQ'
        ],
        correct: 1,
        explanation: 'Kinesis Data Streams is purpose-built for real-time streaming at massive scale. It retains data for up to 365 days, supports multiple consumers simultaneously, and handles millions of records per second reliably.'
      },
      {
        id: 2, category: 'Processing',
        question: 'To detect temperature anomalies in real-time and trigger alerts without managing servers, what is the optimal architecture?',
        options: [
          'EC2 instances running a Python script that polls the stream',
          'Kinesis Data Analytics (Apache Flink) + Lambda + SNS',
          'AWS Batch processing every 5 minutes',
          'EMR Spark cluster with scheduled jobs'
        ],
        correct: 1,
        explanation: 'Kinesis Data Analytics processes the stream in real-time with SQL/Flink queries. When anomalies are detected, it triggers Lambda (serverless, no management) which sends alerts via SNS — fully serverless, scales automatically.'
      },
      {
        id: 3, category: 'Storage',
        question: 'For storing 2 years of raw IoT data as cheaply as possible while enabling hourly dashboards, which combination is most cost-effective?',
        options: [
          'RDS PostgreSQL + Grafana on EC2',
          'S3 Glacier Deep Archive + Redshift Spectrum for queries',
          'S3 Intelligent-Tiering + Amazon Athena + QuickSight',
          'DynamoDB + CloudWatch dashboards'
        ],
        correct: 2,
        explanation: 'S3 Intelligent-Tiering automatically moves cold data to cheaper tiers. Athena queries S3 directly with no infrastructure (pay per query). QuickSight creates dashboards — entirely serverless and cost-optimized for 2-year retention.'
      },
    ],
  },

  'disaster-recovery': {
    scenario: `FinCore Bank: RTO = 1 hour, RPO = 15 minutes. Stack: Aurora PostgreSQL (2 TB), 20 EC2 instances behind ALB, S3 buckets, Lambda functions. Recent outage cost $2M in penalties. Needs cost-effective multi-region DR.`,
    questions: [
      {
        id: 1, category: 'Database DR',
        question: 'To meet FinCore\'s 15-minute RPO for Aurora PostgreSQL across regions, which DR strategy should be used?',
        options: [
          'Aurora Multi-AZ (same region, different AZ)',
          'Aurora Global Database with cross-region read replica',
          'RDS automated backups restored to another region',
          'DMS continuous replication to a second region'
        ],
        correct: 1,
        explanation: 'Aurora Global Database replicates data to secondary regions with typical lag < 1 second (well within 15-min RPO). In case of failure, promote the secondary region in < 1 minute — far better than RDS backup restore (hours).'
      },
      {
        id: 2, category: 'DR Strategy',
        question: 'Given FinCore\'s 1-hour RTO and cost-effectiveness requirement, which DR strategy tier is most appropriate?',
        options: [
          'Backup & Restore — cheapest but RTO of hours/days',
          'Pilot Light — minimal resources running, scale up on disaster',
          'Warm Standby — scaled-down version always running',
          'Multi-Site Active-Active — highest cost, zero RTO'
        ],
        correct: 2,
        explanation: 'Warm Standby keeps a scaled-down but fully functional copy running in the DR region. During failover, you scale it up — achievable in < 1 hour (meets RTO). More expensive than Pilot Light but much faster to recover.'
      },
      {
        id: 3, category: 'Failover',
        question: 'How should Route 53 be configured to automatically redirect traffic to the DR region when us-east-1 fails?',
        options: [
          'Weighted routing with 50/50 split between regions',
          'Latency-based routing to always serve the faster region',
          'Failover routing with health checks on the primary endpoint',
          'Geolocation routing based on user\'s country'
        ],
        correct: 2,
        explanation: 'Route 53 Failover routing continuously health-checks the primary endpoint. When health checks fail (us-east-1 is down), Route 53 automatically routes all traffic to the DR region — no manual intervention required.'
      },
    ],
  },
};
