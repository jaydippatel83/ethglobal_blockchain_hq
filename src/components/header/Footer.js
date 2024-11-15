'use client';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
      <footer className="bg-darkText text-lightGray py-4 mt-10">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-center text-sm">
            © {currentYear} BLOCKCHAIN HQ All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:underline text-accentYellow">Privacy Policy</a>
            <a href="#" className="hover:underline text-accentYellow">Terms of Service</a>
            <a href="#" className="hover:underline text-accentYellow">Contact Us</a>
          </div>
        </div>
      </footer>
    );
  }
  