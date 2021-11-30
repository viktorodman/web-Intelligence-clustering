import styles from '../styles/Kmeans.module.css'
import { HierarchicalResult } from '../types/cluster'
import { ClusterResult } from '../types/cluster-result'
type HirarPresentationProps = {
  /* hierarchicalResult: HierarchicalResult */
  test: string
}

/* REF: https://codepen.io/sprom/pen/pvGjyv */

const HirarPresentation = ({ test }: HirarPresentationProps) => {
  return (
    <div>
      <ul>
        <li>
          <a href="#">Parent</a>
          <ul>
            <li>
              <a href="#">Child</a>
              <ul>
                <li>
                  <a href="#">Grand Child</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Child</a>
              <ul>
                <li><a href="#">Grand Child</a></li>
                <li>
                  <a href="#">Grand Child</a>
                  <ul>
                    <li>
                      <a href="#">Great Grand Child</a>
                    </li>
                    <li>
                      <a href="#">Great Grand Child</a>
                    </li>
                    <li>
                      <a href="#">Great Grand Child</a>
                    </li>
                  </ul>
                </li>
                <li><a href="#">Grand Child</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default HirarPresentation
