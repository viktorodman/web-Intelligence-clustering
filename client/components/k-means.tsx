import styles from '../styles/Kmeans.module.css'
import { Cluster } from '../types/cluster'
type KMeansProps = {
    clusters: Cluster[]
}

const KMeans = ({ clusters }: KMeansProps) => {
  return (
    <div className={styles.wrapper}>
        {
            clusters.map((cluster, i) => {
                return (
                    <ul className={styles.root} key={i}>
                        <li>Cluster {i + 1} <span className={styles.numOf}>[{cluster.items.length} items]</span>
                            <ul>
                                {cluster.items.map((blog, j) => {
                                return <li className={styles.header} key={j}>--- {blog}</li>
                                })}
                            </ul>
                        </li>
                    </ul>
                )
            })
        }
    </div>
  )
}

export default KMeans
