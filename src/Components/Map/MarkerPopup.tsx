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
    <Popup maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[30,30]}>
      <b className="text-xl font-bold">{item.name}</b>

      {item.start && item.end &&
        <p>{new Date(item.start).toISOString().substring(0, 10) || ""} - {new Date(item.end).toISOString().substring(0, 10) || ""}</p>
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