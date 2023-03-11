import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1 className="text-5xl font-bold text-center uppercase mb-8 bg-gradient-to-br from-[#334155] via-[#1e293b] to-[#0f172a] dark:from-primary-main dark:via-primary-main dark:to-primary-main bg-clip-text text-transparent">
        Academic Management System
      </h1>
      <nav>
        <section className=" text-lg w-full">
          <ul className="unset flex gap-4 place-content-between [&>li]:p-0">
            <li>
              <Tab tab="students" />
            </li>
            <li>
              <Tab tab="lecturers" />
            </li>
            <li>
              <Tab tab="courses" />
            </li>
            <li>
              <Tab tab="enrollments" />
            </li>
          </ul>
        </section>
      </nav>
    </header>
  );
}

function Tab({ tab }: { tab: string }) {
  const location = useLocation();

  return (
    <Link
      to={`/${tab}`}
      className={`relative underline-none animated-link
      ${
        (location.pathname === `/${tab}` ||
          (location.pathname === '' && tab === 'students')) &&
        'show'
      }`}
    >
      {tab}
    </Link>
  );
}
