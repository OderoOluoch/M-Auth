import { useRef } from 'react';
import styles from '../../styles/styles.module.scss';
import { Form } from '@unform/web';
import Input from '../Input Fields/Input';
import { useFormData } from '../../context';
import * as yup from 'yup';

const schema = yup.object().shape({
  msisdn: yup
    .number()
    .required()
    .positive()
    .integer('Please Enter a Valid Phone Number'),
});

export default function MSISDNInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useFormData();
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed - do something with data
      setFormValues(data);
      nextFormStep(data);
    } catch (err) {
      const errors = {};
      // Validation failed - do show error
      if (err instanceof yup.ValidationError) {
        console.log(err.inner);
        // Validation failed - do show error
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        formRef.current.setErrors(errors);
      }
    }
  }

  return (
    <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      <h2>Enter MSISDN</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <Input
            type='number'
            label='Phone number'
            name='msisdn'
            maxLength='10'
          />
        </div>
        <button type='submit'>Next</button>
      </Form>
    </div>
  );
}
