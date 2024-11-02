/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Item } from '../../../types'
import { TextView } from '../../Map'
import ContactInfo from '../Subcomponents/ContactInfo'
import ProfileSubHeader from '../Subcomponents/ProfileSubHeader'
import { useEffect, useState } from 'react'
import { useItems } from '../../Map/hooks/useItems'

export const OnepagerView = ({ item, userType }: { item: Item; userType: string }) => {
  const [profileOwner, setProfileOwner] = useState<Item>()
  const items = useItems()

  useEffect(() => {
    setProfileOwner(
      items.find(
        (i) => i.user_created?.id === item.user_created?.id && i.layer?.itemType.name === userType,
      ),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, items])

  const typeMapping = {
    wuerdekompass: 'Regional-Gruppe',
    themenkompass: 'Themenkompass-Gruppe',
    'liebevoll.jetzt': 'liebevoll.jetzt',
  }

  const groupType = item.group_type ? item.group_type : 'default'
  const groupTypeText = typeMapping[groupType]

  return (
    <div className='tw-h-full tw-overflow-y-auto fade'>
      <div className='tw-px-6'>
        <ProfileSubHeader
          type={groupTypeText}
          status={item.status}
          url={`https://www.wuerdekompass.org/aktivitaeten/gruppensuche/#/gruppe/${item.slug}`}
          title={item.name}
        />
      </div>
      {item.user_created.first_name && (
        <ContactInfo
          link={`/item/${profileOwner?.id}`}
          name={profileOwner?.name ? profileOwner.name : item.user_created.first_name}
          avatar={profileOwner?.image ? profileOwner.image : item.user_created.avatar}
          email={item.contact}
          telephone={item.telephone}
        />
      )}
      {/* Description Section */}
      <div className='tw-my-10 tw-mt-2 tw-px-6 tw-text-sm '>
        <TextView rawText={item.text || 'Keine Beschreibung vorhanden'} />
      </div>
      {/* Next Appointment Section */}
      {item.next_appointment && (
        <div className='tw-my-10 tw-px-6'>
          <h2 className='tw-text-lg tw-font-semibold'>Nächste Termine</h2>
          <div className='tw-mt-2 tw-text-sm'>
            <TextView rawText={item.next_appointment} />
          </div>
        </div>
      )}
      ;{/* Relations Section */}
      {/* {d.relations && ( */}
      {/*    <div className="tw-my-10 tw-px-6"> */}
      {/*        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Projekte</h2> */}
      {/*        {d.relations.map((project, index) => ( */}
      {/*            <RelationCard */}
      {/*                key={index} */}
      {/*                title={project.title} */}
      {/*                description={project.description} */}
      {/*                imageSrc={project.imageSrc} */}
      {/*            /> */}
      {/*        ))} */}
      {/*    </div> */}
      {/* )} */}
    </div>
  )
}
