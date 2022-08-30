import { ReactElement } from 'react';
import { Anchor } from './anchor';

export const NPMBadge = ({ name }: { name: string }): ReactElement => {
  const encodedPackage = encodeURIComponent(name);
  return (
    <Anchor href={`https://npmjs.com/package/${encodedPackage}`} newWindow>
      <img src={`https://badge.fury.io/js/${encodedPackage}.svg`} alt="npm version" className="h-6" />
    </Anchor>
  );
};
