export const StringFormater = (message:string) => {
    if(!message) return "";

    var urlRegex = /(^| )(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,10})?(\/.*)?$/gm;
    message = message.replace(urlRegex, function (url) {
      var hyperlink = url.replace(' ','');
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