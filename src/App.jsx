import React, { useState, useEffect, useMemo } from 'react';
import { Gift, Sparkles, Clock, PartyPopper } from 'lucide-react';

// Utility function to calculate time remaining until the target date.
// Sets the target date to December 12th, 2025.
const calculateTimeLeft = (targetDate) => {
  const difference = +targetDate - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return timeLeft;
};

// Component for the animated countdown tile
const CountdownTile = ({ value, label }) => (
  <div className="text-center p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl border border-pink-400/50 w-[80px] sm:w-[100px] transition duration-300 hover:scale-110 transform hover:-translate-y-1">
    <div className="text-3xl sm:text-4xl font-extrabold text-pink-300 drop-shadow-lg tabular-nums">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-xs sm:text-sm mt-1 text-gray-300 uppercase font-medium tracking-wider">
      {label}
    </div>
  </div>
);

// Main Application Component
export default function App() {
  // Set the target birthday date: December 12th, 2025
  const targetDate = useMemo(() => new Date('2025-12-12T00:00:00'), []);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Generate 20 bubble elements with random properties
  const bubbles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      key: i,
      size: `${Math.random() * 30 + 10}px`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 10 + 5}s`,
    }));
  }, []);

  return (
    <>
      {/* Custom CSS Block for Bubbly Effect */}
      <style>
        {`
          @keyframes bubble-float {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.5;
            }
            100% {
              transform: translateY(-100vh) scale(1.5);
              opacity: 0;
            }
          }

          .bubble {
            position: absolute;
            bottom: -100px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            animation: bubble-float linear infinite;
            pointer-events: none;
            z-index: 0;
          }

          .bubble:nth-child(even) {
            background: rgba(255, 192, 203, 0.2);
          }
          .bubble:nth-child(3n) {
            background: rgba(147, 197, 253, 0.2);
          }
        `}
      </style>

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">

        {/* Bubbles */}
        {bubbles.map(bubble => (
          <div
            key={bubble.key}
            className="bubble"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              animationDelay: bubble.animationDelay,
              animationDuration: bubble.animationDuration,
            }}
          />
        ))}

        {/* Main Container */}
        <div className="w-full max-w-4xl mx-auto relative z-10">

          <div className="p-6 sm:p-10 bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.5)] border-2 border-pink-500/70 transition duration-500 hover:shadow-[0_0_70px_rgba(251,113,133,0.8)]">

            {/* Header */}
            <header className="text-center mb-10">
              <PartyPopper className="mx-auto h-12 w-12 text-yellow-300 animate-bounce mb-3" />
              <h1 className="text-5xl sm:text-7xl font-extrabold mb-2 leading-tight bg-clip-text text-transparent 
                             bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 transition duration-300 hover:scale-[1.03]">
                HAPPY BIRTHDAY
              </h1>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-widest uppercase shadow-text"
                style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 192, 203, 0.8)' }}>
                DII
              </h2>
              <p className="mt-4 text-xl sm:text-2xl font-light italic text-pink-200">
                Celebrating December 12th in Advance!
              </p>
            </header>

            {/* Countdown */}
            <section className="mt-12 mb-12">
              <h3 className="text-center text-xl sm:text-3xl font-bold text-yellow-300 flex items-center justify-center mb-6 drop-shadow-md">
                <Clock className="h-6 w-6 mr-3 text-yellow-300" />
                {timeLeft.expired ? "The day is here! Celebrate!" : "Countdown to the Celebration..."}
              </h3>

              <div className="flex justify-center space-x-3 sm:space-x-6">
                <CountdownTile value={timeLeft.days} label="Days" />
                <CountdownTile value={timeLeft.hours} label="Hours" />
                <CountdownTile value={timeLeft.minutes} label="Minutes" />
                <CountdownTile value={timeLeft.seconds} label="Seconds" />
              </div>
            </section>

            {/* Message */}
            <section className="mt-10 text-center">
              <Gift className="mx-auto h-10 w-10 text-pink-400 mb-4 animate-bounce" />
              <p className="text-lg sm:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto font-medium">
                The world is already getting ready for December 12th, and so are we! May the year ahead be filled with laughter, incredible achievements, and moments that truly sparkle. You deserve nothing but the very best, DII.
              </p>
              <p className="mt-6 text-2xl sm:text-3xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-red-400 drop-shadow-lg">
                Happy Advance Birthday!
              </p>
            </section>

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-gray-700/50 text-center text-sm text-gray-500">
              <p>Made with warmth and excitement for your special day.</p>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}
