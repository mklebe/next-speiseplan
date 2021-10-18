import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home = ({ content }: {content: string}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Speiseplan</title>
      </Head>
      <h1>{ content }</h1>

    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      content: 'SSR Content'
    }
  };
}

export default Home
