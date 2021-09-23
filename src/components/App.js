//import logo from './logo.svg';
//import './App.css';
//import appLogo from './images/logo.svg';

import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";

function App() {
  return (
    <div className="page__container">
      <Header/>
      <Main/>
      <Footer/>

      <template id="card-template">
        <article className="card">
          <img src="#" alt="Фотография" className="card__image"/>
          <button className="card__delete-button" type="button" aria-label="Удалить карточку"/>
          <div className="card__description">
            <h2 className="card__caption"/>
            <div className="card__like-container">
              <button className="card__like-button" type="button" aria-label="Лайкнуть"/>
              <p className="card__like-count"/>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
