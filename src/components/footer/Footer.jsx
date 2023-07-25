import css from './footer.module.css'


const Footer = () => {
    return (
        <div className={css.footerSection}>
            <div>
                <a className={css.footerLink} href="https://github.com/LeonidYezerskyi/my-wallet-app" target="_blank" rel="noreferrer">
                    Code <i className="uil uil-github-alt"></i>
                </a>
            </div>
        </div>
    )
}

export default Footer