import { Tag } from "../types";

export const hashTagRegex = /(#+[a-zA-Z0-9A-Za-zÀ-ÖØ-öø-ʸ(_)]{1,})/g;

export function heighlightTags(message: string, tags: Tag[]): string {
    if (!message) return "";

    message = message.replace(hashTagRegex, function (string) {
      const tag = tags.find(t => t.id.toLowerCase() == string.slice(1).toLowerCase())
      return `<span style="background-color: ${tag ? tag.color : '#aaa' };padding: 0px 5px;border-radius: 7px;cursor: pointer;color:#fff">` + string + '</span>'
    });
  
    return message;
  }