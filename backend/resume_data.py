"""
==============================================================
  IMPORTANT: Edit this file with YOUR real information!
  The AI chatbox uses this as its knowledge base.
==============================================================
"""

RESUME = {
    "name": "Zubair Alam",
    "title": "Full Stack Developer",
    "email": "zubairalam9048@gmail.com",
    "location": "Bengaluru, India",
    "linkedin": "https://www.linkedin.com/in/zubairalam1123?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    "github": "https://github.com/zubairalam7",
    "website": "https://zubairalam.dev",
    "bio": (
        "I'm an MCA final-year student and aspiring Full Stack Developer, currently seeking internship or full-time opportunities "
        "I have a strong foundation in Java and Web Development, with hands-on experience in building responsive and user-friendly " 
        " web applications passionate about learning new technologies, solving real-world problems, and contributing to impactful "
        "projects while growing as a software professional."
    ),
    "summary": (
        "Full Stack Developer skilled in React, TypeScript, Python, FastAPI, and SQLite/PostgreSQL. "
        "Experienced in building end-to-end web applications, RESTful APIs, and AI-powered features. "
        "Passionate about clean code, great UX, and continuous learning."
    ),

    "skills": [
        # Frontend
        {"name": "React", "category": "Frontend", "level": 80},
        {"name": "JavaScript", "category": "Frontend", "level": 90},
        {"name": "TypeScript", "category": "Frontend", "level": 60},
        {"name": "HTML/CSS", "category": "Frontend", "level": 100},
        # Backend
        {"name": "Java", "category": "Backend", "level": 80},
        {"name": "Python", "category": "Backend", "level": 70},
        {"name": "Node.js", "category": "Backend", "level": 60},
        {"name": "REST API", "category": "Backend", "level": 50},
        # Databases
        {"name": "SQLite", "category": "Database", "level": 60},
        {"name": "PostgreSQL", "category": "Database", "level": 60},
        {"name": "MySQL", "category": "Database", "level": 70},
        {"name": "MongoDB", "category": "Database", "level": 50},
        # Tools & Others
        {"name": "VS Code", "category": "Tools", "level": 90},
        {"name": "Antigravity", "category": "Tools", "level": 70},
        {"name": "Git & GitHub", "category": "Tools", "level": 70},
    ],

    "experience": [
        {
            "id": 1,
            "company": "Academic Project",
            "role": "Job Portal System",
            "duration": "4 months",
            "location": "New Horizon College of Engineering",
            "description": (
                "The Job Portal System is a web-based application designed to connect job seekers "
                "with employers in a streamlined and efficient manner. It provides an online platform "
                "where companies can post job vacancies, and candidates can create profiles, upload "
                "resumes, and apply for positions that match their skills and interests."
            ),
            "technologies": ["HTML", "CSS", "JavaScript", "Java (JSP/Servlets)", "MySQL", "JDBC"],
        },
        {
            "id": 2,
            "company": "Academic Project",
            "role": "Online HD Video Player",
            "duration": "4 months",
            "location": "New Horizon College of Engineering",
            "description": (
                "Developed a web-based Online HD Video Player that allows users to securely log in, "
                "upload, browse, and play HD videos smoothly. The system supports local file playback, "
                "video sharing, keyboard shortcuts, and a responsive user interface with improved layout "
                "and controls."
            ),
            "technologies": ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js", "Supabase", "REST APIs"],
        },
    ],

    "projects": [
        {
            "id": 1,
            "name": "Job Portal System",
            "description": (
                "The Job Portal System is a web-based application designed to connect job seekers "
                "with employers in a streamlined and efficient manner. It provides an online platform "
                "where companies can post job vacancies, and candidates can create profiles, upload "
                "resumes, and apply for positions that match their skills and interests."
            ),
            "technologies": ["HTML", "CSS", "JavaScript", "Java (JSP/Servlets)", "MySQL", "JDBC"],
            "github": "",
            "live": "",
            "featured": True,
        },
        {
            "id": 2,
            "name": "Online HD Video Player",
            "description": (
                "Developed a web-based Online HD Video Player that allows users to securely log in, "
                "upload, browse, and play HD videos smoothly. The system supports local file playback, "
                "video sharing, keyboard shortcuts, and a responsive user interface with improved layout "
                "and controls."
            ),
            "technologies": ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js", "Supabase", "PostgreSQL", "REST APIs"],
            "github": "",
            "live": "",
            "featured": True,
        },
    ],

    "education": [
        {
            "institution": "CCS University",
            "degree": "Bachelor of Computer Application",
            "duration": "2021 – 2024",
            "location": "Meerut, Uttar Pradesh",
            "gpa": "7.0",
        },
        {
            "institution": "New Horizon College of Engineering",
            "degree": "Master of Computer Application",
            "duration": "2024 – 2026",
            "location": "Bengaluru, Karnataka",
            "gpa": "6.9",
        },
    ],

    "certifications": [
        "Google Associate Cloud Engineer (2023)",
        "React – The Complete Guide (Udemy, 2022)",
        "Python for Data Science (Coursera, 2021)",
    ],

    "languages": ["English (Native)", "Hindi (Fluent)", "Urdu (Fluent)"],

    "interests": ["Open Source Contribution", "AI & Machine Learning", "Gaming", "Cricket"],
}


def get_resume_context() -> str:
    """Build a comprehensive text context from the resume data for the AI system prompt."""
    r = RESUME
    lines = [
        f"Name: {r['name']}",
        f"Title: {r['title']}",
        f"Location: {r['location']}",
        f"Email: {r['email']}",
        f"LinkedIn: {r['linkedin']}",
        f"GitHub: {r['github']}",
        f"Bio: {r['bio']}",
        "",
        "=== SKILLS ===",
    ]

    # Group skills by category
    from collections import defaultdict
    skill_groups = defaultdict(list)
    for s in r["skills"]:
        skill_groups[s["category"]].append(f"{s['name']} ({s['level']}%)")
    for cat, skills in skill_groups.items():
        lines.append(f"{cat}: {', '.join(skills)}")

    lines.append("\n=== WORK EXPERIENCE ===")
    for exp in r["experience"]:
        lines.append(f"- {exp['role']} at {exp['company']} ({exp['duration']}, {exp['location']})")
        lines.append(f"  {exp['description']}")
        lines.append(f"  Technologies: {', '.join(exp['technologies'])}")

    lines.append("\n=== PROJECTS ===")
    for proj in r["projects"]:
        lines.append(f"- {proj['name']}: {proj['description']}")
        lines.append(f"  Technologies: {', '.join(proj['technologies'])}")
        if proj.get("github"):
            lines.append(f"  GitHub: {proj['github']}")
        if proj.get("live"):
            lines.append(f"  Live: {proj['live']}")

    lines.append("\n=== EDUCATION ===")
    for edu in r["education"]:
        lines.append(f"- {edu['degree']} from {edu['institution']} ({edu['duration']}) | GPA: {edu['gpa']}")

    lines.append("\n=== CERTIFICATIONS ===")
    for cert in r["certifications"]:
        lines.append(f"- {cert}")

    lines.append(f"\nLanguages: {', '.join(r['languages'])}")
    lines.append(f"Interests: {', '.join(r['interests'])}")

    return "\n".join(lines)
