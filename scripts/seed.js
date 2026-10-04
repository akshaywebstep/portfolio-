const { PrismaClient } = require("@prisma/client");

// Build connection dynamically from individual DB env variables
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "3306";
const user = process.env.DB_USER || process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "";
const database = process.env.DB_NAME || process.env.DB_DATABASE || "akshay_portfolio";

const auth = password ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}` : `${encodeURIComponent(user)}:`;
const dynamicDbUrl = `mysql://${auth}@${host}:${port}/${database}`;
const connectionUrl = process.env.DATABASE_URL || dynamicDbUrl;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionUrl,
    },
  },
});

const resumeData = {
  personal: {
    name: "Akshay Kumar",
    role: "Backend Developer",
    subtitles: [
      "Backend Developer",
      "Node.js",
      "Laravel",
      "REST APIs"
    ],
    email: "kapilakshu848@gmail.com",
    phone: "+91 7876060984",
    location: "Himachal Pradesh, India",
    address: "Vill. Suglani, P/O Dhangota, Teh. Dhatwal, Distt. Hamirpur, Himachal Pradesh – 176040",
    dob: "23 August 2002",
    languages: ["Hindi", "English"],
    availability: "Immediate",
    summary:
      "Results-driven Backend Developer with 1 year 3 months of hands-on professional experience in Node.js and Laravel. Specialized in building scalable RESTful APIs, implementing JWT-based authentication, and designing optimized MySQL database schemas. Proven track record of delivering enterprise-grade solutions including CRM systems, HRMS applications, and e-commerce platforms. Passionate about clean architecture, secure coding practices, and high-performance backend systems."
  },
  experience: [
    {
      company: "Webstep Solutions",
      location: "Phase 8, Industrial Area, Sector 62, Mohali",
      role: "Backend Developer – Node.js & Laravel",
      period: "March 2024 – Present (1 Year 3 Months)",
      type: "Full-Time",
      subsections: [
        {
          title: "Node.js / Express.js",
          points: [
            "Developed and maintained scalable backend services and RESTful APIs using Node.js with Express.js, following clean architecture principles.",
            "Implemented JWT-based authentication and authorization with role-based access control (RBAC) and secure API endpoint design.",
            "Designed APIs with robust request validation, middleware pipeline handling, and centralized error management.",
            "Integrated payment gateways (Stripe, GoCardless, Access PaySuite) for secure transactions, subscriptions, direct debits, refunds, and webhook processing.",
            "Built APIs for large-scale CRM modules: dashboards, notifications, memberships, bookings, leads, waiting lists, and capacity management.",
            "Developed membership lifecycle management APIs covering create, freeze, transfer, cancel, and reactivate operations."
          ]
        },
        {
          title: "Laravel (PHP)",
          points: [
            "Developed a role-based HRMS application using Laravel MVC architecture for Admin, User, Bidder, and Project Manager roles.",
            "Implemented modular dashboards with granular permission management per user role.",
            "Built attendance tracking, daily activity logs, and timesheet management using AJAX-powered components.",
            "Integrated a real-time messaging system with mention and reply functionality.",
            "Ensured secure authentication, password management, and profile administration across all user roles."
          ]
        },
        {
          title: "Database & Deployment",
          points: [
            "Designed and optimized MySQL database schemas for high-volume transactional data with complex relational queries.",
            "Deployed and tested applications on Apache server, ensuring stability, performance, and uptime.",
            "Configured XAMPP environments for local development and staging."
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: "Synco CRM – REST API Development",
      tagline: "Enterprise CRM & Multi-Tenant Booking System",
      category: "Enterprise CRM & SaaS",
      techStack: ["Node.js", "Express.js", "MySQL", "JWT", "Stripe", "GoCardless"],
      metrics: "3 Payment Gateways Integrated • Multi-Role RBAC",
      highlights: [
        "Architected and developed scalable REST APIs for a large-scale CRM system handling enterprise-level data volumes.",
        "Implemented JWT-based authentication with role-based authorization for Admin, Franchisee, Agents, Coaches, and Staff.",
        "Built comprehensive API modules: dashboards, notifications, memberships, bookings, trials, leads, waiting lists, and capacity management.",
        "Developed full membership lifecycle (create, freeze, transfer, cancel, reactivate) with business rule enforcement.",
        "Integrated Stripe, GoCardless, and Access PaySuite for payment processing, direct debits, retries, and webhook events.",
        "Optimized MySQL schemas for high-volume transactional data with centralized error handling and reusable middleware."
      ],
      architectureNotes:
        "Layered service-oriented architecture with strict business rule validation and multi-tier access security."
    },
    {
      title: "Role-Based HRMS (Human Resource Management System)",
      tagline: "Modular Human Resource & Attendance Management Portal",
      category: "Enterprise Web Application",
      techStack: ["Laravel", "PHP", "MySQL", "AJAX"],
      metrics: "Granular Multi-Role Permissions • Real-Time Messaging",
      highlights: [
        "Built a comprehensive HRMS with multi-role access control (Admin, User, Bidder, Project Manager) using Laravel MVC.",
        "Developed attendance tracking, daily activity logs, and timesheet management with AJAX for seamless UX.",
        "Integrated a real-time messaging system with mention and reply features.",
        "Implemented secure login, profile management, and role-specific dashboards."
      ],
      architectureNotes:
        "Laravel MVC architecture with granular middleware security and normalized database schemas."
    },
    {
      title: "E-Commerce Shopping Platform",
      tagline: "Dynamic Multi-Category Online Shopping Platform",
      category: "E-Commerce",
      techStack: ["PHP", "AJAX", "JavaScript", "Bootstrap", "HTML"],
      metrics: "Real-Time Cart Updates • Responsive UI",
      highlights: [
        "Built a fully functional e-commerce platform with product categorization for Men, Women, and Kids.",
        "Implemented shopping cart, product listings, and a responsive UI using Bootstrap.",
        "Used AJAX for dynamic data updates without page reloads, enhancing performance and user experience.",
        "Worked on payment flow optimization and secure transaction handling."
      ],
      architectureNotes:
        "Session-managed shopping carts with AJAX asynchronous operations and responsive Bootstrap layout."
    }
  ],
  skills: {
    categories: [
      {
        name: "Languages",
        icon: "Code2",
        skills: ["PHP", "JavaScript"]
      },
      {
        name: "Backend Frameworks",
        icon: "Server",
        skills: ["Node.js", "Express.js", "Laravel"]
      },
      {
        name: "Databases",
        icon: "Database",
        skills: ["MySQL (schema design, query optimization, relational data)"]
      },
      {
        name: "Authentication & Security",
        icon: "ShieldCheck",
        skills: ["JWT Authentication", "Role-Based Access Control (RBAC)"]
      },
      {
        name: "Payment Integrations",
        icon: "CreditCard",
        skills: ["Stripe", "GoCardless", "Access PaySuite (webhooks, subscriptions, refunds)"]
      },
      {
        name: "APIs",
        icon: "Server",
        skills: ["RESTful API Development", "Webhook Handling"]
      },
      {
        name: "Frontend Basics",
        icon: "Code2",
        skills: ["HTML", "Bootstrap", "AJAX"]
      },
      {
        name: "Tools & Servers",
        icon: "Terminal",
        skills: ["Apache", "XAMPP", "Git"]
      }
    ]
  },
  education: [
    {
      degree: "B.Tech – CSE",
      institution: "Haryana Engineering College, Kurukshetra University",
      year: "2020 – 2024",
      score: "75%"
    },
    {
      degree: "Senior Secondary (12th)",
      institution: "Govt. Sr. Sec. School, Dhangota, HP",
      year: "2019 – 2020",
      score: "69%"
    },
    {
      degree: "Secondary (10th)",
      institution: "Sunrise Public School, Sohari, HP",
      year: "2017 – 2018",
      score: "74%"
    }
  ]
};

async function main() {
  console.log("Seeding database with authentic resume data...");
  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Experience\`;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Project\`;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`SkillCategory\`;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Education\`;`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE \`Profile\`;`);
  } catch (err) {
    await prisma.profile.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.project.deleteMany();
    await prisma.skillCategory.deleteMany();
    await prisma.education.deleteMany();
  }

  // Profile
  await prisma.profile.create({
    data: {
      id: 1,
      name: resumeData.personal.name,
      role: resumeData.personal.role,
      subtitles: resumeData.personal.subtitles.join(" | "),
      email: resumeData.personal.email,
      phone: resumeData.personal.phone,
      location: resumeData.personal.location,
      address: resumeData.personal.address,
      availability: resumeData.personal.availability,
      dob: resumeData.personal.dob,
      languages: resumeData.personal.languages.join(", "),
      summary: resumeData.personal.summary,
    },
  });

  // Experience
  for (let i = 0; i < resumeData.experience.length; i++) {
    const exp = resumeData.experience[i];
    await prisma.experience.create({
      data: {
        company: exp.company,
        location: exp.location,
        role: exp.role,
        period: exp.period,
        type: exp.type,
        order: i,
        subsections: JSON.stringify(exp.subsections),
      },
    });
  }

  // Projects
  for (let i = 0; i < resumeData.projects.length; i++) {
    const p = resumeData.projects[i];
    await prisma.project.create({
      data: {
        title: p.title,
        tagline: p.tagline,
        category: p.category,
        techStack: p.techStack.join(", "),
        metrics: p.metrics || null,
        highlights: JSON.stringify(p.highlights),
        architectureNotes: p.architectureNotes || null,
        order: i,
      },
    });
  }

  // Skills
  for (let i = 0; i < resumeData.skills.categories.length; i++) {
    const sc = resumeData.skills.categories[i];
    await prisma.skillCategory.create({
      data: {
        name: sc.name,
        icon: sc.icon,
        skills: sc.skills.join(", "),
        order: i,
      },
    });
  }

  // Education
  for (let i = 0; i < resumeData.education.length; i++) {
    const edu = resumeData.education[i];
    await prisma.education.create({
      data: {
        degree: edu.degree,
        institution: edu.institution,
        year: edu.year,
        score: edu.score,
        order: i,
      },
    });
  }

  console.log("Database seeded successfully with authentic resume records!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
