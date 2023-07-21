import { Tag } from "../types";

export function heighlightTags(message: string, tags: Tag[]): string {
    if (!message) return "";

    
  

    const hashTagRegex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
    message = message.replace(hashTagRegex, function (string) {
      console.log(string);

      const tag = tags.find(t => t.id == string.slice(1))
      return `<span style="background-color: ${tag ? tag.color : '#aaa' };padding: 0px 5px;border-radius: 7px;cursor: pointer;color:#fff">` + string + '</span>'
    });
  
    return message;
  }