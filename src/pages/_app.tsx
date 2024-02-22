import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Lexend } from "next/font/google";
import Layout from "~/components/Layout/Layout";
import { useRouter } from "next/router";

const lexend = Lexend({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${lexend.style.fontFamily};
          }
        `}
      </style>
      {!router.asPath.includes("map") ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};

export default api.withTRPC(MyApp);
