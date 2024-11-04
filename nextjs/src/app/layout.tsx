import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/app.header";
import Footer from "@/components/app.footer";
import "@/styles/globals.css";
import "@/styles/custom.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="">
      <head></head>
      <body className="custom-sm-body">
        <header>
          <NavBar />
        </header>
        <main>
          <div className="container">
         {children}
            </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}