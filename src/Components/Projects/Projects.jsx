import React, { useEffect, useState } from 'react'
import "./Projects.scss"
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { remove } from "firebase/database";
import { getDatabase, ref, child, get } from "firebase/database";
import GridLoader from "react-spinners/GridLoader";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast notifications
import { Slide } from 'react-toastify';
const Projects = () => {
  const navigate = useNavigate();
  

  const dbRef = ref(getDatabase());
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(child(dbRef, `projects`));
        
        if (snapshot.exists()) {
          const projectsArray = Object.entries(snapshot.val()).map(([key, value]) => ({ key, ...value }));
          setProjects(projectsArray);
        } else {
          console.log("No data available");
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [setProjects,projects]);

  const handleEdit = (html,css,js) => {
    navigate('/editor', { state: { html: html,css:css,js:js } });
  };

  const handleDelete = (projectKey) => {
    const projectRef = ref(getDatabase(), 'projects/' + projectKey);
    remove(projectRef)
      .then(() => {
        toast.error('Project deleted successfully.', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
          });
      
      })
      .catch((error) => {
        console.error("Error deleting project: ", error);
      });
  };
  
  return (
    <div className='project'>
      <div className="hrline1"></div>
      <div className="vrline1"></div>
      <div className="head">
      {loading ? (
        <div className="loader">
          <GridLoader color="black" size={50} />
        </div>
  
) : (
  projects.length > 0 ? (
    projects.map((element) => (
      <div className="projectfolder" key={element.prjctname}>
        {element.prjctname}
        <div className="buttons">
          <div className="delete" onClick={()=>{handleDelete(element.prjctname)}}>
            <FaTrash size={25} />
          </div>
          <div className="edit" onClick={()=>{handleEdit(element.html,element.css,element.js)}}>
            <MdEdit size={25} />
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="no-projects-message">No Saved Projects</div>
  )
)}

      



      </div>
      
      <div className="vrline2"></div>
      <div className="hrline2"></div>


    </div>
  )
}

export default Projects;
