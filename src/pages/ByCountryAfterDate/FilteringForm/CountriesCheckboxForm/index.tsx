import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Divider from '@material-ui/core/Divider';
import { Countries } from '../../../../types';
import CheckboxGroup from './CheckboxGroup';

interface Props {
  countries: Countries;
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
}

const CountriesCheckboxForm = ({
  countries,
  selectedCountries,
  setSelectedCountries,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isCheck = event.target.checked;

    const slug = event.target.name;

    if (isCheck) {
      setSelectedCountries((sc) => [...sc, slug]);
    } else {
      setSelectedCountries((sc) => sc.filter((c) => c !== slug));
    }
  };

  const lessThanOne = selectedCountries.length < 1;

  const sortedCountyEntries = Object.entries(countries).sort(
    ([aSlug], [bSlug]) => aSlug.localeCompare(bSlug)
  );

  const selected = sortedCountyEntries.filter(([slug]) =>
    selectedCountries.includes(slug)
  );

  const unselected = sortedCountyEntries.filter(
    ([slug]) => !selectedCountries.includes(slug)
  );

  return (
    <FormControl required error={lessThanOne} component="fieldset">
      <FormLabel component="legend">Pick Countries</FormLabel>
      <FormGroup onChange={handleChange}>
        <CheckboxGroup countryEntries={selected} checked={true} />
        <Divider />
        <CheckboxGroup countryEntries={unselected} checked={false} />
      </FormGroup>
      <FormHelperText>Pick at least one</FormHelperText>
    </FormControl>
  );
};

export default CountriesCheckboxForm;
