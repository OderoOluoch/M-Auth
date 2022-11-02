/**
 * clientIp:
 * origin:
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import styles from '../../../styles/styles.module.scss';

import { server } from '../../../config';
import FormCard from '../../../components/FormCard';

import {
  MSISDNInfo,
  MpesaPinInfo,
  ConfirmAuth,
  OTPInfo,
} from '../../../components/Forms';
import FormCompleted from '../../../components/FormCompleted';

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/authorize`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
  const authorize = await res.json();
  return {
    props: {
      authorize,
    },
  };
}

const AuthPage = ({ authorize }) => {
  const [formStep, setFormStep] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [consentData, setconsentData] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { query } = router;

  const nextFormStep = async (evt) => {
    console.log('makes request', evt, formStep);
    if (formStep == 0) {
      // sent otp
      const res = await fetch(`${server}/api/sendotp?session_id=${sessionId}`, {
        method: 'POST',
        body: JSON.stringify({
          msisdn: evt.msisdn,
        }),
      });
      const data = await res.json();
      if (res.status == 200) {
        setFormStep((currentStep) => currentStep + 1);
      }
    }

    if (formStep == 1) {
      // validate otp
      const res = await fetch(
        `${server}/api/validateotp?session_id=${sessionId}`,
        {
          method: 'POST',
          body: JSON.stringify({
            msisdn: evt.msisdn,
          }),
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        setFormStep((currentStep) => currentStep + 1);
      }
    }
    if (formStep == 2) {
      // validate pin
      console.log('evt', evt);
      const res = await fetch(
        `${server}/api/validatepin?session_id=${sessionId}`,
        {
          method: 'POST',
          body: JSON.stringify({
            mpesapin: evt.MpesaPin, // look at encryting before sending to backend
          }),
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        setFormStep((currentStep) => currentStep + 1);
      }
    }
    if (formStep == 3) {
      router.push(`/confirm/auth?sessionid=${sessionId}`);
    }
  };

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  useEffect(() => {
    console.log('authorize', authorize.session_id);

    setSessionId(authorize.session_id);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>M-Auth</title>
      </Head>
      <h1>M-Auth Mpesa authenticator</h1>

      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep == 0 && (
          <MSISDNInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep == 1 && (
          <OTPInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep == 2 && (
          <MpesaPinInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep == 3 && (
          <ConfirmAuth
            sessionId={sessionId}
            formStep={formStep}
            nextFormStep={nextFormStep}
          />
        )}

        {formStep > 3 && <FormCompleted />}
      </FormCard>
    </div>
  );
};

export default AuthPage;
