import { createPortal } from 'react-dom';
import ModalContent from './components/ModalContent';
import Form from '../Form/Form';
import ToDoList from '../ToDoList/ToDoList';

interface Props {
  showModal: boolean;
  onClose: () => void;
  dayId?: string;
}

const Modal = ({ showModal, onClose, dayId }: Props) => {
  if (!showModal) return null;

  return (
    <>
      {showModal &&
        createPortal(
          <ModalContent onClose={onClose}>
            <Form dayId={dayId as string} />
            <ToDoList dayId={dayId as string} />
          </ModalContent>,
          document.body,
        )}
    </>
  );
};

export default Modal;
