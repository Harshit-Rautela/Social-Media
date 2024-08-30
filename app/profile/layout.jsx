// app/layout.js (or pages/_app.js)
import Navbar from '@components/Navbar';
import '@styles/globals.css'; // Tailwind CSS

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-16"> {/* Add padding to account for fixed navbar */}
        {children}
      </main>
    </>
  );
}
