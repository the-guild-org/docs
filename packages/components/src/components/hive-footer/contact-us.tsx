'use client';

export function ContactUs() {
  return (
    <a
      className="hive-focus -m-2 rounded p-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-100"
      href="https://the-guild.dev/contact"
      onClick={event => {
        if (window.$crisp) {
          window.$crisp.push(['do', 'chat:open']);
          event.preventDefault();
        }
      }}
    >
      Contact Us
    </a>
  );
}
