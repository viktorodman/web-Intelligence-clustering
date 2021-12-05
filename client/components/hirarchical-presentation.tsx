import { useState } from 'react'
import styles from '../styles/Hirar.module.css'
import { HierarchicalResult } from '../types/cluster'
import { ClusterResult } from '../types/cluster-result'
import HirarNode from './hirar-node'
import SubmitButton from './submit-button'

type HirarPresentationProps = {
  hirarData: HierarchicalResult
}

/* REF: https://codepen.io/bisserof/pen/fdtBm */

const HirarPresentation = ({ hirarData }: HirarPresentationProps) => {
  const createHirarLayout = (data: HierarchicalResult, level:number) => {
    if(data.left === null && data.right === null) return <li>{data.blog}</li>

    return (
      <>
        <HirarNode
          nodeID={"left"+level}
          text={data.blog}
          isLeft={true}
          key={"left"+level}
        >
          {data.left !== null ?
            createHirarLayout(data.left, level+1) : null
          }
        </HirarNode>
        <HirarNode
          nodeID={"right"+level}
          text={data.blog}
          isLeft={false}
          key={"right"+level}
        >
          {data.right !== null ?
            createHirarLayout(data.right, level+1) : null
          }
        </HirarNode>
      </>
    )
  } 


  return (
    <div className={styles.wrapper}>
      <ul className={styles.tree}>
        {createHirarLayout(hirarData, 1)}
      </ul>
    </div>
  )
}

export default HirarPresentation
