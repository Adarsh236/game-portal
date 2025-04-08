import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeModal } from '../redux/slices/modal-slice';
import { RootState } from '../redux/store';
import '../themes/modal.css';

const ModalQueue: React.FC = () => {
  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modal.queue);

  if (modals.length === 0) return null;

  const currentModal = modals[0];

  return (
    <div className="modal-container">
      <p>{currentModal.message}</p>
      <h3>{currentModal.title}</h3>
      <h2>{currentModal.description}</h2>
      <h4>{currentModal.subDescription}</h4>
      <Button
        onClick={() => dispatch(removeModal(currentModal.id))}
        style={{
          marginTop: '1rem',
          backgroundColor: 'var(--primary)',
          color: 'white',
        }}
      >
        {currentModal.buttonText}
      </Button>
    </div>
  );
};

export default ModalQueue;
