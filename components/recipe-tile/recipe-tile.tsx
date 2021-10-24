import React from 'react';
import Image from 'next/image';
import { Rezept } from "../../pages";
import styles from './recipe-tile.module.css';

type RecipeTileProps = {
  rezept: Rezept
}

export function RecipeTile({rezept}: RecipeTileProps ) {
  return (
    <article>
      <h2>{ rezept.name }</h2>
      <ul className={styles.list}>
        {rezept.zutaten.map( zutat => {
          return (<React.Fragment key={zutat.name}>
            <li style={{height: 200, overflow: 'hidden'}}>
              <Image
                src={`https:${zutat.image.url}`}
                alt={zutat.name}
                layout="responsive"
                width={zutat.image.width}
                height={zutat.image.height}
              />
              <p>{zutat.name}</p>
            </li>
          </React.Fragment>)
        })}
      </ul>
    </article>
  )
}