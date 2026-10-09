import en, { repo } from './home.en.ts'

const accounting = `${repo}#accounting--billing`
const hrPayroll = `${repo}#hr--payroll`
const basicSetup = `${repo}#basic-setup`

export default {
  // Same dates as home.en.ts; BS strings from nepali-date-converter's Nepali output.
  dates: {
    invoice: { bs: '२० आश्विन २०८३', ad: '६ अक्टोबर २०२६' },
    fiscalStart: { bs: '१ श्रावण २०८३', ad: '१७ जुलाई २०२६' },
    slipPeriod: { bs: 'आश्विन २०८३', ad: 'सेप्टेम्बर–अक्टोबर २०२६' },
  },
  hero: {
    eyebrow: 'निःशुल्क IRD सूचीकृत ई-बिलिङ सफ्टवेयर, CBMS सहित',
    eyebrowStrong: 'IRD सूचीकृत',
    eyebrowHref: '/features/cbms/',
    title: 'IRD अनुसार बिल, भ्याट, र तलब मिलाउनुहोस्।',
    lead: 'नेपालमा ERPNext का लागि IRD ई-बिलिङ, CBMS सिंक, भ्याट र तलब।',
    primary: { label: 'कसरी चल्छ, हेर्नुहोस्', href: '#features' },
    secondary: { label: 'इन्स्टल गर्नुहोस्', href: '#get-started' },
    assurance: ['लाइसेन्स शुल्क छैन', 'ओपन सोर्स (GPL-3.0)', 'तपाईंकै सर्भरमा चल्छ'],
  },
  proof: {
    label: 'प्रोजेक्टका तथ्यहरू',
    stars: 'GitHub स्टार',
    forks: 'फोर्क',
    pulls: 'Docker पुल',
    license: 'लाइसेन्स',
    contributors: 'योगदानकर्ता',
  },
  features: {
    title: 'यसले के-के गर्छ?',
    lead: 'काम छान्नुहोस्। कार्डमा नमुना डेटा मात्र छ।',
    dateLabel: 'मिति',
    calendar: { bs: 'वि.सं.', ad: 'ई.सं.' },
    tabsLabel: 'फिचर',
    tabs: [
      {
        value: 'billing',
        icon: 'lucide-receipt',
        label: 'बिल र भ्याट',
        nepali: '',
        points: [
          'बिल क्यान्सिल हुन्छ, डिलिट हुँदैन। फेरि प्रिन्ट गर्दा “प्रतिलिपि” लेखिन्छ।',
          'हरेक बिल IRD को CBMS मा सिंक हुन्छ।',
          'भ्याटको खरिद/बिक्री खाता र भ्याट रिटर्न रिपोर्ट।',
        ],
        link: '/features/invoicing/',
      },
      {
        value: 'payroll',
        icon: 'lucide-calculator',
        label: 'तलब',
        nepali: '',
        points: [
          'एकल र दम्पतीका लागि छुट्टाछुट्टै कर स्ल्याब।',
          'SSF, EPF र CIT को हिसाब।',
          'उपदान, ग्रेड र न्यूनतम तलब।',
        ],
        link: '/features/payroll/',
      },
      {
        value: 'hr',
        icon: 'lucide-users',
        label: 'हाजिरी र बिदा',
        nepali: '',
        points: [
          'हाजिरी, बिदा र सार्वजनिक बिदा, सबै नेपाली मितिमा।',
          'काम गरेको दिनअनुसार बिरामी र घर बिदाको हिसाब।',
        ],
        link: '/features/hr-and-leave/',
      },
      {
        value: 'dates',
        icon: 'lucide-calendar-days',
        label: 'नेपाली मिति',
        nepali: '',
        points: [
          'फारम, लिस्ट र खोजीमा वि.सं. मिति।',
          'रिपोर्ट र प्रिन्टमा पनि वि.सं. मिति।',
        ],
        link: '/features/nepali-dates/',
      },
      {
        value: 'audit',
        icon: 'lucide-shield-check',
        label: 'अडिट ट्रेल',
        nepali: '',
        points: [
          'कसले के गर्‍यो, त्यसको लग र SQL क्वेरी लग।',
          'क्यान्सिल भएका बिक्री बिलको खाता।',
        ],
        link: '/features/audit-and-reports/',
      },
    ],
    docsLabel: 'विस्तारमा हेर्नुहोस् (अंग्रेजीमा)',
  },
  demo: {
    invoice: {
      heading: 'कर बीजक',
      number: 'SINV-2083-00042',
      customer: 'डेमो ट्रेडर्स',
      dateLabel: 'मिति',
      customerLabel: 'ग्राहक',
      lines: [
        { label: 'अफिस कुर्सी × 4', amount: '10,000.00' },
        { label: 'भ्याट 13%', amount: '1,300.00' },
      ],
      total: { label: 'जम्मा (रु.)', amount: '11,300.00' },
      status: 'CBMS मा सिंक भयो',
      copy: 'मूल बिलको प्रतिलिपि 1',
    },
    slip: {
      heading: 'तलब स्लिप',
      lines: [
        { label: 'बेसिक तलब', amount: '40,000' },
        { label: 'भत्ता', amount: '10,000' },
        { label: 'कुल तलब', amount: '50,000', strong: true },
        { label: 'SSF कट्टी (बेसिकको 11%)', amount: '− 4,400' },
      ],
      total: { label: 'आयकर कट्नुअघिको तलब (रु.)', amount: '45,600' },
      note: 'कम्पनीले बेसिकको 20% SSF (8,000) थप्छ। आयकर यहाँ देखाइएको छैन।',
      chart: {
        title: 'यो कर्मचारीमा कम्पनीको मासिक खर्च (रु.)',
        center: 'कुल खर्च',
        slices: [
          { label: 'हातमा आउने तलब', value: 45600 },
          { label: 'कर्मचारीको SSF', value: 4400 },
          { label: 'कम्पनीको SSF', value: 8000 },
        ],
      },
    },
    leave: {
      heading: 'बाँकी बिदा',
      fiscalYear: 'आर्थिक वर्ष २०८३/८४ सुरु:',
      rows: [
        { label: 'अहिलेसम्म काम गरेको दिन', value: '60' },
        { label: 'घर बिदा (२० दिन कामबराबर १ दिन)', value: '3' },
        { label: 'लिइसकेको बिरामी बिदा', value: '1' },
      ],
    },
    calendar: {
      heading: 'एउटै मिति, दुवै पात्रोमा',
      rows: [
        { label: 'बिलको मिति', key: 'invoice' as const },
        { label: 'आर्थिक वर्ष २०८३/८४ सुरु', key: 'fiscalStart' as const },
      ],
      note: 'माथिको वि.सं. / ई.सं. थिच्दा सबै मिति बदलिन्छ।',
      bs: 'वि.सं.',
      ad: 'ई.सं.',
    },
    audit: {
      heading: 'अडिट ट्रेल',
      rows: [
        { doc: 'SINV-2083-00041', action: 'क्यान्सिल गरियो, कारण लेखियो', user: 'accounts@demo' },
        { doc: 'SINV-2083-00042', action: 'प्रतिलिपि 1 को रूपमा फेरि प्रिन्ट', user: 'front-desk@demo' },
        { doc: 'SINV-2083-00042', action: 'CBMS मा सिंक भयो', user: 'system' },
      ],
    },
    tag: 'नमुना डेटा',
    addFeatures: 'एप इन्स्टल गर्नुहोस्',
    previewLabel: 'नमुना डेटासहित सफ्टवेयरको झलक',
  },
  compliance: {
    title: 'नियम पालनाको रोडम्याप',
    lead: 'कुन नियम, एपले कसरी मिलाउँछ। हरेक लाइन कोडसँग जोडिएको छ।',
    chart: { title: 'स्थिति', center: 'नियम' },
    columns: { rule: 'नियम', feature: 'एपले कसरी गर्छ', status: 'स्थिति' },
    status: { supported: 'उपलब्ध', beta: 'बिटा', progress: 'काम हुँदैछ' },
    rows: [
      { rule: 'IRD ई-बिलिङ', nepali: '', feature: 'बिल डिलिट हुँदैन; फेरि प्रिन्टमा “प्रतिलिपि” लेखिन्छ', status: 'supported', link: accounting },
      { rule: 'IRD CBMS', nepali: '', feature: 'हरेक बिल CBMS मा सिंक', status: 'supported', link: accounting },
      { rule: 'भ्याट (मूल्य अभिवृद्धि कर)', nepali: '', feature: 'भ्याटको खरिद/बिक्री खाता र रिटर्न रिपोर्ट', status: 'supported', link: accounting },
      { rule: 'अडिट ट्रेल', nepali: '', feature: 'कसले के गर्‍यो र SQL क्वेरीको लग', status: 'supported', link: accounting },
      { rule: 'श्रम ऐन, २०७४', nepali: '', feature: 'बिदा, न्यूनतम तलब, उपदान', status: 'supported', link: hrPayroll },
      { rule: 'SSF र EPF', nepali: '', feature: 'तलबमै कट्टी र योगदान', status: 'supported', link: hrPayroll },
      { rule: 'आयकर स्ल्याब', nepali: '', feature: 'एकल र दम्पतीका लागि छुट्टाछुट्टै', status: 'supported', link: hrPayroll },
      { rule: 'वि.सं. मिति', nepali: '', feature: 'फारम, रिपोर्ट र प्रिन्टमा', status: 'supported', link: basicSetup },
      { rule: 'कर्मचारी सेल्फ-सर्भिस', nepali: '', feature: 'Nepal HRMS एप, परीक्षण हुँदैछ', status: 'beta', link: '' },
      { rule: 'बायोमेट्रिक हाजिरी मेसिन', nepali: '', feature: 'मेसिनको मोडेलअनुसार जोडिँदैछ', status: 'progress', link: hrPayroll },
    ],
  },
  openSource: {
    title: 'फ्री र ओपन सोर्स',
    lead: 'GPL-3.0 लाइसेन्स। कुनै लाइसेन्स शुल्क छैन।',
    free: {
      title: 'सधैं फ्री',
      items: [
        { icon: 'lucide-package', title: 'एप', body: 'लाइसेन्स शुल्क लाग्दैन।' },
        { icon: 'lucide-git-branch', title: 'अपडेट र कोड', body: 'सबै GitHub मा खुला।' },
        { icon: 'lucide-users', title: 'कम्युनिटीको सहयोग', body: 'GitHub Discussions मा।' },
      ],
    },
    paid: {
      title: 'खर्च लाग्न सक्ने कुरा',
      items: [
        { icon: 'lucide-server', title: 'होस्टिङ', body: 'ERPNext चलाउन सर्भर।' },
        { icon: 'lucide-wrench', title: 'सेटअप', body: 'आफ्नै IT टिम वा पार्टनरबाट।' },
        { icon: 'lucide-life-buoy', title: 'सपोर्ट र तालिम', body: 'आफूले रोजेको कम्पनीबाट।' },
      ],
    },
    primary: { label: 'GitHub मा हेर्नुहोस्', href: repo },
    secondary: { label: 'लाइसेन्स पढ्नुहोस्', href: `${repo}/blob/master/LICENSE` },
  },
  getStarted: {
    title: 'सुरु गरौं',
    lead: 'दुई बाटो छन्।',
    business: {
      title: 'मेरो व्यवसाय छ',
      body: 'तपाईंको IT टिम वा पार्टनरले इन्स्टल गरिदिन्छ। पहिले बिलिङ चलाउनुहोस्, अनि तलब थप्नुहोस्।',
      primary: { label: 'कम्युनिटीमा सोध्नुहोस्', href: `${repo}/discussions` },
      secondary: { label: 'फिचरहरू हेर्नुहोस्', href: '#features' },
    },
    technical: {
      title: 'म ERPNext सेटअप गर्छु',
      body: 'ERPNext र Frappe HR भएको Frappe साइट चाहिन्छ।',
      commands: en.getStarted.technical.commands,
      copy: 'कपी',
      copied: 'कपी भयो',
      copyFailed: 'कपी भएन। कमान्ड आफैं सेलेक्ट गरेर कपी गर्नुहोस्।',
      primary: { label: 'इन्स्टल गर्ने तरिका (अंग्रेजीमा)', href: `${repo}/blob/master/docs/manual-install.md` },
      secondary: { label: 'Docker बाट इन्स्टल (अंग्रेजीमा)', href: `${repo}/blob/master/docs/docker-install.md` },
    },
  },
  faq: {
    title: 'धेरैले सोध्ने प्रश्न',
    items: [
      {
        q: 'यो IRD नियमअनुसार छ?',
        a: 'IRD को ई-बिलिङ नियम मानेर बनाइएको हो।',
      },
      {
        q: 'कति पैसा लाग्छ?',
        a: 'लाइसेन्स शुल्क लाग्दैन। होस्टिङ, सेटअप र सपोर्टको खर्च भने छुट्टै हुन्छ।',
      },
      {
        q: 'चलाउन के-के चाहिन्छ?',
        a: 'ERPNext र Frappe HR भएको Frappe साइट। कुन भर्सन चाहिन्छ, इन्स्टल गाइडमा हेर्नुहोस्।',
      },
      {
        q: 'मद्दत कहाँ पाइन्छ?',
        a: 'GitHub Discussions वा Issues मा सोध्नुहोस्। कम्युनिटीले सहयोग गर्छ।',
      },
    ],
  },
  explore: {
    title: 'अरू पनि हेर्नुहोस्',
    cards: [
      { icon: 'lucide-plug', eyebrow: 'एड-अन', title: 'आफ्ना सेवाहरू जोड्नुहोस्', body: 'QR पेमेन्ट, SMS, हाजिरी मेसिन र अरू।', href: '/addons/', link: 'एड-अन हेर्नुहोस् (अंग्रेजीमा)' },
      { icon: 'lucide-book-open', eyebrow: 'गाइड', title: 'काम लाग्ने गाइडहरू', body: 'भ्याट, CBMS, तलब र डेटा सार्नेबारे छोटो जवाफ।', href: '/guides/', link: 'गाइड पढ्नुहोस् (अंग्रेजीमा)' },
      { icon: 'lucide-users', eyebrow: 'Nepal HRMS', badge: 'बिटा', title: 'HR का थप टुल्स आउँदैछन्', body: 'कर्मचारी सेल्फ-सर्भिस र हाजिरी, बिटामा।', href: '/nepal-hrms/', link: 'Nepal HRMS हेर्नुहोस् (अंग्रेजीमा)' },
    ],
  },
  community: {
    title: 'सोध्नुहोस्, सेयर गर्नुहोस्, साथ दिनुहोस्',
    body: 'Yarsa को कम्युनिटी प्रोजेक्ट।',
    links: [
      { label: 'GitHub Discussions', href: `${repo}/discussions` },
      { label: 'समस्या रिपोर्ट गर्नुहोस्', href: `${repo}/issues` },
      { label: 'योगदान गर्ने तरिका', href: `${repo}/blob/master/CONTRIBUTING.md` },
    ],
  },
  footer: {
    tagline: 'ERPNext र Frappe HR का लागि एप।',
    credit: { before: '', name: 'Yarsa', href: 'https://www.yarsalabs.com/', after: ' र योगदानकर्ताहरूको प्रोजेक्ट। Frappe, ERPNext र Frappe HR मा बनेको।' },
    site: [
      { label: 'फिचरहरू', href: '/features/' },
      { label: 'एड-अन', href: '/addons/' },
      { label: 'गाइड', href: '/guides/' },
      { label: 'Nepal HRMS', badge: 'बिटा', href: '/nepal-hrms/' },
      { label: 'वर्कफ्लो', href: '/workflows/' },
    ],
    links: [
      { label: 'GitHub', href: repo },
      { label: 'Discussions', href: `${repo}/discussions` },
      { label: 'Issues', href: `${repo}/issues` },
      { label: 'GPL-3.0 लाइसेन्स', href: `${repo}/blob/master/LICENSE` },
      { label: 'साइटम्याप', href: '/sitemap.xml' },
    ],
    readme: en.footer.readme,
  },
  language: { en: 'EN', ne: 'नेपाली', soon: 'अहिलेलाई होमपेज मात्र नेपालीमा छ' },
} satisfies typeof en
