import { GlobalFilters } from '../../types/filters';
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
import ContainerWithDrawer from '../../components/ContainerWithDrawer';

export type GlobalData = {
  Date: string;
  NewConfirmed: number;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}[];

export interface Props {
  data: GlobalData;
  globalFilters: GlobalFilters;
  setGlobalFilters: React.Dispatch<React.SetStateAction<GlobalFilters>>;
}

const World = ({
  data,
  globalFilters,
  setGlobalFilters,
}: Props) => {
  const preparedData = data.map((d) => ({
    date: getYyyyMmDd(d.Date),
    confirmed: d.NewConfirmed,
    deaths: d.NewDeaths,
    recovered: d.NewRecovered,
  }));

  return (
    <ContainerWithDrawer
      title="Global data"
      drawerContent={
        <FilteringForm
          globalFilters={globalFilters}
          setGlobalFilters={setGlobalFilters}
        />
      }
    >
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
              dataKey={globalFilters.cases}
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
    </ContainerWithDrawer>
  );
};

export default World;
