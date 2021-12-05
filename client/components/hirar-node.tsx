import { useState } from 'react'
import styles from '../styles/Hirar.module.css'
import { HierarchicalResult } from '../types/cluster'
import { ClusterResult } from '../types/cluster-result'
import SubmitButton from './submit-button'

type HirarNodeProps = {
    nodeID: string
    text: string
    children: JSX.Element | null
    isLeft: boolean
}

const HirarNode = ({ nodeID, text, children, isLeft }: HirarNodeProps) => {
    return (
        <li>
            <input type="checkbox" id={"left"+nodeID}/>
            <label htmlFor={"left"+nodeID}>{text} ({isLeft ? "left" : "right"})</label>
            <ul>
                {children}
            </ul>
        </li>
    )
}

export default HirarNode
