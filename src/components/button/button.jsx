import css from './button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.loadMoreBtn} onClick={onClick}>
      Load more
    </button>
  );
};
export default Button;
