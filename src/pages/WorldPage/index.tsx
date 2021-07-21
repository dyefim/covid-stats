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

const World = ({ data, globalFilters, setGlobalFilters }: Props) => {
  const preparedData = data
    .map((d) => ({
      date: getYyyyMmDd(d.Date),
      confirmed: d.NewConfirmed,
      deaths: d.NewDeaths,
      recovered: d.NewRecovered,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
      <ResponsiveContainer height={300}>
        <LineChart data={preparedData} margin={{ right: 5, left: 15 }}>
          <Line
            type="monotone"
            dataKey={globalFilters.cases}
            stroke="#55c"
            strokeWidth="2"
          />

          <CartesianGrid stroke="#ddd" strokeWidth="1" strokeDasharray="4 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </ContainerWithDrawer>
  );
};

export default World;
