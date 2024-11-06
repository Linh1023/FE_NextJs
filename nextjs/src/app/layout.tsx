import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/app.header";
import Footer from "@/components/app.footer";
import "@/styles/globals.css";
import "@/styles/custom.css";
import NextTopLoader from "nextjs-toploader";

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
          <NextTopLoader
            color="linear-gradient(268deg, #ec3d04 0%, #FF2A69 100%)"
            initialPosition={0.08}
            crawlSpeed={50}
            height={3}
            crawl={true}
            easing="ease"
            speed={50}
            zIndex={1600}
            showAtBottom={false}
          />
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
