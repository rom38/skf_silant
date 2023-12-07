import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SearchForm from "./SearchForm";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import style from "../styles/SearchPage.module.css";
import document from "../media/search_document.svg";
import folders from "../media/search_folders.svg";
import man from "../media/search_man.svg";

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
                <img src={document} alt="document" className={style.document_img} />
                <img src={folders} alt="folders" className={style.folders_img} />
            </div>
            <div className={style.search_body}>
                {/* <div className={style.search_form}></div> */}
                <SearchForm />
                <div className={style.search_images}>
                    <img src={man} alt="man" className={style.man_img} />
                </div>
            </div>
        </div>
    );

}


export default SearchPage;
