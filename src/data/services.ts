export type ServiceCategory = 'all' | 'dental' | 'aesthetic' | 'home';

export interface ServiceVariant {
  labelEn: string;
  labelAr: string;
  bookingValue: string;
}

export interface DentalService {
  id: string;
  index: string;
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  category: ServiceCategory;
  categoryLabelEn: string;
  categoryLabelAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  imageAltEn: string;
  imageAltAr: string;
  variants?: ServiceVariant[];
  suitableCasesLabelEn?: string;
  suitableCasesLabelAr?: string;
  suitableCases?: { en: string; ar: string }[];
  bookingValue: string;
}

export interface AestheticTreatmentItem {
  id: string;
  en: string;
  ar: string;
  bookingValue: string;
}

export interface AestheticSubCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  image: string;
  imageAltEn: string;
  imageAltAr: string;
  bookingValue: string;
  items: AestheticTreatmentItem[];
}

export const DENTAL_SERVICES: DentalService[] = [
  {
    id: 'fillings',
    index: '01',
    titleEn: 'Fillings',
    titleAr: 'الحشوات التجميلية',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Natural tooth-colored composite restorations sculpted with precision to seamlessly match your enamel.',
    descriptionAr:
      'حشوات تجميلية بلون الأسنان الطبيعي تُشكَّل بدقة عالية لتندمج بسلاسة تامة مع مينا الأسنان.',
    image: '/src/assets/images/literal_fillings_1795425212063.jpg',
    imageAltEn: 'Clinical close-up of tooth-colored composite filling being sculpted onto a molar under LED curing light',
    imageAltAr: 'حشوة تجميلية بلون الأسنان يتم تشكيلها وتثبيتها بالضوء الطبي على الضرس',
    bookingValue: 'Fillings — الحشوات التجميلية',
  },
  {
    id: 'pediatric-dentistry',
    index: '02',
    titleEn: 'Pediatric Dentistry',
    titleAr: 'علاج أسنان الأطفال',
    subtitleEn: 'Stainless Steel Crowns for Children',
    subtitleAr: 'تيجان الستانلس ستيل للأطفال',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Gentle, reassuring dental care designed for young smiles, including protective stainless steel crowns for children.',
    descriptionAr:
      'رعاية لطيفة ومطمئنة مصممة لابتسامات الأطفال، تشمل تيجان الستانلس ستيل لحماية أسنانهم.',
    image: '/src/assets/images/pediatric_dentistry_care_1795510774324.jpg',
    imageAltEn: 'Pediatric dentistry treatment showing stainless steel crowns for children',
    imageAltAr: 'علاج أسنان الأطفال وتيجان الستانلس ستيل للأطفال',
    bookingValue: 'Pediatric Dentistry — علاج أسنان الأطفال',
  },
  {
    id: 'root-canal',
    index: '03',
    titleEn: 'Root Canal Treatment',
    titleAr: 'علاج العصب',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Careful endodontic care focused on patient comfort, relieving sensitivity while preserving your natural tooth.',
    descriptionAr:
      'علاج دقيق للجذور يركّز على راحة المريض وتخفيف الألم مع الحفاظ على السن الطبيعي.',
    image: '/src/assets/images/root_canal_treatment_1795510646333.jpg',
    imageAltEn: 'Root canal treatment dental care',
    imageAltAr: 'علاج عصب وجذور الأسنان',
    bookingValue: 'Root Canal Treatment — علاج العصب',
  },
  {
    id: 'tooth-extraction',
    index: '04',
    titleEn: 'Tooth Extraction',
    titleAr: 'خلع الأسنان',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Gentle, controlled tooth removal delivered in a serene setting with calm attention to your comfort.',
    descriptionAr:
      'إجراء خلع آمن ولطيف في أجواء هادئة مع عناية فائقة براحة المريض طوال الزيارة.',
    image: '/src/assets/images/literal_extraction_1795425211441.jpg',
    imageAltEn: 'Clean clinical dental model showing gentle tooth extraction with precision dental forceps',
    imageAltAr: 'نموذج طبي يوضح إجراء خلع السن بلطف باستخدام أداة الخلع الطبية',
    bookingValue: 'Tooth Extraction — خلع الأسنان',
  },
  {
    id: 'fixed-crowns-bridges',
    index: '05',
    titleEn: 'Fixed Crowns & Bridges',
    titleAr: 'التركيبات الثابتة',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Custom-fitted Zircon and E-max fixed restorations crafted for lifelike translucency, harmony, and lasting strength.',
    descriptionAr:
      'تركيبات ثابتة مصممة خصيصاً من الزيركون والإيماكس لشفافية طبيعية وتناغم جمالي وقوة تدوم.',
    image: '/src/assets/images/fixed_crowns_bridges_1795510787517.jpg',
    imageAltEn: 'Fixed dental crowns and bridges crafted in Zircon and E-max',
    imageAltAr: 'التركيبات الثابتة للأسنان من الزيركون والإيماكس',
    variants: [
      {
        labelEn: 'Zircon',
        labelAr: 'زيركون (Zircon)',
        bookingValue: 'Fixed Crowns & Bridges (Zircon) — التركيبات الثابتة زيركون',
      },
      {
        labelEn: 'E-max',
        labelAr: 'إيماكس (E-max)',
        bookingValue: 'Fixed Crowns & Bridges (E-max) — التركيبات الثابتة إيماكس',
      },
    ],
    bookingValue: 'Fixed Crowns & Bridges (Zircon) — التركيبات الثابتة زيركون',
  },
  {
    id: 'scaling-polishing',
    index: '06',
    titleEn: 'Scaling & Polishing',
    titleAr: 'تنظيف وتلميع الأسنان',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Refined professional cleaning and surface polishing to gently remove buildup and refresh your natural luster.',
    descriptionAr:
      'تنظيف احترافي وتلميع لطيف للأسنان لإزالة الرواسب الجيرية واستعادة الإشراقة الطبيعية.',
    image: '/src/assets/images/literal_scaling_1795425212126.jpg',
    imageAltEn: 'Close-up of ultrasonic dental scaler with fine water mist gently cleaning and polishing teeth',
    imageAltAr: 'تنظيف وتلميع الأسنان وإزالة الجير باستخدام جهاز التنظيف بالموجات فوق الصوتية',
    bookingValue: 'Scaling & Polishing — تنظيف وتلميع الأسنان',
  },
  {
    id: 'teeth-whitening',
    index: '07',
    titleEn: 'Teeth Whitening',
    titleAr: 'تبييض الأسنان',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Professional aesthetic brightening tailored to achieve a luminous, natural-looking radiant smile.',
    descriptionAr:
      'تفتيح احترافي للأسنان مصمم بعناية لمنحك ابتسامة مشرقة ومظهراً طبيعياً متوازناً.',
    image: '/src/assets/images/literal_whitening_1795425213689.jpg',
    imageAltEn: 'In-clinic teeth whitening result compared against a bright BL1 dental bleaching shade tab',
    imageAltAr: 'مقارنة درجة تبييض الأسنان بدليل الألوان الطبي داخل العيادة',
    bookingValue: 'Teeth Whitening — تبييض الأسنان',
  },
  {
    id: 'tooth-gems',
    index: '08',
    titleEn: 'Tooth Gems',
    titleAr: 'فص الأسنان',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Delicate, non-invasive crystal accent placement crafted to add a subtle, refined sparkle to your smile.',
    descriptionAr:
      'تركيب فص كريستالي دقيق وآمن دون أي أذى لمينا الأسنان لإضافة لمسة بريق أنيقة لابتسامتك.',
    image: '/src/assets/images/literal_tooth_gems_1795425211260.jpg',
    imageAltEn: 'Macro close-up of a sparkling faceted crystal tooth gem bonded onto a front tooth',
    imageAltAr: 'صورة مقربة لفص أسنان كريستالي لامع مثبت بدقة على السن الأمامي',
    bookingValue: 'Tooth Gems — فص الأسنان',
  },
  {
    id: 'dental-implants',
    index: '09',
    titleEn: 'Dental Implants',
    titleAr: 'زراعة الأسنان',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'State-of-the-art titanium dental implant solutions to replace missing teeth with natural function and aesthetics.',
    descriptionAr:
      'حلول زراعة الأسنان بالتيتانيوم لتعويض الأسنان المفقودة مع استعادة الوظيفة والمظهر الطبيعي.',
    image: '/src/assets/images/dental_implants_1795510720548.jpg',
    imageAltEn: 'Dental implant restoration on pristine model',
    imageAltAr: 'زراعة الأسنان التعويضية',
    bookingValue: 'Dental Implants — زراعة الأسنان',
  },
  {
    id: 'dental-bone-grafting',
    index: '10',
    titleEn: 'Dental Bone Grafting',
    titleAr: 'زراعة عظم الفك',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Precise bone regeneration procedures designed to restore jawbone volume and provide secure support for dental implants.',
    descriptionAr:
      'إجراءات دقيقة لتجديد العظام مصممة لاستعادة حجم عظم الفك وتوفير دعم آمن لزراعة الأسنان.',
    image: '/src/assets/images/dental_bone_grafting_clean_1795522300625.jpg',
    imageAltEn: 'Dental bone grafting instruments, bone graft granules vial, and anatomical jaw model in a serene clinic',
    imageAltAr: 'أدوات زراعة عظم الفك ونموذج طبي لعظم الفك في عيادة أسنان هادئة',
    bookingValue: 'Dental Bone Grafting — زراعة عظم الفك',
  },
  {
    id: 'general-anesthesia',
    index: '11',
    titleEn: 'Dental Treatment Under General Anesthesia',
    titleAr: 'علاج الأسنان تحت تأثير التخدير العام',
    category: 'dental',
    categoryLabelEn: 'Dental Services',
    categoryLabelAr: 'خدمات الأسنان',
    descriptionEn:
      'Providing dental procedures and treatments under general anesthesia for cases that require it, following medical evaluation and coordination with the anesthesia team in an equipped medical facility.',
    descriptionAr:
      'تقديم إجراءات وعلاجات الأسنان تحت تأثير التخدير العام للحالات التي تستدعي ذلك، بعد التقييم الطبي والتنسيق مع فريق التخدير وفي منشأة طبية مجهزة.',
    image: '/src/assets/images/service_extraction_1795174069046.jpg',
    imageAltEn: 'Dental treatment under general anesthesia in an equipped medical facility with a coordinated clinical team',
    imageAltAr: 'علاج الأسنان تحت تأثير التخدير العام بالتنسيق مع الفريق الطبي في منشأة مجهزة',
    suitableCasesLabelEn: 'Suitable Cases:',
    suitableCasesLabelAr: 'الحالات المناسبة:',
    suitableCases: [
      {
        en: 'Uncooperative children.',
        ar: 'الأطفال غير المتعاونين.',
      },
      {
        en: 'Special needs patients.',
        ar: 'المرضى ذوي الاحتياجات الخاصة.',
      },
      {
        en: 'Cases of severe dental anxiety or inability to tolerate treatment.',
        ar: 'حالات الخوف الشديد أو عدم القدرة على تحمل العلاج.',
      },
      {
        en: 'Cases requiring multiple dental procedures.',
        ar: 'الحالات التي تحتاج إلى إجراءات أسنان متعددة.',
      },
    ],
    bookingValue: 'Dental Treatment Under General Anesthesia — علاج الأسنان تحت تأثير التخدير العام',
  },
];

export const AESTHETIC_SUB_CATEGORIES: AestheticSubCategory[] = [
  {
    id: 'botox',
    titleEn: 'Botox Treatments',
    titleAr: 'علاجات البوتوكس',
    image: '/src/assets/images/aesthetic_botox_clean_1795521343680.jpg',
    imageAltEn: 'Clinical non-surgical Botox facial aesthetic treatment performed in a serene medical clinic',
    imageAltAr: 'جلسة علاج البوتوكس التجميلي غير الجراحي للوجه في عيادة طبية هادئة',
    bookingValue: 'Botox Treatments — علاجات البوتوكس',
    items: [
      {
        id: 'forehead-lines',
        en: 'Forehead Lines',
        ar: 'خطوط الجبهة',
        bookingValue: 'Botox: Forehead Lines — خطوط الجبهة',
      },
      {
        id: 'frown-lines',
        en: 'Frown Lines (Glabella)',
        ar: 'خطوط العبوس بين الحاجبين',
        bookingValue: 'Botox: Frown Lines (Glabella) — خطوط العبوس بين الحاجبين',
      },
      {
        id: 'crows-feet',
        en: "Crow's Feet",
        ar: 'تجاعيد حول العين',
        bookingValue: "Botox: Crow's Feet — تجاعيد حول العين",
      },
      {
        id: 'gummy-smile',
        en: 'Gummy Smile Correction',
        ar: 'علاج الابتسامة اللثوية',
        bookingValue: 'Botox: Gummy Smile Correction — علاج الابتسامة اللثوية',
      },
      {
        id: 'masseter-botox',
        en: 'Masseter Botox',
        ar: 'بوتوكس عضلة الفك لعلاج تضخم العضلة والجز على الأسنان',
        bookingValue: 'Botox: Masseter Botox — بوتوكس عضلة الفك',
      },
      {
        id: 'nefertiti-lift',
        en: 'Nefertiti Lift',
        ar: 'تحسين مظهر خط الفك والرقبة',
        bookingValue: 'Botox: Nefertiti Lift — تحسين مظهر خط الفك والرقبة',
      },
      {
        id: 'bunny-lines',
        en: 'Bunny Lines',
        ar: 'خطوط الأنف',
        bookingValue: 'Botox: Bunny Lines — خطوط الأنف',
      },
    ],
  },
  {
    id: 'skin-boosters',
    titleEn: 'Skin Boosters',
    titleAr: 'حقن نضارة البشرة',
    image: '/src/assets/images/aesthetic_skin_boosters_1795521347923.jpg',
    imageAltEn: 'Sterile hyaluronic acid and skin booster glass vials and pre-filled syringes on a travertine medical tray',
    imageAltAr: 'أمبولات الهيالورونيك أسيد وحقن نضارة وترطيب البشرة المعقمة داخل العيادة',
    bookingValue: 'Skin Boosters — حقن نضارة البشرة',
    items: [
      {
        id: 'hyaluronic-acid',
        en: 'Hyaluronic Acid Skin Boosters',
        ar: 'حقن الهيالورونيك أسيد',
        bookingValue: 'Skin Boosters: Hyaluronic Acid — حقن الهيالورونيك أسيد',
      },
      {
        id: 'profhilo',
        en: 'Profhilo',
        ar: 'بروفايلو',
        bookingValue: 'Skin Boosters: Profhilo — بروفايلو',
      },
      {
        id: 'pdrn',
        en: 'PDRN Skin Treatment',
        ar: 'علاج البشرة بالـ PDRN',
        bookingValue: 'Skin Boosters: PDRN Skin Treatment — علاج البشرة بالـ PDRN',
      },
      {
        id: 'skin-hydration',
        en: 'Skin Hydration & Rejuvenation',
        ar: 'ترطيب وتجديد البشرة',
        bookingValue: 'Skin Boosters: Skin Hydration & Rejuvenation — ترطيب وتجديد البشرة',
      },
    ],
  },
  {
    id: 'dermapen',
    titleEn: 'Dermapen',
    titleAr: 'الديرما بن',
    image: '/src/assets/images/aesthetic_dermapen_1795521332854.jpg',
    imageAltEn: 'Precision Dermapen microneedling facial skin rejuvenation session in a modern aesthetic clinic',
    imageAltAr: 'جلسة الديرما بن للوجه وتحسين ملمس ونضارة البشرة داخل العيادة',
    bookingValue: 'Dermapen — الديرما بن',
    items: [
      {
        id: 'microneedling',
        en: 'Microneedling',
        ar: 'الديرما بن للوجه',
        bookingValue: 'Dermapen: Microneedling — الديرما بن للوجه',
      },
      {
        id: 'acne-scars',
        en: 'Acne Scars Treatment',
        ar: 'تحسين مظهر آثار حب الشباب',
        bookingValue: 'Dermapen: Acne Scars Treatment — تحسين مظهر آثار حب الشباب',
      },
      {
        id: 'skin-texture',
        en: 'Skin Texture Improvement',
        ar: 'تحسين ملمس البشرة',
        bookingValue: 'Dermapen: Skin Texture Improvement — تحسين ملمس البشرة',
      },
      {
        id: 'pigmentation',
        en: 'Pigmentation Treatment',
        ar: 'المساعدة في تحسين مظهر التصبغات',
        bookingValue: 'Dermapen: Pigmentation Treatment — المساعدة في تحسين مظهر التصبغات',
      },
    ],
  },
  {
    id: 'mesotherapy',
    titleEn: 'Mesotherapy',
    titleAr: 'الميزوثيرابي',
    image: '/src/assets/images/aesthetic_mesotherapy_1795521584807.jpg',
    imageAltEn: 'Sterile mesotherapy vitamin serum ampoules and micro-syringes arranged on a clinical tray',
    imageAltAr: 'أمبولات الفيتامينات والميزوثيرابي المعقمة للوجه والشعر ومنطقة تحت العين',
    bookingValue: 'Mesotherapy — الميزوثيرابي',
    items: [
      {
        id: 'facial-mesotherapy',
        en: 'Facial Mesotherapy',
        ar: 'ميزوثيرابي الوجه',
        bookingValue: 'Mesotherapy: Facial Mesotherapy — ميزوثيرابي الوجه',
      },
      {
        id: 'hair-mesotherapy',
        en: 'Hair Mesotherapy',
        ar: 'ميزوثيرابي الشعر',
        bookingValue: 'Mesotherapy: Hair Mesotherapy — ميزوثيرابي الشعر',
      },
      {
        id: 'under-eye-mesotherapy',
        en: 'Under-Eye Mesotherapy',
        ar: 'ميزوثيرابي منطقة تحت العين',
        bookingValue: 'Mesotherapy: Under-Eye Mesotherapy — ميزوثيرابي منطقة تحت العين',
      },
    ],
  },
];

export const HOME_VISIT_ITEMS = [
  { en: 'Home visits for elderly patients', ar: 'زيارات منزلية لكبار السن' },
  { en: 'Patients unable to travel to the clinic', ar: 'المرضى غير القادرين على الانتقال للعيادة' },
  { en: 'Examination and assessment of the case', ar: 'الكشف وتقييم الحالة' },
  {
    en: 'Providing suitable dental services, depending on what can be performed safely at home',
    ar: 'تقديم خدمات الأسنان المناسبة حسب إمكانية إجرائها بأمان في المنزل',
  },
];

export interface BookingOption {
  value: string;
  group: 'dental' | 'aesthetic' | 'home';
  labelEn: string;
  labelAr: string;
}

export const BOOKING_SERVICE_OPTIONS: BookingOption[] = [
  ...DENTAL_SERVICES.flatMap((service) => {
    if (service.variants && service.variants.length > 0) {
      return service.variants.map((variant) => ({
        value: variant.bookingValue,
        group: 'dental' as const,
        labelEn: `${service.titleEn} — ${variant.labelEn} (${service.titleAr})`,
        labelAr: `${service.titleAr} — ${variant.labelAr}`,
      }));
    }

    return [
      {
        value: service.bookingValue,
        group: 'dental' as const,
        labelEn: `${service.titleEn}${service.subtitleEn ? ` — ${service.subtitleEn}` : ''} (${service.titleAr})`,
        labelAr: `${service.titleAr}${service.subtitleAr ? ` — ${service.subtitleAr}` : ''}`,
      },
    ];
  }),
  ...AESTHETIC_SUB_CATEGORIES.flatMap((category) => [
    {
      value: category.bookingValue,
      group: 'aesthetic' as const,
      labelEn: `${category.titleEn} (${category.titleAr})`,
      labelAr: `${category.titleAr} (${category.titleEn})`,
    },
    ...category.items.map((item) => ({
      value: item.bookingValue,
      group: 'aesthetic' as const,
      labelEn: `${category.titleEn}: ${item.en} (${item.ar})`,
      labelAr: `${category.titleAr}: ${item.ar}`,
    })),
  ]),
  {
    value: 'Home Dental Visit — زيارة منزلية',
    group: 'home' as const,
    labelEn: 'Home Dental Visit (الزيارات المنزلية)',
    labelAr: 'زيارة منزلية (Home Dental Visit)',
  },
];
