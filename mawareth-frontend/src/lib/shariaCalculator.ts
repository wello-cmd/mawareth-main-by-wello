// Sharia Inheritance Calculator Engine - "Merath Engine"
// Based on Islamic inheritance law (Faraid) with Al-Hajb, Al-Awl, and Al-Radd

export interface Heir {
  id: string;
  name: string;
  relationship: HeirRelationship;
  gender: 'male' | 'female';
  count?: number;
}

export type HeirRelationship = 
  | 'husband' | 'wife'
  | 'son' | 'daughter'
  | 'father' | 'mother'
  | 'grandfather_paternal' | 'grandmother_maternal' | 'grandmother_paternal'
  | 'brother_full' | 'sister_full'
  | 'brother_paternal' | 'sister_paternal'
  | 'brother_maternal' | 'sister_maternal'
  | 'sons_son' | 'sons_daughter'
  | 'uncle_paternal' | 'cousin_paternal';

export interface HeirConfig {
  value: HeirRelationship;
  labelEn: string;
  labelAr: string;
  gender: 'male' | 'female';
  category: 'primary' | 'secondary';
  blockedBy?: HeirRelationship[];
}

// Relationship configurations with auto-gender assignment
export const HEIR_CONFIGS: HeirConfig[] = [
  // Primary Heirs - Spouses
  { value: 'husband', labelEn: 'Husband', labelAr: 'زوج', gender: 'male', category: 'primary' },
  { value: 'wife', labelEn: 'Wife', labelAr: 'زوجة', gender: 'female', category: 'primary' },
  
  // Primary Heirs - Children
  { value: 'son', labelEn: 'Son', labelAr: 'ابن', gender: 'male', category: 'primary' },
  { value: 'daughter', labelEn: 'Daughter', labelAr: 'ابنة', gender: 'female', category: 'primary' },
  
  // Primary Heirs - Parents
  { value: 'father', labelEn: 'Father', labelAr: 'أب', gender: 'male', category: 'primary' },
  { value: 'mother', labelEn: 'Mother', labelAr: 'أم', gender: 'female', category: 'primary' },
  
  // Secondary Heirs - Grandparents
  { 
    value: 'grandfather_paternal', labelEn: 'Paternal Grandfather', labelAr: 'الجد (أب الأب)', 
    gender: 'male', category: 'secondary', blockedBy: ['father'] 
  },
  { 
    value: 'grandmother_paternal', labelEn: 'Paternal Grandmother', labelAr: 'الجدة (أم الأب)', 
    gender: 'female', category: 'secondary', blockedBy: ['mother'] 
  },
  { 
    value: 'grandmother_maternal', labelEn: 'Maternal Grandmother', labelAr: 'الجدة (أم الأم)', 
    gender: 'female', category: 'secondary', blockedBy: ['mother'] 
  },
  
  // Secondary Heirs - Full Siblings
  { 
    value: 'brother_full', labelEn: 'Full Brother', labelAr: 'أخ شقيق', 
    gender: 'male', category: 'secondary', blockedBy: ['son', 'sons_son', 'father', 'grandfather_paternal'] 
  },
  { 
    value: 'sister_full', labelEn: 'Full Sister', labelAr: 'أخت شقيقة', 
    gender: 'female', category: 'secondary', blockedBy: ['son', 'sons_son', 'father', 'grandfather_paternal'] 
  },
  
  // Secondary Heirs - Paternal Siblings
  { 
    value: 'brother_paternal', labelEn: 'Paternal Half-Brother', labelAr: 'أخ لأب', 
    gender: 'male', category: 'secondary', blockedBy: ['son', 'sons_son', 'father', 'grandfather_paternal', 'brother_full'] 
  },
  { 
    value: 'sister_paternal', labelEn: 'Paternal Half-Sister', labelAr: 'أخت لأب', 
    gender: 'female', category: 'secondary', blockedBy: ['son', 'sons_son', 'father', 'grandfather_paternal', 'brother_full'] 
  },
  
  // Secondary Heirs - Maternal Siblings
  { 
    value: 'brother_maternal', labelEn: 'Maternal Half-Brother', labelAr: 'أخ لأم', 
    gender: 'male', category: 'secondary', blockedBy: ['son', 'daughter', 'sons_son', 'sons_daughter', 'father', 'grandfather_paternal'] 
  },
  { 
    value: 'sister_maternal', labelEn: 'Maternal Half-Sister', labelAr: 'أخت لأم', 
    gender: 'female', category: 'secondary', blockedBy: ['son', 'daughter', 'sons_son', 'sons_daughter', 'father', 'grandfather_paternal'] 
  },
  
  // Secondary Heirs - Son's Children
  { 
    value: 'sons_son', labelEn: "Son's Son", labelAr: 'ابن الابن', 
    gender: 'male', category: 'secondary', blockedBy: ['son'] 
  },
  { 
    value: 'sons_daughter', labelEn: "Son's Daughter", labelAr: 'بنت الابن', 
    gender: 'female', category: 'secondary', blockedBy: ['son'] 
  },
];

export interface Explanation {
  heir: string;
  relationship: string;
  shareFraction: string;
  sharePercentage: number;
  amount: number;
  reason: string;
  reasonAr: string;
  isBlocked: boolean;
  blockedBy?: string;
}

export interface CalculationResult {
  heirId: string;
  name: string;
  relationship: HeirRelationship;
  share: number;
  percentage: number;
  amount: number;
  basis: string;
  basisAr: string;
  isBlocked: boolean;
  blockedBy?: HeirRelationship;
}

export interface EstateCalculation {
  totalEstate: number;
  heirs: Heir[];
  results: CalculationResult[];
  explanations: Explanation[];
  remainingEstate: number;
  calculationDate: string;
  hasAwl: boolean;
  hasRadd: boolean;
  awlRatio?: number;
}

// Fixed shares (Fard) according to Sharia law
const FIXED_SHARES = {
  husband_with_children: 1/4,
  husband_no_children: 1/2,
  wife_with_children: 1/8,
  wife_no_children: 1/4,
  
  mother_with_children: 1/6,
  mother_with_siblings: 1/6,
  mother_no_children_no_siblings: 1/3,
  
  father_with_male_children: 1/6,
  father_with_female_children_only: 1/6, // + residual
  
  grandmother: 1/6,
  grandfather_with_children: 1/6,
  
  daughter_single: 1/2,
  daughter_multiple: 2/3,
  
  sons_daughter_single_no_daughter: 1/2,
  sons_daughter_with_one_daughter: 1/6,
  sons_daughters_multiple_no_daughter: 2/3,
  
  sister_full_single: 1/2,
  sister_full_multiple: 2/3,
  
  sister_paternal_single: 1/2,
  sister_paternal_with_one_full_sister: 1/6,
  sister_paternal_multiple: 2/3,
  
  maternal_sibling_single: 1/6,
  maternal_siblings_multiple: 1/3,
};

// Helper to format fractions
function toFraction(decimal: number): string {
  const fractions: Record<string, string> = {
    '0.500': '1/2', '0.333': '1/3', '0.667': '2/3',
    '0.250': '1/4', '0.750': '3/4', '0.167': '1/6',
    '0.833': '5/6', '0.125': '1/8', '0.875': '7/8',
  };
  const rounded = decimal.toFixed(3);
  return fractions[rounded] || `${(decimal * 100).toFixed(1)}%`;
}

// Check if a heir is blocked by another
function isBlocked(relationship: HeirRelationship, existingHeirs: HeirRelationship[]): { blocked: boolean; by?: HeirRelationship } {
  const config = HEIR_CONFIGS.find(c => c.value === relationship);
  if (!config?.blockedBy) return { blocked: false };
  
  for (const blocker of config.blockedBy) {
    if (existingHeirs.includes(blocker)) {
      return { blocked: true, by: blocker };
    }
  }
  return { blocked: false };
}

export function calculateInheritance(estateValue: number, heirs: Heir[]): EstateCalculation {
  const results: CalculationResult[] = [];
  const explanations: Explanation[] = [];
  const heirRelationships = heirs.map(h => h.relationship);
  
  // Count heirs by type
  const counts = {
    husband: heirs.filter(h => h.relationship === 'husband').length,
    wife: heirs.filter(h => h.relationship === 'wife').length,
    son: heirs.filter(h => h.relationship === 'son').length,
    daughter: heirs.filter(h => h.relationship === 'daughter').length,
    father: heirs.filter(h => h.relationship === 'father').length,
    mother: heirs.filter(h => h.relationship === 'mother').length,
    grandfather_paternal: heirs.filter(h => h.relationship === 'grandfather_paternal').length,
    grandmother_paternal: heirs.filter(h => h.relationship === 'grandmother_paternal').length,
    grandmother_maternal: heirs.filter(h => h.relationship === 'grandmother_maternal').length,
    brother_full: heirs.filter(h => h.relationship === 'brother_full').length,
    sister_full: heirs.filter(h => h.relationship === 'sister_full').length,
    brother_paternal: heirs.filter(h => h.relationship === 'brother_paternal').length,
    sister_paternal: heirs.filter(h => h.relationship === 'sister_paternal').length,
    brother_maternal: heirs.filter(h => h.relationship === 'brother_maternal').length,
    sister_maternal: heirs.filter(h => h.relationship === 'sister_maternal').length,
    sons_son: heirs.filter(h => h.relationship === 'sons_son').length,
    sons_daughter: heirs.filter(h => h.relationship === 'sons_daughter').length,
  };
  
  const hasChildren = counts.son > 0 || counts.daughter > 0;
  const hasMaleChildren = counts.son > 0;
  const hasBranchProgeny = hasChildren || counts.sons_son > 0 || counts.sons_daughter > 0;
  const hasMaleBranchProgeny = counts.son > 0 || counts.sons_son > 0;
  const hasSiblings = counts.brother_full + counts.sister_full + counts.brother_paternal + 
                      counts.sister_paternal + counts.brother_maternal + counts.sister_maternal > 1;
  
  // Track fixed share allocations
  let fixedSharesSum = 0;
  const fixedShareHeirs: { heir: Heir; share: number; basis: string; basisAr: string }[] = [];
  const residuaryHeirs: Heir[] = [];
  
  // Process each heir
  for (const heir of heirs) {
    const blockStatus = isBlocked(heir.relationship, heirRelationships);
    
    if (blockStatus.blocked) {
      // Heir is blocked
      const blockerConfig = HEIR_CONFIGS.find(c => c.value === blockStatus.by);
      results.push({
        heirId: heir.id,
        name: heir.name,
        relationship: heir.relationship,
        share: 0,
        percentage: 0,
        amount: 0,
        basis: `Blocked by ${blockerConfig?.labelEn || blockStatus.by}`,
        basisAr: `محجوب بواسطة ${blockerConfig?.labelAr || blockStatus.by}`,
        isBlocked: true,
        blockedBy: blockStatus.by,
      });
      
      explanations.push({
        heir: heir.name,
        relationship: heir.relationship,
        shareFraction: '0',
        sharePercentage: 0,
        amount: 0,
        reason: `Blocked by ${blockerConfig?.labelEn}. In Islamic law, certain heirs exclude others from inheritance.`,
        reasonAr: `محجوب بواسطة ${blockerConfig?.labelAr}. في الشريعة الإسلامية، بعض الورثة يحجبون غيرهم من الميراث.`,
        isBlocked: true,
        blockedBy: blockerConfig?.labelEn,
      });
      continue;
    }
    
    let share = 0;
    let basis = '';
    let basisAr = '';
    let isResiduary = false;
    
    switch (heir.relationship) {
      // SPOUSES
      case 'husband':
        share = hasBranchProgeny ? FIXED_SHARES.husband_with_children : FIXED_SHARES.husband_no_children;
        basis = hasBranchProgeny 
          ? 'Husband receives 1/4 with children (Quran 4:12)' 
          : 'Husband receives 1/2 without children (Quran 4:12)';
        basisAr = hasBranchProgeny 
          ? 'الزوج يرث 1/4 مع وجود الفرع الوارث (سورة النساء 12)' 
          : 'الزوج يرث 1/2 بدون فرع وارث (سورة النساء 12)';
        break;
        
      case 'wife':
        share = hasBranchProgeny ? FIXED_SHARES.wife_with_children : FIXED_SHARES.wife_no_children;
        basis = hasBranchProgeny 
          ? 'Wife receives 1/8 with children (Quran 4:12)' 
          : 'Wife receives 1/4 without children (Quran 4:12)';
        basisAr = hasBranchProgeny 
          ? 'الزوجة ترث 1/8 مع وجود الفرع الوارث (سورة النساء 12)' 
          : 'الزوجة ترث 1/4 بدون فرع وارث (سورة النساء 12)';
        break;
        
      // PARENTS
      case 'mother':
        if (hasBranchProgeny) {
          share = FIXED_SHARES.mother_with_children;
          basis = 'Mother receives 1/6 with children (Quran 4:11)';
          basisAr = 'الأم ترث 1/6 مع وجود الفرع الوارث (سورة النساء 11)';
        } else if (hasSiblings) {
          share = FIXED_SHARES.mother_with_siblings;
          basis = 'Mother receives 1/6 with multiple siblings (Quran 4:11)';
          basisAr = 'الأم ترث 1/6 مع وجود جمع من الإخوة (سورة النساء 11)';
        } else {
          share = FIXED_SHARES.mother_no_children_no_siblings;
          basis = 'Mother receives 1/3 without children or siblings (Quran 4:11)';
          basisAr = 'الأم ترث 1/3 بدون فرع وارث أو إخوة (سورة النساء 11)';
        }
        break;
        
      case 'father':
        if (hasMaleBranchProgeny) {
          share = FIXED_SHARES.father_with_male_children;
          basis = 'Father receives 1/6 with male progeny (Quran 4:11)';
          basisAr = 'الأب يرث 1/6 مع وجود الفرع الوارث الذكر (سورة النساء 11)';
        } else if (hasBranchProgeny) {
          share = FIXED_SHARES.father_with_female_children_only;
          basis = 'Father receives 1/6 + residual with female progeny only (Quran 4:11)';
          basisAr = 'الأب يرث 1/6 + الباقي مع وجود الفرع الوارث الأنثى فقط (سورة النساء 11)';
          isResiduary = true;
        } else {
          isResiduary = true;
          basis = 'Father receives residual as sole male ascendant (Asaba)';
          basisAr = 'الأب يرث الباقي تعصيباً';
        }
        break;
        
      // GRANDPARENTS
      case 'grandfather_paternal':
        if (hasMaleBranchProgeny) {
          share = FIXED_SHARES.grandfather_with_children;
          basis = 'Paternal grandfather receives 1/6 with male progeny';
          basisAr = 'الجد يرث 1/6 مع وجود الفرع الوارث الذكر';
        } else if (hasBranchProgeny) {
          share = FIXED_SHARES.grandfather_with_children;
          isResiduary = true;
          basis = 'Paternal grandfather receives 1/6 + residual with female progeny';
          basisAr = 'الجد يرث 1/6 + الباقي مع وجود الفرع الوارث الأنثى';
        } else {
          isResiduary = true;
          basis = 'Paternal grandfather receives residual (Asaba)';
          basisAr = 'الجد يرث الباقي تعصيباً';
        }
        break;
        
      case 'grandmother_maternal':
      case 'grandmother_paternal':
        share = FIXED_SHARES.grandmother;
        basis = 'Grandmother receives 1/6';
        basisAr = 'الجدة ترث 1/6';
        break;
        
      // CHILDREN
      case 'son':
        isResiduary = true;
        basis = 'Son receives residual share (Asaba)';
        basisAr = 'الابن يرث تعصيباً';
        break;
        
      case 'daughter':
        if (counts.son > 0) {
          isResiduary = true;
          basis = 'Daughter receives residual with son (Asaba bi-ghayrihi)';
          basisAr = 'البنت ترث تعصيباً مع الابن';
        } else if (counts.daughter === 1) {
          share = FIXED_SHARES.daughter_single;
          basis = 'Single daughter receives 1/2 (Quran 4:11)';
          basisAr = 'البنت الواحدة ترث 1/2 (سورة النساء 11)';
        } else {
          share = FIXED_SHARES.daughter_multiple / counts.daughter;
          basis = 'Daughters share 2/3 equally (Quran 4:11)';
          basisAr = 'البنات يرثن 2/3 بالتساوي (سورة النساء 11)';
        }
        break;
        
      // SON'S CHILDREN
      case 'sons_son':
        isResiduary = true;
        basis = "Son's son receives residual (Asaba)";
        basisAr = 'ابن الابن يرث تعصيباً';
        break;
        
      case 'sons_daughter':
        if (counts.sons_son > 0) {
          isResiduary = true;
          basis = "Son's daughter receives residual with son's son (Asaba bi-ghayrihi)";
          basisAr = 'بنت الابن ترث تعصيباً مع ابن الابن';
        } else if (counts.daughter === 0) {
          if (counts.sons_daughter === 1) {
            share = FIXED_SHARES.sons_daughter_single_no_daughter;
            basis = "Single son's daughter receives 1/2";
            basisAr = 'بنت الابن الواحدة ترث 1/2';
          } else {
            share = FIXED_SHARES.sons_daughters_multiple_no_daughter / counts.sons_daughter;
            basis = "Son's daughters share 2/3";
            basisAr = 'بنات الابن يرثن 2/3';
          }
        } else if (counts.daughter === 1) {
          share = FIXED_SHARES.sons_daughter_with_one_daughter;
          basis = "Son's daughter receives 1/6 to complete 2/3 with one daughter";
          basisAr = 'بنت الابن ترث 1/6 تكملة الثلثين مع بنت واحدة';
        } else {
          share = 0;
          basis = "Son's daughter blocked by two or more daughters";
          basisAr = 'بنت الابن محجوبة بوجود بنتين فأكثر';
        }
        break;
        
      // FULL SIBLINGS
      case 'brother_full':
        isResiduary = true;
        basis = 'Full brother receives residual (Asaba)';
        basisAr = 'الأخ الشقيق يرث تعصيباً';
        break;
        
      case 'sister_full':
        if (counts.brother_full > 0) {
          isResiduary = true;
          basis = 'Full sister receives residual with full brother (Asaba bi-ghayrihi)';
          basisAr = 'الأخت الشقيقة ترث تعصيباً مع الأخ الشقيق';
        } else if (counts.daughter > 0 || counts.sons_daughter > 0) {
          isResiduary = true;
          basis = 'Full sister receives residual with female progeny (Asaba ma-ghayrihi)';
          basisAr = 'الأخت الشقيقة ترث تعصيباً مع البنات';
        } else if (counts.sister_full === 1) {
          share = FIXED_SHARES.sister_full_single;
          basis = 'Single full sister receives 1/2 (Quran 4:176)';
          basisAr = 'الأخت الشقيقة الواحدة ترث 1/2 (سورة النساء 176)';
        } else {
          share = FIXED_SHARES.sister_full_multiple / counts.sister_full;
          basis = 'Full sisters share 2/3 (Quran 4:176)';
          basisAr = 'الأخوات الشقيقات يرثن 2/3 (سورة النساء 176)';
        }
        break;
        
      // PATERNAL SIBLINGS
      case 'brother_paternal':
        isResiduary = true;
        basis = 'Paternal half-brother receives residual (Asaba)';
        basisAr = 'الأخ لأب يرث تعصيباً';
        break;
        
      case 'sister_paternal':
        if (counts.brother_paternal > 0) {
          isResiduary = true;
          basis = 'Paternal half-sister receives residual with paternal brother (Asaba bi-ghayrihi)';
          basisAr = 'الأخت لأب ترث تعصيباً مع الأخ لأب';
        } else if (counts.sister_full === 1 && counts.brother_full === 0) {
          share = FIXED_SHARES.sister_paternal_with_one_full_sister;
          basis = 'Paternal half-sister receives 1/6 to complete 2/3 with one full sister';
          basisAr = 'الأخت لأب ترث 1/6 تكملة الثلثين مع أخت شقيقة واحدة';
        } else if (counts.sister_full >= 2 || counts.brother_full > 0) {
          share = 0;
          basis = 'Paternal half-sister blocked by two or more full sisters';
          basisAr = 'الأخت لأب محجوبة بوجود أختين شقيقتين فأكثر';
        } else if (counts.sister_paternal === 1) {
          share = FIXED_SHARES.sister_paternal_single;
          basis = 'Single paternal half-sister receives 1/2';
          basisAr = 'الأخت لأب الواحدة ترث 1/2';
        } else {
          share = FIXED_SHARES.sister_paternal_multiple / counts.sister_paternal;
          basis = 'Paternal half-sisters share 2/3';
          basisAr = 'الأخوات لأب يرثن 2/3';
        }
        break;
        
      // MATERNAL SIBLINGS
      case 'brother_maternal':
      case 'sister_maternal':
        const maternalSiblings = counts.brother_maternal + counts.sister_maternal;
        if (maternalSiblings === 1) {
          share = FIXED_SHARES.maternal_sibling_single;
          basis = 'Maternal sibling receives 1/6 (Quran 4:12)';
          basisAr = 'الأخ/الأخت لأم يرث 1/6 (سورة النساء 12)';
        } else {
          share = FIXED_SHARES.maternal_siblings_multiple / maternalSiblings;
          basis = 'Maternal siblings share 1/3 equally (Quran 4:12)';
          basisAr = 'الإخوة لأم يرثون 1/3 بالتساوي (سورة النساء 12)';
        }
        break;
    }
    
    if (share > 0) {
      fixedSharesSum += share;
      fixedShareHeirs.push({ heir, share, basis, basisAr });
    }
    
    if (isResiduary) {
      residuaryHeirs.push(heir);
    }
  }
  
  // Calculate residual for Asaba heirs
  let residualShare = 1 - fixedSharesSum;
  let hasAwl = false;
  let hasRadd = false;
  let awlRatio = 1;
  
  // Handle Al-Awl (shares exceed 1)
  if (fixedSharesSum > 1 && residuaryHeirs.length === 0) {
    hasAwl = true;
    awlRatio = 1 / fixedSharesSum;
    // Reduce all fixed shares proportionally
    for (const fsh of fixedShareHeirs) {
      fsh.share *= awlRatio;
    }
    residualShare = 0;
  }
  
  // Handle Al-Radd (surplus after fixed shares, no Asaba)
  const spouseHeirs = fixedShareHeirs.filter(f => 
    f.heir.relationship === 'husband' || f.heir.relationship === 'wife'
  );
  const nonSpouseFixedHeirs = fixedShareHeirs.filter(f => 
    f.heir.relationship !== 'husband' && f.heir.relationship !== 'wife'
  );
  
  if (residualShare > 0 && residuaryHeirs.length === 0 && nonSpouseFixedHeirs.length > 0) {
    hasRadd = true;
    // Distribute surplus to non-spouse fixed heirs proportionally
    const nonSpouseTotal = nonSpouseFixedHeirs.reduce((sum, f) => sum + f.share, 0);
    for (const fsh of nonSpouseFixedHeirs) {
      const proportion = fsh.share / nonSpouseTotal;
      fsh.share += residualShare * proportion;
    }
    residualShare = 0;
  }
  
  // Add fixed share heirs to results
  for (const fsh of fixedShareHeirs) {
    results.push({
      heirId: fsh.heir.id,
      name: fsh.heir.name,
      relationship: fsh.heir.relationship,
      share: fsh.share,
      percentage: fsh.share * 100,
      amount: estateValue * fsh.share,
      basis: fsh.basis,
      basisAr: fsh.basisAr,
      isBlocked: false,
    });
    
    explanations.push({
      heir: fsh.heir.name,
      relationship: fsh.heir.relationship,
      shareFraction: toFraction(fsh.share),
      sharePercentage: fsh.share * 100,
      amount: estateValue * fsh.share,
      reason: fsh.basis,
      reasonAr: fsh.basisAr,
      isBlocked: false,
    });
  }
  
  // Distribute residual among Asaba heirs
  if (residuaryHeirs.length > 0 && residualShare > 0) {
    // Male gets twice the share of female (for children and siblings)
    const totalParts = residuaryHeirs.reduce((sum, h) => sum + (h.gender === 'male' ? 2 : 1), 0);
    const sharePerPart = residualShare / totalParts;
    
    for (const heir of residuaryHeirs) {
      const parts = heir.gender === 'male' ? 2 : 1;
      const share = sharePerPart * parts;
      
      // Find the basis for this heir
      const existingResult = results.find(r => r.heirId === heir.id);
      let basis = existingResult?.basis || '';
      let basisAr = existingResult?.basisAr || '';
      
      if (!existingResult) {
        // Pure residuary heir
        if (heir.gender === 'male') {
          basis = `Receives ${toFraction(share)} as residuary heir (Asaba)`;
          basisAr = `يرث ${toFraction(share)} تعصيباً`;
        } else {
          basis = `Receives ${toFraction(share)} as residuary with male heir (Asaba bi-ghayrihi)`;
          basisAr = `ترث ${toFraction(share)} تعصيباً مع الذكر`;
        }
        
        results.push({
          heirId: heir.id,
          name: heir.name,
          relationship: heir.relationship,
          share,
          percentage: share * 100,
          amount: estateValue * share,
          basis,
          basisAr,
          isBlocked: false,
        });
        
        explanations.push({
          heir: heir.name,
          relationship: heir.relationship,
          shareFraction: toFraction(share),
          sharePercentage: share * 100,
          amount: estateValue * share,
          reason: basis,
          reasonAr: basisAr,
          isBlocked: false,
        });
      } else {
        // Fixed + residuary (like father with female children)
        existingResult.share += share;
        existingResult.percentage = existingResult.share * 100;
        existingResult.amount = estateValue * existingResult.share;
        
        // Update explanation
        const expIdx = explanations.findIndex(e => e.heir === heir.name);
        if (expIdx >= 0) {
          explanations[expIdx].shareFraction = toFraction(existingResult.share);
          explanations[expIdx].sharePercentage = existingResult.share * 100;
          explanations[expIdx].amount = estateValue * existingResult.share;
        }
      }
    }
    residualShare = 0;
  }
  
  return {
    totalEstate: estateValue,
    heirs,
    results,
    explanations,
    remainingEstate: estateValue * residualShare,
    calculationDate: new Date().toISOString(),
    hasAwl,
    hasRadd,
    awlRatio: hasAwl ? awlRatio : undefined,
  };
}

// Get gender for a relationship
export function getGenderForRelationship(relationship: HeirRelationship): 'male' | 'female' {
  const config = HEIR_CONFIGS.find(c => c.value === relationship);
  return config?.gender || 'male';
}

// Check if a relationship is blocked given existing heirs
export function getBlockingStatus(relationship: HeirRelationship, existingRelationships: HeirRelationship[]): { blocked: boolean; by?: string } {
  const config = HEIR_CONFIGS.find(c => c.value === relationship);
  if (!config?.blockedBy) return { blocked: false };
  
  for (const blocker of config.blockedBy) {
    if (existingRelationships.includes(blocker)) {
      const blockerConfig = HEIR_CONFIGS.find(c => c.value === blocker);
      return { blocked: true, by: blockerConfig?.labelEn };
    }
  }
  return { blocked: false };
}

// Format currency for Egyptian Pounds
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' EGP';
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

// Format fraction
export function formatFraction(decimal: number): string {
  const fractions: { [key: string]: string } = {
    '0.500': '1/2',
    '0.333': '1/3',
    '0.667': '2/3',
    '0.250': '1/4',
    '0.750': '3/4',
    '0.167': '1/6',
    '0.833': '5/6',
    '0.125': '1/8',
    '0.875': '7/8',
  };
  
  const rounded = decimal.toFixed(3);
  return fractions[rounded] || `${(decimal * 100).toFixed(1)}%`;
}
