import './Footer.css';

export const Footer = () => (
  <footer className="app-footer">
    <p className="app-footer__text">
      © {new Date().getFullYear()} Job Portal · Built with React + Vite
    </p>
    <div className="app-footer__links">
      <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
      <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
      <a href="#" onClick={(e) => e.preventDefault()}>Help</a>
    </div>
  </footer>
);
