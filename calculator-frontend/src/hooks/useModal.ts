import { useCallback, useState } from "react";

export type UseModalProps = {
  beforeOnOpen?: () => void;
  beforeOnClose?: () => void;
  afterOnOpen?: () => void;
  afterOnClose?: () => void;
};

export const useModal = ({
  beforeOnOpen,
  beforeOnClose,
  afterOnClose,
  afterOnOpen,
}: UseModalProps = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  const onOpen = useCallback(() => {
    beforeOnOpen !== undefined && beforeOnOpen();
    setIsOpen(true);
    afterOnOpen !== undefined && afterOnOpen();
  }, [beforeOnOpen, afterOnOpen]);

  const onClose = useCallback(() => {
    beforeOnClose !== undefined && beforeOnClose();
    setIsOpen(false);
    afterOnClose !== undefined && afterOnClose();
  }, [beforeOnClose, afterOnClose]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const reset = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return { isOpen, onOpen, onClose, open, close, reset, data, setData };
};
