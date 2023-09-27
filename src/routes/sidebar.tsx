
import { BookOpenIcon, RectangleGroupIcon, UsersIcon, MapIcon } from '@heroicons/react/24/outline'

//const iconClasses = `h-6 w-6`
//const submenuIconClasses = `h-5 w-5`

export const routes = [

  {
    path: '/',
    icon: <MapIcon style={{width: 24 }}/>, 
    name: 'Map',
  },
  {
    path: '/projects', // url
    icon: <RectangleGroupIcon style={{width: 24 }}/>, // icon component
    name: 'Projects', // name that appear in Sidebar
  }/**
  {
    path: '/people', // url
    icon: <UsersIcon style={{width: 24 }}/>, // icon component
    name: 'People', // name that appear in Sidebar
  }, */,

  {
    path: '/concept', // url
    icon: <BookOpenIcon style={{width: 24 }}/>, // icon component
    name: 'Concept', // name that appear in Sidebar
  },


  /*
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Pages', // name that appear in Sidebar
    submenu : [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Kanban',
      },
      {
        path: '/register', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Gitlab', // name that appear in Sidebar
      },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses}/>,
        name: 'Wiki',
      },
    ]
  }
  */
]