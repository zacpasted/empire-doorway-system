import { useEffect, useRef, useState, memo } from 'react';
import OptimizedImage from '@/components/ui/optimized-image';

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
import beauMurphey from '@/assets/cards/beau-murphey.jpeg';
import brianHarris from '@/assets/cards/brian-harris.png';
import samSaleh from '@/assets/cards/sam-saleh.png';
import michaelAllen from '@/assets/cards/michael-allen.jpeg';
import nourDiabi from '@/assets/cards/nour-diabi.jpeg';
import gageLidder from '@/assets/cards/gage-lidder.jpeg';

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
}, {
  id: 11,
  image: beauMurphey,
  name: 'Dr. Beau Murphey'
}, {
  id: 12,
  image: brianHarris,
  name: 'Dr. Brian Harris'
}, {
  id: 13,
  image: samSaleh,
  name: 'Dr. Sam Saleh'
}, {
  id: 14,
  image: michaelAllen,
  name: 'Dr. Michael Allen'
}, {
  id: 15,
  image: nourDiabi,
  name: 'Dr. Nour Diabi'
}, {
  id: 16,
  image: gageLidder,
  name: 'Dr. Gage Lidder'
}];

// Memoized card component to prevent re-renders
const MemberCard = memo(({ card }: { card: typeof cards[0] }) => (
  <div className="flex-shrink-0 mx-3 md:mx-4">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <OptimizedImage 
        src={card.image} 
        alt={`${card.name} player card`}
        wrapperClassName="w-28 md:w-36 rounded-xl shadow-lg overflow-hidden"
        className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  </div>
));

MemberCard.displayName = 'MemberCard';

const MemberCardsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Only render when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // CSS-based animation for better performance
  // Duplicate cards for seamless loop
  const duplicatedCards = [...cards, ...cards];

  if (!isVisible) {
    return (
      <section ref={sectionRef} className="py-16 md:py-20 overflow-hidden bg-gradient-to-b from-background to-secondary/10">
        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">The Network</p>
          <h2 className="text-3xl md:text-4xl font-display text-foreground">Our Members</h2>
        </div>
        <div className="h-48 bg-muted/10 animate-pulse" />
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-20 overflow-hidden bg-gradient-to-b from-background to-secondary/10"
    >
      <style>{`
        @keyframes member-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-member-marquee {
          animation: member-marquee 30s linear infinite;
        }
        .animate-member-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center mb-10">
        <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">The Network</p>
        <h2 className="text-3xl md:text-4xl font-display text-foreground">Our Members</h2>
      </div>

      {/* Marquee */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollRef}
          className={`flex items-center ${isHovered ? '' : 'animate-member-marquee'}`}
          style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
        >
          {duplicatedCards.map((card, index) => (
            <MemberCard key={`${card.id}-${index}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberCardsCarousel;