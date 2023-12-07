import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import style from "../styles/SearchForm.module.css";
import { useId } from "react";
import { useSelector } from "react-redux";
import { setSearchOptions, selectSearchOptions } from "../slicers/searchSlice";
import { useEffect } from "react";
// import { parseISO } from 'date-fns';

import { useDispatch } from "react-redux";

function SearchCheckbox({ name, register, text }) {
    const idCheck = useId();
    return (
        <div className={style.check}>
            <input
                id={idCheck}
                type="checkbox"
                {...register(name)}
            />
            <label htmlFor={idCheck} className={style.checks_label}>
                {text}
            </label>
        </div>
    )
}

function SearchForm() {
    const navigate = useNavigate();
    let searchOptions = useSelector(selectSearchOptions);
    const dispatch = useDispatch();


    useEffect(() => {
        // resetSearchFormChecks();
        console.log('searchOptions from selector', searchOptions);
    }, [searchOptions]);

    const flagsArrayObj = [
        { id: 1, flag: 'maxFullness', text: "Признак максимальной полноты" },
        { id: 2, flag: 'inBusinessNews', text: "Упоминания в бизнес-контексте" },
        { id: 3, flag: 'onlyMainRole', text: "Главная роль в публикации" },
        { id: 4, flag: 'onlyWithRiskFactors', text: "Публикации только с риск-факторами" },
        { id: 5, flag: 'includeTechNews', text: "Включать технические новости рынков" },
        { id: 6, flag: 'includeAnnouncements', text: "Включать анонсы и календари" },
        { id: 7, flag: 'includeDigests', text: "Включать сводки новостей" }
    ]
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        defaultValues: { ...searchOptions, endDate: parseISO(searchOptions.endDate), startDate: parseISO(searchOptions.startDate) },

    });

    useEffect(() => {
        reset({ ...searchOptions, endDate: new Date(searchOptions.endDate), startDate: new Date(searchOptions.startDate) })
    }, [searchOptions])

    const listSearchCheckbox = flagsArrayObj.map(
        item =>
            <SearchCheckbox
                key={item.id} name={item.flag}
                register={register} text={item.text}
            />
    );
    // console.log(listSearchCheckbox)

    const store = { startDate: new Date(2022, 1, 10), endDate: new Date(2023, 10, 10) };

    const onSubmit = (data) => {
        console.log('form_search_data', data);
        dispatch(setSearchOptions({ ...data, endDate: data.endDate.toISOString(), startDate: data.startDate.toISOString() }));
        navigate("/results");
    };
    const setSearchFormChecks = (str) => {
        console.log(`${str}=true`);
    }

    return (
        <form className={style.search_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputs}>
                <label className={style.label}>
                    ИНН компании*
                    <input
                        className={
                            errors?.inn
                                ? `${style.input} ${style.input_invalid}`
                                : style.input
                        }
                        placeholder="10 цифр"
                        {...register("inn", {
                            required: true,
                            minLength: 10,
                            maxLength: 10,
                            pattern: {
                                value: /^[0-9]{10}$/,
                            },
                            validate: validateINN || "контроль не пройден"
                        })}
                    />
                    {errors?.inn && errors.inn.type === "required" && (
                        <p className={style.error_message}>Обязательное поле</p>
                    )}
                    {errors?.inn && errors.inn.type === "minLength" && (
                        <p className={style.error_message}>Не менее 10 цифр</p>
                    )}
                    {errors?.inn && errors.inn.type === "maxLength" && (
                        <p className={style.error_message}>Не более 10 цифр</p>
                    )}
                    {errors?.inn && errors.inn.type === "pattern" && (
                        <p className={style.error_message}>
                            Введите корректные данные
                        </p>
                    )}
                    {errors?.inn && errors.inn.type === "validate" && (
                        <p className={style.error_message}>
                            Контроль ИНН не пройден
                        </p>
                    )}
                </label>
                <label className={style.label}>
                    Тональность
                    <select {...register("tonality")}
                        className={style.input}
                    >
                        <option value={"any"}>Любая</option>
                        <option value={"positive"}>Позитивная</option>
                        <option value={"negative"}>Негативная</option>
                    </select>
                </label>
                <label className={style.label}>
                    Количество документов в выдаче*
                    <input
                        type="number"
                        className={
                            errors?.limit
                                ? `${style.input} ${style.input_invalid}`
                                : style.input
                        }
                        placeholder="От 1 до 1000"
                        {...register("limit", {
                            required: true,
                            min: 1,
                            max: 1000,
                        })}
                    />
                    {errors?.limit && errors.limit.type === "required" && (
                        <p className={style.error_message}>Обязательное поле</p>
                    )}
                    {errors?.limit && errors.limit.type === "min" && (
                        <p className={style.error_message}>Не менее 1</p>
                    )}
                    {errors?.limit && errors.limit.type === "max" && (
                        <p className={style.error_message}>Не более 1000</p>
                    )}
                </label>
                {/* <div className={style.date_picker_wrapper}>
                    <label className={style.label}>Диапазон поиска*</label>
                    <div className={style.date_picker}>
                        <div className={style.date_picker_label}>
                            <Controller
                                control={control}
                                name="startDate"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <ReactDatePicker
                                        onChange={onChange}
                                        selected={value}
                                        selectsStart
                                        required={true}
                                        className={`${style.input} ${style.dates}`}
                                        startDate={new Date(searchOptions.startDate)}
                                        dateFormat="dd.MM.yyyy"
                                        // minDate={new Date(searchOptions.startDate)}
                                        maxDate={new Date(searchOptions.endDate)}
                                        fixedHeight
                                        showYearDropdown
                                        placeholderText={'Дата начала'}
                                        popperPlacement='auto'
                                    />)}
                            />
                        </div>
                        <div className={style.date_picker_label}>
                            <Controller
                                control={control}
                                name="endDate"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <DatePicker
                                        onChange={onChange}
                                        selected={value}
                                        selectsEnd
                                        required={true}
                                        className={`${style.input} ${style.dates}`}
                                        startDate={new Date(searchOptions.startDate)}
                                        dateFormat="dd.MM.yyyy"
                                        minDate={new Date(searchOptions.startDate)}
                                        maxDate={new Date()}
                                        fixedHeight
                                        showYearDropdown
                                        popperPlacement='auto'
                                        placeholderText={'Дата конца'}
                                    />)}
                            />
                        </div>
                    </div>
                </div> */}
            </div>
            <div className={style.checks_wrapper}>
                <div className={style.checks}>

                    {listSearchCheckbox}
                </div>
                <div className={style.button}>
                    <button
                        disabled={!isValid}
                        className={style.button_submit}
                        type="submit"
                    >
                        Поиск
                    </button>
                    <p className={style.required_info}>* Обязательные к заполнению поля</p>
                </div>

            </div>
        </form>
    );
};

export default SearchForm;

function validateINN(inn) {
    if (inn.length !== 10) {
        return false; // ИНН должен состоять из 10 цифр
    }

    const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    let sum = 0;

    for (let i = 0; i < 9; i++) {
        sum += parseInt(inn.charAt(i)) * weights[i];
    }

    const remainder = sum % 11;
    const controlDigit = (remainder < 10) ? remainder : 0;

    return controlDigit === parseInt(inn.charAt(9));
}

// Пример использования:
// const inn = "1234567890"; // Замените на нужный ИНН
// const isValid = validateINN(inn);
// console.log(`ИНН ${inn} ${isValid ? "валиден" : "не валиден"}`);
