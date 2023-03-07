import React from 'react';


function EpCopyright () {
  return (
    <div className="ep-copyright">
      <p>
        Made by John, Vlad, Namuna, Taylor, Lizzie, and Paul in {new Date().getFullYear()}
      </p>

      <p>
        <a href="https://github.com/jaohara/easily-poll-students">Github</a>
      </p>
    </div>
  );
}

export default EpCopyright;
