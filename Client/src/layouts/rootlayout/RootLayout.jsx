import { Link, Outlet } from "react-router-dom";
import "./rootlayout.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient();

function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
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
          <div className="terms">
            <img src="/logo.PNG" alt="logo" />
            <div className="links">
              <Link to="/">Terms of Services</Link>
              <Link to="/">Privacy & Policy</Link>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default RootLayout;
