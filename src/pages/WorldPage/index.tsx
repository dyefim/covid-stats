import Typography from '@material-ui/core/Typography';
import { GlobalFilters } from '../../App';
import FilteringForm from './FilteringForm';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getYyyyMmDd } from '../../utils/dates';

export type GlobalData = {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}[];

export interface WorldProps {
  data: GlobalData;
  globalFilters: GlobalFilters;
  setGlobalFilters: (filters: GlobalFilters) => void;
}

const World = ({ data, globalFilters, setGlobalFilters }: WorldProps) => {
  const caseType = globalFilters.typeOfCases;

  const preparedData = data.map((d) => ({
    date: getYyyyMmDd(d.Date),
    confirmed: d.NewConfirmed,
    deaths: d.NewDeaths,
    recovered: d.NewRecovered,
  }));

  // console.log(preparedData);

  return (
    <div>
      <Typography variant="h5" component="h1" gutterBottom>
        Global data
      </Typography>
      <FilteringForm
        globalFilters={globalFilters}
        setGlobalFilters={setGlobalFilters}
      />

      <div style={{ width: '100%', maxWidth: 800, height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            // width={500}
            // height={400}
            data={preparedData}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Line
              type="monotone"
              dataKey={caseType}
              stroke="#55c"
              strokeWidth="2"
            />

            <CartesianGrid
              stroke="#ddd"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ul>
        {caseType}
        {preparedData.map((report, i) => {
          const numberofCases = report[caseType];

          return (
            <li key={`${numberofCases}_${caseType}_${i}`}>{numberofCases}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default World;
