import React from 'react'

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>
        Built while consuming many vices. Copyright &copy;{new Date().getFullYear()}.
      </p>
      <p className="small">
        {`If "Miami Vice" is trademarked in such a way as to be heinously
        (or legally) offensive, just let me know. Get at me on Twitter at `}
        <a href="https://twitter.com/kyleshevlin">@kyleshevlin</a>.
        Cool?
      </p>
    </div>
  </footer>
)

export default Footer
