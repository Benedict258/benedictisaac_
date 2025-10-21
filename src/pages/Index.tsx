
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Globe, Smartphone, Database, ExternalLink, Github, Linkedin, Mail, Download, Zap, Wallet, TrendingUp, Menu, X, Moon, Sun, Rocket } from "lucide-react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAvatar, setActiveAvatar] = useState<'ben' | 'pic1'>('pic1');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // no avatar swapping - using single ben.png
  // swap between ben.png and pic1.jpg every 20 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveAvatar(prev => (prev === 'ben' ? 'pic1' : 'ben'));
    }, 20000);
    return () => clearInterval(id);
  }, []);

  const skillCategories = {
    "Core Technical Skills": [
      "Frontend Development",
      "Backend Development",
      "RESTful API Integration",
      "Responsive UI Design",
      "Database Management (MongoDB)",
      "Embedded Programming (C/C++)",
      "Python Development",
      "Blockchain & Web3 Development",
      "IoT Systems & Automation"
    ],
    "Tools & Frameworks": [
      "React.js",
      "Next.js",
      "HTML5 & CSS3",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Git & GitHub",
      "MATLAB",
      "VS Code"
    ],
    "Core Competencies": [
      "Problem Solving & Debugging",
      "Software Architecture & Optimization",
      "Innovation & System Design",
      "Cross-Functional Collaboration",
      "Technical Documentation",
      "Open-Source Contribution"
    ],
    "Emerging Focus Areas": [
      "Artificial Intelligence (AI)",
      "Machine Learning (ML)",
      "Blockchain Integration",
      "Internet of Things (IoT)",
      "Mechatronics-Driven Software"
    ]
  };

  const projects = [
    {
      title: "Scynk.io",
      description: "Email scraping and automation platform that streamlines data collection and outreach for marketing operations, improving workflow efficiency.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      github: "https://github.com/Benedict258/scrynk-io",
      live: "https://scrnk-io-5wyj.onrender.com/",
      status: "Live"
    },
    {
      title: "Flux",
      description: "Intelligent product launch operating system helping startups and creators manage, schedule, and track product rollouts with real-time collaboration.",
      tech: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
      github: "#",
      live: "#",
      status: "Development"
    },
    {
      title: "Blacksite",
      description: "Anonymous chat platform enabling users to create secure rooms and interact without identity exposure, enhancing online privacy through decentralized communication.",
      tech: ["React.js", "WebSocket", "Node.js", "Express.js"],
      github: "https://github.com/Benedict258/-BLACKSITE",
      live: "https://blacksite-l3ii.onrender.com/",
      status: "Live"
    },
    {
      title: "SUIrify",
      description: "Zero-knowledge sovereign identity protocol on Sui blockchain, allowing users to prove identity without exposing personal data using reusable digital credentials.",
      tech: ["Rust", "TypeScript", "Sui Blockchain", "zk-Proofs"],
      github: "#",
      live: "https://suirify.onrender.com/",
      status: "Development"
    },
    {
      title: "TendX",
      description: "Intelligent attendance management system using automation and analytics for event and institutional tracking, improving record accuracy and engagement.",
      tech: ["Node.js", "Express.js", "React.js", "MongoDB"],
      github: "https://github.com/Benedict258/tendx",
      live: "https://tendx.onrender.com/",
      status: "Live"
    }
  ];

  const experience = [
    {
      role: "Frontend Developer",
      company: "SuiOnCampus Team",
      location: "Minna, NG",
      period: "Jul 2025 - Present",
      description: "Designed highly interactive user interfaces using modern frameworks, achieving 30% increase in user engagement. Led design and content strategy for multiple web pages, collaborating cross-functionally to deliver features 20% faster while continually upskilling in emerging technologies."
    },
    {
      role: "Volunteer",
      company: "Next-Gen Innovators",
      location: "Minna, NG",
      period: "Aug 2025",
      description: "Organized and led interactive programs introducing 50+ students to IoT, embedded systems, and coding fundamentals. Facilitated hands-on workshops fostering innovation and problem-solving confidence, contributing to a community of young tech innovators."
    },
    {
      role: "Frontend Developer",
      company: "Pathway Scholars",
      location: "Remote",
      period: "Nov 2024 - Feb 2025",
      description: "Developed responsive web applications enhancing mobile engagement by 35%. Integrated RESTful APIs improving system reliability by 25% and optimized performance reducing page load time by 40%, collaborating with UI/UX designers to boost user satisfaction."
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-space-bg transition-colors duration-500">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-lg sticky top-0 z-50 glass-effect">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center logo-pulse">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Benedict Isaac</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-muted-foreground hover:text-sky-500 transition-colors font-medium">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-sky-500 transition-colors font-medium">Projects</a>
            <a href="#experience" className="text-muted-foreground hover:text-sky-500 transition-colors font-medium">Experience</a>
            <a href="#contact" className="text-muted-foreground hover:text-sky-500 transition-colors font-medium">Contact</a>
            <div className="flex items-center space-x-2 ml-4">
              <Sun className="w-4 h-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-sky-600"
              />
              <Moon className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-sky-600"
              />
              <Moon className="w-4 h-4" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-foreground hover:bg-sky-400/20"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg glass-effect">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <a href="#about" className="block py-2 text-muted-foreground hover:text-sky-400 transition-colors" onClick={toggleMobileMenu}>About</a>
              <a href="#projects" className="block py-2 text-muted-foreground hover:text-sky-400 transition-colors" onClick={toggleMobileMenu}>Projects</a>
              <a href="#experience" className="block py-2 text-muted-foreground hover:text-sky-400 transition-colors" onClick={toggleMobileMenu}>Experience</a>
              <a href="#contact" className="block py-2 text-muted-foreground hover:text-sky-400 transition-colors" onClick={toggleMobileMenu}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Avatar */}
      <section className="container mx-auto px-4 py-20 text-center space-bg">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-2 ring-sky-500/30 ring-offset-4 ring-offset-background overflow-hidden">
              <AvatarImage className="object-cover w-full h-full" src={activeAvatar === 'ben' ? '/ben.png' : '/pic1.jpg'} alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-sky-500 to-sky-600 text-white text-2xl md:text-3xl font-bold">
                BI
              </AvatarFallback>
            </Avatar>
          </div>
          
          <Badge variant="outline" className="mb-6 border-sky-400/30 text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/30">
            <Code className="w-3 h-3 mr-1" />
            Frontend Developer | Full Stack Journey
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-sky-600 to-foreground bg-clip-text text-transparent">
            Turning Ideas into Scalable Systems
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Mechatronics Engineering student passionate about building digital solutions that merge hardware innovation with software excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/benedictResume.pdf" download className="inline-block">
              <Button size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-sky-500/20 transition-all">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </a>
            <Button variant="outline" size="lg" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-6 rounded-xl">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a Frontend Developer on a Full Stack Journey and Mechatronics Engineering student passionate about building scalable digital solutions that merge engineering principles with software innovation. Skilled in JavaScript, React, Node.js, and Python, I create responsive, efficient, and user-centered applications.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                My work bridges hardware and software through IoT, AI, and blockchain explorations, driven by curiosity and a commitment to real-world impact. I thrive in collaborative environments where problem-solving, creativity, and continuous learning shape meaningful products. With a growing portfolio of projects, I bring technical depth, innovation, and a mission to build technology that empowers and transforms communities.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/Benedict258/" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/benedict-isaac-0b60a732b/" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
                <a href="https://x.com/DevChronicles_" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                    <X className="w-4 h-4 mr-2" />
                    X
                  </Button>
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Technical Expertise</h3>
              {Object.entries(skillCategories).map(([category, skills], index) => (
                <div key={index} className="space-y-3">
                  <h4 className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="outline" 
                        className="text-xs border-sky-400/30 text-sky-600 dark:text-sky-400 bg-sky-50/30 dark:bg-sky-950/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my latest work in blockchain development and web applications
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="glass-card border-border/50 hover:border-sky-400/30 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === "Live" ? "default" : "secondary"} className={project.status === "Live" ? "bg-gradient-to-r from-sky-500 to-sky-600" : ""}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs border-sky-400/30 text-sky-600 dark:text-sky-400 bg-sky-50/30 dark:bg-sky-950/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full flex-1 border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                      <Github className="w-3 h-3 mr-2" />
                      Code
                    </Button>
                  </a>
                  <a href={project.live} target="_blank" rel="noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full flex-1 border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Live
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey in blockchain and web development
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {experience.map((exp, index) => (
            <Card key={index} className="glass-card border-border/50 hover:border-sky-400/30 transition-colors">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-lg text-sky-600 dark:text-sky-400">{exp.role}</CardTitle>
                    <CardDescription className="text-base font-medium">
                      {exp.company} • {exp.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0 border-sky-400/30 text-sky-600 dark:text-sky-400 bg-sky-50/30 dark:bg-sky-950/20">
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Let's Build Something Great Together</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Ready to collaborate on innovative software solutions? Let's connect and bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:benedictisaac258@gmail.com" className="inline-block">
              <Button size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-sky-500/20 transition-all">
                <Mail className="w-4 h-4 mr-2" />
                Email Me
              </Button>
            </a>
            <a href="tel:+2348130664138" className="inline-block">
              <Button variant="outline" size="lg" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-lg glass-effect">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-sky-600 rounded flex items-center justify-center logo-pulse">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Benedict Isaac</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                <Linkedin className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                © 2025 Benedict Isaac. Built with passion and innovation.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
