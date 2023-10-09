export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex h-full w-full items-center flex-col">
        {children}
      </main>
    </>
  );
}
