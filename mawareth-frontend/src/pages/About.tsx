import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, Heart, Shield, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/i18n";
import { LanguageToggle } from "@/components/common/LanguageToggle";

const About = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const impactNumbers = [
    { value: t.impact1Value, label: t.impact1Label },
    { value: t.impact2Value, label: t.impact2Label },
    { value: t.impact3Value, label: t.impact3Label },
  ];

  const values = [
    {
      icon: Scale,
      title: t.precision,
      description: t.aboutZeroError,
    },
    {
      icon: Heart,
      title: t.empathy,
      description: t.aboutEmpathyDesc,
    },
    {
      icon: Shield,
      title: t.integrity,
      description: t.aboutIntegrityDesc,
    },
  ];

  const team = [
    {
      name: t.founderName,
      role: t.founderRole,
      image: "MW", // Initials as placeholder for avatar
    },
    {
      name: "Sarah Ahmed",
      role: t.cloRole,
      image: "SA",
    },
    {
      name: "Omar Hassan",
      role: t.ctoRole,
      image: "OH",
    },
    {
      name: "Laila Mahmoud",
      role: t.opsRole,
      image: "LM",
    },
  ];

  return (
    <div className={`min-h-screen bg-background font-cairo ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex gap-3 items-center">
              <LanguageToggle />
              <Button variant="ghost" onClick={() => navigate('/')}>
                {t.home}
              </Button>
              <Button onClick={() => navigate('/calculator')}>{t.calculator}</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#064E3B] to-[#042f2e]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            {t.aboutHeroTitle} <br />
            <span className="text-[#D4AF37]">{t.aboutHeroSubtitle}</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            {t.aboutHeroDesc}
          </p>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 rtl:divide-x-reverse">
            {impactNumbers.map((item, index) => (
              <div key={index} className="py-12 text-center group hover:bg-gray-50 transition-colors duration-300">
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2 font-cairo">
                  {item.value}
                </div>
                <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-4">Our Core Values</h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                <div className="w-16 h-16 bg-[#064E3B]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#064E3B] transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-[#064E3B] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#064E3B] mb-4">{t.teamTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.teamSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 mx-auto">
                  <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-2xl font-bold text-[#064E3B] border-4 border-white shadow-lg overflow-hidden relative z-10 group-hover:scale-105 transition-transform duration-300">
                    {/* Placeholder for avatar image, using initials */}
                    {member.image}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-150 z-0"></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-[#D4AF37] font-medium text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#064E3B] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.joinMission}</h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            {t.missionSubtitle}
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/contact')}
            className="bg-[#D4AF37] text-[#064E3B] hover:bg-[#c5a028] font-bold px-8 py-6 h-auto text-lg rounded-xl shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
          >
            {t.contactUs}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#064E3B] rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">Mawareth</span>
            </div>
            <p className="text-sm text-gray-500">
              {t.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
