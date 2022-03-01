import styles from "./styles.module.css";

function Overlay({ removeFormFromDisplay, children }) {
  return (
    <div
      onClick={(event) => {
        if (event.target.className === styles.overlay) {
          removeFormFromDisplay();
        }
      }}
      className={styles.overlay}
    >
      {children}
    </div>
  );
}

export default Overlay;
