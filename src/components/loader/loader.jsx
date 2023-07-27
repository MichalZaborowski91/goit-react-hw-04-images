import { RotatingLines } from 'react-loader-spinner';
import css from './loader.module.css';
const Loader = () => {
  return (
    <div className={css.loaderBox}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;
