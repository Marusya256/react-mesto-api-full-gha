import './../App.css';
import { useNavigate} from 'react-router-dom';
import mestoAuth from './../utils/mestoAuth';
import React from 'react';
import Header from './../components/Header';

function Login(props) {
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
    if (!formValue.useremail || !formValue.userpassword){
      return;
    }

    const { useremail, userpassword } = formValue;

    mestoAuth.authorize(useremail, userpassword)
      .then((data) => {
        if (data.token){
          localStorage.setItem('jwt', data.token);
          setFormValue({useremail: '', userpassword: ''});
          props.handleLogin(data.token);
          navigate('/my-profile', {replace: true});
        }
      })
      .catch(err => {
        alert(`failed to login, err: ${err}`);
      });
  }

  return (
    <main>
      <Header buttonText={'Регистрация'} toLink={"/sign-up"} userEmail={props.userEmail} onClick={props.onClick}/>
      <div className="form__cover">
        <form className="login__form" onSubmit={handleSubmit}>
          <h2 className="form__header">Вход</h2>
          <fieldset className="popup__field">
            <div className="popup__input-label">
              <input className="popup__input popup__input_type_login" value={formValue.useremail} onChange={handleChange} type="email" name="useremail" id="useremail" required placeholder="Email" minLength="2" maxLength="40" />
              <span className="popup__input-error username-error"></span>
            </div>      
            <div className="popup__input-label">
              <input className="popup__input popup__input_type_login" value={formValue.password} onChange={handleChange} type="password" name="userpassword" id="userpassword" required placeholder="Пароль" minLength="2" maxLength="40" />
              <span className="popup__input-error aboutuser-error"></span>
            </div>
            <button className="button button_type_sub button_type_login" type="submit">Войти</button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default Login;
