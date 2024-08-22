import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import myImage1 from '../../assets/1.jpg';
import myImage2 from '../../assets/2_2.jpg';
import myImage3 from '../../assets/3_3.jpg';

// Styled-components per il contenitore dello slider
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px; // Dimensione massima del contenitore
  height: 400px; // Altezza fissa del contenitore
  overflow: hidden;
  margin: 0 auto; // Centrare il contenitore
  border: 1px solid #ddd; // Aggiungi un bordo per il debug

  @media (max-width: 768px) {
    height: 400px; // Riduce l'altezza su schermi più piccoli
  }

  @media (max-width: 480px) {
    height: 300px; // Riduce ulteriormente l'altezza su schermi molto piccoli
  }
`;

// Styled-components per il contenitore delle slide
const SlideWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.currentSlide * -100}%);
`;

// Styled-components per ogni slide
const Slide = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover; // Mantiene le proporzioni dell'immagine e la ritaglia per riempire l'area
  flex-shrink: 0;
`;

// Styled-components per i pulsanti di navigazione
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;
  z-index: 1; // Assicurati che il pulsante sia sopra le immagini
  padding: 10px;

  &:hover {
    color: #666;
  }

  ${props => props.direction === 'prev' && `
    left: 20px;
  `}

  ${props => props.direction === 'next' && `
    right: 20px;
  `}
`;

const Slider = () => {
  const images = [myImage1, myImage2, myImage3]; // Array di immagini
  const [currentSlide, setCurrentSlide] = useState(0); // Stato per la slide corrente

  // Riferimento per l'intervallo automatico
  const slideInterval = useRef(null);

  // Funzione per passare alla slide successiva, memorizzata con useCallback
  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(nextIndex);
  }, [currentSlide, images.length]);

  // Funzione per tornare alla slide precedente, memorizzata con useCallback
  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlide - 1 + images.length) % images.length;
    setCurrentSlide(prevIndex);
  }, [currentSlide, images.length]);

  // Effetto per l'autoplay
  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 3000); // Cambia immagine ogni 3 secondi

    // Pulizia dell'intervallo quando il componente viene smontato
    return () => {
      clearInterval(slideInterval.current);
    };
  }, [nextSlide]);

  // Funzione per resettare l'intervallo quando si naviga manualmente
  const handleNavClick = (navFunction) => {
    clearInterval(slideInterval.current);
    navFunction();
    // Riavvia l'intervallo automatico
    slideInterval.current = setInterval(nextSlide, 3000);
  };

  return (
    <SliderContainer>
      <NavButton direction="prev" onClick={() => handleNavClick(prevSlide)}>{'<'}</NavButton>
      <SlideWrapper currentSlide={currentSlide}>
        {images.map((image, index) => (
          <Slide
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </SlideWrapper>
      <NavButton direction="next" onClick={() => handleNavClick(nextSlide)}>{'>'}</NavButton>
    </SliderContainer>
  );
};

export default Slider;
