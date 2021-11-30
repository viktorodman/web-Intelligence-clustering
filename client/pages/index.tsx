import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import KMeans from '../components/k-means'
import SubmitButton from '../components/submit-button'
import styles from '../styles/Home.module.css'
import { ClusterResult } from '../types/cluster-result'

const Home: NextPage = () => {  
  const [kmeans, setKMeans] = useState<ClusterResult[]>([])

  const fetchKMeansData = async () => {
    const response = await fetch("http://localhost:3000/api/clustering/kmeans")
    const result = await response.json()

    if(response.status !== 400) {
      setKMeans(result)
    }

    console.log(`K-MEANS: \n ${response}`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Clustering App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Clustering
        </h1>
        <p className={styles.description}>Select clustering method</p>
        <div className={styles.buttonArea}>
          <SubmitButton text="K-means" click={fetchKMeansData}/>
          <SubmitButton text="Hierarchical" click={() => console.log()}/>
        </div>
        {
          kmeans.length > 0 ? <KMeans clusters={kmeans}/> : null
        }
        
      </main>
    </div>
  )
}

export default Home
