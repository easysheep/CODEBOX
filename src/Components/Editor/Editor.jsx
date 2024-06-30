import React, { useState } from "react";
import "./Editor.scss";
import Panel from "../Panel/Panel";
import { useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { db } from "../../../Firebaseconfig";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications
import { Slide } from "react-toastify";
const Editor = ({ HTML, CSS, JS }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const html = location.state.html;
  const [html, setHtml] = useState(location?.state?.html || "");
  const [css, setCss] = useState(location?.state?.css || "");
  const [js, setJs] = useState(location?.state?.js || "");
  const [prjctname, setprjctname] = useState("");
  const [showDialogue, setShowDialogue] = useState(false);
  const [isValidProjectName, setIsValidProjectName] = useState(false);
  const isEmpty = !html && !css && !js;
  const message = isEmpty ? "" : "";

  const srcDoc = `
  <html>
   <head>
     <style>
       body {
         color: white;
       }
     </style>
   </head>
   <body>${isEmpty ? message : html}</body>
   <style>${css}</style>
   <script>${js}</script>
  </html>
`;
  function writeUserData(prjctname, html, css, js) {
    set(ref(db, "projects/" + prjctname), {
      prjctname: prjctname,
      html: html,
      css: css,
      js: js,
    });
    navigate("/");
    toast.success("Project Saved!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  }

  const handleInputChange = (event) => {
    const projectName = event.target.value;
    setprjctname(projectName);
    setIsValidProjectName(projectName.trim() !== "");
  };
  const handleSaveClick = () => {
    if (isValidProjectName) {
      // Check if project name is valid
      setShowDialogue(false);
      writeUserData(prjctname, html, css, js);
    } else {
      // Handle invalid project name (e.g., show error message)
      alert("Please enter a project name.");
    }
  };

  const handleSave = () => {
    setShowDialogue(true);
  };

  return (
    <div className="">
      <div className={`editor ${showDialogue ? "blurred" : ""}`}>
        <div className="leftc">
          <div className="upPanel">
            {HTML?.length() > 0 || CSS?.length() > 0 || JS?.length() > 0 ? (
              <>
                <Panel
                  language="xml"
                  contname="HTML"
                  onChange={setHtml}
                  value={HTML}
                />

                <Panel
                  language="xml"
                  contname="CSS"
                  onChange={setCss}
                  value={CSS}
                />
                <Panel
                  language="xml"
                  contname="JS"
                  onChange={setJs}
                  value={JS}
                />
              </>
            ) : (
              <>
                <Panel
                  language="xml"
                  contname="HTML"
                  onChange={setHtml}
                  value={html}
                />
                <Panel
                  language="xml"
                  contname="CSS"
                  onChange={setCss}
                  value={css}
                />
                <Panel
                  language="xml"
                  contname="JS"
                  onChange={setJs}
                  value={js}
                />
              </>
            )}
          </div>
        </div>
        <button className="but" onClick={handleSave}>
          Save
        </button>

        <div className="rightc">
          <div className="iframe-container">
            <div className="iframe-title">OUTPUT</div>
            <iframe
              srcDoc={srcDoc}
              title="output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
      {showDialogue && (
        <div className="dialogue">
          <h2>Save Project</h2>
          <p>Project Name</p>
          <input
            type="text"
            placeholder="project name"
            onChange={handleInputChange}
          />
          <p>Do you want to save your changes?</p>
          <div className="db">
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setShowDialogue(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
