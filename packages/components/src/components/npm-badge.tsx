import React, { ReactElement } from 'react';

export const NPMBadge = ({ name }: { name: string }): ReactElement => {
  const encodedPackage = encodeURIComponent(name);
  return (
    <a href={`https://npmjs.com/package/${encodedPackage}`} target="_blank" rel="noreferrer">
      <img src={`https://badge.fury.io/js/${encodedPackage}.svg`} alt="npm version" />
    </a>
  );
};
