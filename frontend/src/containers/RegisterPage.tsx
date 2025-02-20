import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { redirect } from 'react-router-dom';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email('Invalid email!'),
    fullName: Yup.string()
      .required("Full name is required!")
      .min(4, "Minimum 4 characters!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Minimum 8 digits!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required("Confirm password is required!"),
})

const RegisterPage = () => (
  <div className='flex flex-col gap-2 items-center max-w-min px-8 py-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
    <div className='text-3xl w-[60px] h-[60px] rounded-full  bg-orange-400 dark:bg-orange-500 flex items-center justify-center '>
        <FontAwesomeIcon icon={faRightToBracket} />
    </div>
    <h1 className='text-2xl'>Register</h1>
    <Formik
      initialValues={{ 
        email: '', 
        fullName: '',
        password: '',
        confirmPassword: ''   
     }}
      validationSchema={registerSchema}
      onSubmit={ async (values, { setSubmitting }) => {
        setSubmitting(true)
        const BASE_URL = 'http://localhost:8000/register';
        const resp = await fetch(BASE_URL, {
          method: 'POST',
          body: JSON.stringify(values)
        })
        console.log(resp)
        if(resp.ok){
          return redirect('/')
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='flex flex-col gap-3'>
          <div>
              <label htmlFor='email'>Email</label>
              <Field type="email" name="email" placeholder="john@doe.com" className="min-w-[300px] sm:min-w-none outline-none bg-gray-100 dark:bg-gray-600 rounded-md px-4 py-2  "/>
              <ErrorMessage name="email" component="div" className='text-red-500 text-sm pl-2' />
          </div>
          <div>
              <label htmlFor='fullName'>Full Name</label>
              <Field type="fullName" name="fullName" placeholder="John Doe" className="min-w-[300px] sm:min-w-none outline-none bg-gray-100 dark:bg-gray-600 rounded-md px-4 py-2  "/>
              <ErrorMessage name="fullName" component="div" className='text-red-500 text-sm pl-2'/>
          </div>
          <div>
              <label>Password</label>
              <Field type="password" name="password" className="min-w-[300px] sm:min-w-none outline-none bg-gray-100 dark:bg-gray-600 rounded-md px-4 py-2  "/>
              <ErrorMessage name="password" component="div" className='text-red-500 text-sm pl-2'/>
          </div>            
          <div>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <Field type="confirmPassword" name="confirmPassword" className="min-w-[300px] sm:min-w-none outline-none bg-gray-100 dark:bg-gray-600 rounded-md px-4 py-2  "/>
              <ErrorMessage name="confirmPassword" component="div" className='text-red-500 text-sm pl-2' />
          </div>
          <div className='flex items-center justify-center'>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className=' bg-orange-400 dark:bg-orange-500 px-4 py-2 rounded-md'
            >
                Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default RegisterPage;