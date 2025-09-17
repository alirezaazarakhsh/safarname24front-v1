import { Slide } from 'react-toastify';

// -----------------------------

// const toastContainerStyle = {
//   icon: false,
//   autoClose: 5000,
//   transition: Slide,
//   closeButton: false,
//   hideProgressBar: true,
//   position: 'bottom-left',
//   className:
//     ' bg-transparent p-4 pb-0 last:pb-4 min-[480px]:p-0 min-[480px]:last:pb-0',
// };

const toastContainerStyle = {
  autoClose: 5000,
  transition: Slide,
  closeButton: false,
  position: 'bottom-left',
  customProgressBar: true,
  className: 'w-[300px] p-0 rounded-xl',
};

export { toastContainerStyle };
