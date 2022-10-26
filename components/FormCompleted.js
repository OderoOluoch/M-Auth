import { useFormData } from "../context";

export default function FormCompleted() {
  const { data } = useFormData();

  return (
    <>
      <h2>Thank you for Transacting with us, Please hold while we redirect you to your Initial site  🎉</h2>

      <pre>{JSON.stringify(data)}</pre>
    </>
  );
}
