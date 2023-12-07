// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import style from "../styles/Layout.module.css";
import imageLogo1 from "../media/scan_logo_1.svg";
import imageLogo2 from "../media/scan_logo_2.svg";
import HeaderComp from "./HeaderComp";

export const Layout = () => {
    const classActive = ({ isActive }) => isActive ? style.active : "";

    return (<>
        {/* <header>
            <img src={imageLogo2} className={style.headerCol1} alt="" />
            <div className={`${style.headerLinks} ${style.headerCol2}`}>
                <NavLink to="/main" className={classActive}>Главная</NavLink>
                <NavLink to="/about" className={classActive}>Тарифы</NavLink>
                <NavLink to="#" className={style.disableLink} >FAQ</NavLink>

            </div>
            <div className={`${style.headerLinks} ${style.headerCol3}`}>
                <p >Зарегистрироваться</p>
                <div className={style.divVertStick}></div>
                <NavLink to="/login" className={`${classActive} ${style.button}`}>Войти</NavLink>
            </div>
        </header> */}
        <HeaderComp />
        <main>

            <Outlet />
        </main>
        <footer>
            <img src={imageLogo1} alt="" />
            <p>г. Москва, Цветной б-р, 40 <br />+7 495 771 21 11<br /> info@skan.ru<br /><br />Copyright, 2022  </p>
        </footer >
    </>
    )
}

