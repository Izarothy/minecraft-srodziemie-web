import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Poppins } from "next/font/google";
import Layout from "~/components/Layout/Layout";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default api.withTRPC(MyApp);
