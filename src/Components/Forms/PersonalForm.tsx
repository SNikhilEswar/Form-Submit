
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';


interface Form {
  firstName: string;
  age: number;
  gender: string;
  mobile: number;
  govt: string;
  issueId: string;
}

const schema = yup.object().shape({
  firstName: yup.string()
    .required('First name is required')
    .test('len', 'Name must be at least 3 characters', (val: string | undefined) => !!val && val.length >= 3),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .test('len', 'Age must be exactly 3 digits or less than 3 digits', (val): val is number =>
      Boolean(val && val.toString().length <= 3))
    .required('Age is required'),
  gender: yup.string().required('Gender is required'),
  mobile: yup
    .number()
    .typeError('Mobile Number must be a number')
    .integer('Mobile Number must be an integer')
    .test('len', 'Mobile Number must be 10 digits', (val): val is number =>
      Boolean(val && val.toString().length === 10))
    .required('Mobile Number is required'),
  govt: yup.string().required('Gender is required'),
  issueId: yup.string().required('Govt Issued Id is required'),
});

interface ValidationFormProps {
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<Form | undefined>>;
}

const ValidationForm: React.FC<ValidationFormProps> = ({ setStepper, setFormData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const govt = watch('govt');

  useEffect(() => {
    const updateValidationSchema = async () => {
      if (govt === 'Aadhar') {
        schema.fields.issueId = yup.string()
          .matches(/^[2-9]\d{11}$/, 'Aadhar should have 12 numeric digits and should not start with 0 and 1')
          .required('Govt Issued Id is required');
      } else if (govt === 'PAN') {
        schema.fields.issueId = yup.string()
          .matches(/^[A-Z0-9]{10}$/, 'PAN should be a ten-character long alpha-numeric string')
          .required('Govt Issued Id is required');
      } else {
        schema.fields.issueId = yup.string().required('Govt Issued Id is required');
      }
    };

    updateValidationSchema();
  }, [govt]);

  const onSubmit: SubmitHandler<Form> = (data) => {
    if (data) setFormData(data);
    setStepper(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Age"
                fullWidth
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" style={{ color: !!errors.gender ? 'red' : '' }}>Sex</InputLabel>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    error={!!errors.gender}
                    label="Sex"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>{errors.gender?.message}</FormHelperText>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Mobile"
                fullWidth
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="govt"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-govt-select-label" style={{ color: !!errors.govt ? 'red' : '' }}>Govt Issued ID Type</InputLabel>
                  <Select
                    {...field}
                    labelId="demo-govt-select-label"
                    id="demo-simple-select"
                    label="Govt Issued ID Type"
                    error={!!errors.govt}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
                    <MenuItem value={"PAN"}>PAN</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText style={{ color: 'red' }}>{errors.govt?.message}</FormHelperText>
              </>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="issueId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Govt Issued Id"
                fullWidth
                error={!!errors.issueId}
                helperText={errors.issueId?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary" style={{ margin: 10 }}>
        Next
      </Button>
    </form>
  );
};

export default ValidationForm;