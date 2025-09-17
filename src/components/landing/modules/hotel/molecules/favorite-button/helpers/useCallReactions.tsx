import { openDrawer } from './Drawer';
import { useMediaQuery } from '@/hooks';
import { showCustomToast } from '@/components/landing/shared/toast';

type CallReactionArgs = {
  error?: string;
  type: 'success' | 'error';
  context: 'add-collection' | 'favorite-saved' | 'favorite-unsaved';
};

const responseSample = {
  title: {
    success: 'عملیات با موفقیت انجام شد',
    error: 'متاسفانه خطایی رخ داده است !',
  },
  description: {
    general: 'در انجام عملیات مشکلی بوجود آمده است',
    addCollection: 'لیست جدید مورد علاقه شما ایجاد شد',
    favorite: {
      saved: 'هتل شما به لیست مورد نظر اضافه شد',
      unsaved: 'هتل شما از لیست مورد نظر حذف شد',
    },
  },
};

export default function useCallReactions() {
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const callReaction = ({ error, type, context }: CallReactionArgs) => {
    const title = responseSample.title[type];
    const subtitle =
      type === 'error'
        ? (error ?? responseSample.description.general)
        : context === 'add-collection'
          ? responseSample.description.addCollection
          : context === 'favorite-saved'
            ? responseSample.description.favorite.saved
            : responseSample.description.favorite.unsaved;

    if (isDesktop) {
      showCustomToast({ type, title, subtitle });
    } else {
      openDrawer({ type, title, subtitle });
    }
  };

  return callReaction;
}
