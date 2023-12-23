import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import style from "../styles/SearchPage.module.css";

import { Link } from "react-router-dom";


function SearchPage() {
    const store = { token: true };
    return (
        <div className={style.search}>

            <div className={style.texts_images}>
                <div className={style.search_text}>
                    <h1 className={style.search_title}>
                        Найдите необходимые<br /> данные в пару кликов.
                    </h1>
                    <p className={style.search_details}>
                        Задайте параметры поиска. <br />
                        Чем больше заполните, тем точнее поиск
                    </p>
                </div>

            </div>
            <div className={style.search_body}>
                {/* <div className={style.search_form}></div> */}

            </div>
        </div>
    );

}


export default SearchPage;
