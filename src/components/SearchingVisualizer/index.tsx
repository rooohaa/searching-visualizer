import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { randomIntFromInterval } from '../../utils';
import { AppButton } from '../AppButton';
import { Bar } from '../Bar';
import { ActionsWrapper, Wrapper } from './style';

const SearchingVisualizer: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [target, setTarget] = useState('');
  const [size, setSize] = useState(50);
  const [searchSpeed, setSearchSpeed] = useState(30);
  const [foundIdx, setFoundIdx] = useState<number | null>(null);

  const generateArray = useCallback(() => {
    resetState();

    const res: number[] = [];

    for (let i = 0; i < size; i++) {
      res.push(randomIntFromInterval(20, 280));
    }

    setArr(res);
  }, [size]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const sorted = useMemo(() => {
    const copy = [...arr];
    return copy.sort((a, b) => a - b);
  }, [arr]);

  const handleArrayResize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(+e.target.value);
  };

  const handleSearchSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSpeed(+e.target.value);
  };

  const doLinearSearch = () => {
    if (!target) {
      alert('Input target element');
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      const currElem = arr[i];
      const currBar = document.getElementById(
        `ln-${currElem}-${i}`
      )?.parentElement;

      if (currBar) {
        if (currElem !== +target) {
          setTimeout(() => {
            currBar.style.backgroundColor = 'rgb(140, 98, 98)';
          }, searchSpeed * i);
        } else {
          setTimeout(() => {
            currBar.style.backgroundColor = 'lime';
            setFoundIdx(i);
          }, searchSpeed * i);

          break;
        }
      }
    }
  };

  const resetState = () => {
    setFoundIdx(null);

    const bars = document.querySelector('.bars-wrapper')?.children;

    if (bars) {
      Array.from(bars as HTMLCollectionOf<HTMLElement>).forEach(
        (bar) => (bar.style.backgroundColor = '#4FD1C5')
      );
    }
  };

  return (
    <>
      <ActionsWrapper>
        <div className="app-name">Searching Visualizer</div>

        <div className="app-range-controls">
          <div className="app-range-slider-wrap">
            <div className="label">Array size: {size}</div>
            <input
              type="range"
              value={size}
              disabled={foundIdx !== null}
              onChange={handleArrayResize}
              min="10"
              max="100"
            />
          </div>

          <div className="app-range-slider-wrap">
            <div className="label">Search speed</div>
            <input
              type="range"
              value={searchSpeed}
              onChange={handleSearchSpeedChange}
              min="10"
              max="100"
              step="-1"
            />
          </div>
        </div>

        <div className="app-controls">
          <AppButton variant="primary" onClick={generateArray}>
            Generate new array
          </AppButton>

          <div className="app-search-input">
            <input
              type="text"
              placeholder="Target value"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <AppButton
              disabled={foundIdx !== null}
              variant="secondary"
              onClick={doLinearSearch}
            >
              Search
            </AppButton>
          </div>
        </div>
      </ActionsWrapper>

      <div className="app-container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
            margin: '20px 0',
          }}
        >
          <Wrapper>
            <div className="bars-header">
              <div className="search-name">Linear search</div>
              {foundIdx !== null && (
                <div className="search-result">
                  Found at index {foundIdx} in {foundIdx + 1} steps
                </div>
              )}
            </div>
            <div className="bars-wrapper">
              {arr.map((val, idx) => (
                <Bar
                  key={idx}
                  value={val}
                  dataVal={`ln-${val}-${idx}`}
                />
              ))}
            </div>
          </Wrapper>

          <Wrapper>
            <div className="bars-header">
              <div className="search-name">Binary search</div>
            </div>

            <div className="bars-wrapper">
              {sorted.map((val, idx) => (
                <Bar
                  key={idx}
                  value={val}
                  dataVal={`bn-${val}-${idx}`}
                />
              ))}
            </div>
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export { SearchingVisualizer };
