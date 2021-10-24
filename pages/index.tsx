import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { createClient, Entry, Asset } from 'contentful';
import React from 'react';
import { RecipeTile } from '../components/recipe-tile';

interface ContentfulZutat {
  name: string,
  image: Asset,
}
interface ContentfulRezept {
  name: string;
  zutaten: Array<Entry<ContentfulZutat>>
}

export interface ZutatBild {
  url: string,
  width: number,
  height: number,
}

export interface Zutat {
  name: string,
  image: ZutatBild,
}

export interface Rezept {
  name: string,
  zutaten: Array<Zutat>,
}


const Home = ({ content, rezepte }: {content: string, rezepte: Array<Rezept>}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Speiseplan</title>
      </Head>
      <h1>{ content }</h1>
      <main className={styles.productList}>
        { rezepte.map( rezept => {
          return (
            <React.Fragment key={rezept.name}>
              <RecipeTile rezept={rezept}></RecipeTile>
            </React.Fragment>
          )
        }) }
      </main>

    </div>
  )
}

export async function getServerSideProps(): Promise<{props: { content: string, rezepte: Array<Rezept> }}> {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE || '',
    accessToken: process.env.CONTENTFUL_API_KEY || '',
  });

  const { items } = await client.getEntries<ContentfulRezept>();
  const rezepte = items
    .filter(item => item.sys.contentType.sys.id === 'rezept')
    .map( (rezept) => {
      return {
        name: rezept.fields.name,
        zutaten: rezept.fields.zutaten.map( zutat => {
          const image: ZutatBild = {
            url: zutat.fields.image.fields.file.url,
            width: zutat.fields.image.fields.file.details.image?.width || 0,
            height: zutat.fields.image.fields.file.details.image?.height || 0,
          }
          return {
            name: zutat.fields.name,
            image
          }
        })
      }
    })

  return {
    props: {
      content: 'SSR Content',
      rezepte
    }
  };
}

export default Home
