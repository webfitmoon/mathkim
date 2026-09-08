import { LocaleScope } from "@/components/locale-navigation";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <LocaleScope locale="en"><div lang="en" data-static-locale="en">{children}</div></LocaleScope>;
}
