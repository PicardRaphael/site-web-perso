import "../styles/globals.scss";

import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Raphaël PICARD</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Site internet du développeur informatique Raphaël PICARD"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="keywords"
          content="reactjs, nextjs, unity3d, développeur front end, développeur back end, développeur full stack, développeur informatique, developpeur, developpeur web, freelance, développeur freelance"
        />
        <meta name="author" content="Raphaël PICARD" />
        <meta name="copyright" content="Raphaël PICARD" />
        <meta name="robots" content="index" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
