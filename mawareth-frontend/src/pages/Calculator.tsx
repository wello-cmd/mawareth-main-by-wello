import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Trash2, FileText, Gavel, ChevronDown, AlertTriangle, Info, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PageContainer } from "@/components/layout/PageContainer";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatEGP } from "@/services/api";
import { 
  calculateInheritance, 
  HEIR_CONFIGS, 
  HeirRelationship, 
  getGenderForRelationship, 
  getBlockingStatus, 
  EstateCalculation, 
  Heir 
} from "@/lib/shariaCalculator";

interface HeirInput {
  id: string;
  name: string;
  relationship: HeirRelationship | '';
  gender: 'male' | 'female' | '';
}

const Calculator = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [estateValue, setEstateValue] = useState("");
  const [heirs, setHeirs] = useState<HeirInput[]>([{ id: "1", name: "", relationship: "", gender: "" }]);
  const [showResults, setShowResults] = useState(false);
  const [calculationResult, setCalculationResult] = useState<EstateCalculation | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const addHeir = () => {
    setHeirs([...heirs, { id: Date.now().toString(), name: "", relationship: "", gender: "" }]);
  };

  const removeHeir = (id: string) => {
    if (heirs.length > 1) {
      setHeirs(heirs.filter(heir => heir.id !== id));
    }
  };

  const updateHeir = (id: string, field: keyof HeirInput, value: string) => {
    setHeirs(heirs.map(heir => {
      if (heir.id !== id) return heir;
      const updated = { ...heir, [field]: value };
      if (field === 'relationship' && value) {
        updated.gender = getGenderForRelationship(value as HeirRelationship);
      }
      return updated;
    }));
  };

  const handleCalculate = () => {
    const value = parseInt(estateValue, 10);
    if (!value || value <= 0) {
      toast.error(language === 'ar' ? 'الرجاء إدخال قيمة صحيحة' : 'Please enter a valid estate value');
      return;
    }

    const incompleteHeir = heirs.find(h => !h.name || !h.relationship);
    if (incompleteHeir) {
      toast.error(language === 'ar' ? 'الرجاء إكمال بيانات جميع الورثة' : 'Please complete all heir information');
      return;
    }

    const validHeirs: Heir[] = heirs
      .filter(h => h.relationship)
      .map(h => ({
        id: h.id,
        name: h.name,
        relationship: h.relationship as HeirRelationship,
        gender: (h.gender as 'male' | 'female') || getGenderForRelationship(h.relationship as HeirRelationship)
      }));

    const result = calculateInheritance(value, validHeirs);
    setCalculationResult(result);
    setShowResults(true);
    toast.success(language === 'ar' ? 'تم الحساب بنجاح!' : 'Calculation completed!');
  };

  const handleNewCalculation = () => {
    setShowResults(false);
    setCalculationResult(null);
    setEstateValue("");
    setHeirs([{ id: "1", name: "", relationship: "", gender: "" }]);
  };

  const existingRelationships = heirs.filter(h => h.relationship).map(h => h.relationship as HeirRelationship);
  const primaryRelationships = HEIR_CONFIGS.filter(c => c.category === 'primary');
  const secondaryRelationships = HEIR_CONFIGS.filter(c => c.category === 'secondary');
  const allRelationships = [...primaryRelationships, ...secondaryRelationships];

  const t = language === 'ar' ? {
    title: "حاسبة الميراث",
    subtitle: "احسب الأنصبة وفقاً للشريعة الإسلامية",
    estateValue: "إجمالي قيمة التركة",
    heirs: "الورثة والمستفيدين",
    advancedHeirs: "أفراد العائلة الموسعة",
    advancedHint: "الإخوة، الأجداد، أبناء الابن",
    addHeir: "إضافة وارث",
    name: "الاسم",
    relationship: "صلة القرابة",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    calculate: "احسب الأنصبة",
    certificateTitle: "شهادة توزيع الميراث",
    estateTotal: "إجمالي التركة",
    heirName: "اسم الوارث",
    relation: "صلة القرابة",
    percentage: "النسبة",
    cashValue: "القيمة النقدية",
    savePdf: "حفظ كـ PDF",
    liquidate: "تسييل الآن",
    newCalc: "حساب جديد",
    blocked: "محجوب",
    blockedBy: "محجوب بواسطة",
    explanation: "تفسير التوزيع",
    awlWarning: "تم تطبيق العول: إجمالي الفروض تجاوز 100%",
    raddNote: "تم تطبيق الرد: إرجاع الفائض للورثة",
  } : {
    title: "Inheritance Calculator",
    subtitle: "Calculate shares according to Sharia law",
    estateValue: "Total Estate Value",
    heirs: "Heirs & Beneficiaries",
    advancedHeirs: "Extended Family Members",
    advancedHint: "Siblings, Grandparents",
    addHeir: "Add Heir",
    name: "Name",
    relationship: "Relationship",
    gender: "Gender",
    male: "Male",
    female: "Female",
    calculate: "Calculate Shares",
    certificateTitle: "Certificate of Inheritance",
    estateTotal: "Estate Total",
    heirName: "Heir Name",
    relation: "Relation",
    percentage: "Percentage",
    cashValue: "Cash Value",
    savePdf: "Save as PDF",
    liquidate: "Liquidate Now",
    newCalc: "New Calculation",
    blocked: "Blocked",
    blockedBy: "Blocked by",
    explanation: "Legal Logic Breakdown",
    awlWarning: "Al-Awl Applied: Fixed shares exceeded 100%",
    raddNote: "Al-Radd Applied: Surplus returned to heirs",
  };

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {showResults && calculationResult ? (
            <div className="space-y-6">
              {/* Certificate Card */}
              <Card className="shadow-medium border-2 border-border overflow-hidden">
                {/* Header */}
                <div className="bg-primary text-primary-foreground p-6 text-center">
                  <h2 className="text-2xl font-bold">{t.certificateTitle}</h2>
                  <p className="text-primary-foreground/80 text-sm mt-1">شهادة توزيع الميراث</p>
                </div>

                {/* Warnings */}
                {calculationResult.hasAwl && (
                  <div className="p-4 bg-accent/10 border-b border-border flex items-center gap-3">
                    <Scale className="w-5 h-5 text-accent flex-shrink-0" />
                    <p className="text-sm text-foreground">{t.awlWarning}</p>
                  </div>
                )}
                {calculationResult.hasRadd && (
                  <div className="p-4 bg-success-green/10 border-b border-border flex items-center gap-3">
                    <Info className="w-5 h-5 text-success-green flex-shrink-0" />
                    <p className="text-sm text-foreground">{t.raddNote}</p>
                  </div>
                )}

                {/* Estate Total */}
                <div className="p-6 border-b border-border bg-muted/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t.estateTotal}</span>
                    <span className="text-2xl font-bold text-foreground">
                      {formatEGP(calculationResult.totalEstate)}
                    </span>
                  </div>
                </div>

                {/* Results Table */}
                <div className="p-6 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="text-left py-3 text-sm font-semibold text-muted-foreground">{t.heirName}</th>
                        <th className="text-left py-3 text-sm font-semibold text-muted-foreground">{t.relation}</th>
                        <th className="text-right py-3 text-sm font-semibold text-muted-foreground">{t.percentage}</th>
                        <th className="text-right py-3 text-sm font-semibold text-muted-foreground">{t.cashValue}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculationResult.results.map((result, idx) => {
                        const config = HEIR_CONFIGS.find(c => c.value === result.relationship);
                        return (
                          <tr key={idx} className={`border-b border-border ${result.isBlocked ? 'opacity-50' : ''}`}>
                            <td className="py-4 font-medium text-foreground">
                              {result.name}
                              {result.isBlocked && (
                                <span className="ml-2 text-xs text-destructive">({t.blocked})</span>
                              )}
                            </td>
                            <td className="py-4 text-muted-foreground">
                              {language === 'ar' ? config?.labelAr : config?.labelEn}
                            </td>
                            <td className="py-4 text-right font-semibold text-foreground">
                              {result.percentage.toFixed(1)}%
                            </td>
                            <td className={`py-4 text-right font-bold ${result.isBlocked ? 'text-muted-foreground' : 'text-success-green'}`}>
                              {formatEGP(result.amount)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Actions */}
                <div className="p-6 bg-muted/30 border-t border-border">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="flex-1 h-12" onClick={handleNewCalculation}>
                      {t.newCalc}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 h-12"
                      onClick={() => {
                        if (calculationResult) {
                          import('@/lib/pdfGenerator').then(({ generatePDF }) => {
                            generatePDF(calculationResult);
                          });
                        }
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      {t.savePdf}
                    </Button>
                    <Button 
                      className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground" 
                      onClick={() => navigate('/marketplace')}
                    >
                      <Gavel className="w-4 h-4 mr-2" />
                      {t.liquidate}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Explanation Card */}
              <Card className="shadow-soft p-6">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  {t.explanation}
                </h3>
                <div className="space-y-4">
                  {calculationResult.explanations.map((exp, idx) => {
                    const config = HEIR_CONFIGS.find(c => c.value === exp.relationship);
                    return (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-lg border ${
                          exp.isBlocked ? 'bg-destructive/5 border-destructive/20' : 'bg-card border-border'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{exp.heir}</h4>
                            <p className="text-sm text-muted-foreground">
                              {language === 'ar' ? config?.labelAr : config?.labelEn}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${exp.isBlocked ? 'text-muted-foreground' : 'text-primary'}`}>
                              {exp.shareFraction}
                            </p>
                            <p className={`text-sm ${exp.isBlocked ? 'text-muted-foreground' : 'text-success-green'}`}>
                              {formatEGP(exp.amount)}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? exp.reasonAr : exp.reason}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.title}</h1>
                <p className="text-muted-foreground text-lg">{t.subtitle}</p>
              </div>

              {/* Input Form */}
              <Card className="p-6 md:p-8 shadow-soft">
                <div className="space-y-6">
                  {/* Estate Value */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">{t.estateValue}</Label>
                    <CurrencyInput value={estateValue} onChange={setEstateValue} placeholder="0" />
                  </div>

                  {/* Heirs Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-base font-semibold">{t.heirs}</Label>
                      <Button onClick={addHeir} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        {t.addHeir}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {heirs.map((heir) => {
                        const blocking = heir.relationship
                          ? getBlockingStatus(
                              heir.relationship as HeirRelationship,
                              existingRelationships.filter(r => r !== heir.relationship)
                            )
                          : { blocked: false };

                        return (
                          <Card 
                            key={heir.id} 
                            className={`p-4 border-border ${blocking.blocked ? 'opacity-60 bg-muted' : ''}`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-1 grid md:grid-cols-3 gap-4">
                                <div>
                                  <Label className="text-sm mb-2 block">{t.name}</Label>
                                  <Input
                                    placeholder={t.name}
                                    value={heir.name}
                                    onChange={(e) => updateHeir(heir.id, 'name', e.target.value)}
                                    className="h-12"
                                  />
                                </div>
                                <div>
                                  <Label className="text-sm mb-2 block">{t.relationship}</Label>
                                  <Select
                                    value={heir.relationship}
                                    onValueChange={(value) => updateHeir(heir.id, 'relationship', value)}
                                  >
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder={t.relationship} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {allRelationships.map(r => {
                                        const bs = getBlockingStatus(
                                          r.value,
                                          existingRelationships.filter(rel => rel !== heir.relationship)
                                        );
                                        return (
                                          <SelectItem
                                            key={r.value}
                                            value={r.value}
                                            disabled={bs.blocked}
                                            className={bs.blocked ? 'opacity-50' : ''}
                                          >
                                            {language === 'ar' ? r.labelAr : r.labelEn}
                                            {bs.blocked && (
                                              <span className="text-xs text-destructive ml-2">
                                                ({t.blockedBy} {bs.by})
                                              </span>
                                            )}
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-sm mb-2 block">{t.gender}</Label>
                                  <Select
                                    value={heir.gender}
                                    onValueChange={(value) => updateHeir(heir.id, 'gender', value)}
                                    disabled={!!heir.relationship}
                                  >
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder={t.gender} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="male">{t.male}</SelectItem>
                                      <SelectItem value="female">{t.female}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              {heirs.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeHeir(heir.id)}
                                  className="mt-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                            {blocking.blocked && (
                              <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
                                <AlertTriangle className="w-4 h-4" />
                                <span>{t.blockedBy} {blocking.by}</span>
                              </div>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Advanced Heirs */}
                  <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full h-12 justify-between">
                        <div className="flex items-center gap-2">
                          <span>{t.advancedHeirs}</span>
                          <span className="text-xs text-muted-foreground">({t.advancedHint})</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <div className="p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {secondaryRelationships.map(r => {
                            const blocking = getBlockingStatus(r.value, existingRelationships);
                            return (
                              <Button
                                key={r.value}
                                variant="outline"
                                size="sm"
                                disabled={blocking.blocked}
                                className={`justify-start text-xs ${blocking.blocked ? 'opacity-50' : ''}`}
                                onClick={() => setHeirs([
                                  ...heirs,
                                  { id: Date.now().toString(), name: '', relationship: r.value, gender: r.gender }
                                ])}
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                {language === 'ar' ? r.labelAr : r.labelEn}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Calculate Button */}
                  <Button
                    size="lg"
                    className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground shadow-soft text-lg"
                    onClick={handleCalculate}
                  >
                    {t.calculate}
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Calculator;
