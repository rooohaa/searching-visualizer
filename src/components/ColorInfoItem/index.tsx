import React from 'react';
import { ColorInfoWrapper } from './style';

interface ColorInfoItemProps {
  color: string;
  label: string;
}

const ColorInfoItem: React.FC<ColorInfoItemProps> = ({ label, color }) => {
  return (
    <ColorInfoWrapper>
      <div className="color-label">{label}</div>
      <div className="color-box" style={{ backgroundColor: color }}></div>
    </ColorInfoWrapper>
  );
};

export { ColorInfoItem };
