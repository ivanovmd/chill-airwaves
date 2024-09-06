import React, { FC, ReactNode } from 'react';

type SceneLayerProps = {
  children: ReactNode;
  name?: string;
};

export const SceneLayer: FC<SceneLayerProps> = ({ children, name }) => {
  return (
    <div data-name={name || 'unnamed'} className="absolute inset-0 z-0">
      {children}
    </div>
  );
}
