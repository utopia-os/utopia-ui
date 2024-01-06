import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardPage } from "utopia-ui";
import { readUserApi } from "../api/readUserApi";
import { UserItem } from "utopia-ui/dist/types";

export const ProfileView = () => {

  const [userApi, setUserApi] = useState<readUserApi>();
  const [user, setUser] = useState<UserItem>();

  let location = useLocation();


  const loadProject = async () => {
    const user: unknown = await userApi?.getItem(location.pathname.split("/")[2]);
    setUser(user as UserItem);

  }

  useEffect(() => {
    setUserApi(new readUserApi());
  }, [])

  useEffect(() => {
    loadProject();
  }, [userApi])

  return (
    <CardPage title={user?.first_name} hideTitle={true} parent={{ name: 'Profiles', url: "/profiles" }}>
      {user &&
        <>
          <div className="flex flex-row">
            
            <p className="text-4xl"><img className='h-20 rounded-full inline' src={`https://api.utopia-lab.org/assets/${user.avatar} : ''}`}></img> {user?.first_name}</p>

          </div>
          <p className='text-sm mt-8 mb-2 whitespace-pre-wrap	'>{user?.description}</p>
        </>

      }

    </CardPage>
  )
}
