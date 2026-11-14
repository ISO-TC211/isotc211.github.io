import type { SiteConfig } from '@isotc211/astro-ui'

export const siteConfig: SiteConfig = {
  title: 'ISO/TC 211',
  titleHtml: 'ISO/TC&nbsp;211',
  brandSub: 'Harmonized Resources Maintenance Agency',
  description: 'Resource site for ISO/TC 211 Geographic information/Geomatics',
  faviconSvg: '/assets/favicon.svg',
  faviconIco: '/assets/favicon.ico',
  googleAnalytics: { id: 'UA-138578173-1' },
  nav: [
    { title: 'About', url: '/about/' },
    { title: 'News', url: '/news/' },
  ],
  committee: {
    id: 211,
    name: 'Geographic information/Geomatics',
    home: 'https://committee.iso.org/home/tc211',
  },
  footerLinks: [
    { title: 'Geodetic Registry', url: 'https://geodetic.isotc211.org/' },
    { title: 'Normative Statements', url: 'https://standards.isotc211.org/' },
    { title: 'UML Models', url: 'http://iso.sparxcloud.com/index.php' },
    { title: 'Schemas', url: 'https://schemas.isotc211.org' },
    { title: 'Terminology', url: 'https://isotc211.geolexica.org/' },
    { title: 'Ontologies', url: 'https://def.isotc211.org' },
    { title: 'Registries', url: 'https://registry.isotc211.org/' },
  ],
  awards: [
    {
      title: 'Winner of the 2010 Lawrence D. Eicher Leadership Award',
      path: '/award/2010/09/16/tc211-wins-iso-excellence-award.html',
    },
  ],
  social: {
    links: [{ url: 'https://twitter.com/ISOTC211' }, { url: 'https://github.com/ISO-TC211' }],
  },
}
