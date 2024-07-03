import { useEffect, useRef } from 'react';
import styles from './ModalContent.module.css';
import { TfiClose } from 'react-icons/tfi';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalContent = ({ children, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      disableBodyScroll(modalElement);
    }

    return () => {
      if (modalElement) {
        enableBodyScroll(modalElement);
      }
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>
          <TfiClose style={{ fontSize: '20px' }} />
        </button>
        <h3> Your tasks for today </h3>
        {children}
      </div>
    </div>
  );
};

export default ModalContent;
