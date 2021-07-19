import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

type CountryEntries = [
  string,
  {
    Country: string;
    ISO2: string;
  }
][];

interface Props {
  countryEntries: CountryEntries;
  checked?: boolean;
}

const CheckboxGroup = ({ countryEntries, checked = false }: Props) => (
  <>
    {countryEntries.map(([slug, { Country: countryName }]) => (
      <FormControlLabel
        key={slug}
        control={<Checkbox checked={checked} name={slug} />}
        label={countryName}
      />
    ))}
  </>
);

export default CheckboxGroup;
