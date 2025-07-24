"use client";
import React, { useState } from "react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface StudyFlashcardsProps {
  flashcards: Flashcard[];
  projectName: string;
}

export default function StudyFlashcards({
  flashcards,
  projectName,
}: StudyFlashcardsProps) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-2xl font-bold text-base-content mb-2">
          No flashcards found
        </div>
        <div className="text-base-content/70">
          Add some flashcards to start studying!
        </div>
      </div>
    );
  }

  const card = flashcards[current];

  const handleFlip = () => setFlipped((f) => !f);
  const handleNext = () => {
    setFlipped(false);
    setCurrent((prev) => (prev + 1 < flashcards.length ? prev + 1 : 0));
  };
  const handlePrev = () => {
    setFlipped(false);
    setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : flashcards.length - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Study: {projectName}
      </h2>
      <div className="w-full flex justify-center">
        <div
          className="relative w-full max-w-lg h-[240px] sm:h-[280px] md:h-[320px] mb-8 cursor-pointer select-none [perspective:1000px]"
          onClick={handleFlip}
        >
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out [transform-style:preserve-3d] ${
              flipped ? "[transform:rotateY(180deg)]" : ""
            }`}
            style={{ willChange: "transform" }}
          >
            {/* Card front */}
            <div className="absolute inset-0 flex items-center justify-center bg-base-100 shadow-xl rounded-xl [backface-visibility:hidden]">
              <div className="text-xl md:text-2xl font-semibold text-base-content text-center px-4">
                {card.question}
                <div className="mt-4 text-base-content/70 text-sm">
                  Tap to show answer
                </div>
              </div>
            </div>
            {/* Card back */}
            <div className="absolute inset-0 flex items-center justify-center bg-base-100 shadow-xl rounded-xl border border-base-300 ring ring-primary/20 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="text-xl md:text-2xl font-semibold text-base-content text-center px-4">
                {card.answer}
                <div className="mt-4 text-base-content/70 text-sm">
                  Tap to show question
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          className="btn btn-outline"
          onClick={handlePrev}
          disabled={flashcards.length <= 1}
        >
          Previous
        </button>
        <span className="text-base-content/70 text-sm">
          {current + 1} / {flashcards.length}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={flashcards.length <= 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
