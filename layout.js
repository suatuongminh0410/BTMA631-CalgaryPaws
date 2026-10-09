import "./globals.css";
import { redirect } from "next/navigation";
import { isLoggedIn, endSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Calgary Paws & Whiskers",
  description: "A fictional humane centre: animals, fosters and medical records. Class project.",
};

async function logout() {
  "use server";
  endSession();
  redirect("/");
}

export default function RootLayout({ children }) {
  const loggedIn = isLoggedIn();
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="wrap header-inner">
            <a href="/" className="brand">
              <span className="arch" aria-hidden="true" />
              <span>Calgary Paws &amp; Whiskers</span>
            </a>
            <nav className="nav" aria-label="Main">
              <a href="/animals">Animals</a>
              <a href="/fosters">Fosters</a>
              <a href="/assignments">Foster assignments</a>
              <a href="/medical">Medical records</a>
            </nav>
            <div className="session">
              {loggedIn ? (
                <form action={logout}>
                  <button type="submit" className="link-button">Log out</button>
                </form>
              ) : (
                <a href="/login">Log in to edit</a>
              )}
            </div>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="wrap site-footer">
          Fictional humane centre built for a class project. All animals, people and records are made up.
        </footer>
      </body>
    </html>
  );
}
