import React from 'react';
import Header from '../layout/Header';
import './Home.css';


const Home = () => {
  return (
    <div className="image">
      <div className="container">
        <Header />
        <div className="content">
          <div className="image-placeholder">
            {/* Puoi sostituire questo div con un tag <img> */}
            <p>Image Placeholder</p>
          </div>
          <div>
            <h1 className="title">safe-Sleep</h1>
            <div className="body-text">
              Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
              <br /><br />
              Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod iure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquid, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
            </div>
          </div>
        </div>
        <footer className="footer">
          <a href="https://instagram.com">Instagram</a>
          <a href="https://youtube.com">YouTube</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </footer>
      </div>
    </div>
  );
}

export default Home;
