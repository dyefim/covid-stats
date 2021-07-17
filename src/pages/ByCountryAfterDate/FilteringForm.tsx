// import { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    const isCheck = event.target.checked;

    const slug = event.target.name;

    if (isCheck) {
      setSelectedCountries((sc) => [...sc, slug]);
    } else {
      setSelectedCountries((sc) => sc.filter((c) => c !== slug));
    }
  };

  const lessThanOne = selectedCountries.length < 1;
  // const lessThanOne = Object.values(state).filter(Boolean).length < 1;

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

      <FormControl
        required
        error={lessThanOne}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Pick Countries</FormLabel>
        <FormGroup>
          {Object.entries(countries)
            .sort(([aSlug], [bSlug]) => aSlug.localeCompare(bSlug))
            .map(([slug, { Country: countryName }]) => {
              return (
                <FormControlLabel
                  key={slug}
                  control={
                    <Checkbox
                      checked={selectedCountries.includes(slug)}
                      onChange={handleChange}
                      name={slug}
                    />
                  }
                  label={countryName}
                />
              );
            })}
        </FormGroup>
        <FormHelperText>Pick at least one</FormHelperText>
      </FormControl>
    </div>
  );
};

export default FilteringForm;
