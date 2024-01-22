// // // Assuming the type of your form data, replace 'any' with the actual type
// interface Form {
//     // Define the structure of your form data
//   }
  
  // interface FormAction {
  //   type: 'FORM';
  //   payload: Form;
  // }
  
// //   const initialState: Form[] = [];
  
// //   const onFormSubmit = (state: Form[] = initialState, action: FormAction): Form[] => {
// //     switch (action.type) {
// //       case 'FORM':
// //         return [
// //           ...state,
// //           action.payload,
// //         ];
// //       default:
// //         return state;
// //     }
// //   };
  
// //   export default onFormSubmit;


// // Reducer logic
// const formReducer = (state = [],  action: FormAction) => {
//   switch (action.type) {
//     case 'FORM':
//       return [...state, action.payload];
//     // ... other cases
//     default:
//       return state;
//   }
// };

//    export default formReducer;

// // reducer.ts
// import { SET_FORM_DATA } from '../actions/index';

// interface FormData {
//   firstName: string;
//   age: number;
//   gender: string;
//   mobile: number;
//   govt: string;
//   issueId: string;
//   address: string;
//   state: string;
//   city: string;
//   selectedCountry: string | null;
//   pincode: number;
// }

// interface SetFormDataAction {
//   type: typeof SET_FORM_DATA;
//   payload: FormData
// }

// const initialState: any = [];

// const formReducer = (state = initialState, action: SetFormDataAction): any[] => {
//   switch (action.type) {
//     case SET_FORM_DATA:
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };

// export default formReducer;

// formReducer.ts

import { SUBMIT_FORM, SubmitFormAction } from '../actions';

interface FormState {
  formSubmissions: any[];
}

const initialState: FormState = {
  formSubmissions: [],
};

type FormAction = SubmitFormAction;

const formReducer = (state = initialState, action: FormAction): FormState => {
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        ...state,
        formSubmissions: [...state.formSubmissions, action.payload],
      };
    default:
      return state;
  }
};

export default formReducer;
