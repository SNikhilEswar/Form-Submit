export const SUBMIT_FORM = 'SUBMIT_FORM';

export interface FormSubmission {
  firstName: string;
  age: number;
  gender: string;
  mobile: number;
  govt: string;
  issueId: string;
  address: string;
  state: string;
  city: string;
  selectedCountry: string | null;
  pincode: number;
}

export interface SubmitFormAction {
  type: typeof SUBMIT_FORM;
  payload: FormSubmission;
}

export const submitForm = (formData: FormSubmission): SubmitFormAction => ({
  type: SUBMIT_FORM,
  payload: formData,
});


