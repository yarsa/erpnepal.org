import en from './ui.en.ts'

export default {
  ...en,
  nav: [
    { label: 'फिचरहरू', href: '/features/' },
    { label: 'एड-अन', href: '/addons/' },
    { label: 'गाइड', href: '/guides/' },
    { label: 'Nepal HRMS', href: '/nepal-hrms/' },
    { label: 'तपाईंको व्यवसायका लागि', href: '/for-your-business/' },
  ],
  install: { label: 'इन्स्टल', href: '/ne/#get-started' },
  home: 'होम',
  a11y: {
    skip: 'मुख्य भागमा जानुहोस्',
    main: 'मुख्य',
    menu: 'मेनु',
    theme: 'डार्क मोड अन/अफ गर्नुहोस्',
    language: 'भाषा',
    github: 'GitHub मा Nepal Compliance',
    stars: 'स्टार',
    site: 'साइट',
    project: 'प्रोजेक्ट',
  },
} satisfies typeof en
