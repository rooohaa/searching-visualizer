import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { notTargetColor, targetColor } from '../../constants';
import { randomIntFromInterval } from '../../utils';
import { AppButton } from '../AppButton';
import { Bar } from '../Bar';
import { InputArray } from '../InputArray';
import { ActionsWrapper, Wrapper } from './style';

const SearchingVisualizer: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [target, setTarget] = useState('');
  const [size, setSize] = useState(75);
  const [searchSpeed, setSearchSpeed] = useState(30);
  const [foundIdxLin, setFoundIdxLin] = useState<number | null>(null);
  const [foundIdxBin, setFoundIdxBin] = useState<number | null>(null);
  const [stepsCountBin, setStepsCountBin] = useState(0);

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

  const searchTarget = () => {
    if (!target) {
      alert('Input target element!');
      return;
    }

    doBinarySearch();
    doLinearSearch();
  };

  const doLinearSearch = () => {
    for (let i = 0; i < arr.length; i++) {
      const currElem = arr[i];
      const currBar = document.getElementById(
        `ln-${currElem}-${i}`
      )?.parentElement;

      if (currBar) {
        if (currElem !== +target) {
          setTimeout(() => {
            currBar.style.backgroundColor = notTargetColor;
          }, searchSpeed * i);
        } else {
          setTimeout(() => {
            currBar.style.backgroundColor = targetColor;
            setFoundIdxLin(i);
          }, searchSpeed * i);

          break;
        }
      }
    }
  };

  const doBinarySearch = () => {
    let i = 1;
    let left = 0;
    let right = sorted.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currBar = document.getElementById(
        `bn-${sorted[mid]}-${mid}`
      )?.parentElement;

      if (sorted[mid] === +target) {
        setTimeout(() => {
          currBar!.style.backgroundColor = targetColor;
          setFoundIdxBin(mid);
          setStepsCountBin(i);
        }, size * i * 1.7);
        break;
      } else {
        setTimeout(() => {
          currBar!.style.backgroundColor = notTargetColor;
        }, size * i * 1.7);
      }

      if (sorted[mid] > +target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }

      i += 1;
    }
  };

  const resetState = () => {
    setFoundIdxLin(null);
    setFoundIdxBin(null);

    const bars = document.querySelectorAll('.app-bar');

    if (bars) {
      Array.from(bars as NodeListOf<HTMLElement>).forEach(
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
              disabled={foundIdxLin !== null && foundIdxBin !== null}
              onChange={handleArrayResize}
              min="10"
              max="150"
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
          <div className="app-search-input">
            <input
              type="text"
              placeholder="Target value"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <AppButton
              disabled={foundIdxLin !== null && foundIdxBin !== null}
              variant="secondary"
              onClick={searchTarget}
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
            margin: '5px 0',
          }}
        >
          <InputArray
            onGenerateClick={generateArray}
            onSetArray={(arr) => {
              resetState();
              setArr(arr);
            }}
          />

          <Wrapper>
            <div className="bars-header">
              <div className="search-name">Linear search</div>
              {foundIdxLin !== null && (
                <div className="search-result">
                  Found at index {foundIdxLin} in {foundIdxLin + 1} steps
                </div>
              )}
            </div>
            <div className="bars-wrapper">
              {arr.map((val, idx) => (
                <Bar key={idx} value={val} dataVal={`ln-${val}-${idx}`} />
              ))}
            </div>
          </Wrapper>

          <Wrapper>
            <div className="bars-header">
              <div className="search-name">Binary search</div>

              {foundIdxBin !== null && (
                <div className="search-result">
                  Found at index {foundIdxBin} in {stepsCountBin} steps
                </div>
              )}
            </div>

            <div className="bars-wrapper">
              {sorted.map((val, idx) => (
                <Bar key={idx} value={val} dataVal={`bn-${val}-${idx}`} />
              ))}
            </div>
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export { SearchingVisualizer };
