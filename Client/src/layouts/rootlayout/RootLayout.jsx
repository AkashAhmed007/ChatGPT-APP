import { Link, Outlet } from "react-router-dom";
import "./rootlayout.css";
import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="rootlayout">
        <header>
          <Link to="/" className="logo">
            <img src="/logo.PNG" alt="" />
            <span>RESMI AI</span>
          </Link>
          <div className="user">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </ClerkProvider>
  );
}

export default RootLayout;
