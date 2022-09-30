/* eslint-disable global-require */
import React from 'react';
import { HeaderWrapper, RoutesWrapper } from './style';
// import { ReactComponent as DieboldSvg } from '../../../assets/images/diebold-logo.svg';
import NavigationLink from '../../atoms/NavigationLink';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <img
        src={require('../../../assets/images/uea-logo.png')}
        alt="Universidade do Estado do Amazonas"
        height={96}
        width={96}
      />
      <RoutesWrapper>
        <NavigationLink key="primary" path="/dashboard" name="Dashboard" />
      </RoutesWrapper>
    </HeaderWrapper>
  );
};

export default Header;
