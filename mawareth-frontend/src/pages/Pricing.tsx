import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic Calculator",
      price: "Free",
      description: "Perfect for simple estate calculations",
      features: [
        "Unlimited calculations",
        "Basic Sharia inheritance rules",
        "PDF export",
        "Email support",
        "Mobile-friendly interface",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "EGP 499",
      period: "per calculation",
      description: "For families needing verified documentation",
      features: [
        "Everything in Basic",
        "Scholar-verified calculations",
        "Court-ready legal documents",
        "Complex estate scenarios",
        "Priority support",
        "Document notarization assistance",
        "Legal consultation (30 min)",
      ],
      cta: "Choose Professional",
      popular: true,
    },
    {
      name: "Liquidity Package",
      price: "EGP 2,999",
      period: "one-time",
      description: "Complete solution with bank financing",
      features: [
        "Everything in Professional",
        "Bank partner introductions",
        "Estate liquidity solutions",
        "Buyout financing options",
        "Dedicated case manager",
        "Legal representation support",
        "Family mediation services",
        "90-day support period",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  const additionalServices = [
    {
      name: "Legal Consultation",
      price: "EGP 500/hour",
      description: "Expert guidance from licensed Egyptian attorneys",
    },
    {
      name: "Family Mediation",
      price: "EGP 1,500/session",
      description: "Professional mediation with Islamic scholar present",
    },
    {
      name: "Document Translation",
      price: "EGP 300/document",
      description: "Certified Arabic-English translation for legal documents",
    },
    {
      name: "Estate Appraisal",
      price: "From EGP 2,000",
      description: "Professional valuation of real estate and assets",
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs. Start free, upgrade when ready.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 relative ${
                  plan.popular 
                    ? 'border-primary shadow-medium scale-105' 
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground text-sm ml-2">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => navigate('/calculator')}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Professional services to complement your inheritance solution
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-medium transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <span className="text-primary font-bold">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Pricing FAQs
            </h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Is the Basic Calculator really free?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes! You can use our calculator for unlimited basic inheritance calculations at no cost. 
                  Upgrade only when you need verified documentation or liquidity solutions.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major Egyptian payment methods including credit/debit cards, bank transfers, 
                  and mobile wallets (Vodafone Cash, Orange Money, Etisalat Cash).
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Can I get a refund?
                </h3>
                <p className="text-muted-foreground text-sm">
                  We offer a 14-day money-back guarantee for Professional and Liquidity packages if you're 
                  not satisfied with our service. No questions asked.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Do you offer discounts for multiple estates?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Yes! Contact our sales team for volume discounts if you're handling multiple estate calculations 
                  or need services for extended family members.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try our calculator for free. No credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/calculator')}>
                Start Free Calculator
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
                Talk to Sales
              </Button>
            </div>
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

export default Pricing;
