# 🔐 Secure User Authentication System

A full-stack user authentication system built with **Next.js 14**, **TypeScript**, and **Context API**. Users can **register**, **log in**, and access **protected routes** securely. The app includes support for **password hashing**, **session persistence (via localStorage)**, and **role-based access control** (admin/user).

---

## 🚀 Features

- ✅ Register and login with form validation
- ✅ Protected routes (access control using user authentication)
- ✅ User session persists using `localStorage`
- ✅ Global auth state with `React Context`
- ✅ Passwords hashed (on the backend, assumed using bcrypt)
- ✅ Role-based access (admin/user)
- ✅ Client-side form animations (with Framer Motion)
- ✅ Clean project structure and modular codebase

---

## 🧩 Tech Stack

| Layer        | Technology               |
|--------------|---------------------------|
| Frontend     | Next.js 14 + App Router  |
| Styling      | Tailwind CSS             |
| Animation    | Framer Motion            |
| Icons        | Lucide React             |
| Auth State   | React Context API        |
| Type Safety  | TypeScript               |
| Form Validation | (Optional) Zod / Yup |
| Backend API  | Next.js Route Handlers (API routes) |
| Persistence  | LocalStorage (client-side) |

---

## 🔐 Authentication Logic

- **Login/Register**: Users submit credentials via a form.
- **API Routes**: `/api/auth/login` and `/api/auth/register` handle authentication logic.
- **Token/UserData**: Stored in `localStorage` after login/register.
- **AuthContext**: Provides global access to `user`, `login()`, `logout()`, `register()` methods.
- **Protected Routes**: Components like `Dashboard` check for `user` in `AuthContext`.

---

## 🛡️ Role-Based Access Control

User roles are defined as `admin` or `user`:

```ts
interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  role: 'admin' | 'user';
  createdAt: string;
}
In protected routes, you can restrict content based on role:

tsx
Copy
Edit
if (user?.role !== 'admin') {
  return <p>Access Denied</p>;
}
🧪 Getting Started
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/secure-auth-system.git
cd secure-auth-system
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App
bash
Copy
Edit
npm run dev
App will be live at http://localhost:3000

🔧 Environment Setup
You can simulate a .env file if you're using backend DB/auth integration.

bash
Copy
Edit
# Example .env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
🔐 Future Enhancements
🔄 JWT-based backend validation

💾 Use cookies/session storage instead of localStorage

🧾 Backend with MongoDB/PostgreSQL + Prisma

📦 Deploy to Vercel or Render

🧪 Add unit/integration tests

👨‍💻 Author
Gunabh Sharan
💼 Full-stack Developer | MERN | Next.js | TypeScript
🔗 LinkedIn - Gunabh Sharan
📧 gunabhsharan.25@gmail.com

📄 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you'd like:
- MongoDB/Prisma integration guide
- Backend README version
- Badge integrations (Vercel Deploy, Code Coverage, etc.)


