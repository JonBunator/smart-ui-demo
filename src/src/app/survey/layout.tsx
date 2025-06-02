import App from "@/app/ui/App";

export default function SurveyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <App>
        {children}
      </App>
  );
}
