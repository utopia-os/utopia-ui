import * as React from 'react'
import { decodeTag } from '../../Utils/FormatTags'
import { Tag } from '../../types'

export const TagView = ({tag, heighlight, onClick} : {tag: Tag, heighlight?: boolean, onClick?: (e)=> void}) => {
  return (
     // Use your imagination to render suggestions.

    <div key={tag.name} onClick={onClick} className={`tw-rounded-2xl tw-text-white tw-p-2 tw-px-4 tw-shadow-xl tw-card  tw-mt-3 tw-mr-4 tw-cursor-pointer tw-w-fit ${heighlight && 'tw-border-primary tw-shadow-te-primary'}`} style={{ backgroundColor: tag.color ? tag.color : "#666" }}>
      <div className="tw-card-actions tw-justify-end">
      </div><b>{decodeTag(tag.name)}</b>
    </div>

  )
}
