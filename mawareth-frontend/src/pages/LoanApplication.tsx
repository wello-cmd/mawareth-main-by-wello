import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/i18n";
import { PersonalInfo } from "@/components/LoanWizard/PersonalInfo";
import { EstateDetails } from "@/components/LoanWizard/EstateDetails";
import { HeirInfo } from "@/components/LoanWizard/HeirInfo";
import { FinancingRequest } from "@/components/LoanWizard/FinancingRequest";
import { BankSelection } from "@/components/LoanWizard/BankSelection";
import { LanguageToggle } from "@/components/common/LanguageToggle";

export interface LoanApplicationData {
  personalInfo: {
    fullName: string;
    nationalId: string;
    phone: string;
    email: string;
    address: string;
    employmentStatus: string;
    monthlyIncome: string;
  };
  estateDetails: {
    propertyType: string;
    propertyAddress: string;
    estimatedValue: string;
    hasDocuments: boolean;
  };
  heirInfo: {
    numberOfHeirs: string;
    heirRelationships: string;
    agreementStatus: string;
  };
  financingRequest: {
    loanAmount: string;
    purpose: string;
    repaymentPeriod: string;
    existingDebts: string;
  };
  bankSelection: {
    selectedBank: string;
    acceptedTerms: boolean;
  };
}

const LoanApplication = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LoanApplicationData>({
    personalInfo: {
      fullName: '',
      nationalId: '',
      phone: '',
      email: '',
      address: '',
      employmentStatus: '',
      monthlyIncome: '',
    },
    estateDetails: {
      propertyType: '',
      propertyAddress: '',
      estimatedValue: '',
      hasDocuments: false,
    },
    heirInfo: {
      numberOfHeirs: '',
      heirRelationships: '',
      agreementStatus: '',
    },
    financingRequest: {
      loanAmount: '',
      purpose: '',
      repaymentPeriod: '',
      existingDebts: '',
    },
    bankSelection: {
      selectedBank: '',
      acceptedTerms: false,
    },
  });

  const totalSteps = 5;

  const updateFormData = (section: keyof LoanApplicationData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfo data={formData.personalInfo} updateData={(data) => updateFormData('personalInfo', data)} />;
      case 2:
        return <EstateDetails data={formData.estateDetails} updateData={(data) => updateFormData('estateDetails', data)} />;
      case 3:
        return <HeirInfo data={formData.heirInfo} updateData={(data) => updateFormData('heirInfo', data)} />;
      case 4:
        return <FinancingRequest data={formData.financingRequest} updateData={(data) => updateFormData('financingRequest', data)} />;
      case 5:
        return <BankSelection data={formData.bankSelection} updateData={(data) => updateFormData('bankSelection', data)} formData={formData} />;
      default:
        return null;
    }
  };

  const steps = [
    t.loanStep1,
    t.loanStep2,
    t.loanStep3,
    t.loanStep4,
    t.loanStep5,
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
              <LanguageToggle />
              <Button variant="ghost" onClick={() => navigate('/')}>
                {t.backToHome}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Loan Application Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {t.loanApplicationTitle}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.loanApplicationSubtitle}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep > index + 1 ? 'bg-primary text-primary-foreground' :
                      currentStep === index + 1 ? 'bg-gradient-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                    }`}>
                    {index + 1}
                  </div>
                  <p className="text-xs mt-2 text-center hidden sm:block">{step}</p>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-full mt-5 -mx-2 ${currentStep > index + 1 ? 'bg-primary' : 'bg-muted'
                      }`} style={{ position: 'absolute', top: '20px', left: '50%', width: '100%', zIndex: -1 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="p-8 shadow-medium">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t.previous}
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  {t.next}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => {
                  // Handle final submission
                  console.log('Application submitted:', formData);
                  navigate('/');
                }}>
                  {t.submitApplication}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
