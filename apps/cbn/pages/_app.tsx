import "./styles.css";
import ThemeRegistry from "../theme/ThemeResistry";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { AppProps } from "next/app";
import { CustomStateProvider } from "../stateContext";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{}>) {
  return (
    <UserProvider>
      <ThemeRegistry>
        <CustomStateProvider>
          <Component {...pageProps} />
        </CustomStateProvider>
      </ThemeRegistry>
    </UserProvider>
  );
}
