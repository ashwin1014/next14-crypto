import { STORAGE_KEYS } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { redirect } from 'next/navigation';

export default function RootPage() {
  const [activeLanguage] = useLocalStorage(STORAGE_KEYS.LANGUAGE, 'en');
  redirect(`/${activeLanguage}`);
}