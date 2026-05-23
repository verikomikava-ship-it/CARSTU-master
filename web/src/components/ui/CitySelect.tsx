'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';

const CITIES = [
  { ka: 'თბილისი', en: 'Tbilisi' },
  { ka: 'ბათუმი', en: 'Batumi' },
  { ka: 'ქუთაისი', en: 'Kutaisi' },
  { ka: 'რუსთავი', en: 'Rustavi' },
  { ka: 'გორი', en: 'Gori' },
  { ka: 'ზუგდიდი', en: 'Zugdidi' },
  { ka: 'ფოთი', en: 'Poti' },
  { ka: 'ხაშური', en: 'Khashuri' },
  { ka: 'სამტრედია', en: 'Samtredia' },
  { ka: 'სენაკი', en: 'Senaki' },
  { ka: 'ზესტაფონი', en: 'Zestaponi' },
  { ka: 'მარნეული', en: 'Marneuli' },
  { ka: 'თელავი', en: 'Telavi' },
  { ka: 'ახალციხე', en: 'Akhaltsikhe' },
  { ka: 'ოზურგეთი', en: 'Ozurgeti' },
  { ka: 'კასპი', en: 'Kaspi' },
  { ka: 'ჭიათურა', en: 'Chiatura' },
  { ka: 'წყალტუბო', en: 'Tskaltubo' },
  { ka: 'საგარეჯო', en: 'Sagarejo' },
  { ka: 'გარდაბანი', en: 'Gardabani' },
  { ka: 'ბორჯომი', en: 'Borjomi' },
  { ka: 'ტყიბული', en: 'Tkibuli' },
  { ka: 'ხობი', en: 'Khobi' },
  { ka: 'ბოლნისი', en: 'Bolnisi' },
  { ka: 'ახალქალაქი', en: 'Akhalkalaki' },
  { ka: 'გურჯაანი', en: 'Gurjaani' },
  { ka: 'მცხეთა', en: 'Mtskheta' },
  { ka: 'ყვარელი', en: 'Kvareli' },
  { ka: 'ლაგოდეხი', en: 'Lagodekhi' },
  { ka: 'დუშეთი', en: 'Dusheti' },
  { ka: 'ამბროლაური', en: 'Ambrolauri' },
  { ka: 'ახმეტა', en: 'Akhmeta' },
  { ka: 'ქობულეთი', en: 'Kobuleti' },
];

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

export function CitySelect({ value, onChange, label, error, placeholder }: CitySelectProps) {
  const { language } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = CITIES.filter((city) => {
    if (!inputValue) return true;
    const q = inputValue.toLowerCase();
    return city.ka.toLowerCase().includes(q) || city.en.toLowerCase().includes(q);
  });

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onChange(text);
    setOpen(true);
  };

  const handleSelect = (city: typeof CITIES[0]) => {
    const val = language === 'ka' ? city.ka : city.en;
    setInputValue(val);
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="mb-4" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-10 rounded-xl border bg-input-bg text-text-primary
            placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue
            transition-all ${error ? 'border-error' : 'border-border'}`}
        />
        <button
          type="button"
          onClick={() => { setOpen(!open); inputRef.current?.focus(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-card-hover z-50 max-h-[200px] overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((city) => {
                const cityName = language === 'ka' ? city.ka : city.en;
                const isSelected = inputValue === city.ka || inputValue === city.en;
                return (
                  <button
                    key={city.en}
                    type="button"
                    onClick={() => handleSelect(city)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors
                      ${isSelected ? 'bg-blue/10 text-blue font-medium' : 'text-text-primary hover:bg-card-hover'}`}
                  >
                    {cityName}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-[12px] text-text-muted text-center">
                {language === 'ka' ? '✓ ჩაწერეთ თქვენი ადგილმდებარეობა' : '✓ Type your location'}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
