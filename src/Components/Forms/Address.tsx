import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../../actions';
import { RootState } from '../../reducers';

// Define the structure of your form data
interface Form {
  address: string;
  state: string;
  city: string;
  pincode: number;
}

interface AddressProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}



const Address: React.FC<AddressProps> = ({ formData, setFormData, setStepper }) => {
  const { control, handleSubmit } = useForm<Form>();

  const dispatch = useDispatch();
  const formSubmissions = useSelector((state: RootState) => state);

  console.log(formSubmissions);

  const [countryData, setCountryData] = useState<string[]>([]);
  const getCountries = () => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((res) => {
        console.log(res.data);
        const pushData: string[] = [];
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          pushData.push(element.name.common);
        }
        setCountryData(pushData);
      })
      .catch((error) => {
        console.log(error);
        setCountryData([]);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountryChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    setSelectedCountry(newValue);
  };


  const onSubmit = (data: Form) => {
    const submitData = { ...formData, ...data, selectedCountry };
    dispatch(submitForm(submitData));
    setStepper(1);
  }



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <TextField {...field} label="Address" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => <TextField {...field} label="State" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => <TextField {...field} label="City" fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              value={selectedCountry}
              onChange={handleCountryChange}
              options={countryData}
              renderInput={(params) => (
                <TextField {...params} label="Select Country" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Pincode" fullWidth />
              )}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" style={{ margin: 10 }}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Address;