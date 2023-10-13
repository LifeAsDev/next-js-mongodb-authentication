import { AppProps } from "next/app";

interface CustomPageProps {
  // <--- your custom page props
  // your props
}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  //   ^^^ use your custom props here
  return (
    <>
      BIG DEAL
      <Component {...pageProps} />
    </>
  );
  // ^^^^^ pageProps is now typeof CustomPageProps
}
