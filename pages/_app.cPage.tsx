import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import CssBaseline from "@material-ui/core/CssBaseline";

import NavFoot from "../components/NavFoot";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import { CSSReset, theme } from "@chakra-ui/react";
import * as Chakra from "@chakra-ui/react";

/* Important Scripts */
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
/* Important Scripts */

/* Additional Scripts */
import * as gtag from "../utils/gtag";
import SEO from "../seo.config";
/* Additional Scripts */

/* Components */
import ProgressLoad from "../components/ProgressLoad";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
/* Components */
declare global {
  interface Window {
    gtag: (event: string, name: any, obj: object) => void;
  }
}

interface reportWebVitalsI {
  id: string;
  name: string;
  label: string;
  value: number;
}
export function reportWebVitals({ id, name, label, value }: reportWebVitalsI) {
  window.gtag("event", name, {
    event_category: label === "web-vital" ? "Web Vitals" : "Next.js metric",
    value: Math.round(name === "CLS" ? value * 1000 : value),
    event_label: id,
    non_interaction: true
  });
}

const doesntAlllowedNavAndFooter: string[] = [
  "/login",
  "/signup",
  "/docs/changelog"
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const materialUITheme = useTheme();

  let path: string = router.pathname;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="google-site-verification"
          content={
            gtag.GOOGLE_VERIF || "pYKlXre7UF2sT8gpx6Nf8NKJLM0H5hkh80XIWEmO-yo"
          }
        />

        <meta name="yandex-verification" content="356dad746d43cc34" />

        <meta name="theme-color" content="#f0efeb" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png"></link>

        <title>Madrasah Tsanawiyah Techno Natura Depok</title>
        <meta
          name="description"
          content="Website Madrasah Tsanawiyah Techno Natura"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.css"
        />
      </Head>{" "}
      <DefaultSeo {...SEO} />
      {/* <div<> */}
      {/* <ChakraProvider> */}
      <ThemeProvider theme={materialUITheme}>
        <CssBaseline />
        <ProgressLoad />
        {/* {<Navbar /> && Nav} */}
        <NavFoot page={router.route}>
          <Chakra.ThemeProvider theme={theme}>
            <CSSReset />
            <Component {...pageProps} />
          </Chakra.ThemeProvider>
        </NavFoot>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
