import Head from "next/head";
import SearchBar from "../components/topfold";
import Header from "../components/header";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Bizio Weather App</title>
      </Head>
      <Header />
      <div className="home">
        <div className="container">
          <SearchBar />
          {/*  */}
        </div>
      </div>
    </div>
  );
}
