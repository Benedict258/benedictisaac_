
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Bitcoin, TrendingUp, Users, Code, Zap, ArrowRight, Github, Twitter, ExternalLink } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Wallet,
      title: "Wallet Integration",
      description: "Seamless SUI wallet connectivity and transaction management"
    },
    {
      icon: Code,
      title: "Smart Contracts",
      description: "Development and deployment of SUI Move smart contracts"
    },
    {
      icon: TrendingUp,
      title: "DeFi Solutions",
      description: "Building decentralized finance applications on SUI"
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Growing the SUI ecosystem through education and events"
    }
  ];

  const projects = [
    {
      title: "SUI Campus Wallet",
      description: "A student-focused wallet for campus transactions",
      tech: ["SUI Move", "React", "TypeScript"],
      status: "Live"
    },
    {
      title: "Campus NFT Marketplace",
      description: "Trading platform for university-created digital assets",
      tech: ["SUI SDK", "Next.js", "Tailwind"],
      status: "Development"
    },
    {
      title: "DeFi Learning Platform",
      description: "Educational resources for blockchain and DeFi concepts",
      tech: ["React", "SUI", "Web3"],
      status: "Planning"
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sarah Kim",
      role: "Smart Contract Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9a83535?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">SUI Campus</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#team" className="text-muted-foreground hover:text-foreground transition-colors">Team</a>
            <Button variant="outline" size="sm">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
            <Bitcoin className="w-3 h-3 mr-1" />
            Building on SUI Blockchain
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            SUI Campus Organization
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Empowering students to build the future of decentralized applications on the SUI blockchain ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Explore Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Build</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Innovative blockchain solutions that bridge traditional education with cutting-edge cryptocurrency technology
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/20 transition-colors group">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world applications building the SUI ecosystem on campus
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant={project.status === "Live" ? "default" : project.status === "Development" ? "secondary" : "outline"}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  Learn More
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate students and developers building the future of blockchain technology
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="text-center border-border/50 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the SUI Revolution</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Be part of the next generation of blockchain developers and help shape the future of decentralized technology on campus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Users className="w-4 h-4 mr-2" />
              Join Our Community
            </Button>
            <Button variant="outline" size="lg">
              <Wallet className="w-4 h-4 mr-2" />
              Start Building
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary/60 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">SUI Campus</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                © 2024 SUI Campus Organization
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
