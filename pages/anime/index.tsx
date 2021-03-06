import { useEffect, useState } from "react";
import Router from 'next/router';
import Link from 'next/link';
import AnimeRow from '../../components/anime/AnimeRow';
import { getAPI } from "../../common/util";

interface IAnimeWithScreenshot {
  id: number;
  title: string;
  date: string;
  screenshots: string[];
}

const count = 10;

function Anime() {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [animeList, setAnimeList] = useState<IAnimeWithScreenshot[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  useEffect(() => {
    getAnimeList();
  }, []);

  function getAnimeList() {
    getAPI<any>('anime', { startIndex: startIndex, count: count }, 'fetching anime list', (response) => {
      const data = response.data;
      if (data?.length > 0) {
        setAnimeList([...animeList, ...data]);
        setStartIndex(startIndex + count);
      }
    });
  }

  function onClickEditButton(animeId: number) {
    Router.push(`/anime/${animeId}`);
  }

  return (
    <>
      <Link href='/'><a>Up One Level</a></Link>
      <br />
      <Link href='/anime/record'><a>Upload new</a></Link>
      <br />
      <u onClick={() => {setShowEdit(!showEdit)}}>show edit button</u>
      <br />
      {animeList.map((anime => 
        <AnimeRow
          key={anime.title}
          title={anime.title}
          date={anime.date}
          screenshots={anime.screenshots}
          showEditButton={showEdit}
          onClickEditButton={onClickEditButton.bind(null, anime.id)}
        />
      ))}
      <button style={{display: "block"}} onClick={getAnimeList}>show more</button>
    </>
  )
}

export default Anime;
