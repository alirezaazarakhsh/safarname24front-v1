import Countdown from 'react-countdown';

type Props = {
  seconds: number | null;
};

// ------------------------------

export function TimerDisplay(props: Props) {
  const { seconds } = props;

  if (!seconds) return;
  const endTime = Date.now() + seconds * 1000;

  return (
    <Countdown
      date={endTime}
      renderer={({ minutes, seconds }) => {
        return (
          <div className="flex-between items-center">
            <span>زمان باقی مانده :</span>

            <div className="font-bold flex items-center h-9 gap-2">
              <span className="border rounded-md h-full aspect-square flex-center">
                {String(seconds).padStart(2, '0')}
              </span>

              <span>:</span>

              <span className="border rounded-md h-full aspect-square flex-center">
                {String(minutes).padStart(2, '0')}
              </span>
            </div>
          </div>
        );
      }}
    />
  );
}
