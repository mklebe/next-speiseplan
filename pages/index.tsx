import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { createClient, Entry } from 'contentful';
import React from 'react';

const Home = ({ content, rezepte }: {content: string, rezepte: Array<{ name: string, zutaten: Array<{name: string}> }>}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Speiseplan</title>
      </Head>
      <h1>{ content }</h1>
      { rezepte.map( rezept => {
        return (
            <React.Fragment key={rezept.name}>
            <article>
              { rezept.name }
              <ul>
                {rezept.zutaten.map( zutat => (
                  <React.Fragment key={zutat.name}>
                    <li>{zutat.name}</li>
                  </React.Fragment>
                ))}
              </ul>
            </article>
          </React.Fragment>
        )
      }) }

    </div>
  )
}

export async function getServerSideProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE || '',
    accessToken: process.env.CONTENTFUL_API_KEY || '',
  });

  interface Zutat {
    name: string
  }

  interface Rezept {
    name: string;
    zutaten: Array<Entry<Zutat>>
  }

  const { items } = await client.getEntries<Rezept>();
  const rezepte = items
    .filter(item => item.sys.contentType.sys.id === 'rezept')
    .map( (rezept) => {
      return {
        name: rezept.fields.name,
        zutaten: rezept.fields.zutaten.map( zutat => ({name: zutat.fields.name}) )
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
