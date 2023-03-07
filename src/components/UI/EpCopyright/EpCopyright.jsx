import React from 'react';

import {
  BsGithub,
} from "react-icons/bs";

import {
  BiBook
} from "react-icons/bi";

import "./EpCopyright.scss";

function EpCopyright () {
  return (
    <div className="ep-copyright">
      <div className="ep-copyright-wrapper">
        <div className="credits">
          <h1>Team 2</h1>
          Made by John, Vlad, Namuna, Taylor, Lizzie, and Paul in {new Date().getFullYear()}
        </div>

        <div className="links">
          <h1>Project Links</h1>
          <ul>
            <li>
              <a href="https://github.com/jaohara/easily-poll-students">
                <BsGithub />&nbsp;
                Github Repo
              </a>
            </li>
            <li>
              <a href="https://coda.io/d/Easily-Poll-Students-in-Class_dyjfJn4pZSM/Easily-Poll-Students-in-Class_sumMj#_luSZD">
                <BiBook />&nbsp;
                Documentation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EpCopyright;
