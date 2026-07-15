import { ThemeComponents, themes } from '@/core/ThemeRegistry';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return Object.keys(themes).map((theme) => ({
    theme: theme,
  }));
}

export default async function ThemePage(
  props: {
    params: Promise<{ theme: string }>;
  }
) {
  const params = await props.params;
  const { theme } = params;

  if (!themes[theme]) {
    notFound();
  }

  const SelectedThemeComponent = ThemeComponents[theme];

  if (!SelectedThemeComponent) {
    return <div className="text-white p-24">Theme component not found or still under development.</div>;
  }

  return (
    <div className="theme-wrapper w-full h-full min-h-screen">
      <SelectedThemeComponent />
    </div>
  );
}
