import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

interface Props {
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
  name?: string;
  className?: string | undefined;
  max?: string;
}

const DatePicker = ({
  value,
  handleChange,
  label = 'Pick a date',
  name = 'date_' + label,
  className,
  max,
}: Props) => {
  return (
    <FormControl className={className}>
      <TextField
        fullWidth
        type="date"
        name={name}
        id={name}
        label={label}
        inputProps={{
          min: '2019-01-01',
          max,
        }}
        value={value}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
};

export default DatePicker;
