'use client'
import { useState } from "react";

type HeaderProps = {
  role?: string;
};

export default function Header({role = "Student"}: HeaderProps) {

  return (
    <header className="flex items-center justify-between rounded-2xl bg-[#1b1b1b] px-10 py-8">
      <h1 className="flex items-baseline gap-3 text-5xl font-serif italic">
        <span className="font-light text-[#f1e4d1]">Welcome</span>
        <span className="font-semibold text-[#c7a073]">{role}</span>
      </h1>

      <div className="flex items-center gap-4">
        {role=="Student" && <button className="rounded-lg bg-[#c7a073] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b58c5e]">
          Generate Report
        </button>}

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 text-[#c7a073]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="9" r="3.5" />
            <path d="M5.5 19c0-3.038 3.038-5.5 6.5-5.5s6.5 2.462 6.5 5.5" />
          </svg>
        </div>
      </div>
    </header>
  );
}