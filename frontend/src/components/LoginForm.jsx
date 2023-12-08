import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

import style from "../styles/LoginPage.module.css";
import loginChar from "../media/login_characters.svg";
import loginLock from "../media/login_lock.svg";
import loginGoogle from "../media/login_google.svg"


// import { useLocalStorage } from "../hooks/useLocalStorage";
import { useLoginMutation } from "../services/apiScan";
import { setCredentials } from "../slicers/authSlice";
import { useSelector } from "react-redux";
import { setSearchOptions, selectSearchOptions } from "../slicers/searchSlice";

import { useDispatch } from "react-redux";

function LoginForm() {
    const navigate = useNavigate();
    const searchOptions = useSelector(selectSearchOptions);

    // useEffect(() => {
    //     store.token && navigate("/");
    // });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            login: "sf_student1",
            password: "4i2385j",
        },
        // defaultValues: {
        //     login: "sf_student1",
        //     password: "4i2385j",
        // },
    });

    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();

    const [isAuthError, setIsAuthError] = useState(false);
    const onSubmit = async (data, e) => {

        e.preventDefault()
        try {
            const credentials = await login(data).unwrap()
            console.log('from rtk')
            dispatch(setCredentials(credentials))
            setIsAuthError(false);
            navigate('/')
        } catch (err) {
            console.log('error fetch token', err)
            setIsAuthError(true);
        }
        // console.log('form submit', data);
        reset();
    };
    //const store_test = { isAuthError: true, isLoading: true };

    return (
        <form className={style.login_group} onSubmit={handleSubmit(onSubmit)}>
            <img className={style.lock} src={loginLock} alt="" />
            <div className={style.button_links}>
                <button >
                    <Link to="/auth">Войти</Link>
                </button>
                <button >
                    <Link to="/about">Зарегистрироваться</Link>
                </button>
            </div>
            <label className={style.label}>
                {isAuthError
                    ? "Неправильный логин или номер телефона"
                    : "Логин или номер телефона:"}
                <input
                    {...register("login", {
                        required: true,
                    })}
                    className={
                        errors?.login ? style.input_error : style.input
                    }
                    type="text"
                />
                {errors?.login && (
                    <p className={style.error_message}>Введите корректные данные</p>
                )}
            </label>
            <label className={style.label}>
                {isAuthError ? "Неправильный пароль" : "Пароль:"}
                <input
                    {...register("password", {
                        required: true,
                    })}
                    className={
                        errors?.password ? style.input_error : style.input
                    }
                    type="password"
                    autoComplete="on"
                />
                {errors?.password && (
                    <p className={style.error_message}>Введите корректные данные</p>
                )}
            </label>
            <button
                disabled={!isValid}
                className={style.button_submit}
                type="submit"
            >
                Войти
            </button>
            <Link className={style.restore_pass} to="/about">
                Восстановить пароль
            </Link>
            <p className={style.sign_social_text}>Войти через:</p>
            <div className={style.sign_social}>
                <Link to="https://google.com" target="_blank">
                    <img src={loginGoogle} alt="" />
                </Link>

            </div>
        </form>
    );

}

export default LoginForm;
