import AgreementApp from "@/components/AgreementApp";
import Creators from "@/components/Creators";
import HomePage from "@/components/HomePage";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>

      <Layout>
        <Creators />
        <HomePage />
        <AgreementApp />
      </Layout>

    </>
  );
}
