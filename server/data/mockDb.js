// In-Memory Database Store & Seed Data for OmniShield & NextGen AI Suite

export const mockIncidents = [
  {
    id: "INC-2026-0801",
    title: "Suspicious Phishing Email & Credential Harvesting Attack",
    type: "Phishing",
    severity: "High",
    status: "Under Investigation",
    reporter: "Sarah Connor (Security Analyst)",
    department: "Financial Operations",
    impactedSystems: ["Outlook Mail Gateway", "Azure Active Directory"],
    description: "Multiple users received spoofed emails mimicking IT support asking for password resets on an external fake SSO domain (auth-secure-corp.com). Two users clicked the link before detection.",
    evidenceFiles: [
      { name: "phishing_header.eml", size: "24 KB", type: "email/message", url: "#" },
      { name: "malicious_url_screenshot.png", size: "340 KB", type: "image/png", url: "#" }
    ],
    timeline: [
      { time: "2026-08-14T08:15:00Z", event: "Incident reported by Financial Ops team", actor: "Sarah Connor" },
      { time: "2026-08-14T08:30:00Z", event: "Malicious domain blocked on Perimeter Firewall & DNS Sinkhole", actor: "Automated SecOps Rule" },
      { time: "2026-08-14T09:00:00Z", event: "Compromised user accounts isolated & MFA reset enforced", actor: "Alex Vance (Tier 2 Analyst)" }
    ],
    analystNotes: "Domain registered 48 hours ago. IP traces back to known bulletproof host in Eastern Europe. IOCs shared with threat intel team.",
    createdAt: "2026-08-14T08:15:00Z"
  },
  {
    id: "INC-2026-0802",
    title: "Ransomware Behavioral Anomaly on Database Server DB-PROD-04",
    type: "Ransomware",
    severity: "Critical",
    status: "Mitigated",
    reporter: "SOC Automated EDR Agent",
    department: "Core Engineering",
    impactedSystems: ["DB-PROD-04 (PostgreSQL Cluster)", "Storage Node SAN-02"],
    description: "CrowdStrike / Defender EDR detected high-volume file encryption activity targeting /var/lib/postgresql data directory by unauthorized process 'svchost_update.exe'.",
    evidenceFiles: [
      { name: "edr_memory_dump.raw", size: "1.2 MB", type: "application/octet-stream", url: "#" },
      { name: "process_tree_export.json", size: "112 KB", type: "application/json", url: "#" }
    ],
    timeline: [
      { time: "2026-08-13T22:10:00Z", event: "EDR triggered automatic network containment of DB-PROD-04", actor: "EDR Sensor" },
      { time: "2026-08-13T22:25:00Z", event: "Failover database replica DB-PROD-04-B promoted to Primary", actor: "DevOps On-Call" },
      { time: "2026-08-14T01:00:00Z", event: "Sanitized server, verified no data loss occurred", actor: "Threat Response Team" }
    ],
    analystNotes: "Process killed within 12 seconds of execution. No secondary lateral movement detected.",
    createdAt: "2026-08-13T22:10:00Z"
  },
  {
    id: "INC-2026-0803",
    title: "Unusual API Data Exfiltration Pattern on Customer Service Gateway",
    type: "Data Breach",
    severity: "Medium",
    status: "New",
    reporter: "WAF Anomaly Scanner",
    department: "Customer Experience",
    impactedSystems: ["API Gateway v2", "Customer Data Store"],
    description: "Single API token performed over 14,000 GET requests to /api/v1/customers within 3 minutes from an unauthenticated cloud proxy network.",
    evidenceFiles: [
      { name: "waf_access_logs.log", size: "850 KB", type: "text/plain", url: "#" }
    ],
    timeline: [
      { time: "2026-08-14T11:05:00Z", event: "WAF rate limiting auto-throttled suspicious API Key", actor: "Cloudflare WAF" }
    ],
    analystNotes: "Awaiting developer audit to verify if key belongs to legitimate third-party analytics vendor.",
    createdAt: "2026-08-14T11:05:00Z"
  }
];

export const mockCareerData = {
  sampleResume: {
    name: "Alex Mercer",
    title: "Full Stack AI Developer & Security Enthusiast",
    email: "alex.mercer@devtech.io",
    experienceYears: 4,
    skills: ["React", "Node.js", "Express", "TypeScript", "Python", "Docker", "MongoDB", "REST APIs", "OWASP Top 10", "Git"],
    summary: "Passionate software engineer building resilient web applications with modern JS stacks and AI microservices. Experienced in cloud deployments and API security compliance."
  },
  roadmaps: {
    "cyber-analyst": {
      title: "Cyber Security Analyst & Threat Hunter",
      description: "Structured path to master SOC operations, SIEM analysis, incident response, and threat hunting.",
      steps: [
        { id: 1, title: "Networking & Security Fundamentals", status: "Completed", cert: "CompTIA Security+", duration: "4 Weeks" },
        { id: 2, title: "SIEM & Log Analysis (Splunk / ELK)", status: "Completed", cert: "Splunk Core Certified", duration: "6 Weeks" },
        { id: 3, title: "Incident Response & Forensics", status: "In Progress", cert: "GIAC Certified Incident Handler (GCIH)", duration: "8 Weeks" },
        { id: 4, title: "Threat Intelligence & Malware Analysis", status: "Upcoming", cert: "Certified Threat Intelligence Analyst", duration: "6 Weeks" },
        { id: 5, title: "Cloud Security Architecture (AWS/Azure)", status: "Upcoming", cert: "AWS Certified Security - Specialty", duration: "10 Weeks" }
      ]
    },
    "fullstack-ai": {
      title: "Full Stack AI Application Engineer",
      description: "Master modern React, Express/Node architectures, LLM integrations, and cloud deployments.",
      steps: [
        { id: 1, title: "Modern JavaScript & React Systems", status: "Completed", cert: "Advanced React & Redux", duration: "4 Weeks" },
        { id: 2, title: "Scalable Node.js & Express REST APIs", status: "Completed", cert: "Node.js Enterprise Certification", duration: "5 Weeks" },
        { id: 3, title: "Database Systems & Mongoose/MongoDB", status: "Completed", cert: "MongoDB Certified Developer", duration: "4 Weeks" },
        { id: 4, title: "LLM API Integrations & Prompt Engineering", status: "In Progress", cert: "DeepLearning.AI LangChain & OpenAI", duration: "6 Weeks" },
        { id: 5, title: "CI/CD, Docker & Microservice Ops", status: "Upcoming", cert: "Docker & Kubernetes Certified", duration: "8 Weeks" }
      ]
    }
  },
  jobListings: [
    {
      id: "JOB-101",
      title: "Senior Cyber Security Incident Analyst",
      company: "Aegis Cyber Defense",
      location: "San Francisco, CA (Remote)",
      salary: "$135,000 - $165,000",
      matchScore: 94,
      skills: ["Incident Response", "Splunk", "Python", "OWASP", "SIEM"],
      description: "Join our tier-3 response team handling complex threat hunting, malware triage, and SOC operations."
    },
    {
      id: "JOB-102",
      title: "Full Stack AI Engineer",
      company: "Cognitive Next Inc.",
      location: "New York, NY (Hybrid)",
      salary: "$140,000 - $175,000",
      matchScore: 89,
      skills: ["React", "Node.js", "MongoDB", "OpenAI API", "Docker"],
      description: "Building next-generation intelligent SaaS products combining interactive UI with AI backend microservices."
    },
    {
      id: "JOB-103",
      title: "Application Security Engineer",
      company: "FinTech Shield",
      location: "Austin, TX (Remote)",
      salary: "$150,000 - $185,000",
      matchScore: 86,
      skills: ["React", "Express.js", "OWASP Top 10", "Penetration Testing", "TypeScript"],
      description: "Perform secure code reviews, API security hardening, and vulnerability mitigation across cloud applications."
    }
  ]
};

export const mockProducts = [
  {
    id: "PROD-01",
    name: "YubiKey 5C NFC Security Key",
    category: "Hardware Security",
    price: 55.00,
    rating: 4.9,
    reviewsCount: 1420,
    badge: "Bestseller",
    description: "Industry standard hardware authentication key supporting FIDO2, WebAuthn, U2F, and OTP for phishing-resistant logins.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80",
    tags: ["Hardware Key", "MFA", "Phishing Proof", "USB-C"]
  },
  {
    id: "PROD-02",
    name: "Cyber Incident Response Ops Manual (2nd Ed)",
    category: "Books & Guides",
    price: 39.99,
    rating: 4.8,
    reviewsCount: 380,
    badge: "Top Rated",
    description: "Comprehensive step-by-step field guide for threat containment, forensic evidence collection, and malware analysis.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
    tags: ["Handbook", "Incident Response", "DFIR", "Security Ops"]
  },
  {
    id: "PROD-03",
    name: "NextGen AI Developer Masterclass Bundle",
    category: "Courses & Certifications",
    price: 129.00,
    rating: 5.0,
    reviewsCount: 890,
    badge: "Hot Deal",
    description: "Complete hands-on course building React apps with Node.js, Express, MongoDB, OpenAI, LangChain & Groq APIs.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80",
    tags: ["React", "Node.js", "AI Certification", "Full Stack"]
  },
  {
    id: "PROD-04",
    name: "Apricorn Aegis Padlock Encrypted Portable SSD 1TB",
    category: "Hardware Security",
    price: 189.50,
    rating: 4.7,
    reviewsCount: 210,
    badge: "Military Grade",
    description: "Hardware encrypted USB 3.2 solid-state drive with integrated PIN keypad and FIPS 140-2 Level 3 validation.",
    image: "https://images.unsplash.com/photo-1597872250970-45d2d4a07147?w=500&q=80",
    tags: ["AES-256", "Encrypted SSD", "PIN Lock", "Hardware"]
  },
  {
    id: "PROD-05",
    name: "HackRF One SDR Wireless Pentesting Kit",
    category: "Hardware Security",
    price: 320.00,
    rating: 4.9,
    reviewsCount: 540,
    badge: "Pro Choice",
    description: "Software Defined Radio peripheral capable of transmission or reception of radio signals from 1 MHz to 6 GHz.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80",
    tags: ["SDR", "Pentesting", "Radio Security", "RF"]
  },
  {
    id: "PROD-06",
    name: "Ergonomic Mechanical Coding Keyboard (RGB)",
    category: "Developer Gear",
    price: 115.00,
    rating: 4.8,
    reviewsCount: 960,
    badge: "Popular",
    description: "Custom mechanical keyboard with programmable macro keys, hot-swappable tactile switches, and ergonomic palm rest.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    tags: ["Keyboard", "Developer Setup", "Ergonomic", "RGB"]
  }
];
