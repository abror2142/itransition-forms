import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!"),
    password: Yup.string()
})

const LoginPage = () => {
  const { handleLogin} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className='flex flex-col gap-4 items-center mx-auto px-8 py-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
      <div className='text-3xl w-[60px] h-[60px] rounded-full  bg-orange-400 dark:bg-orange-500 flex items-center justify-center '>
          <FontAwesomeIcon icon={faUnlock} />
      </div>
      <h1 className='text-2xl'>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          const json = JSON.stringify(values)
          const resp = await handleLogin(json);
          if(resp?.status == 200){
            setSubmitting(false);
            return navigate('/')
          }else {
            setError("Invalid Credentials");
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col gap-4 '>
            {error && <p className='text-red-500'>{error}</p>}
              <div className='flex flex-col'>
                  <label htmlFor='email' className=''>Email</label>
                  <Field id="email" type="email" name="email" className="outline-none bg-gray-100 dark:bg-gray-500 rounded-md px-4 py-2  min-w-[300px]"/>
                  <ErrorMessage name="email" component="div" className='text-red-500' />
              </div>
              <div className='flex flex-col'>
                  <label htmlFor='password' className=''>Password</label>
                  <Field id="password" type="password" name="password" className="outline-none bg-gray-100 dark:bg-gray-500 rounded-md px-4 py-2 min-w-[300px]" />
                  <ErrorMessage name="password" component="div" className='text-red-500' />
              </div>
            <div className='flex items-center justify-center'>
              <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`bg-orange-400 dark:bg-orange-500 px-4 py-2 rounded-md ${isSubmitting && "bg-gray-400 dark:bg-gray-600"}`}
              >
                  Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) 
};

export default LoginPage;