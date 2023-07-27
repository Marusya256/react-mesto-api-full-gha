import './../App.css';
import {Link, useNavigate} from 'react-router-dom';
import mestoAuth from './../utils/mestoAuth';
import React from 'react';
import Header from './../components/Header';

const Register = (props) => {

  const {onRegisteredFailed, onRegisteredSuccess} = props;

  const [formValue, setFormValue] = React.useState({
    useremail: '',
    userpassword: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;


    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { useremail, userpassword } = formValue;

    mestoAuth.register(useremail, userpassword)
    .then(() => {
      onRegisteredSuccess();
    })
    .then(() => navigate('/signin', {replace: true}))
    .catch(err => {
      onRegisteredFailed();
      });
  }


  return (
    <main className="">
      <Header buttonText={'Войти'} toLink={"/sign-n"} userEmail={props.userEmail} onClick={props.onClick}/>
      <div className="content">
        <form className="login__form" onSubmit={handleSubmit}>
          <h2 className="form__header">Регистрация</h2>
          <fieldset className="popup__field">
            <div className="popup__input-label">
              <input className="popup__input popup__input_type_login" onChange={handleChange} value={formValue.useremail} type="email" name="useremail" id="useremail" required placeholder="Email" minLength="2" maxLength="40" />
              <span className="popup__input-error username-error"></span>
            </div>      
            <div className="popup__input-label">
              <input className="popup__input popup__input_type_login" onChange={handleChange} value={formValue.userpassword} type="password" name="userpassword" id="userpassword" required placeholder="Пароль" minLength="2" maxLength="15" />
              <span className="popup__input-error aboutuser-error"></span>
            </div>
            <button className="button button_type_sub button_type_login" type="submit">Зарегистрироваться</button>
            <p className="form__text-register">Уже зарегистрированы? <Link to="/signin" className="form__link-register">Войти</Link></p>
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default Register;
