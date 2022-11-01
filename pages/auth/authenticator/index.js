
import { useState, useRef } from "react";
import Head from "next/head";

import styles from "../../../styles/styles.module.scss"



import FormCard from "../../../components/FormCard"

import {
  MSISDNInfo,
  MpesaPinInfo,
  ConfirmAuth,
  OTPInfo,
} from "../../../components/Forms";
import FormCompleted from "../../../components/FormCompleted";

const AuthPage = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <div className={styles.container}>
      <Head>
        <title>M-Auth</title>
      </Head>
      <h1>M-Auth Mpesa authenticator</h1>

      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep >= 0 && (
          <MSISDNInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep >= 1 && (
          <OTPInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep >= 2 && (
          <MpesaPinInfo formStep={formStep} nextFormStep={nextFormStep} />
        )}
        {formStep >= 3 && (
          <ConfirmAuth formStep={formStep} nextFormStep={nextFormStep} />
        )}

        {formStep > 3 && <FormCompleted />}
      </FormCard>
    </div>
  );
};

export default AuthPage;
