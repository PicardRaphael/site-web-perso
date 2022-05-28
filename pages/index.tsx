import type { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles["container"]}>
      <p className={styles["start"]}>Site en construction</p>
      <div id={styles["titles"]}>
        <div id={styles["titlecontent"]}>
          <p>Bienvenu sur mon site web perso !</p>
          <p>
            Je m&apos;appelle <strong>Raphaël PICARD</strong>.
          </p>
          <p>Je suis Développeur Web/Mobile depuis maintenant 6ans.</p>
          <p>Actuellement mon site est en cours de construction !</p>
          <p>Vous pouvez cependant trouver ci-joint mon CV et mon linkedin.</p>
          <p style={{ textAlign: "center" }}>
            <a
              href="https://www.linkedin.com/in/raphael-picard/"
              target="_blank"
              rel="noreferrer"
            >
              <img alt="linkedin" src="/linkedin.png" />
            </a>
          </p>
          <p>
            <a
              href="../public/CVRaphaelPICARD2021-2022.pdf"
              download
              className={styles["space-button"]}
            >
              Télécharger mon Curriculum vitæ
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
