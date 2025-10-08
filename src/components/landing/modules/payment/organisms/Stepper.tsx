'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { payment } from '../helpers/constant';
import { Step, StepBackButton } from '../molecules/stepper';

// ------------------------------

export function Stepper() {
  const { stepper } = payment;
  const pathname = usePathname();

  // === Calculate Active-Step
  const activeStep = useMemo(() => {
    function checkInclude(value: string) {
      return pathname.includes(value);
    }

    return checkInclude('complete-passengers-information')
      ? 1
      : checkInclude('check-reservation-information')
        ? 2
        : 4;
  }, [pathname]);

  return (
    <div className="lg:col-span-2">
      <div className="flex-between items-center lg:bg-white lg:p-5 lg:border lg:rounded-xl">
        <div className="flex-1 flex gap-1.5 lg:flex-none lg:gap-14">
          {stepper.map((step, index) => (
            <Step
              key={index}
              step={index}
              icon={step.icon}
              title={step.title}
              isActive={activeStep === index + 1}
              isConfirmed={activeStep > index + 1}
            />
          ))}
        </div>

        <div className="hidden lg:block">
          <StepBackButton activeStep={activeStep} />
        </div>
      </div>

      <div className="bg-white p-4 mt-6 flex-between items-center border rounded-xl lg:hidden">
        <div className="text-cs08/5 font-bold grid gap-1.5">
          <span className="text-zinc-500">
            مرحله {stepper[activeStep - 1].step}
          </span>

          <span>{stepper[activeStep - 1].title}</span>
        </div>

        <StepBackButton activeStep={activeStep} />
      </div>
    </div>
  );
}
