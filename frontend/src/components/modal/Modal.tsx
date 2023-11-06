import { useEffect, useRef, useState } from 'react';
import type { TModalProps } from '../../types';
import { useNavigate } from 'react-router-dom';
import styles from './Modal.module.css';

const Modal = ({ shouldOpen, children }: TModalProps) => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    // using an effect to change isOpen state thus
    // allowing us to use another effect to open/close
    // the modal using refs
    setIsOpen(shouldOpen);
  }, [shouldOpen]);
  useEffect(() => {
    const modal = dialogRef.current;
    if (modal) {
      isOpen ? modal.showModal() : modal.close();
    }
  }, [isOpen]);
  dialogRef.current?.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      navigate('/play');
    }
  });
  return (
    <dialog ref={dialogRef} className={styles.modal}>
      {children}
    </dialog>
  );
};

export default Modal;
