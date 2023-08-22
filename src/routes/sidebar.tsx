
import MapIcon from '@heroicons/react/24/outline/MapIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'



//const iconClasses = `h-6 w-6`
//const submenuIconClasses = `h-5 w-5`

export const routes = [

  {
    path: '/',
    icon: <MapIcon style={{width: 24 }}/>, 
    name: 'Map',
  },
  {
    path: '/concept', // url
    icon: <UserGroupIcon style={{width: 24 }}/>, // icon component
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