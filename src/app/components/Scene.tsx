import React, { FC, ReactNode } from 'react';

type SceneLayerProps = {
  children: ReactNode;
  name?: string;
  className?: string;
};

export const SceneLayer: FC<SceneLayerProps> = ({ children, name, className }) => {
  return (
    <div data-name={name || 'unnamed'} className={`absolute inset-0 z-0 ${className}`} >
      {children}
    </div>
  );
}
