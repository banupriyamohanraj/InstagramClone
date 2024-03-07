import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "@/ModalContext/ModalContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </SessionProvider>
  );
}
