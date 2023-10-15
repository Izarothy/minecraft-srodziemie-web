import Head from "next/head";
import React, { useMemo } from "react";
import PageList from "~/components/Layout/PageList";
import projectList from "../../data/projects.json";

const Narzedzia = () => {
  const sortedProjects = useMemo(() => {
    return projectList?.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });
  }, []);

  return (
    <>
      <Head>
        <title>Projekty</title>
      </Head>
      <main className="min-h-screen w-[90%] py-16 lg:w-[80%]">
        <header className="mx-auto max-w-md text-center">
          <h1>Postępy</h1>
          <p>
            Sprawdź, jak idzie nam budowa Śródziemia. <br /> Każdy projekt
            znajdziesz w tabelce poniżej
          </p>
        </header>
        <section className="relative flex justify-between gap-16 pt-12 ">
          <PageList />
          <section className="flex-2 grow overflow-scroll sm:overflow-hidden">
            <table className="min-w-full border-collapse">
              <thead className="text-center">
                <tr>
                  <th>Nazwa</th>
                  <th>Status</th>
                  <th>Typ</th>
                  <th>Zarządca</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects?.map(({ name, status, type, author }, idx) => {
                  const isProjectFinished = status === "Skończone";
                  return (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 ? `bg-inherit` : `bg-zinc-800`
                      } text-center font-medium text-gray-200`}
                    >
                      <td>{name}</td>
                      <td
                        className={
                          isProjectFinished ? `text-green-500` : `text-red-500`
                        }
                      >
                        {status}
                      </td>
                      <td>{type}</td>
                      <td>{author}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <aside className="hidden flex-1 sm:flex"></aside>
        </section>
      </main>
    </>
  );
};

export default Narzedzia;
