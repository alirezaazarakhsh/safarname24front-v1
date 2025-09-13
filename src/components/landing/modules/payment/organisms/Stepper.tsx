'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Step } from '../molecules/stepper';
import { payment } from '../helpers/constant';

// ------------------------------

export function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { NUMBER_OF_STEPS, stepper } = payment;

  const goToNextStep = () =>
    setActiveStep((prev) => (prev === NUMBER_OF_STEPS - 1 ? prev : prev + 1));

  const goToPreviousStep = () =>
    setActiveStep((prev) => (prev <= 0 ? prev : prev - 1));

  return (
    <div className='lg:col-span-2'>
      <div className="flex-between items-center lg:bg-white lg:p-4 lg:border lg:rounded-xl">
        {/* === Steps */}
        <div className="flex-1 flex gap-1.5 lg:flex-none lg:gap-14">
          {stepper.map((step, index) => (
            <Step
              {...step}
              key={index}
              index={index}
              errorSlot={4}
              activeStep={activeStep}
            />
          ))}
        </div>

        <Link
          href={'/'}
          className="bg-zinc-100 text-cs08 font-semibold px-4 py-3 hidden rounded-lg lg:block"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>

      {/* === Step-Info (Small-Screen) */}
      <div className="bg-white text-cs08 font-semibold p-3 mt-6 flex-between items-center border rounded-cs-10 lg:hidden">
        <div className="grid gap-1.5">
          <span className="text-zinc-600">
            مرحله {stepper[activeStep].step}
          </span>
          <span>{stepper[activeStep].title}</span>
        </div>

        <div className="bg-zinc-100 text-zinc-600 h-full px-5 py-2 flex-center rounded-md">
          در حال تکمیل
        </div>
      </div>

      {/* === Controllers */}
      {/* <div className="flex-between mt-8">
        <button onClick={goToPreviousStep}>Previous step</button>
        <button onClick={goToNextStep}>Next step</button>
      </div> */}
    </div>
  );
}
