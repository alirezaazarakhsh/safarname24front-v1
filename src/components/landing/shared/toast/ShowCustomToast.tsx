import { CustomToast } from './custom-toast';
import { Slide, toast, ToastContainerProps } from 'react-toastify';

const toastContainerStyle = {
  autoClose: 5000,
  transition: Slide,
  closeButton: false,
  position: 'bottom-left',
  customProgressBar: true,
  className: '!w-auto p-0 z-[999999] rounded-xl',
};

// -----------------------------

type ToastData = {
  title: string;
  subtitle: string;
  type: 'success' | 'error';
};

export function showCustomToast(data: ToastData) {
  const { title, type, subtitle } = data;

  toast(
    ({ ...rest }) => (
      <CustomToast
        {...rest}
        data={{
          type,
          title,
          subtitle,
        }}
      />
    ),
    toastContainerStyle as ToastContainerProps,
  );
}
