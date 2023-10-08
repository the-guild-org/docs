export default {
  index: {
    title: 'Home',
    type: 'page',
    display: 'hidden',
    theme: {
      layout: 'raw',
    },
  },
  docs: {
    title: 'Docs',
    type: 'page',
  },
  'contact-us-link': {
    title: 'Contact Us',
    type: 'page',
    href: 'https://the-guild.dev/contact',
    newWindow: true,
  },
  '404': {
    type: 'page',
    theme: {
      timestamp: false,
      typesetting: 'article',
    },
  },
};
