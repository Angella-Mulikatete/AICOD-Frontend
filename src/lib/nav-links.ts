export type NavLink = {
    title: string;
    href: string;
    description?: string;
    subLinks?: NavLink[];
  };
  
  export const navLinks: NavLink[] = [
    {
      title: 'Home',
      href: '/',
      subLinks: [
        { title: 'Our Story', href: '/our-story', description: 'Learn about our journey and mission.' },
        { title: 'Impact', href: '/impact', description: 'See the difference we are making.' },
      ],
    },
    {
      title: 'Programs',
      href: '/programs',
      subLinks: [
        { title: 'Biodiversity', href: '/programs/biodiversity', description: 'Our efforts to conserve nature.' },
        { title: 'Human Rights', href: '/programs/human-rights', description: 'Advocating for justice and equality.' },
        { title: 'Community &amp; Livelihood', href: '/programs/community-livelihood', description: 'Empowering local communities.' },
      ],
    },
    {
      title: 'Donations',
      href: '/donations',
    },
    {
      title: 'Partners',
      href: '/partners',
    },
    {
      title: 'Contact Us',
      href: '/contact',
    },
  ];
  