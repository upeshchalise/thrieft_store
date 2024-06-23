
import * as yup from 'yup';

// import { emailRegex } from '../../../__mocks__/emailValidation';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export enum role {
    customer = "CUSTOMER"
}
export const createUniversityAccountSchema = () =>
    yup.object().shape({
      firstName: yup
        .string()
        .required('Please enter a First Name.')
        .min(3, 'First names should be minimum 3 characters'),
      lastName: yup
        .string()
        .required('Please enter a Last Name.')
        .min(3, 'Last name should be minimum 3 characters'),
      email: yup
        .string()
        .email('Please enter a valid email.')
        .matches(emailRegex, 'please enter a proper university email')
        .required('Please enter an email.'),
      password: yup
        .string()
        .required('Please enter a password.')
        .min(8, 'Password must be minimum of 8 characters.')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter.'),
        confirmPassword: yup
        .string()
        .required('Please enter a password.')
        .min(8, 'Password must be minimum of 8 characters.')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter.'),
        role: yup.string().required('Please select a country code.') as yup.Schema<role>,


    });
  

    export const LoginUser = () => 
        yup.object().shape({
        email: yup
        .string().required()
        .email('Please enter a valid email.'),
      password: yup
        .string()
        .required('Please enter a password.')
        })
    

        export const CreateProduct = () => 
          yup.object().shape({
          name: yup
          .string().required('Please enter a valid name.'),
        description: yup
          .string()
          .required('Please enter a description.'),
          price: yup.number().required('please enter valid price'),
          quantity: yup.number().required('please enter valid price'),
          file: yup.mixed().required("file is required")
          })