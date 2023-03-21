import React from "react";
import { MdClose } from "react-icons/md";
import style from "../styles/ForumModal.module.scss";

const ForumModal = ({ setForumModalVisibility }) => {
  return (
    <div className={style.modalParent}>
      <div
        className={style.overlay}
        onClick={() => setForumModalVisibility(false)}
      ></div>
      <div className={style.modalContainer}>
        <div className={style.modalContainer__topArea}>
          <h3>Join forum</h3>
          <div
            className={style.closeIcon}
            onClick={() => setForumModalVisibility(false)}
          >
            <MdClose />
          </div>
        </div>
        <div className={style.modalContainer__content}>
          <div className={style.join}>
            <p>Join free community: </p>
            <a
              href="https://chat.whatsapp.com/DzIdHUP3etQBlvK78RIVc6"
              target="_blank"
              rel="noreferrer"
            >
              <button>Join now</button>
            </a>
          </div>
          <div className={style.join}>
            <p>Join paid community: </p>
            <button>Join now</button>
          </div>
        </div>
        <div
          className={style.modalContainer__cta}
          onClick={() => setForumModalVisibility(false)}
        >
          <button>Dismiss</button>
        </div>
      </div>
    </div>
  );
};

export default ForumModal;
