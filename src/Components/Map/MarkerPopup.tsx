import * as React from 'react'
import { Popup } from 'react-leaflet'
import { Item, Tag } from '../../types'

export interface MarkerPopupProps {
  item: Item,
  tags: Tag[]
}

const MarkerPopup = (props: MarkerPopupProps) => {
  const item: Item = props.item;
  const tags: Tag[] = props.tags;

  return (
    <Popup maxHeight={320} minWidth={275} maxWidth={275} autoPanPadding={[30, 30]}>
      <b className="text-xl font-bold">{item.name}</b>
      {item.start && item.end &&
        <div className="flex flex-row">
          <div className="basis-2/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className='align-middle'>{new Date(item.start).toISOString().substring(0, 10) || ""}</span>
          </div>
          <div className="basis-1/5 place-content-center">
            <span>-</span>
          </div>
          <div className="basis-2/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className='align-middle leading-6'>{new Date(item.end).toISOString().substring(0, 10) || ""}</span>
          </div>
        </div>
      }

      <p style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: replaceURLs(item.text) }} />
      <p>

        {item.tags &&
          tags.map((tag: Tag) => (
            <span className="" style={{ fontWeight: "bold", display: "inline-block", color: "#fff", padding: ".3rem", borderRadius: ".5rem", backgroundColor: tag.color, margin: '.2rem', fontSize: "100%" }} key={tag.id}>#{tag.name}</span>
          ))
        }
      </p>
    </Popup>
  )
}

export default MarkerPopup;


function replaceURLs(message: string): string {
  if (!message) return "";

  var urlRegex = /(^| )(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,10})?(\/.*)?$/gm;
  message = message.replace(urlRegex, function (url) {
    var hyperlink = url.replace(' ', '');
    if (!hyperlink.match('^https?:\/\/')) {
      hyperlink = 'http://' + hyperlink;
    }
    return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
  });

  var mailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  message = message.replace(mailRegex, function (mail) {
    return '<a href="mailto:' + mail + '">' + mail + '</a>'
  });

  return message;
}