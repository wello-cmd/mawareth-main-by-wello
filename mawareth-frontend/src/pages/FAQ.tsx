import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      category: "Sharia Inheritance Basics",
      questions: [
        {
          q: "What is Sharia inheritance law?",
          a: "Sharia inheritance law (Faraid) is the Islamic legal framework that governs how a deceased Muslim's estate is distributed among heirs. It's based on the Quran and Hadith, prescribing specific shares for different family members including spouses, children, parents, and siblings."
        },
        {
          q: "Who are the primary heirs in Islamic inheritance?",
          a: "Primary heirs include the deceased's spouse, children (sons and daughters), parents, and in some cases, siblings. The Quran specifies fixed shares (Fard) for certain heirs, while others receive residual shares (Asabah) based on their relationship and the presence of other heirs."
        },
        {
          q: "How do sons and daughters inherit differently?",
          a: "Under Sharia law, sons typically receive twice the share of daughters. For example, if there are both sons and daughters, the male receives 2 parts while the female receives 1 part. This is based on Quranic verse 4:11."
        },
        {
          q: "What happens if there's no will?",
          a: "In Islamic law, inheritance distribution follows Sharia rules regardless of whether there's a will. However, up to 1/3 of the estate can be bequeathed through a will to non-heirs or for charitable purposes. The remaining 2/3 must follow Sharia distribution rules."
        }
      ]
    },
    {
      category: "Using Mawareth",
      questions: [
        {
          q: "How accurate are Mawareth's calculations?",
          a: "Our calculations are verified by certified Islamic scholars and legal experts. We follow authentic Sharia sources and Egyptian inheritance law. However, we recommend consulting with a qualified scholar for complex cases or official legal proceedings."
        },
        {
          q: "Is the PDF document court-ready?",
          a: "The PDF document we generate provides a detailed calculation breakdown following Sharia principles. While it's comprehensive and legally sound, Egyptian courts typically require official documentation prepared by a licensed attorney. Our document serves as an excellent foundation for your legal filing."
        },
        {
          q: "Do I need to create an account?",
          a: "Currently, you can use our calculator without an account. However, creating an account (coming soon) will allow you to save calculations, access history, and receive updates on your case."
        },
        {
          q: "Can I save my calculation?",
          a: "Yes! You can download your calculation as a PDF document. We're also adding features to save calculations online when you create an account."
        }
      ]
    },
    {
      category: "Estate & Property",
      questions: [
        {
          q: "What if the estate includes property that can't be divided?",
          a: "This is a common challenge. Mawareth partners with banks to provide liquidity solutions, allowing one heir to buy out others' shares. This prevents properties from remaining frozen and families from being stuck in disputes."
        },
        {
          q: "How do I value the estate?",
          a: "For real estate, get a professional appraisal. For other assets, use current market values. Include all properties, bank accounts, investments, and valuable possessions. Debts and funeral expenses should be deducted first."
        },
        {
          q: "What if heirs disagree on the calculation?",
          a: "Our transparent calculations show the Islamic legal basis for each share. If disputes arise, we recommend family mediation with an Islamic scholar present. Mawareth provides clear documentation that can help facilitate these discussions."
        },
        {
          q: "Are debts paid before inheritance distribution?",
          a: "Yes, absolutely. In Islamic law, debts must be paid first from the estate before any distribution to heirs. This includes funeral expenses, outstanding loans, and other financial obligations of the deceased."
        }
      ]
    },
    {
      category: "Legal & Compliance",
      questions: [
        {
          q: "Is Mawareth compliant with Egyptian law?",
          a: "Yes, we follow both Sharia principles and Egyptian Personal Status Law No. 1 of 2000. Our calculations align with how Egyptian courts handle inheritance cases."
        },
        {
          q: "Do I still need a lawyer?",
          a: "For official court filings and complex estate settlements, yes. Mawareth provides accurate calculations and documentation, but a licensed Egyptian attorney can guide you through the legal process and represent you in court if needed."
        },
        {
          q: "What documents do I need for official proceedings?",
          a: "You'll typically need: death certificate, family registry document, estate valuation, debt documentation, and identification for all heirs. Our platform helps you organize this information and calculate shares accurately."
        },
        {
          q: "How long does the inheritance process take in Egypt?",
          a: "Without liquidity solutions, it can take 1-3 years or more. With Mawareth's bank partnerships for estate buyouts, the process can be completed in weeks instead of years."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "Is my information secure?",
          a: "Yes. We use industry-standard encryption and security practices. Your calculation data is stored securely and never shared with third parties without your explicit consent."
        },
        {
          q: "Who can see my calculation?",
          a: "Only you have access to your calculations. If you choose to share the PDF or results, that's entirely up to you. We don't share your information with anyone."
        },
        {
          q: "Do you store my personal data?",
          a: "We only store what's necessary to provide our service. When you integrate with your own backend, you'll have full control over your data storage and privacy policies."
        }
      ]
    }
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Sharia inheritance, our calculator, and the legal process in Egypt.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {section.category}
                </h2>
                <Card className="p-6 shadow-medium">
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${sectionIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left text-foreground hover:text-primary">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our support team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/contact')}>
                Contact Support
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/calculator')}>
                Try Calculator
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

export default FAQ;
