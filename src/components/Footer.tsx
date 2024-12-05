import React from 'react';

interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ children, className }) => {
  return (
    <footer className={className}>
      {children}
    </footer>
  );
};

export default Footer;