import { memo, useState } from 'react';
import Countdown from 'react-countdown';

import { GrRotateLeft } from 'react-icons/gr';
import { motion, AnimatePresence } from 'framer-motion';
import useApiMutation from '@/hooks/dashboard/useApiMutation';

// ------------------------------

const ResendOTPToken = memo(function ResendOTPToken() {
  const [countDownKey, setCountDownKey] = useState(0);

  const mutation = useApiMutation({
    url: '/auth/',
    method: 'post',
  });

  function resetCountDown() {
    setCountDownKey((prev) => prev + 1);
    mutation.mutate({
      phone: `0${sessionStorage.getItem('upn')}`,
    });
  }

  return (
    <Countdown
      key={countDownKey}
      date={Date.now() + 65000}
      renderer={(props) => CountDownRenderer({ ...props, resetCountDown })}
    />
  );
});

export default ResendOTPToken;

// ------------------------------

type CountDownRendererProps = {
  seconds: number;
  minutes: number;
  completed: boolean;
  resetCountDown: () => void;
};

const CountDownRenderer = (props: CountDownRendererProps) => {
  const { seconds, minutes, completed, resetCountDown } = props;

  return (
    <div className="relative w-20 h-11 bg-zinc-100 text-zinc-600 rounded-md">
      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div
            key={'reset-button'}
            className="absolute inset-0"
            exit={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0, x: -10 }}
          >
            <button
              type="button"
              onClick={resetCountDown}
              className="full-size flex-center"
            >
              <GrRotateLeft size={20} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={'deadline-timer'}
            exit={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, x: 10 }}
            className="absolute inset-0 text-cs08/3 font-bold pt-0.5 flex-center gap-0.5"
          >
            <span className="w-3">{String(minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span className="w-3">{String(seconds).padStart(2, '0')}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
