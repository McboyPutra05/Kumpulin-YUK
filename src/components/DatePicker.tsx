"use client";

// DatePicker.tsx
// --------------
// Komponen pemilih tanggal menggunakan react-day-picker.
// Memungkinkan user memilih tanggal untuk filter artikel.

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Calendar, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Import CSS default dari react-day-picker
import "react-day-picker/style.css";

interface DatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        id="date-picker-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm",
          "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300",
          "hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none",
          selectedDate && "border-blue-500/50 text-blue-600 dark:text-white"
        )}
      >
        <Calendar className="w-4 h-4 text-blue-400" />
        <span>
          {selectedDate
            ? format(selectedDate, "d MMMM yyyy", { locale: localeId })
            : "Pilih tanggal"}
        </span>
        {selectedDate && (
          <X
            className="w-3.5 h-3.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onDateChange(undefined);
            }}
          />
        )}
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop untuk menutup saat klik di luar */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-2">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              locale={localeId}
              disabled={{ after: new Date() }}
              className="text-gray-900 dark:text-gray-300"
            />
          </div>
        </>
      )}
    </div>
  );
}
