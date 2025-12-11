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
        { title: 'Cause', href: '/cause', description: 'See the difference we are making.' },
      ],
    },
    {
      title: 'Programmes',
      href: '/programs',
      subLinks: [
        { title: 'Biodiversity and Environment', href: '/programs/biodiversity', description: 'Our efforts to conserve nature.' },
        { title: 'Human Rights and inclusive Development', href: '/programs/human-rights', description: 'Advocating for justice and equality.' },
        { title: 'Community and Livelihood', href: '/programs/community-livelihood', description: 'Empowering local communities.' },
      ],
    },
    // {
    //   title: 'Partners',
    //   href: '/partners',
    // },
    {
      title: 'Contact Us',
      href: '/contact',
    },
  ];
  