
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Globe, Smartphone, Database, ExternalLink, Github, Linkedin, Mail, Download, Zap, Wallet, TrendingUp, Menu, X, Moon, Sun, Rocket } from "lucide-react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "SUI Move", level: 80 },
    { name: "Solidity", level: 75 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 70 }
  ];

  const projects = [
    {
      title: "SUI DeFi Dashboard",
      description: "Real-time portfolio tracker for SUI blockchain assets with advanced analytics",
      tech: ["React", "SUI SDK", "TypeScript", "Chart.js"],
      github: "#",
      live: "#",
      status: "Live"
    },
    {
      title: "NFT Marketplace",
      description: "Decentralized marketplace for trading digital assets on SUI network",
      tech: ["Next.js", "SUI Move", "Tailwind", "IPFS"],
      github: "#",
      live: "#",
      status: "Development"
    },
    {
      title: "Crypto Wallet Interface",
      description: "Modern wallet UI with seamless SUI integration and multi-chain support",
      tech: ["React", "Web3", "Ethers.js", "Material-UI"],
      github: "#",
      live: "#",
      status: "Live"
    }
  ];

  const experience = [
    {
      role: "Blockchain Developer",
      company: "SUI Ecosystem",
      period: "2023 - Present",
      description: "Building DeFi applications and smart contracts on SUI blockchain"
    },
    {
      role: "Frontend Developer",
      company: "Crypto Startup",
      period: "2022 - 2023",
      description: "Developed trading interfaces and wallet integrations"
    },
    {
      role: "Full Stack Developer",
      company: "Tech Company",
      period: "2021 - 2022",
      description: "Built web applications with modern JavaScript frameworks"
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
            <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-sky-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Alex Cosmos</span>
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
            <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-2 ring-sky-500/30 ring-offset-4 ring-offset-background">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-sky-500 to-sky-600 text-white text-2xl md:text-3xl font-bold">
                AC
              </AvatarFallback>
            </Avatar>
          </div>
          
          <Badge variant="outline" className="mb-6 border-sky-400/30 text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/30">
            <Wallet className="w-3 h-3 mr-1" />
            Blockchain Developer
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-sky-600 to-foreground bg-clip-text text-transparent">
            Building the Future
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Full-stack developer specializing in blockchain technology, SUI ecosystem, and modern web applications
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-sky-500/20 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
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
                I'm a passionate blockchain developer with 3+ years of experience building decentralized applications. 
                I specialize in the SUI ecosystem, creating innovative DeFi solutions and smart contracts.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                My expertise spans from frontend development with React and TypeScript to smart contract development 
                with SUI Move and Solidity. I love bridging the gap between complex blockchain technology and 
                user-friendly interfaces.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Skills</h3>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sky-500 to-sky-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
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
                  <Button variant="outline" size="sm" className="flex-1 border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                    <Github className="w-3 h-3 mr-2" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Live
                  </Button>
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
                    <CardDescription className="text-base font-medium">{exp.company}</CardDescription>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Let's Build the Future Together</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Ready to bring your blockchain project to life? Let's discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 shadow-lg hover:shadow-sky-500/20 transition-all">
              <Mail className="w-4 h-4 mr-2" />
              Email Me
            </Button>
            <Button variant="outline" size="lg" className="border-sky-400/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-lg glass-effect">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-sky-600 rounded flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Alex Cosmos</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30">
                <Linkedin className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                © 2024 Alex Cosmos. Built with passion for the future.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
