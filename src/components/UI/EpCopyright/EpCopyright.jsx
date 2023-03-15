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
          <p>
            Made by&nbsp;<a href="https://github.com/jaohara">John</a>, <a href="https://github.com/vzwork">Vlad</a>, <a href="https://github.com/nk9487">Namuna</a>, <a href="https://github.com/taylorpapke">Taylor</a>, <a href="https://github.com/Ladybird91">Lizzie</a>, and <a href="https://github.com/PaulTMaack">Paul</a>&nbsp;in {new Date().getFullYear()}
          </p>
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
