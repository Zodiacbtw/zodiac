import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const phoneRegExp = /^(05\d{9})$/;
const taxNoRegExp = /^T\d{4}V\d{6}$/;
const ibanRegExp = /TR[0-9]{2}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{2}|TR[0-9]{24}/;

const SignUpPage = () => {
  const rolesFromStore = useSelector(state => state.client.roles);
  const isRolesLoadingFromStore = useSelector(state => state.client.isRolesLoading);

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [defaultRoleId, setDefaultRoleId] = useState('');
  const [storeRoleId, setStoreRoleId] = useState('');

  const schema = useMemo(() => yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain a lowercase letter')
      .matches(/[A-Z]/, 'Password must contain an uppercase letter')
      .matches(/[0-9]/, 'Password must contain a number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain a special character'),
    confirmPassword: yup.string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    role_id: yup.string().required('Role is required'),
    storeName: yup.string().when('role_id', {
      is: (roleId) => roleId === storeRoleId && !!storeRoleId,
      then: (s) => s.required('Store name is required').min(3, 'Store name must be at least 3 characters'),
      otherwise: (s) => s.optional(),
    }),
    storePhone: yup.string().when('role_id', {
      is: (roleId) => roleId === storeRoleId && !!storeRoleId,
      then: (s) => s.required('Store phone is required').matches(phoneRegExp, 'Invalid phone number (e.g., 05xxxxxxxxx)'),
      otherwise: (s) => s.optional(),
    }),
    storeTaxId: yup.string().when('role_id', {
      is: (roleId) => roleId === storeRoleId && !!storeRoleId,
      then: (s) => s.required('Store Tax ID is required').matches(taxNoRegExp, 'Invalid Tax ID format (TXXXXVXXXXXX)'),
      otherwise: (s) => s.optional(),
    }),
    storeBankAccount: yup.string().when('role_id', {
      is: (roleId) => roleId === storeRoleId && !!storeRoleId,
      then: (s) => s.required('Store Bank Account is required').matches(ibanRegExp, 'Invalid IBAN format'),
      otherwise: (s) => s.optional(),
    }),
  }), [storeRoleId]);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role_id: '',
      storeName: '',
      storePhone: '',
      storeTaxId: '',
      storeBankAccount: '',
    }
  });

  const selectedRole = watch('role_id');

  useEffect(() => {
    if (rolesFromStore && rolesFromStore.length > 0) {
      const customerRole = rolesFromStore.find(role => role.code === 'customer');
      const storeRole = rolesFromStore.find(role => role.code === 'store');

      if (storeRole) {
        setStoreRoleId(storeRole.id.toString());
      }

      let newDefaultRoleId = '';
      if (customerRole) {
        newDefaultRoleId = customerRole.id.toString();
      } else if (rolesFromStore.length > 0) {
        newDefaultRoleId = rolesFromStore[0].id.toString();
      }
      
      setDefaultRoleId(newDefaultRoleId);
      
      reset(prevValues => ({
        ...prevValues,
        role_id: newDefaultRoleId,
      }));
    }
  }, [rolesFromStore, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { confirmPassword, storeName, storePhone, storeTaxId, storeBankAccount, ...basePayload } = data;
    let payload = { ...basePayload };

    if (payload.role_id === storeRoleId && !!storeRoleId) {
      payload.store = {
        name: storeName,
        phone: storePhone,
        tax_no: storeTaxId,
        bank_account: storeBankAccount,
      };
    }

    try {
      await axiosInstance.post('/signup', payload);
      toast.success('Registration successful! Please check your email to activate your account.');
      setTimeout(() => {
        history.goBack();
      }, 3000);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInputField = (id, label, type = 'text', validationName) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          type={type}
          {...register(validationName)}
          className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors[validationName] ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        />
        {errors[validationName] && <p className="mt-1 text-xs text-red-500">{errors[validationName].message}</p>}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {renderInputField("name", "Full Name", "text", "name")}
          {renderInputField("email", "Email address", "email", "email")}
          {renderInputField("password", "Password", "password", "password")}
          {renderInputField("confirmPassword", "Confirm Password", "password", "confirmPassword")}

          <div>
            <label htmlFor="role_id" className="block text-sm font-medium leading-6 text-gray-900">
              Role
            </label>
            <div className="mt-1">
              <select
                id="role_id"
                {...register('role_id')}
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors.role_id ? 'ring-red-500' : 'ring-gray-300'} focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              >
                {(isRolesLoadingFromStore || rolesFromStore.length === 0) && <option value="" disabled>Loading roles...</option>}
                {rolesFromStore.map(role => (
                  <option key={role.id} value={role.id.toString()}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && <p className="mt-1 text-xs text-red-500">{errors.role_id.message}</p>}
            </div>
          </div>

          {selectedRole === storeRoleId && !!storeRoleId && (
            <>
              <h3 className="text-lg font-medium leading-6 text-gray-900 pt-4 border-t mt-6">Store Information</h3>
              {renderInputField("storeName", "Store Name", "text", "storeName")}
              {renderInputField("storePhone", "Store Phone (e.g., 05xxxxxxxxx)", "tel", "storePhone")}
              {renderInputField("storeTaxId", "Store Tax ID (TXXXXVXXXXXX)", "text", "storeTaxId")}
              {renderInputField("storeBankAccount", "Store Bank Account (IBAN)", "text", "storeBankAccount")}
            </>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || isRolesLoadingFromStore}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-3" />
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
              )}
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;