import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/styles.module.scss';
import { Form } from '@unform/web';
import CheckBox from '../Input Fields/CheckBox';
import { useFormData } from '../../context';
import * as yup from 'yup';
import { useRouter } from 'next/router';

import { server } from '../../config';

const schema = yup.object().shape({
  checkbox: yup.bool().oneOf([true], 'Checkbox is required'),
});

export async function getStaticProps(context) {
  console.log('context', context);
  const sessionId = '234234234242355';
  const res = await fetch(`${server}/api/consent?session_id=${sessionId}`);
  const consentData = await res.json();
  return {
    props: {
      consentData,
    },
  };
}

const isLogin = (data) => {
  if (data) {
    if (data.transaction) {
      return false;
    }
    return true;
  }
  return true;
};

export default function ConfirmAuth({ formStep, nextFormStep, ...rest }) {
  const { setFormValues } = useFormData();
  const [action, setAction] = useState('login'); // login | trans
  const [consentData, setconsentData] = useState({
    application: {
      client_id: 'm-duka',
      name: 'M-Duka',
      description: 'M-duka Online Shopping',
      callback_url: 'http://localhost:3005',
      redirect_url:
        'https://jumia.co.ke/auth/mauth/callback,http://localhost:3000/auth/callback',
      date_registered: null,
      status: 'A',
    },
    scopes: [
      {
        name: 'read:customer.info',
        description: 'Read your KYC information',
      },
      {
        name: 'authorize:transactions',
        description: 'Initate Checkout transactions',
      },
    ],
    transactionDetails: [
      {
        name: 'Paybill',
        value: '50556666',
      },
      {
        name: 'organisation',
        value: 'Cell',
      },
      {
        name: 'cost',
        value: '23',
      },
    ],
    transaction: null,
  });
  const formRef = useRef();

  const handleConfirmation = (data) => {
    setFormValues(data);
    nextFormStep(data);
  };

  // async function handleSubmit(data) {
  //   try {
  //     formRef.current.setErrors({});

  //     await schema.validate(data, {
  //       abortEarly: false,
  //     });
  //     // Validation passed - do something with data
  //     setFormValues(data);
  //     // e.preventDefault()
  //     // router.push('/confirm/auth')

  //     nextFormStep(data);
  //   } catch (err) {
  //     const errors = {};
  //     // Validation failed - do show error
  //     if (err instanceof yup.ValidationError) {
  //       console.log(err.inner);
  //       // Validation failed - do show error
  //       err.inner.forEach((error) => {
  //         errors[error.path] = error.message;
  //       });
  //       formRef.current.setErrors(errors);
  //     }
  //   }
  // }

  useEffect(() => {
    console.log('rest props', rest);
  }, []);

  return (
    <div className={formStep === 3 ? styles.showForm : styles.hideForm}>
      <h2>Confirm Authentication</h2>

      <Form ref={formRef} onSubmit={handleConfirmation}>
        {!isLogin(consentData) ? (
          <>
            <div>You are about to approve a transaction</div>
            <div>
              {consentData.transactionDetails.map((scope, index) => (
                <p key={index}>
                  {scope.name}: {scope.value}
                </p>
              ))}
            </div>
          </>
        ) : (
          <>
            <div>{consentData.application.name} wants to access:</div>
            <div>
              {consentData.scopes.map((scope, index) => (
                <p key={index}>{scope.description}</p>
              ))}
            </div>
          </>
        )}
        {isLogin(consentData) ? (
          <button type='submit'>Click to confirm login with Mpesa</button>
        ) : (
          <button type='submit'>Click to Pay with Mpesa</button>
        )}
        <button type='submit'>Reject</button>
      </Form>
    </div>
  );
}
