import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import HirarPresentation from '../components/hirarchical-presentation'
import KMeans from '../components/k-means'
import SubmitButton from '../components/submit-button'
import styles from '../styles/Home.module.css'
import { HierarchicalResult } from '../types/cluster'
import { ClusterResult } from '../types/cluster-result'

const Home: NextPage = () => {  
  const [kmeans, setKMeans] = useState<ClusterResult[]>([])
  const [hirarchicalData, setHirarchicalData] = useState<HierarchicalResult | null>(null);

  const fetchKMeansData = async () => {
    const response = await fetch("http://localhost:3000/api/clustering/kmeans")
    const result = await response.json()

    if(response.status !== 400) {
      setHirarchicalData(null)
      setKMeans(result)
    }

    console.log(`K-MEANS: \n ${response}`)
  }

  const fetchHirarchicalData = async () => {
    const response = await fetch("http://localhost:3000/api/clustering/hierarchical")
    const result = await response.json()

    if (response.status !== 400) {
      setKMeans([])
      setHirarchicalData(result)
    }
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
          <SubmitButton text="Hierarchical" click={fetchHirarchicalData}/>
        </div>
        { kmeans.length > 0 &&  <KMeans clusters={kmeans}/>}
        { hirarchicalData !== null && <HirarPresentation hirarData={hirarchicalData}/> }
      </main>
    </div>
  )
}

export default Home
