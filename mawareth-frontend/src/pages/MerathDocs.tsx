import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Scroll, Gavel, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/i18n";
import { AppHeader } from "@/components/layout/AppHeader";

const MerathDocs = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];

    // Document types config
    const docTypes = [
        {
            id: "partition-agreement",
            title: t.partitionAgreement,
            description: t.partitionDesc,
            icon: Scroll,
            color: "bg-blue-100 text-blue-600",
        },
        {
            id: "poa-draft",
            title: t.poaDraft,
            description: t.poaDesc,
            icon: Gavel,
            color: "bg-amber-100 text-amber-600",
        },
        {
            id: "inheritance-declaration",
            title: t.inheritanceDecl,
            description: t.declDesc,
            icon: FileText,
            color: "bg-indigo-100 text-indigo-600",
        },
    ];

    return (
        <div className={`min-h-screen bg-gray-50 font-cairo ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <AppHeader />

            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.docsTitle}</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t.docsSubtitle}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {docTypes.map((doc) => (
                        <Card key={doc.id} className="p-8 hover:shadow-lg transition-all duration-300 border-none shadow-md group">
                            <div className={`w-16 h-16 ${doc.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <doc.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{doc.title}</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed h-16">
                                {doc.description}
                            </p>
                            <Button
                                onClick={() => navigate(`/merath-docs/${doc.id}`)}
                                className="w-full bg-[#064E3B] hover:bg-[#053d2e] text-white group-hover:shadow-md transition-all"
                            >
                                {t.generateNow} <ArrowRight className={`ml-2 w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                            </Button>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MerathDocs;
