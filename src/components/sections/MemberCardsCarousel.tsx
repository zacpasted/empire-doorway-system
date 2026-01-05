import { useEffect, useRef, useState } from 'react';

// Import all card images
import smileTrend from '@/assets/cards/smile-trend.jpeg';
import drewBallard from '@/assets/cards/drew-ballard.jpeg';
import marshallHanson from '@/assets/cards/marshall-hanson.jpeg';
import alanClarke from '@/assets/cards/alan-clarke.jpeg';
import jonMarashi from '@/assets/cards/jon-marashi.jpeg';
import jakeBateman from '@/assets/cards/jake-bateman.jpeg';
import serenaWong from '@/assets/cards/serena-wong.jpeg';
import timHoeschen from '@/assets/cards/tim-hoeschen.jpeg';
import kooperRuminer from '@/assets/cards/kooper-ruminer.jpeg';
import navAtwal from '@/assets/cards/nav-atwal.jpeg';
const cards = [{
  id: 1,
  image: smileTrend,
  name: 'Smile Trend'
}, {
  id: 2,
  image: drewBallard,
  name: 'Dr. Drew Ballard'
}, {
  id: 3,
  image: marshallHanson,
  name: 'Dr. Marshall Hanson'
}, {
  id: 4,
  image: alanClarke,
  name: 'Dr. Alan Clarke'
}, {
  id: 5,
  image: jonMarashi,
  name: 'Dr. Jon Marashi'
}, {
  id: 6,
  image: jakeBateman,
  name: 'Dr. Jake Bateman'
}, {
  id: 7,
  image: serenaWong,
  name: 'Dr. Serena Wong'
}, {
  id: 8,
  image: timHoeschen,
  name: 'Dr. Tim Hoeschen'
}, {
  id: 9,
  image: kooperRuminer,
  name: 'Dr. Kooper Ruminer'
}, {
  id: 10,
  image: navAtwal,
  name: 'Dr. Nav Atwal'
}];
const MemberCardsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationId: number;
    let scrollPosition = 0;
    const speed = 0.5;
    const animate = () => {
      if (!isHovered && scrollContainer) {
        scrollPosition += speed;

        // Reset when we've scrolled through one set
        const singleSetWidth = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  // Duplicate cards for seamless loop
  const duplicatedCards = [...cards, ...cards];
  return <section className="py-16 md:py-24 overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 mb-10">
        <p className="text-primary uppercase tracking-[0.3em] text-sm text-center">
          Official Pasted Club Members
        </p>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-hidden cursor-grab" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {duplicatedCards.map((card, index) => <div key={`${card.id}-${index}`} className="flex-shrink-0 w-[280px] md:w-[320px] transition-transform duration-300 hover:scale-[1.02]">
            
          </div>)}
      </div>
    </section>;
};
export default MemberCardsCarousel;