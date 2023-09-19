import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { prependListener } from 'process';


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

const Sort_Letter = 'FirstLetter';
const Sort_Length = 'Length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case Sort_Letter:
          return good1.localeCompare(good2);
        case Sort_Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    })
  }

  if (isReversed) {
    prepearedGoods.reverse();
  }
  
  return prepearedGoods;
}

export const App = () => {

  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField, isReversed });


  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(Sort_Letter);
          }}
          className={cn("button is-info", { 'is-light': sortField !== Sort_Letter })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn("button is-success", sortField !== Sort_Length ? "is-light" : "")}
          onClick={() => {
            setSortField(Sort_Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn("button is-warning", {
            "is-light": !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {
          visibleGoods.map((good) => {
            return (
              <li data-cy="Good">{good}</li>
            )
          })
        }
      </ul>
    </div>
  )
};
