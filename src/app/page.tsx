import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      랜딩
      <a href="http://localhost:3000/screen">
        <button>Go to Screen</button>
    </a>
    </main>
  );
}
