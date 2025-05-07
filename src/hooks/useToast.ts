import { useState } from 'react';
import { ToastTypes } from '@/components';

export const useToast = () => {
  const [toastModal, setToastModal] = useState({
    visible: false,
    type: ToastTypes.info,
    message: '',
  });

  const closeToast = () => {
    setToastModal({ ...toastModal, visible: false });
  };

  const openToast = () => {
    setToastModal({ ...toastModal, visible: true });
  };

  const addToastOptions = (
    message: string,
    type: ToastTypes = ToastTypes.info,
    visible: boolean = true
  ) => {
    setToastModal({
      visible,
      type,
      message,
    });
  };

  return {
    openToast,
    closeToast,
    addToastOptions,
    toastType: toastModal.type,
    toastVisible: toastModal.visible,
    toastMsg: toastModal.message,
  };
};
