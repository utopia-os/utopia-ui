import { Item } from "utopia-ui/dist/types"
import { TextView } from "../../Map"
import ContactInfo from "../Subcomponents/ContactInfo"
import ProfileSubHeader from "../Subcomponents/ProfileSubHeader"
import { useEffect, useState } from "react"
import { useItems } from "../../Map/hooks/useItems"

export const Onepager = ({item, userType}:{item: Item, userType: string}) => {

  const [profile_owner, setProfileOwner] = useState<Item>();
  const items = useItems();



  useEffect(() => {
      setProfileOwner(items.find(i => (i.user_created?.id === item.user_created?.id) && i.layer?.itemType.name === userType));
  }, [item, items])

  const typeMapping = {
    'wuerdekompass': 'Regional-Gruppe',
    'themenkompass': 'Themenkompass-Gruppe',
    'liebevoll.jetzt': 'liebevoll.jetzt',
};

let groupType = item.group_type ? item.group_type : 'default';
let groupTypeText = typeMapping[groupType];

  return (
    <div className='tw-h-full tw-overflow-y-auto fade'>
    <div className="tw-px-6">
        <ProfileSubHeader
            type={groupTypeText}
            status={item.status}
            url={`https://www.wuerdekompass.org/aktivitaeten/gruppensuche/#/gruppe/${item.slug}`}
            title={item.name}
        />
    </div>
    {item.user_created.first_name && (
        <ContactInfo link={`/item/${profile_owner?.id}`} name={profile_owner?.name ? profile_owner.name : item.user_created.first_name} avatar={profile_owner?.image ? profile_owner.image : item.user_created.avatar} email={item.contact} telephone={item.telephone} />
    )}

    {/* Description Section */}
    <div className="tw-my-10 tw-mt-2 tw-px-6 tw-text-sm ">
        <TextView rawText={item.text || 'Keine Beschreibung vorhanden'} />
    </div>

    {/* Next Appointment Section */}
    {item.next_appointment && (
        <div className="tw-my-10 tw-px-6">
            <h2 className="tw-text-lg tw-font-semibold">Nächste Termine</h2>
            <div className="tw-mt-2 tw-text-sm">
                <TextView rawText={item.next_appointment} />
            </div>
        </div>
    )};

    {/* Relations Section */}
    {/*{d.relations && (*/}
    {/*    <div className="tw-my-10 tw-px-6">*/}
    {/*        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Projekte</h2>*/}
    {/*        {d.relations.map((project, index) => (*/}
    {/*            <RelationCard*/}
    {/*                key={index}*/}
    {/*                title={project.title}*/}
    {/*                description={project.description}*/}
    {/*                imageSrc={project.imageSrc}*/}
    {/*            />*/}
    {/*        ))}*/}
    {/*    </div>*/}
    {/*)}*/}
</div>
  )
}
