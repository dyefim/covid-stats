import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Countries, FiltersForLiveData, CaseType } from '../../App';
import useCaseTypeSelection, {
  caseOptions,
} from '../../hooks/events/useCaseTypeSelection';
import useDateSelection from '../../hooks/events/useDateSelection';
import { getNextDay } from '../../utils/dates';
import useStyles from '../../styles/DrawerFormStyles';
import DatePicker from '../../components/forms/DatePicker';
import { default as CustomSelect } from '../../components/forms/Select';

interface Props {
  filtersForLiveData: FiltersForLiveData;
  setFiltersForLiveData: (filters: FiltersForLiveData) => void;
  countries: Countries;
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  typeOfCasesByCountry: CaseType;
  setTypeOfCasesByCountry: (caseType: CaseType) => void;
}

const FilteringForm = ({
  filtersForLiveData,
  setFiltersForLiveData,
  countries,
  selectedCountries,
  setSelectedCountries,
  typeOfCasesByCountry,
  setTypeOfCasesByCountry,
}: Props) => {
  const classes = useStyles();

  const tomorrow = getNextDay();

  const handleDateChange = useDateSelection(setFiltersForLiveData);

  const handleCaseTypeSelection = useCaseTypeSelection(setTypeOfCasesByCountry);

  const handleCountriesSelection = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    event.preventDefault();

    const values = event.target.value;

    // FIXME restrict selecting to much or to often

    setSelectedCountries(values as string[]);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.form}>
        <Typography component="legend" className={classes.legend}>
          Pick Countries and Date
        </Typography>

        <DatePicker
          className={classes.input}
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
          value={typeOfCasesByCountry}
          handleSelection={handleCaseTypeSelection}
          className={classes.input}
        />
      </Grid>

      <FormControl className={classes.select}>
        <InputLabel id="countries-label">Countries</InputLabel>
        <Select
          labelId="countries-label"
          id="countries"
          multiple
          value={selectedCountries}
          onChange={handleCountriesSelection}
          input={<Input />}
          renderValue={(selected) => {
            return (selected as string[])
              .map((slug) => {
                return countries[slug]?.Country || slug;
              })
              .join(', ');
          }}
        >
          {Object.entries(countries).map(([slug, { Country: countryName }]) => (
            <MenuItem key={slug} value={slug}>
              <Checkbox checked={selectedCountries.indexOf(slug) > -1} />
              <ListItemText primary={countryName || slug} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilteringForm;
