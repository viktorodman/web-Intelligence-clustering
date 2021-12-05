import styles from '../styles/Hirar.module.css'
import { HierarchicalResult } from '../types/cluster'
import { ClusterResult } from '../types/cluster-result'

type HirarPresentationProps = {
  hirarData: HierarchicalResult
}

/* const blogdata = {
  blog: "",
  left: {
    blog: "gapingvoid: \"cartoons drawn on the back of business cards\"",
    left: null,
    right: null
  },
  right: {
    blog: "",
    left: {
      blog: "",
      left: {
        blog: "Schneier on Security",
        left: null,
        right: null
      },
      right: {
        blog: "Instapundit.com",
        left: null,
        right: null
      }
    },
    right: {
      blog: "",
      left: null,
      right: null
    }
  }
} */



/* REF: https://codepen.io/bisserof/pen/fdtBm */

const HirarPresentation = ({ hirarData }: HirarPresentationProps) => {
  const createHirarLayout = (data: HierarchicalResult, level:number) => {
    if(data.left === null && data.right === null)  {
      return (
        <li>{data.blog}</li>
      )
    }

    return (
      <>
        <li>
          <input type="checkbox" id={"left"+level} />
          <label htmlFor={"left"+level}>{data.blog} (left)</label>
          {data.left !== null && 
            <ul>
              {createHirarLayout(data.left, level+1)}
            </ul>
          }
        </li>
        <li>
          <input type="checkbox" id={"right"+level} />
          <label htmlFor={"right"+level}>{data.blog} (right)</label>
          {data.right !== null && 
            <ul>
              {createHirarLayout(data.right, level+1)}
            </ul>
          }
        </li>
      </>
    )
  } 


  return (
    <div>
      <ul className={styles.tree}>
        {createHirarLayout(hirarData, 1)}
      </ul>

     {/*  <ul className="tree">
        <li>
          <input type="checkbox" defaultChecked={true} id="c1" />
          <label className="tree_label" htmlFor="c1">Level 0</label>
          <ul>
            <li>
              <input type="checkbox" defaultChecked={true} id="c2" />
              <label htmlFor="c2" className="tree_label">Level 1</label>
              <ul>
                <li><span className="tree_label">Level 2</span></li>
                <li><span className="tree_label">Level 2</span></li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="c3" />
              <label htmlFor="c3" className="tree_label">Looong level 1 <br/>label text <br/>with line-breaks</label>
              <ul>
                <li><span className="tree_label">Level 2</span></li>
                <li>
                  <input type="checkbox" id="c4" />
                  <label htmlFor="c4" className="tree_label"><span className="tree_custom">Specified tree item view</span></label>
                  <ul>
                    <li><span className="tree_label">Level 3</span></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        
        
        <li>
          <input type="checkbox" id="c5" />
          <label className="tree_label" htmlFor="c5">Level 0</label>
          <ul>
            <li>
              <input type="checkbox" id="c6" />
              <label htmlFor="c6" className="tree_label">Level 1</label>
              <ul>
                <li><span className="tree_label">Level 2</span></li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="c7" />
              <label htmlFor="c7" className="tree_label">Level 1</label>
              <ul>
                <li><span className="tree_label">Level 2</span></li>
                <li>
                  <input type="checkbox" id="c8" />
                  <label htmlFor="c8" className="tree_label">Level 2</label>
                  <ul>
                    <li><span className="tree_label">Level 3</span></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul> */}
    </div>
  )
}

export default HirarPresentation
