import { redirect } from "next/navigation";
import { passwordMatches, startSession, isLoggedIn } from "@/lib/auth";

async function login(formData) {
  "use server";
  if (passwordMatches(formData.get("password"))) {
    startSession();
    redirect("/");
  }
  redirect("/login?error=1");
}

export default function LoginPage({ searchParams }) {
  if (isLoggedIn()) redirect("/");
  return (
    <div className="narrow">
      <h1>Log in to edit</h1>
      <p className="lead">Anyone can view the site. To add, change or delete records, enter the shared team password.</p>
      <form action={login} className="form">
        {searchParams?.error ? <p className="alert" role="alert">That password isn't right. Try again.</p> : null}
        <label className="field">
          <span className="field-label">Password</span>
          <input type="password" name="password" required autoFocus />
        </label>
        <div className="form-buttons">
          <button type="submit" className="btn primary">Log in</button>
        </div>
      </form>
    </div>
  );
}
