import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users, Target, Heart, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Shield,
      title: "Sharia Compliance",
      description: "Every calculation strictly follows Islamic inheritance law and Egyptian legal requirements.",
    },
    {
      icon: Users,
      title: "Family First",
      description: "We help families navigate inheritance with transparency, fairness, and dignity.",
    },
    {
      icon: Target,
      title: "Precision & Accuracy",
      description: "Our calculations are verified by Islamic scholars and legal experts.",
    },
    {
      icon: Heart,
      title: "Compassionate Service",
      description: "We understand inheritance is sensitive. Our platform treats every case with care.",
    },
  ];

  const team = [
    {
      name: "Mohammed Waleed",
      role: "Founder & CEO",
      description: "Islamic Finance Expert with 15+ years experience",
    },
    {
      name: "Dr. Fatima El-Sayed",
      role: "Chief Sharia Officer",
      description: "PhD in Islamic Jurisprudence from Al-Azhar University",
    },
    {
      name: "Omar Khalil",
      role: "Chief Technology Officer",
      description: "Former Lead Engineer at top Egyptian fintech",
    },
    {
      name: "Layla Mansour",
      role: "Head of Legal Affairs",
      description: "Specialized in Egyptian Inheritance Law for 10+ years",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => navigate('/calculator')}>Calculator</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              About Mawareth
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to transform how Egyptian families handle inheritance. 
              By digitizing Sharia calculations and providing instant liquidity solutions, 
              we're ending the estate freeze that keeps families waiting for years.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Our Story
            </h2>
            <Card className="p-8 shadow-medium">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Mawareth was born from a personal crisis. Our founder, Mohammed Waleed, watched his own family 
                struggle for three years to divide an inherited apartment. Three siblings couldn't agree, 
                none had cash to buy the others out, and the property sat empty while legal fees mounted.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                This story repeats across Egypt thousands of times. Families fracture. Assets remain frozen. 
                The deceased's wishes go unfulfilled. All because the system is broken.
              </p>
              <p className="text-lg text-foreground font-semibold">
                Mawareth fixes this. We bring inheritance into the digital age with precise Sharia calculations 
                and connections to bank partners who provide immediate liquidity. Families can finally move forward.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
            Our Team
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Led by experts in Islamic law, Egyptian legal system, and financial technology
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-medium transition-all">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">10,000+</div>
              <p className="text-muted-foreground">Calculations Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">EGP 2B+</div>
              <p className="text-muted-foreground">Estate Value Processed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2">98%</div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Ready to Start Your Calculation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of Egyptian families who trust Mawareth with their inheritance.
            </p>
            <Button size="lg" onClick={() => navigate('/calculator')} className="shadow-medium">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Mawareth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Mawareth. Simplifying inheritance in Egypt.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
