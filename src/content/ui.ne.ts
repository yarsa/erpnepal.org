import en from './ui.en.ts'

export default {
  ...en,
  nav: [
    { label: 'फिचरहरू', href: '/features/' },
    { label: 'एड-अन', href: '/addons/' },
    { label: 'गाइड', href: '/guides/' },
    { label: 'वर्कफ्लो', href: '/workflows/' },
  ],
  install: { label: 'इन्स्टल', href: '/ne/#get-started' },
  home: 'होम',
  search: {
    label: 'खोज्नुहोस्',
    placeholder: 'गाइड, फिचर र एड-अन खोज्नुहोस्…',
    empty: 'केही भेटिएन। छोटो शब्द प्रयोग गर्नुहोस्।',
    hint: 'खोल्न Enter · बन्द गर्न Esc',
    groups: { pages: 'पेजहरू', features: 'फिचरहरू', guides: 'गाइड', addons: 'एड-अन' },
  },
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
