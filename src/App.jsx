import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function sortBy(status, arr) {
  const sortedArr = [...arr];

  switch (status) {
    case 'by-alphabetically':
      return sortedArr.sort((a, b) => a.localeCompare(b));

    case 'by-length':
      return sortedArr.sort((a, b) => a.length - b.length);

    default:
      return sortedArr;
  }
}

export const App = () => {
  const [status, setStatus] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const goods = status ? sortBy(status, goodsFromServer) : [...goodsFromServer];

  if (isReversed) {
    goods.reverse();
  }

  const handleSort = newStatus => {
    if (status === newStatus) {
      return;
    }

    setStatus(newStatus);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setStatus(null);
    setIsReversed(false);
  };

  const isModified = status !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${status !== 'by-alphabetically' ? 'is-light' : ''}`}
          onClick={() => handleSort('by-alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${status !== 'by-length' ? 'is-light' : ''}`}
          onClick={() => handleSort('by-length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-success"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
