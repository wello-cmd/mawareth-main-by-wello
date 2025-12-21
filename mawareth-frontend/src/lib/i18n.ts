// Simple i18n implementation for Arabic/English toggle
// You'll integrate this with your MERN backend for persistent language preferences

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    calculator: 'Calculator',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    pricing: 'Pricing',
    blog: 'Blog',
    getStarted: 'Get Started',
    backToHome: 'Back to Home',

    // Hero Section
    heroTitle: 'Transform Inheritance Into Immediate Liquidity',
    heroSubtitle: 'The first platform in Egypt to digitize Sharia inheritance calculations',
    heroDescription: 'and provide instant estate liquidity solutions for families.',
    calculateYourShare: 'Calculate Your Share',
    learnMore: 'Learn More',

    // Steps
    threeSteps: 'Three Simple Steps',
    step1Title: 'Input Estate Details',
    step1Desc: 'Enter information about the deceased, heirs, and estate assets.',
    step2Title: 'Calculate Shares',
    step2Desc: 'Our system calculates exact shares according to Sharia law.',
    step3Title: 'Access Liquidity',
    step3Desc: 'Connect with bank partners for immediate estate liquidity solutions.',

    // CTA
    ctaTitle: 'Ready to Resolve Your Inheritance?',
    ctaSubtitle: 'Join families across Egypt who are unlocking their inheritance with Mawareth.',
    startCalculation: 'Start Your Calculation Now',

    // Calculator
    estateCalculator: 'Estate Calculator',
    calculatorSubtitle: 'Calculate inheritance shares according to Sharia law',
    totalEstateValue: 'Total Estate Value (EGP)',
    heirsAndBeneficiaries: 'Heirs & Beneficiaries',
    addHeir: 'Add Heir',
    calculateInheritance: 'Calculate Inheritance Shares',
    newCalculation: 'New Calculation',
    downloadPDF: 'Download PDF Report',

    // Heir Types
    spouse: 'Spouse',
    son: 'Son',
    daughter: 'Daughter',
    father: 'Father',
    mother: 'Mother',
    brother: 'Brother',
    sister: 'Sister',
    grandfather: 'Grandfather',
    grandmother: 'Grandmother',
    stepmother: 'Stepmother',
    stepbrotherPaternal: 'Stepbrother (Paternal)',
    stepsisterPaternal: 'Stepsister (Paternal)',
    stepbrotherMaternal: 'Stepbrother (Maternal)',
    stepsisterMaternal: 'Stepsister (Maternal)',

    // Form Labels
    name: 'Name',
    relationship: 'Relationship',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    selectRelationship: 'Select relationship',
    selectGender: 'Select gender',

    // Sharia Explainer
    shariaExplainerTitle: 'Understanding Islamic Inheritance Law',
    fixedSharesTitle: 'Fixed Shares (Ashab al-Furud)',
    fixedSharesDesc: 'Certain heirs receive prescribed shares defined by the Quran and Hadith.',
    fixedSharesEx1: 'Spouse: 1/4 or 1/2 depending on presence of children',
    fixedSharesEx2: 'Mother: 1/6, 1/3 depending on other heirs',
    fixedSharesEx3: 'Daughters: 1/2 (single) or 2/3 (multiple)',
    residualSharesTitle: 'Residual Shares (Asabah)',
    residualSharesDesc: 'After fixed shares are distributed, remaining estate goes to residual heirs.',
    residualSharesEx1: 'Sons receive the remainder after fixed shares',
    residualSharesEx2: 'Father becomes residual heir when no children exist',
    residualSharesEx3: 'Brothers inherit residually in absence of children and father',
    blockingTitle: 'Blocking (Hajb)',
    blockingDesc: 'Closer relatives can block more distant relatives from inheriting.',
    blockingEx1: 'Children block siblings from inheritance',
    blockingEx2: 'Father blocks paternal grandfather',
    blockingEx3: 'Full siblings block half-siblings',
    stepRelativesTitle: 'Step-Relatives in Islamic Inheritance',
    stepRelativesDesc: 'Islamic law has specific rulings for step-relations.',
    stepmotherDesc: 'Does NOT inherit according to Sharia law',
    stepPaternalDesc: 'Inherit like full siblings but are blocked by them',
    stepMaternalDesc: 'Receive fixed shares: 1/6 (single) or 1/3 (multiple)',
    quranRef: 'Quranic Reference',
    quran411: 'Quran 4:11 - Children and parents shares',
    quran412: 'Quran 4:12 - Spouse and sibling shares',

    // Loan Application
    loanApplicationTitle: 'Estate Liquidity Loan Application',
    loanApplicationSubtitle: 'Connect with bank partners to convert your inheritance into immediate liquidity',
    loanStep1: 'Personal Info',
    loanStep2: 'Estate Details',
    loanStep3: 'Heir Info',
    loanStep4: 'Financing',
    loanStep5: 'Bank Selection',
    previous: 'Previous',
    next: 'Next',
    submitApplication: 'Submit Application',

    // Personal Info
    personalInfoTitle: 'Personal Information',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    nationalId: 'National ID',
    nationalIdPlaceholder: '14-digit ID number',
    phone: 'Phone Number',
    phonePlaceholder: '+20 1XX XXX XXXX',
    email: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    address: 'Current Address',
    addressPlaceholder: 'Your full address',
    employmentStatus: 'Employment Status',
    selectEmployment: 'Select employment status',
    employed: 'Employed',
    selfEmployed: 'Self-Employed',
    unemployed: 'Unemployed',
    retired: 'Retired',
    monthlyIncome: 'Monthly Income (EGP)',
    monthlyIncomePlaceholder: 'e.g., 15000',

    // Estate Details
    estateDetailsTitle: 'Estate Details',
    propertyType: 'Property Type',
    selectPropertyType: 'Select property type',
    apartment: 'Apartment',
    villa: 'Villa',
    land: 'Land',
    commercial: 'Commercial Property',
    estimatedValue: 'Estimated Value (EGP)',
    estimatedValuePlaceholder: 'e.g., 2000000',
    propertyAddress: 'Property Address',
    propertyAddressPlaceholder: 'Full property address',
    hasOwnershipDocuments: 'I have ownership documents available',

    // Heir Info
    heirInfoTitle: 'Heir Information',
    numberOfHeirs: 'Number of Co-Heirs',
    numberOfHeirsPlaceholder: 'e.g., 3',
    heirRelationships: 'Heir Relationships',
    heirRelationshipsPlaceholder: 'Describe the relationships (e.g., 2 brothers, 1 sister)',
    agreementStatus: 'Agreement Status',
    selectAgreementStatus: 'Select status',
    allAgree: 'All heirs agree on the distribution',
    someDisputes: 'Some minor disputes',
    majorDisputes: 'Major disputes requiring mediation',

    // Financing Request
    financingRequestTitle: 'Financing Request',
    loanAmount: 'Loan Amount Needed (EGP)',
    loanAmountPlaceholder: 'e.g., 1000000',
    loanPurpose: 'Loan Purpose',
    selectPurpose: 'Select purpose',
    buyoutHeirs: 'Buyout Other Heirs',
    liquidity: 'Immediate Liquidity',
    investment: 'Investment',
    other: 'Other',
    repaymentPeriod: 'Preferred Repayment Period',
    selectRepaymentPeriod: 'Select period',
    years: 'years',
    existingDebts: 'Existing Debts (EGP)',
    existingDebtsPlaceholder: 'Total existing debt',

    // Bank Selection
    bankSelectionTitle: 'Select Bank Partner',
    selectBankDescription: 'Choose your preferred bank for financing',
    interestRate: 'Interest Rate',
    applicationSummary: 'Application Summary',
    propertyValue: 'Property Value',
    egp: 'EGP',
    acceptTerms: 'I accept the terms and conditions and authorize the selected bank to process my application',

    // Results
    calculationComplete: 'Calculation Complete',
    inheritanceDistribution: 'Inheritance Distribution',
    legalBasis: 'Legal Basis',
    share: 'Share',
    startNewCalculation: 'Start New Calculation',
    estateValue: 'Total Estate Value (EGP)',

    // About Page
    aboutZeroError: "Zero margin for error. Our algorithms mirror the exact rulings of Egyptian Law.",
    aboutEmpathyDesc: "We understand that behind every asset is a grieving family. We prioritize peace over profit.",
    aboutIntegrityDesc: "We offer ethical, asset-backed financing (Murabaha). No hidden fees, no interest (Riba).",
    precision: "Precision",
    empathy: "Empathy",
    integrity: "Integrity",
    impact1Label: "Frozen Units in Egypt",
    impact2Label: "Average Court Dispute Time",
    impact3Label: "Merath Liquidation Speed",
    impact1Value: "12 Million",
    impact2Value: "7 Years",
    impact3Value: "7 Days",
    teamTitle: "Executive Board",
    teamSubtitle: "Guided by principles of excellence and ethical stewardship.",
    founderName: "Mohammed Waleed",
    founderRole: "Founder",
    cloRole: "Chief Legal Officer",
    ctoRole: "CTO",
    opsRole: "Head of Operations",
    joinMission: "Join Our Mission",
    missionSubtitle: "Be part of the movement to restore financial rights and family harmony in Egypt.",
    contactUs: "Contact Us",
    aboutHeroTitle: "Restoring Bonds.",
    aboutHeroSubtitle: "Unlocking Wealth.",
    aboutHeroDesc: "Merath is the operating system for Egyptian inheritance, bridging the gap between Sharia law and modern liquidity.",

    // Footer
    footerCopyright: '© 2025 Mawareth. Simplifying inheritance in Egypt.',

    // Merath Docs
    docsTitle: "Merath Docs",
    docsSubtitle: "Instantly generate standardized, Sharia-compliant legal drafts.",
    partitionAgreement: "Partition Agreement (Aqd Qisma)",
    poaDraft: "Power of Attorney Draft",
    inheritanceDecl: "Inheritance Declaration",
    partitionDesc: "Standard contract for the agreed division of assets.",
    poaDesc: "Precise text for authorizing a lawyer at the Notary Public.",
    declDesc: "Structured list of heirs and shares for court filing.",
    generateNow: "Generate Draft",
    draftDisclaimer: "I understand this is a standard draft (Muswada) and not a substitute for legal counsel.",
    previewWatermark: "DRAFT",
    payUnlock: "Pay to Unlock (200 EGP)",
    downloadPdf: "Download PDF",
    formHeirInfo: "Heir Information",
    formAssetInfo: "Asset Details",
    formDivision: "Division Logic",
    deceasedName: "Deceased Name",
    deathDate: "Date of Death",
    governorate: "Governorate",
    previewTitle: "Document Preview",
  },
  ar: {
    // التنقل
    home: 'الرئيسية',
    calculator: 'الحاسبة',
    about: 'من نحن',
    contact: 'اتصل بنا',
    faq: 'الأسئلة الشائعة',
    pricing: 'الأسعار',
    blog: 'المدونة',
    getStarted: 'ابدأ الآن',
    backToHome: 'العودة للرئيسية',

    // قسم البطل
    heroTitle: 'حوّل الميراث إلى سيولة فورية',
    heroSubtitle: 'أول منصة في مصر لرقمنة حسابات المواريث الشرعية',
    heroDescription: 'وتوفير حلول السيولة العقارية الفورية للعائلات',
    calculateYourShare: 'احسب نصيبك',
    learnMore: 'اعرف المزيد',

    // الخطوات
    threeSteps: 'ثلاث خطوات بسيطة',
    step1Title: 'أدخل تفاصيل التركة',
    step1Desc: 'أدخل معلومات عن المتوفى والورثة وأصول التركة',
    step2Title: 'احسب الأنصبة',
    step2Desc: 'نظامنا يحسب الأنصبة الدقيقة وفقاً للشريعة الإسلامية',
    step3Title: 'احصل على السيولة',
    step3Desc: 'تواصل مع شركاء البنوك للحصول على حلول السيولة الفورية',

    // الدعوة للعمل
    ctaTitle: 'هل أنت مستعد لحل مسألة الميراث؟',
    ctaSubtitle: 'انضم إلى العائلات في مصر التي تفتح ميراثها مع موارث',
    startCalculation: 'ابدأ حسابك الآن',

    // الحاسبة
    estateCalculator: 'حاسبة المواريث',
    calculatorSubtitle: 'احسب أنصبة المواريث وفقاً للشريعة الإسلامية',
    totalEstateValue: 'إجمالي قيمة التركة (جنيه مصري)',
    heirsAndBeneficiaries: 'الورثة والمستفيدون',
    addHeir: 'إضافة وارث',
    calculateInheritance: 'احسب أنصبة الميراث',
    newCalculation: 'حساب جديد',
    downloadPDF: 'تحميل تقرير PDF',

    // أنواع الورثة
    spouse: 'الزوج/الزوجة',
    son: 'الابن',
    daughter: 'البنت',
    father: 'الأب',
    mother: 'الأم',
    brother: 'الأخ',
    sister: 'الأخت',
    grandfather: 'الجد',
    grandmother: 'الجدة',
    stepmother: 'زوجة الأب',
    stepbrotherPaternal: 'الأخ من الأب',
    stepsisterPaternal: 'الأخت من الأب',
    stepbrotherMaternal: 'الأخ من الأم',
    stepsisterMaternal: 'الأخت من الأم',

    // تسميات النموذج
    name: 'الاسم',
    relationship: 'القرابة',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    selectRelationship: 'اختر القرابة',
    selectGender: 'اختر الجنس',

    // شرح الشريعة
    shariaExplainerTitle: 'فهم قانون الميراث الإسلامي',
    fixedSharesTitle: 'الفروض (أصحاب الفروض)',
    fixedSharesDesc: 'بعض الورثة يحصلون على أنصبة محددة من القرآن والسنة',
    fixedSharesEx1: 'الزوج/الزوجة: الربع أو النصف حسب وجود الأولاد',
    fixedSharesEx2: 'الأم: السدس أو الثلث حسب الورثة الآخرين',
    fixedSharesEx3: 'البنات: النصف (واحدة) أو الثلثان (متعددات)',
    residualSharesTitle: 'العصبة (الورثة بالتعصيب)',
    residualSharesDesc: 'بعد توزيع الفروض، الباقي يذهب للعصبة',
    residualSharesEx1: 'الأبناء يرثون الباقي بعد الفروض',
    residualSharesEx2: 'الأب يصبح عصبة عند عدم وجود أبناء',
    residualSharesEx3: 'الإخوة يرثون بالتعصيب في غياب الأبناء والأب',
    blockingTitle: 'الحجب',
    blockingDesc: 'الأقارب الأقرب يمكن أن يحجبوا الأبعد من الميراث',
    blockingEx1: 'الأبناء يحجبون الإخوة من الميراث',
    blockingEx2: 'الأب يحجب الجد للأب',
    blockingEx3: 'الإخوة الأشقاء يحجبون الإخوة لأب',
    stepRelativesTitle: 'الأقارب غير الشرعيين في الميراث الإسلامي',
    stepRelativesDesc: 'الشريعة الإسلامية لها أحكام خاصة للأقارب غير الشرعيين',
    stepmotherDesc: 'لا ترث وفقاً للشريعة الإسلامية',
    stepPaternalDesc: 'يرثون مثل الإخوة الأشقاء لكن يحجبون بهم',
    stepMaternalDesc: 'يحصلون على فروض محددة: السدس (واحد) أو الثلث (متعددون)',
    quranRef: 'المرجع القرآني',
    quran411: 'سورة النساء 11 - أنصبة الأبناء والوالدين',
    quran412: 'سورة النساء 12 - أنصبة الزوج والإخوة',

    // طلب القرض
    loanApplicationTitle: 'طلب قرض السيولة العقارية',
    loanApplicationSubtitle: 'تواصل مع شركاء البنوك لتحويل ميراثك إلى سيولة فورية',
    loanStep1: 'البيانات الشخصية',
    loanStep2: 'تفاصيل العقار',
    loanStep3: 'بيانات الورثة',
    loanStep4: 'طلب التمويل',
    loanStep5: 'اختيار البنك',
    previous: 'السابق',
    next: 'التالي',
    submitApplication: 'تقديم الطلب',

    // البيانات الشخصية
    personalInfoTitle: 'البيانات الشخصية',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    nationalId: 'الرقم القومي',
    nationalIdPlaceholder: 'رقم الهوية من 14 رقم',
    phone: 'رقم الهاتف',
    phonePlaceholder: '+20 1XX XXX XXXX',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'your.email@example.com',
    address: 'العنوان الحالي',
    addressPlaceholder: 'عنوانك الكامل',
    employmentStatus: 'الحالة الوظيفية',
    selectEmployment: 'اختر الحالة الوظيفية',
    employed: 'موظف',
    selfEmployed: 'عمل حر',
    unemployed: 'غير موظف',
    retired: 'متقاعد',
    monthlyIncome: 'الدخل الشهري (جنيه مصري)',
    monthlyIncomePlaceholder: 'مثال: 15000',

    // تفاصيل العقار
    estateDetailsTitle: 'تفاصيل العقار',
    propertyType: 'نوع العقار',
    selectPropertyType: 'اختر نوع العقار',
    apartment: 'شقة',
    villa: 'فيلا',
    land: 'أرض',
    commercial: 'عقار تجاري',
    estimatedValue: 'القيمة التقديرية (جنيه مصري)',
    estimatedValuePlaceholder: 'مثال: 2000000',
    propertyAddress: 'عنوان العقار',
    propertyAddressPlaceholder: 'العنوان الكامل للعقار',
    hasOwnershipDocuments: 'لدي مستندات الملكية متاحة',

    // بيانات الورثة
    heirInfoTitle: 'بيانات الورثة',
    numberOfHeirs: 'عدد الورثة المشاركين',
    numberOfHeirsPlaceholder: 'مثال: 3',
    heirRelationships: 'علاقات الورثة',
    heirRelationshipsPlaceholder: 'صف العلاقات (مثال: أخوان وأخت)',
    agreementStatus: 'حالة الاتفاق',
    selectAgreementStatus: 'اختر الحالة',
    allAgree: 'جميع الورثة متفقون على التوزيع',
    someDisputes: 'بعض الخلافات البسيطة',
    majorDisputes: 'خلافات كبيرة تتطلب الوساطة',

    // طلب التمويل
    financingRequestTitle: 'طلب التمويل',
    loanAmount: 'مبلغ القرض المطلوب (جنيه مصري)',
    loanAmountPlaceholder: 'مثال: 1000000',
    loanPurpose: 'الغرض من القرض',
    selectPurpose: 'اختر الغرض',
    buyoutHeirs: 'شراء حصص الورثة الآخرين',
    liquidity: 'سيولة فورية',
    investment: 'استثمار',
    other: 'أخرى',
    repaymentPeriod: 'فترة السداد المفضلة',
    selectRepaymentPeriod: 'اختر الفترة',
    years: 'سنوات',
    existingDebts: 'الديون الحالية (جنيه مصري)',
    existingDebtsPlaceholder: 'إجمالي الديون الحالية',

    // اختيار البنك
    bankSelectionTitle: 'اختر البنك الشريك',
    selectBankDescription: 'اختر البنك المفضل للتمويل',
    interestRate: 'معدل الفائدة',
    applicationSummary: 'ملخص الطلب',
    propertyValue: 'قيمة العقار',
    egp: 'جنيه مصري',
    acceptTerms: 'أوافق على الشروط والأحكام وأفوض البنك المختار بمعالجة طلبي',

    // النتائج
    calculationComplete: 'اكتمل الحساب',
    inheritanceDistribution: 'توزيع الميراث',
    legalBasis: 'الأساس الشرعي',
    share: 'الحصة',
    startNewCalculation: 'بدء حساب جديد',
    estateValue: 'إجمالي قيمة التركة (جنيه مصري)',

    // صفحة من نحن
    aboutZeroError: "لا مجال للخطأ. تعكس خوارزمياتنا الأحكام الدقيقة للقانون المصري.",
    aboutEmpathyDesc: "نحن نتفهم أن وراء كل أصل عائلة حزينة. نحن نعطي الأولوية للسلام على الربح.",
    aboutIntegrityDesc: "نقدم تمويلاً أخلاقياً مدعوماً بالأصول (المرابحة). لا رسوم خفية، لا فوائد (ربا).",
    precision: "الدقة",
    empathy: "التعاطف",
    integrity: "النزاهة",
    impact1Label: "وحدة عقارية مجمدة في مصر",
    impact2Label: "متوسط وقت النزاع في المحاكم",
    impact3Label: "سرعة تسييل موارث",
    impact1Value: "12 مليون",
    impact2Value: "7 سنوات",
    impact3Value: "7 أيام",
    teamTitle: "المجلس التنفيذي",
    teamSubtitle: "نسترشد بمبادئ التميز والإدارة الأخلاقية.",
    founderName: "محمد وليد",
    founderRole: "المؤسس",
    cloRole: "رئيس الشؤون القانونية",
    ctoRole: "الرئيس التقني",
    opsRole: "رئيس العمليات",
    joinMission: "انضم إلى مهمتنا",
    missionSubtitle: "كن جزءاً من الحركة لاستعادة الحقوق المالية والوئام العائلي في مصر.",
    contactUs: "اتصل بنا",
    aboutHeroTitle: "استعادة الروابط.",
    aboutHeroSubtitle: "إطلاق الثروات.",
    aboutHeroDesc: "موارث هي نظام التشغيل للمواريث المصرية، تسد الفجوة بين الشريعة والسيولة الحديثة.",

    // التذييل
    footerCopyright: '© 2025 موارث. تبسيط الميراث في مصر',

    // موارث دوكس
    docsTitle: "موارث دوكس",
    docsSubtitle: "استخرج مسودات قانونية موحدة ومتوافقة مع الشريعة فوراً.",
    partitionAgreement: "عقد قسمة رضائية",
    poaDraft: "صيغة توكيل رسمي",
    inheritanceDecl: "إعلام وراثة",
    partitionDesc: "عقد قياسي لتقسيم التركة بالتراضي.",
    poaDesc: "صيغة دقيقة لتوكيل محام في الشهر العقاري.",
    declDesc: "قائمة منظمة بالورثة والأنصبة لتقديمها للمحكمة.",
    generateNow: "إنشاء المسودة",
    draftDisclaimer: "أقر بأن هذه مسودة أولية وليست بديلاً عن الاستشارة القانونية.",
    previewWatermark: "مسودة",
    payUnlock: "ادفع لفتح الملف (200 ج.م)",
    downloadPdf: "تحميل PDF",
    formHeirInfo: "بيانات الورثة",
    formAssetInfo: "تفاصيل الأصول",
    formDivision: "منطق القسمة",
    deceasedName: "اسم المتوفى",
    deathDate: "تاريخ الوفاة",
    governorate: "المحافظة",
    previewTitle: "معاينة المستند",
  },
};

// Get translation
export function t(key: string, lang: Language = 'en'): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

// Language context helpers (use with React Context in your MERN integration)
export function getLanguageDirection(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function getLanguageFont(lang: Language): string {
  return lang === 'ar' ? 'Cairo, sans-serif' : 'system-ui, sans-serif';
}
