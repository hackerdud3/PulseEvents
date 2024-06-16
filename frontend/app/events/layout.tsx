export default function EventsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex h-full w-full max-w-[1024px] mx-auto items-center flex-col">
        {children}
      </main>
    </>
  );
}
