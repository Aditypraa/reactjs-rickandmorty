import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.logoSection}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
              alt="Rick and Morty"
              className={styles.footerLogo}
            />
            <p>
              Explore the vast multiverse of Rick and Morty characters,
              episodes, and locations.
            </p>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h4>Navigation</h4>
              <ul>
                <li>
                  <a href="/">Characters</a>
                </li>
                <li>
                  <a href="/episodes">Episodes</a>
                </li>
                <li>
                  <a href="/locations">Locations</a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4>Resources</h4>
              <ul>
                <li>
                  <a
                    href="https://rickandmortyapi.com"
                    target="_blank"
                    rel="noopener"
                  >
                    API Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Aditypraa/reactjs-rickandmorty"
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.portal}>
          <div className={styles.portalGlow}></div>
        </div>

        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} Rick & Morty Wiki</p>
          <p className={styles.apiCredit}>
            Powered by{" "}
            <a
              href="https://rickandmortyapi.com"
              target="_blank"
              rel="noopener"
            >
              The Rick and Morty API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
