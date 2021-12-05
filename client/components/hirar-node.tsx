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
