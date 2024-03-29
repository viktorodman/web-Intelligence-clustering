import styles from '../styles/Button.module.css'
type SubmitButtonProps = {
    text: string,
    click: () => void
}

const SubmitButton = ({ text, click }: SubmitButtonProps) => {
  return (
    <div>
        <button className={styles.button} onClick={() => click()}>{text}</button>
    </div>
  )
}

export default SubmitButton
