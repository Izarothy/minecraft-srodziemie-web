import Link from "next/link";

export default function Custom404() {
  return (
    <main className="grid h-screen place-items-center bg-dark-lighter">
      <div>
        <h1>Ta strona nie istnieje.</h1>
        <Link href="/">
          <span className="text-base">Powrót do strony głównej</span>
        </Link>
      </div>
    </main>
  );
}
