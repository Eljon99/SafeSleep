import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#crud">CRUD</a>
          <a href="#metrics">Metrics</a>
          <a href="#info">Info</a>
        </nav>
      </header>
      <div className="content">
          <div className="form-container">
              <h1 className="title">safeSleep</h1>
              <p className="description">
                  Benvenuto su safeSleep! Il nostro sito è dedicato a fornirti le migliori informazioni
                  e strumenti per migliorare la qualità del tuo sonno. Esplora le nostre funzionalità per
                  saperne di più.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                  pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                  usto, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                  imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                  Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                  eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim
                  . Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                  nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
                  nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
                  Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet
                  adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
                  hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                  ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros
                  faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales s agittis magna.
                  Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
              </p>
              <img src="./public/fotoSonno.jpg" alt="Descrizione dell'immagine" className="description-image"/>
          </div>
      </div>
        <footer className="footer">
            <a href="https://instagram.com" className="social-icon">Instagram</a>
        <a href="https://youtube.com" className="social-icon">YouTube</a>
        <a href="https://linkedin.com" className="social-icon">LinkedIn</a>
      </footer>
    </div>
  );
}

export default App;
