import React, { useState } from 'react'
import { Paper, Card } from '@mui/material';
import { useSelector } from 'react-redux';
import ValidationForm from './PersonalForm';
import Address from './Address';
import { RootState } from '../../reducers';
import ReactDataTables from '../ReactDataTables';
import "datatables.net-dt/css/jquery.dataTables.css";


export function MyForm() {

  const [formData, setFormData] = useState<any | null>(null);
  const [stepper, setStepper] = useState<number>(1);
  const formSubmissions = useSelector((state: RootState) => state.form.formSubmissions);


  const columns = [
    { data: 'firstName', title: 'Name' },
    { data: 'age', title: 'Age' },
    { data: 'gender', title: 'Sex' },
    { data: 'mobile', title: 'Mobile' },
    { data: 'govt', title: 'Govt Id Type' },
    { data: 'issueId', title: 'Govt Id' },
    { data: 'address', title: 'Address' },
    { data: 'state', title: 'State' },
    { data: 'city', title: 'City' },
    { data: 'selectedCountry', title: 'Country' },
    { data: 'pincode', title: 'Pincode' },
  ];

  const EmployeeTable = () => {
    return <ReactDataTables data={formSubmissions} columns={columns} />;
  };

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} style={{ width: '50%' }}>
          <h4 style={{ textAlign: 'center', paddingTop: 10 }}>{stepper === 1 ? 'Step One' : 'Step Two'}</h4>
          <div style={{ padding: 20 }}>
            {stepper === 1 && <ValidationForm
              setStepper={setStepper}
              setFormData={setFormData}
            />}
            {stepper === 2 && <Address formData={formData} setFormData={setFormData} setStepper={setStepper} />}
          </div>
        </Paper>
      </div>

      {formSubmissions.length > 0 ?
        <div style={{ margin: '40px 70px' }}>
          <Card sx={{ maxWidth: 1300 }} style={{ padding: 15 }}>
            <EmployeeTable />
          </Card>
        </div>
        : null}

    </>
  );
};

export default MyForm;


