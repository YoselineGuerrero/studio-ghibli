import React from 'react';

const footer_links = [
  {
    name:'Portfolio',
    link: 'https://yoselineguerrero.github.io/dev-portfolio/'
  }, {
    name:'Code for this Site',
    link: 'https://github.com/YoselineGuerrero/studio-ghibli'
  }, {
    name:'GitHub Profile',
    link: 'https://github.com/YoselineGuerrero'
  }, {
    name:'LinkedIn',
    link: 'https://www.linkedin.com/in/yoseline-guerrero-a78526175/'
  }, {
    name:'Email',
    link: 'mailto:yguerrerocs@gmail.com'
  },
]

export default function Footer() {
  return (
    <nav className='center' id='footer'>
      <div className='sameLine'>
        {footer_links.map((link) => (
          <a id='footer-a' className='font-small' key={link.name} href={link.link} target='_blank' rel="noreferrer">{link.name}</a>
        ))}
      </div>
      <p className='size-copyright font-med'>Copyright © Yoseline Guerrero 2022</p>
    </nav>
  );
}
