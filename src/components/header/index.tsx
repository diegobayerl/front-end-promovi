import { useNavigate } from 'react-router-dom';
import logo from '../../assets/promovi.svg'
import styles from './styles.module.css';

import { ArrowBack } from "@mui/icons-material";


interface Header {
  pageName: string;
  goBack: boolean;
  status: boolean
}

function Header({pageName, status, goBack}: Header) {
    const navigate = useNavigate();
    return (
      <header className={styles.container}>
        { goBack ? (
          <ArrowBack onClick={() => navigate(-1)} />
        ):(
          <img src={logo} alt="" />
        )}
        <label>{pageName}</label>
        <label>{status ? ('On'):('Off')}</label>
      </header>
    );
};
  
export default Header;