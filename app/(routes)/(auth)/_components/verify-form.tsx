"use client";

import { newVerification } from "@/actions/verify";
import { FormError } from "@/app/(routes)/(auth)/_components/ui/form-error";
import { FormSuccess } from "@/app/(routes)/(auth)/_components/ui/form-success";
import Title from "@/components/_typography/title";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  let params,
    token: string | null = null;
  if (typeof window !== "undefined") {
    params = new URLSearchParams(document.location.search);
    token = params.get("token");
  }

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Brak tokenu weryfikacyjnego!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Coś poszło nie tak! :c");
      });
  }, [error, success, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto grid h-full place-items-center gap-10 px-8">
        <Title title="Weryfikacja adresu e-mail" />

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mx-auto w-full rounded-[20px] bg-white px-6 py-8 shadow-[0px_3px_12px_0px_#D7DDFC] lg:w-1/2"
        >
          {!success && !error && (
            <div className="flex items-center justify-center">
              <BeatLoader color="#3452fe" />
            </div>
          )}

          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </div>
    </section>
  );
};

export default VerificationForm;
