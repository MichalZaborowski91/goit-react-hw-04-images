import css from './modal.module.css';

const Modal = ({ image, onClose }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img className={css.image} src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

export default Modal;
