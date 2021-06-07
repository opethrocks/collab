import logo from '../../assets/icon.png';
import classes from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={classes.Logo} style={{ height: props.height }}>
      <img src={logo} alt="logo" onClick={props.clicked} />
    </div>
  );
};

export default Logo;
