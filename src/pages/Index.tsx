
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Globe, Smartphone, Database, ExternalLink, Github, Linkedin, Mail, Download, Zap, Wallet, TrendingUp } from "lucide-react";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-sky-50">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Alex Developer</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-muted-foreground hover:text-sky-600 transition-colors">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-sky-600 transition-colors">Projects</a>
            <a href="#experience" className="text-muted-foreground hover:text-sky-600 transition-colors">Experience</a>
            <a href="#contact" className="text-muted-foreground hover:text-sky-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 border-sky-300 text-sky-600 bg-sky-50">
            <Wallet className="w-3 h-3 mr-1" />
            Blockchain Developer
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-sky-600 via-sky-500 to-primary bg-clip-text text-transparent">
            Building the Future
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Full-stack developer specializing in blockchain technology, SUI ecosystem, and modern web applications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-sky-600 hover:bg-sky-700 group">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
            <Button variant="outline" size="lg" className="border-sky-300 text-sky-600 hover:bg-sky-50">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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
                <Button variant="outline" size="sm" className="border-sky-300 text-sky-600 hover:bg-sky-50">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="border-sky-300 text-sky-600 hover:bg-sky-50">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sky-400 to-sky-600 h-2 rounded-full transition-all duration-1000"
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
      <section id="projects" className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my latest work in blockchain development and web applications
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg hover:border-sky-200 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === "Live" ? "default" : "secondary"} className={project.status === "Live" ? "bg-sky-600" : ""}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs border-sky-200 text-sky-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-sky-300 text-sky-600 hover:bg-sky-50">
                    <Github className="w-3 h-3 mr-2" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-sky-300 text-sky-600 hover:bg-sky-50">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My journey in blockchain and web development
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {experience.map((exp, index) => (
            <Card key={index} className="border-border/50 hover:border-sky-200 transition-colors">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-lg text-sky-700">{exp.role}</CardTitle>
                    <CardDescription className="text-base font-medium">{exp.company}</CardDescription>
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0 border-sky-200 text-sky-600">
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
      <section id="contact" className="container mx-auto px-4 py-20 text-center bg-gradient-to-r from-sky-50 via-background to-sky-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build Together</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Ready to bring your blockchain project to life? Let's discuss how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
              <Mail className="w-4 h-4 mr-2" />
              Email Me
            </Button>
            <Button variant="outline" size="lg" className="border-sky-300 text-sky-600 hover:bg-sky-50">
              <TrendingUp className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-sky-400 to-sky-600 rounded flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Alex Developer</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-sky-600 hover:bg-sky-50">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-sky-600 hover:bg-sky-50">
                <Linkedin className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                © 2024 Alex Developer. Built with passion for blockchain.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
