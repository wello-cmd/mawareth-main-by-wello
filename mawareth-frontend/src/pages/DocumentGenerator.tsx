import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/i18n";
import { AppHeader } from "@/components/layout/AppHeader";
import { ArrowLeft, ArrowRight, Check, Download, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentGenerator = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];
    const { toast } = useToast();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        deceasedName: "",
        deathDate: "",
        governorate: "",
        heirName: "",
        heirId: "",
        assetDescription: "",
    });
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    // Helper to get document title
    const getDocTitle = () => {
        switch (type) {
            case "partition-agreement": return t.partitionAgreement;
            case "poa-draft": return t.poaDraft;
            case "inheritance-declaration": return t.inheritanceDecl;
            default: return t.docsTitle;
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const handlePayment = () => {
        // Simulate payment processing
        setTimeout(() => {
            setIsPaid(true);
            toast({
                title: "Payment Successful",
                description: "Document unlocked successfully.",
            });
        }, 1500);
    };

    const handeDownload = () => {
        toast({
            title: "Downloading...",
            description: "Your document is being prepared for download.",
        });
        // Simulate download
    };

    return (
        <div className={`min-h-screen bg-gray-50 font-cairo ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <AppHeader />

            <main className="container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/merath-docs')}
                    className="mb-6"
                >
                    {language === 'ar' ? <ArrowRight className="ml-2 w-4 h-4" /> : <ArrowLeft className="mr-2 w-4 h-4" />}
                    Back to Docs
                </Button>

                <Card className="max-w-4xl mx-auto p-8 shadow-lg">
                    <div className="mb-8 border-b pb-4">
                        <h1 className="text-3xl font-bold text-primary mb-2">{getDocTitle()}</h1>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-xl font-semibold mb-4">{t.formHeirInfo}</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>{t.deceasedName}</Label>
                                    <Input
                                        value={formData.deceasedName}
                                        onChange={(e) => handleInputChange("deceasedName", e.target.value)}
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t.deathDate}</Label>
                                    <Input
                                        type="date"
                                        value={formData.deathDate}
                                        onChange={(e) => handleInputChange("deathDate", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t.governorate}</Label>
                                    <Input
                                        value={formData.governorate}
                                        onChange={(e) => handleInputChange("governorate", e.target.value)}
                                        placeholder="e.g. Cairo"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-6">
                                <Button onClick={handleNext} disabled={!formData.deceasedName}>
                                    {t.next} {language === 'ar' ? <ArrowLeft className="mr-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-xl font-semibold mb-4">{t.formAssetInfo}</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Asset Description / Additional Details</Label>
                                    <textarea
                                        className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background"
                                        value={formData.assetDescription}
                                        onChange={(e) => handleInputChange("assetDescription", e.target.value)}
                                        placeholder="Describe the assets or specific terms..."
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between pt-6">
                                <Button variant="outline" onClick={handleBack}>{t.previous}</Button>
                                <Button onClick={handleNext}>{t.next} {language === 'ar' ? <ArrowLeft className="mr-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <h2 className="text-xl font-semibold mb-4">{t.previewTitle}</h2>

                            <div className="relative border p-8 rounded-lg bg-gray-50 min-h-[400px] font-serif leading-loose text-lg text-gray-800">
                                {!isPaid && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-20">
                                        <div className="text-9xl font-bold -rotate-45 text-gray-400 select-none">
                                            {t.previewWatermark}
                                        </div>
                                    </div>
                                )}

                                <p className="mb-4 text-center font-bold text-xl border-b pb-4">{getDocTitle()}</p>
                                <p>On {new Date().toLocaleDateString()}, in the governorate of <strong>{formData.governorate || "___________"}</strong>.</p>
                                <p>Regarding the estate of late <strong>{formData.deceasedName || "___________"}</strong>, deceased on <strong>{formData.deathDate || "___________"}</strong>.</p>
                                <p className="mt-4">
                                    {formData.assetDescription ? formData.assetDescription : "The parties hereby agree to the division of assets such that..."}
                                </p>
                                <p className="mt-8 text-sm text-gray-500 italic">
                                    [This is a generated draft based on user input. Standard legal clauses would appear here.]
                                </p>
                            </div>

                            <div className="flex items-center space-x-2 pt-4">
                                <Checkbox
                                    id="disclaimer"
                                    checked={disclaimerAccepted}
                                    onCheckedChange={(c) => setDisclaimerAccepted(c as boolean)}
                                />
                                <label
                                    htmlFor="disclaimer"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-600"
                                >
                                    {t.draftDisclaimer}
                                </label>
                            </div>

                            <div className="flex justify-between pt-6 items-center">
                                <Button variant="outline" onClick={handleBack}>{t.previous}</Button>

                                {!isPaid ? (
                                    <Button
                                        onClick={handlePayment}
                                        disabled={!disclaimerAccepted}
                                        className="bg-amber-600 hover:bg-amber-700"
                                    >
                                        <Lock className="w-4 h-4 mr-2" />
                                        {t.payUnlock}
                                    </Button>
                                ) : (
                                    <Button onClick={handeDownload} className="bg-green-600 hover:bg-green-700">
                                        <Download className="w-4 h-4 mr-2" />
                                        {t.downloadPdf}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </Card>
            </main>
        </div>
    );
};

export default DocumentGenerator;
