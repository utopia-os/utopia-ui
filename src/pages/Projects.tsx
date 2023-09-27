import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon'
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon'
import { TextInput, TitleCard, SelectBox, useAuth } from 'utopia-ui'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { itemsApi } from '../api/itemsApi'
import { Project } from '../api/directus'




export default function Projects() {


  const [search, setSearch] = useState<string>("")

  const [projectsApi, setProjectsApi] = useState<itemsApi<Project>>();
  const [projects, setProjects] = useState<Project[]>();

  const loadProjects = async () => {
    const projects = await projectsApi?.getItems();
    setProjects(projects as Project[]);

  }

  useEffect(() => {
    setProjectsApi(new itemsApi<Project>('projects'));
    loadProjects();
  }, [])

  useEffect(() => {
    loadProjects();
  }, [projectsApi])

const {token,isAuthenticated} = useAuth();

  return (
    <main className="flex-1 overflow-y-auto pt-2 px-6  bg-base-200 min-w-80 flex justify-center" >
      <div className=' w-full xl:max-w-6xl'>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to={'/'} >Home</Link></li>
            <li><Link to={'/projects'} >Projects</Link></li>
          </ul>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-2 ">
          <TextInput defaultValue='' placeholder='🔍 Search' containerStyle='lg:col-span-2' updateFormValue={(val) => { setSearch(val) }}></TextInput>
          <SelectBox updateFormValue={() => { }} placeholder="Type" containerStyle=' hidden md:grid' defaultValue='PLACEHOLDER' options={[{ name: "local", value: "local" }, { name: "project", value: "project" }]} />
        </div>

        <div className="divider" ></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {
            projects?.filter(item => {
              return search === ''
                ? item :
                item.name.toLowerCase().includes(search.toLowerCase());
            }).map((i, k) => {
              return (
                <Link key={k} to={'/projects/' + i.id}>
                  <TitleCard className={"!h-96"} title={i.name} topMargin={"mt-2"}>
                    <p className='font-bold text-sm mb-2'>{i.subname}</p>
                  <img className='h-36' src={`https://api.utopia-lab.org/assets/${i.picture}${isAuthenticated ?  `?access_token=${token}` : ''}`}></img>
                    {i.text}
                    {/**
 *                  <div className='flex justify-between text-gray-500 '>
                    <div className='flex'><UsersIcon className=' h-6 w-6' />&nbsp;2</div>
                    <div className='flex'><MapPinIcon className='h-6 w-6' />&nbsp;5</div>
                    <div className='flex'><CalendarIcon className='h-6 w-6' />&nbsp;9</div>
                  </div>
 
 */}


                  </TitleCard>
                </Link>
              )

            })
          }
        </div>
      </div>
    </main>


  )
}
