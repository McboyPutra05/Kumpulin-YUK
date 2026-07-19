"use client";

// DatePicker.tsx
// --------------
// Komponen pemilih tanggal menggunakan react-day-picker.
// Memungkinkan user memilih tanggal untuk filter artikel.

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Calendar, X, Info } from "lucide-react";
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
    <div className="flex flex-col w-full bg-slate-900 border border-slate-800 rounded-xl p-4">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
        Pilih Tanggal
      </label>
      <div className="relative w-full">
        {/* Trigger Button */}
        <button
          id="date-picker-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full px-4 py-2.5 rounded-lg border text-sm",
            "bg-[#0f172a] border-slate-700 text-slate-300",
            "hover:border-slate-500 transition-all shadow-sm"
          )}
        >
          <span>
            {selectedDate
              ? format(selectedDate, "d MMMM yyyy", { locale: localeId })
              : "Pilih tanggal"}
          </span>
          <div className="flex items-center gap-2">
            {selectedDate && (
              <X
                className="w-4 h-4 text-slate-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onDateChange(undefined);
                }}
              />
            )}
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
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
      {/* Info text */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5" />
        <span>Scrape berjalan otomatis setiap jam</span>
      </div>
    </div>
  );
}
