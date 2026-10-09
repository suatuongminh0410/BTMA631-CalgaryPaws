# Calgary Paws & Whiskers: Setup Guide

You will do three things, in this order: **create the database**, **upload the code**, **publish the site**. Plan on 30 to 45 minutes the first time. Nobody needs to write any code.

**Cost rule:** every step below is free and none should ask for a credit card. If any screen asks for a card or shows a price, **stop and ask your instructor or ask me before continuing.**

Keep a notes file open. You will collect three things as you go:

| Item | Where it comes from |
|---|---|
| Database password | You choose it in Step 1 |
| Database connection string | Supabase, Step 1 |
| Team password | You invent it (the shared password for add/edit/delete) |

---

## Step 1: Create the database (Supabase)

1. Go to **supabase.com** and click **Start your project**. Sign up (using GitHub or your email is fine).
2. Click **New project**. Fill in:
   - **Name:** `calgary-paws`
   - **Database password:** click **Generate a password**, then **copy it into your notes file**. If you type your own, use only letters and numbers (symbols can cause trouble later).
   - **Region:** pick the closest one (Canada if listed).
   - **Plan:** make sure it says **Free**.
3. Click **Create new project** and wait a minute or two until it finishes setting up.
4. In the left menu, open **SQL Editor** and click **New query**.
5. Open the file `database/1-create-tables.sql` (any text editor works), copy **everything**, paste it into the editor, and click **Run**. You should see "Success".
6. Click **New query** again. Do the same with `database/2-sample-data.sql`. This adds 20 fake rows to every table so the site isn't empty.
7. In the left menu, open **Table Editor**. You should see four tables: `animals`, `fosters`, `foster_assignments`, `medical_records`.
8. Get the connection string:
   - Click the **Connect** button near the top of the page.
   - Find **Transaction pooler** (it uses port **6543**) and copy the connection string. It looks like:
     `postgresql://postgres.abcdefgh:[YOUR-PASSWORD]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres`
   - Paste it into your notes and replace `[YOUR-PASSWORD]` with your database password. **Remove the square brackets too.**

> Supabase's free plan pauses a project after about a week with no activity. If the site ever shows errors after a quiet week, log in to Supabase and click **Restore project**. Your data is kept.

---

## Step 2: Put the code on GitHub

1. Go to **github.com** and sign up (free).
2. Click the **+** at the top right, then **New repository**.
   - **Name:** `calgary-paws-whiskers`
   - Choose **Public** or **Private** (either works with Vercel).
   - Leave everything else alone and click **Create repository**.
3. On the new page, click the link **uploading an existing file**.
4. **Unzip** the project folder on your computer. Open it so you can see the files inside (`app`, `components`, `lib`, `database`, `package.json`, and so on).
5. Select **everything inside the folder** and drag it into the GitHub page. Do not drag the zip file itself, and do not drag the outer folder.
6. Wait for the uploads to finish, then click **Commit changes** at the bottom.
7. Check the repository page: you should see `app`, `components`, `lib` and `package.json` listed at the top level.

---

## Step 3: Publish the site (Vercel)

1. Go to **vercel.com** and click **Sign Up**. Choose the **Hobby** (free) plan and **Continue with GitHub**. Hobby is for personal, non-commercial projects, which suits a class project.
2. Click **Add New**, then **Project**. Find `calgary-paws-whiskers` in the list and click **Import**. (If it isn't listed, click the option to adjust GitHub permissions and allow access to that repository.)
3. Vercel should detect **Next.js** automatically. Leave the build settings alone.
4. Open the **Environment Variables** section and add two variables:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | the connection string from your notes (with your real password in it) |
   | `APP_PASSWORD` | your team password (pick something you can share with your group) |

5. Click **Deploy** and wait one or two minutes.
6. When it says Congratulations, click the preview image or **Visit**. That address (something like `calgary-paws-whiskers.vercel.app`) is your **public URL**.

---

## Step 4: Test it

Work through this list:

- [ ] The home page shows counts, and "Follow-ups due" lists a few animals.
- [ ] **Animals** shows 20 animals. Try the search box and the filters.
- [ ] Click **Log in to edit**, enter your team password.
- [ ] **Add** a new animal. Then **edit** it. Then **delete** it (you will get an "Are you sure?" box).
- [ ] Open an animal. Add a **medical record** from its page.
- [ ] Add a **foster assignment**. Notice the animal's status changes to "In foster" by itself.
- [ ] Try to place an animal with a foster who is already full. You should see a clear message.
- [ ] Try to **delete a foster who has assignments**. It should refuse and tell you to mark them inactive.
- [ ] Log out and confirm the Add / Edit / Delete buttons disappear.

---

## If something goes wrong

| What you see | What to try |
|---|---|
| Page says "Application error" | In Vercel, open the project, then **Logs**. Most often `DATABASE_URL` is wrong. |
| "password authentication failed" | The password in `DATABASE_URL` doesn't match Supabase. In Supabase go to **Project Settings, Database** and reset the password, then update the variable in Vercel. |
| "Tenant or user not found" | You copied the wrong connection string. Use **Transaction pooler**, and keep the whole username (it contains a dot). |
| Site worked last week, errors now | The Supabase project was paused. Open Supabase and click **Restore project**. |
| Log in always says the password is wrong | Check `APP_PASSWORD` in Vercel for stray spaces. |
| You changed a variable in Vercel but nothing changed | Variables only apply to new deployments. Go to **Deployments**, open the latest, and choose **Redeploy**. |
| You edited a file on GitHub | Vercel redeploys automatically within a minute or two. |

## Good habits

- This is a **public** website. Only enter made-up information, never real names, emails or phone numbers.
- Share the team password only with your group.
- Your Supabase connection string and database password are secrets. Don't post them in chat, in the code, or in your report.
