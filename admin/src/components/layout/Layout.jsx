import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <div className="pl-20">
        <Navbar />
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}