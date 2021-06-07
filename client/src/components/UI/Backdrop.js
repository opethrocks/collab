import classes from './Backdrop.module.css';

const Backdrop = (props) => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}>
      {props.children}
    </div>
  ) : null;
};

export default Backdrop;
