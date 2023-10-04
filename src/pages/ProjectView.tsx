import { useState, useEffect } from "react";
import { itemsApi } from "../api/itemsApi";
import { Project } from '../api/directus'
import { useLocation } from "react-router-dom";
import { CardPage } from "utopia-ui";

export const ProjectView = () => {

  const [projectsApi, setProjectsApi] = useState<itemsApi<Project>>();
  const [project, setProject] = useState<Project>();

  let location = useLocation();


  const loadProject = async () => {
    const project: unknown = await projectsApi?.getItem(location.pathname.split("/")[2]);
    setProject(project as Project);

  }

  useEffect(() => {
    setProjectsApi(new itemsApi<Project>('projects'));
  }, [])

  useEffect(() => {
    loadProject();
  }, [projectsApi])

  return (
    <CardPage title={project?.name || ""} parent={{name: 'Projects',url: "/projects"}}>
      {project &&
        <>
          <img className='h-36' src={`https://api.utopia-lab.org/assets/${project?.picture} : ''}`}></img>
          <p className='font-bold text-sm mb-2 mt-2'>{project?.subname}</p>
          <p className='text-sm mb-2'>{project?.text}</p>
        </>

      }

    </CardPage>
  )
}
