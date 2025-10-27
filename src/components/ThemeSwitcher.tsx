'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        onClick={() => setTheme('light')}
        className="flex-1"
      >
        <Sun className="mr-2 h-4 w-4" /> Light
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        onClick={() => setTheme('dark')}
        className="flex-1"
      >
        <Moon className="mr-2 h-4 w-4" /> Dark
      </Button>
    </div>
  );
}
