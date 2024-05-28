import { AppProps } from "next/app";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar/Sidebar";
type LayoutProps = { children?: React.ReactNode };
function MyApp({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen">
          {/* <Menu /> */}
          <div className="bg-background h-full">
            <div className="flex h-full">
              <Sidebar />
              <div className="col-span-3 lg:col-span-4 lg:border-l  h-full">
                <div className="h-full px-4 py-6 lg:px-8  ">{children}</div>
              </div>
            </div>
          </div>
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

export default MyApp;
