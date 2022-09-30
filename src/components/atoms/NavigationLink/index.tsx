import React from 'react';
import { ItemLink, Underscore } from './styles';

interface LinkProps {
  path: string;
  name: string;
}

const NavigationLink: React.FC<LinkProps> = ({ path, name }: LinkProps) => {
  return (
    <ItemLink
      to={path}
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
      })}
    >
      {name}
      <Underscore />
    </ItemLink>
  );
};

export default NavigationLink;
