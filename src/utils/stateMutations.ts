interface CasesByCountry {
  [country: string]: {
    Confirmed: number;
    Deaths: number;
    Recovered: number;
  };
}

interface State {
  [date: string]: CasesByCountry;
}

type DataForChart = ({
  date: string;
} & CasesByCountry)[];

type Collection = {
  Date: string;
  Country: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
}[];

const appendToState =
  (collectionsByCountry: Collection) => (originalState: State) => {
    let state = originalState;

    collectionsByCountry.forEach((collection) => {
      const { Date: date, Country, Confirmed, Deaths, Recovered } = collection;

      const Date = date.replace(/T(.)+/, '');

      if (Date in state) {
        if (Country in state[Date]) {
          state = {
            ...state,
            [Date]: {
              ...state[Date],
              [Country]: {
                ...state[Country],
                Confirmed: state[Date][Country].Confirmed + Confirmed,
                Deaths: state[Date][Country].Deaths + Deaths,
                Recovered: state[Date][Country].Recovered + Recovered,
              },
            },
          };
        } else {
          // if date but not Country
          state = {
            ...state,
            [Date]: {
              ...state[Date],
              [Country]: { Confirmed, Deaths, Recovered },
            },
          };
        }
      } else {
        // no date in state
        state = {
          ...state,
          [Date]: {
            [Country]: {
              Confirmed,
              Deaths,
              Recovered,
            },
          },
        };
      }
    });

    return state;
  };

const prepareStateForChart = (state: State) => {
  return Object.entries(state).reduce(
    (acc: DataForChart, dateAndCountries: any) => {
      const [date, countries] = dateAndCountries;

      return [
        ...acc,
        {
          ...countries,
          date,
        },
      ];
    },
    []
  );
};

export { appendToState, prepareStateForChart };
