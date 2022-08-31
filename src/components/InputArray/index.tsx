import React from 'react';
import { itemColor, notTargetColor, targetColor } from '../../constants';
import { AppButton } from '../AppButton';
import { ColorInfoItem } from '../ColorInfoItem';
import { InputArrayWrapper } from './style';

interface InputArrayProps {
  onGenerateClick: () => void;
  onSetArray: (arr: number[]) => void;
}

const InputArray: React.FC<InputArrayProps> = ({
  onGenerateClick,
  onSetArray,
}) => {
  const [value, setValue] = React.useState('');

  const handleSetArray = () => {
    try {
      const arr = JSON.parse(value);

      if (
        typeof arr === 'object' &&
        Array.isArray(arr) &&
        arr.every((item) => typeof item === 'number')
      ) {
        onSetArray(arr);
      } else {
        throw new Error('not correct input type');
      }
    } catch (err) {
      console.log(err);
      alert(
        'Not correct array input, please enter something like: [1, 2, 3, ...]'
      );
    }
  };

  return (
    <InputArrayWrapper>
      <div className="input-wrap">
        <input
          type="text"
          placeholder="Input array ex: [1, 2, 3, ...]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <AppButton variant="primary" disabled={!value} onClick={handleSetArray}>
          Set Array
        </AppButton>
        <AppButton
          variant="primary"
          onClick={() => {
            onGenerateClick();
            setValue('');
          }}
        >
          Generate new array
        </AppButton>
      </div>

      <div className="colors-info">
        <ColorInfoItem label="Array Item" color={itemColor} />
        <ColorInfoItem label="Not Target" color={notTargetColor} />
        <ColorInfoItem label="Found Target" color={targetColor} />
      </div>
    </InputArrayWrapper>
  );
};

export { InputArray };
