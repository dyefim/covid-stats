import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Countries, FiltersForLiveData } from '../../../App';
import useCaseTypeSelection, {
  caseOptions,
} from '../../../hooks/events/useCaseTypeSelection';
import useDateSelection from '../../../hooks/events/useDateSelection';
import { getNextDay } from '../../../utils/dates';
import useStyles from '../../../styles/DrawerFormStyles';
import DatePicker from '../../../components/forms/DatePicker';
import { default as CustomSelect } from '../../../components/forms/Select';
import CountriesCheckboxForm from './CountriesCheckboxForm';

interface Props {
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: React.Dispatch<
    React.SetStateAction<FiltersForLiveData>
  >;
  countries: Countries;
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilteringForm = ({
  filtersForLiveData,
  setFiltersForLiveData,
  countries,
  selectedCountries,
  setSelectedCountries,
}: Props) => {
  const classes = useStyles();

  const tomorrow = getNextDay();

  const handleDateChange = useDateSelection(setFiltersForLiveData);

  const handleCaseTypeSelection = useCaseTypeSelection<FiltersForLiveData>(
    setFiltersForLiveData
  );

  return (
    <Grid container className={classes.form}>
      <Typography component="legend" className={classes.legend}>
        Pick Countries and Date
      </Typography>

      <DatePicker
        label={'From'}
        name="date_from"
        value={filtersForLiveData.date_from}
        handleChange={handleDateChange}
        max={tomorrow}
      />

      <CustomSelect
        name="cases"
        label="Cases"
        options={caseOptions}
        value={filtersForLiveData.cases}
        handleSelection={handleCaseTypeSelection}
      />

      <CountriesCheckboxForm
        countries={countries}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />
    </Grid>
  );
};

export default FilteringForm;
