/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as L from 'leaflet'

const createSvg = (shape: string, markerColor: string, borderColor: string) => {
  const svgMap = {
    circle:
      '<svg width="32" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 2.746c-8.284 0-15 6.853-15 15.307 0 .963.098 1.902.265 2.816a15.413 15.413 0 002.262 5.684l.134.193 12.295 17.785 12.439-17.863.056-.08a15.422 15.422 0 002.343-6.112c.123-.791.206-1.597.206-2.423 0-8.454-6.716-15.307-15-15.307" fill="' +
      markerColor +
      '" /><path d="M17.488 2.748c-8.284 0-15 6.853-15 15.307 0 .963.098 1.902.265 2.816a15.413 15.413 0 002.262 5.684l.134.193 12.295 17.785 12.44-17.863.055-.08a15.422 15.422 0 002.343-6.112c.124-.791.206-1.597.206-2.423 0-8.454-6.716-15.307-15-15.307m0 1.071c7.68 0 13.929 6.386 13.929 14.236 0 .685-.064 1.423-.193 2.258-.325 2.075-1.059 3.99-2.164 5.667l-.055.078-11.557 16.595L6.032 26.14l-.12-.174a14.256 14.256 0 01-2.105-5.29 14.698 14.698 0 01-.247-2.62c0-7.851 6.249-14.237 13.928-14.237" fill="' +
      borderColor +
      '" opacity="1" /></svg>',
    square:
      '<svg width="33" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M28.205 3.217H6.777c-2.367 0-4.286 1.87-4.286 4.179v19.847c0 2.308 1.919 4.179 4.286 4.179h5.357l5.337 13.58 5.377-13.58h5.357c2.366 0 4.285-1.87 4.285-4.179V7.396c0-2.308-1.919-4.179-4.285-4.179" fill="' +
      markerColor +
      '" /><g opacity="1" transform="matrix(1.0714 0 0 -1.0714 -233.22 146.783)"><path d="M244 134h-20c-2.209 0-4-1.746-4-3.9v-18.525c0-2.154 1.791-3.9 4-3.9h5L233.982 95 239 107.675h5c2.209 0 4 1.746 4 3.9V130.1c0 2.154-1.791 3.9-4 3.9m0-1c1.654 0 3-1.301 3-2.9v-18.525c0-1.599-1.346-2.9-3-2.9h-5.68l-.25-.632-4.084-10.318-4.055 10.316-.249.634H224c-1.654 0-3 1.301-3 2.9V130.1c0 1.599 1.346 2.9 3 2.9h20" fill="' +
      borderColor +
      '" /></g></svg>',
    star:
      '<svg width="34" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M32.92 16.93l-3.525-3.525V8.419a1.983 1.983 0 00-1.983-1.982h-4.985L18.9 2.91a1.984 1.984 0 00-2.803 0l-3.524 3.526H7.588a1.983 1.983 0 00-1.982 1.982v4.986L2.081 16.93a1.982 1.982 0 000 2.803l3.525 3.526v4.984c0 1.096.888 1.983 1.982 1.983h4.986L17.457 45l4.97-14.773h4.985a1.983 1.983 0 001.983-1.983V23.26l3.525-3.526a1.982 1.982 0 000-2.803" fill="' +
      markerColor +
      '" /><g opacity=".15" transform="matrix(1.0667 0 0 -1.0667 -347.3 97.26)"><path d="M342 89c-.476 0-.951-.181-1.314-.544l-3.305-3.305h-4.673a1.858 1.858 0 01-1.859-1.858v-4.674l-3.305-3.305a1.857 1.857 0 010-2.627l3.305-3.305v-4.674a1.86 1.86 0 011.859-1.859h4.673L341.959 49l4.659 13.849h4.674a1.86 1.86 0 011.859 1.859v4.674l3.305 3.305a1.858 1.858 0 010 2.627l-3.305 3.305v4.674a1.859 1.859 0 01-1.859 1.858h-4.674l-3.304 3.305A1.851 1.851 0 01342 89m0-1a.853.853 0 00.607-.251l3.304-3.305.293-.293h5.088a.86.86 0 00.859-.858v-5.088l3.598-3.598A.852.852 0 00356 74a.85.85 0 00-.251-.606l-3.598-3.598v-5.088a.86.86 0 00-.859-.859h-5.393l-.229-.681-3.702-11.006-3.637 11.001-.227.686h-5.396a.86.86 0 00-.859.859v5.088l-3.598 3.598c-.162.162-.251.377-.251.606s.089.445.251.607l3.598 3.598v5.088a.86.86 0 00.859.858h5.087l3.598 3.598A.853.853 0 00342 88" fill="#231f20" /></g></svg>',
    penta:
      '<svg width="33" height="44" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg"><path d="M1.872 17.35L9.679 2.993h15.615L33.1 17.35 17.486 44.992z" fill="' +
      markerColor +
      '" /><g opacity=".15" transform="matrix(1.0769 0 0 -1.0769 -272.731 48.23)"><path d="M276.75 42h-14.5L255 28.668 269.5 3 284 28.668zm-.595-1l6.701-12.323L269.5 5.033l-13.356 23.644L262.845 41z" fill="#231f20" /></g></svg>',
  }
  return svgMap[shape]
}

const addIcon = (icon: string) => {
  switch (icon) {
    case 'point':
      return '<svg fill="#fff" class="circle-icon" width="13"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"/></svg>'
    case 'calendar':
      return '<svg fill="#fff" class="calendar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z"/></svg>'
    case 'user':
      return '<svg fill="#fff" class="user-icon" xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>'
    case 'fire':
      return '<svg fill="#fff"  class="fire-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.534 26.387"><path d="M7.15 26.05C2.894 24.876.006 21.028.006 16.53c0-4.036 2.718-8.378 4.38-6.999.289.24.383.993.383 3.074 0 3.3.46 4.508 1.997 5.237 2.512 1.192 5.206-1.18 4.506-3.969-.097-.386-.99-1.562-1.986-2.614C7.04 8.887 6.583 8.026 6.583 6.176c0-2.333 2.02-6.182 3.244-6.182.59 0 1.292.98 1.292 1.805 0 1.227.951 2.596 3.727 5.362 3.655 3.642 4.493 5.216 4.671 8.776.143 2.847-.365 4.593-1.93 6.644-2.332 3.054-6.69 4.503-10.437 3.47z"/></svg>'
    case 'tree':
      return '<svg fill="#fff"  class="tree-icon" xmlns="http://www.w3.org/2000/svg" height="2em" xml:space="preserve" viewBox="0 0 24 24"><path d="M11 21v-4.3c-.5.2-1 .3-1.5.3C7 17 5 15 5 12.5c0-1.3.5-2.4 1.4-3.2-.3-.6-.4-1.2-.4-1.8C6 5 8 3 10.5 3c1.6 0 2.9.8 3.8 2h.2c3 0 5.5 2.5 5.5 5.5S17.5 16 14.5 16c-.5 0-1-.1-1.5-.2V21h-2z"/><path fill="none" d="M0 0h24v24H0z"/></svg>'
    case 'music':
      return '<svg fill="#fff"  class="music-icon" xmlns="http://www.w3.org/2000/svg" height="1.4em"  viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>'
    case 'drum':
      return '<svg class="drum-icon" stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 32 32" height="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M 27.1875 5.09375 L 16.125 10.34375 C 15.804688 10.128906 15.414063 10 15 10 C 13.894531 10 13 10.894531 13 12 C 13 13.105469 13.894531 14 15 14 C 16.050781 14 16.921875 13.1875 17 12.15625 L 23.0625 9.28125 C 24.878906 10.046875 26 11.046875 26 12 C 26 13.886719 21.722656 16 16 16 C 10.277344 16 6 13.886719 6 12 C 6 10.113281 10.277344 8 16 8 C 16.171875 8 16.328125 7.996094 16.5 8 L 20.03125 6.34375 C 18.777344 6.132813 17.433594 6 16 6 C 9.160156 6 4 8.578125 4 12 L 4 22 C 4 22.988281 4.445313 23.894531 5.125 24.625 C 5.804688 25.355469 6.730469 25.945313 7.8125 26.4375 C 9.976563 27.421875 12.839844 28 16 28 C 19.160156 28 22.023438 27.421875 24.1875 26.4375 C 25.269531 25.945313 26.195313 25.355469 26.875 24.625 C 27.554688 23.894531 28 22.988281 28 22 L 28 12 C 28 10.523438 27.023438 9.210938 25.375 8.1875 L 28.03125 6.90625 Z M 6 15.40625 C 7.015625 16.171875 8.378906 16.800781 10 17.25 L 10 25.15625 C 9.5 25 9.042969 24.816406 8.625 24.625 C 7.71875 24.210938 7.027344 23.714844 6.59375 23.25 C 6.160156 22.785156 6 22.394531 6 22 Z M 26 15.40625 L 26 22 C 26 22.394531 25.839844 22.785156 25.40625 23.25 C 24.972656 23.714844 24.28125 24.210938 23.375 24.625 C 22.957031 24.816406 22.5 25 22 25.15625 L 22 17.25 C 23.621094 16.800781 24.984375 16.171875 26 15.40625 Z M 12 17.6875 C 13.242188 17.894531 14.582031 18 16 18 C 17.417969 18 18.757813 17.894531 20 17.6875 L 20 25.625 C 18.769531 25.855469 17.421875 26 16 26 C 14.578125 26 13.230469 25.855469 12 25.625 Z"></path></svg>'
    case 'quest':
      return '<svg class="quest-icon" viewBox="0 0 4.69 5.987" fill="#fff" height="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M2.395 0 0 .898v2.096C0 4.79 2.395 5.987 2.395 5.987S4.79 4.79 4.79 2.994V.898zm.026 1.262c.518 0 1.07.404 1.07.937 0 .707-.764.718-.764.98v.035c0 .08-.065.146-.146.146H2.14a.146.146 0 0 1-.146-.146v-.06c0-.377.285-.528.501-.649.186-.104.3-.174.3-.312 0-.182-.232-.303-.42-.303-.239 0-.352.11-.505.302a.147.147 0 0 1-.203.025l-.263-.2a.147.147 0 0 1-.032-.2c.248-.355.563-.555 1.05-.555zM2.36 3.54a.423.423 0 1 1 0 .846.423.423 0 0 1 0-.846z"/></svg>'
    case 'compass':
      return '<svg class="compass-icon" fill="#fff" height="1.8em" viewBox="0 0 67.731 67.731" xmlns="http://www.w3.org/2000/svg"><path d="m135.772 101.812-7.157-.73c-1.669-10.98-11.344-20.654-22.323-22.323l-.73-7.144c-.536-2.136-3.571-2.136-4.107 0l-.73 7.157c-10.98 1.669-20.654 11.344-22.323 22.323l-7.144.73c-2.136.536-2.136 3.571 0 4.107l7.157.73c1.669 10.98 11.344 20.654 22.323 22.323l.73 7.157c.536 2.136 3.571 2.136 4.107 0l.73-7.157c10.98-1.669 20.655-11.344 22.323-22.323l7.157-.73c2.136-.536 2.136-3.571 0-4.107zm-11.687-1.323-15.126-2.074-2.064-15.126c7.718 1.857 15.332 9.471 17.19 17.19zm-23.963-17.198-2.064 15.124-15.126 2.064c1.857-7.719 9.471-15.333 17.19-17.19zm-17.198 23.964 15.134 2.06 2.064 15.127c-7.719-1.858-15.333-9.472-17.19-17.19zm23.963 17.198 2.064-15.127 15.126-2.063c-1.86 7.712-9.47 15.32-17.182 17.179z" style="stroke-width:.264583" transform="translate(-69.656 -70.013)"/></svg>'
    case 'liebevoll.jetzt':
      return '<svg class="liebevoll-jetzt-icon" fill="#fff" height="1.5em" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 42 42"><path fill="#e52220" d="M32.554 33.551c0-.2.2-.5 0-.7-.2-.2-.1 0-.3-.1-.5-.2-1.2-.1-1.7.2-.7.3-1.7 1.5-1.3 2.4.2.3.5.6.8.8.5.3.8-.1 1.2-.4.4-.3.7-.5.9-1 .1-.1.8-1.2.4-1.2z"/>  <path fill="#fff" d="M14.426 41.57c-1.512-.808-2.234-2.322-2.403-5.038-.104-1.671.136-3.65.844-6.962.497-2.327.545-2.56.81-3.95.236-1.234 3.381-10.767 4.237-12.842.688-1.667 3.022-6.084 3.379-6.394.158-.137.708-.948 1.22-1.802C24.243 1.704 25.935 0 27.065 0c1.134 0 2.303 1.066 2.763 2.521.274.864.133 2.528-.34 4.032-.551 1.754-2.928 6.42-3.994 7.84a37.025 37.025 0 0 0-1.753 2.622c-1.173 1.957-2.233 3.525-4.002 5.92-.831 1.126-1.628 2.306-1.77 2.621-.422.932-1.792 6.558-1.836 7.536-.023.496-.095 1.73-.16 2.742-.175 2.714.265 3.687 1.54 3.407.737-.162 1.569-.967 3.197-3.092 2.302-3.005 5.204-7.528 6.524-10.17.622-1.243 1.228-2.06 1.528-2.06.394 0 .46 1.003.131 1.975-.413 1.219-4.57 8.126-6.186 10.277-1.727 2.3-4.191 4.785-5.233 5.277-1.194.564-2.15.602-3.048.123zm6.76-23.631c2.714-4.414 5.248-9.115 5.42-10.052.027-.148.172-.553.322-.9.397-.915.872-2.532.997-3.386.077-.532.04-.833-.132-1.065-.232-.315-.259-.305-.918.33-1.692 1.632-4.116 7.08-6.488 14.581-.484 1.532-.88 2.855-.881 2.94-.002.255.192-.026 1.68-2.449z"/></svg>'
    case 'group':
      return '<svg class="group-icon" stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1.6em" width="1.6em" xmlns="http://www.w3.org/2000/svg"><path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z"></path></svg>'
    case 'puzzle':
      return '<svg class="group-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="1.6em" height="1.6em"><path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" /></svg>'
    case 'staff-snake':
      return '<svg class="staff-snake-icon" stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 384 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg"><path d="M222.6 43.2l-.1 4.8H288c53 0 96 43 96 96s-43 96-96 96H248V160h40c8.8 0 16-7.2 16-16s-7.2-16-16-16H248 220l-4.5 144H256c53 0 96 43 96 96s-43 96-96 96H240V384h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H213l-3.1 99.5L208.5 495l0 1c-.3 8.9-7.6 16-16.5 16s-16.2-7.1-16.5-16l0-1-1-31H136c-22.1 0-40-17.9-40-40s17.9-40 40-40h36l-1-32H152c-53 0-96-43-96-96c0-47.6 34.6-87.1 80-94.7V256c0 8.8 7.2 16 16 16h16.5L164 128H136 122.6c-9 18.9-28.3 32-50.6 32H56c-30.9 0-56-25.1-56-56S25.1 48 56 48h8 8 89.5l-.1-4.8L161 32c0-.7 0-1.3 0-1.9c.5-16.6 14.1-30 31-30s30.5 13.4 31 30c0 .6 0 1.3 0 1.9l-.4 11.2zM64 112a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"></path></svg>'
    case 'flower':
      return '<svg class="flower-icon" stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 256 256" height="1.5em" width="1.5em"  xmlns="http://www.w3.org/2000/svg"><path d="M210.35,129.36c-.81-.47-1.7-.92-2.62-1.36.92-.44,1.81-.89,2.62-1.36a40,40,0,1,0-40-69.28c-.81.47-1.65,1-2.48,1.59.08-1,.13-2,.13-3a40,40,0,0,0-80,0c0,.94,0,1.94.13,3-.83-.57-1.67-1.12-2.48-1.59a40,40,0,1,0-40,69.28c.81.47,1.7.92,2.62,1.36-.92.44-1.81.89-2.62,1.36a40,40,0,1,0,40,69.28c.81-.47,1.65-1,2.48-1.59-.08,1-.13,2-.13,2.95a40,40,0,0,0,80,0c0-.94-.05-1.94-.13-2.95.83.57,1.67,1.12,2.48,1.59A39.79,39.79,0,0,0,190.29,204a40.43,40.43,0,0,0,10.42-1.38,40,40,0,0,0,9.64-73.28ZM104,128a24,24,0,1,1,24,24A24,24,0,0,1,104,128Zm74.35-56.79a24,24,0,1,1,24,41.57c-6.27,3.63-18.61,6.13-35.16,7.19A40,40,0,0,0,154.53,98.1C163.73,84.28,172.08,74.84,178.35,71.21ZM128,32a24,24,0,0,1,24,24c0,7.24-4,19.19-11.36,34.06a39.81,39.81,0,0,0-25.28,0C108,75.19,104,63.24,104,56A24,24,0,0,1,128,32ZM44.86,80a24,24,0,0,1,32.79-8.79c6.27,3.63,14.62,13.07,23.82,26.89A40,40,0,0,0,88.81,120c-16.55-1.06-28.89-3.56-35.16-7.18A24,24,0,0,1,44.86,80ZM77.65,184.79a24,24,0,1,1-24-41.57c6.27-3.63,18.61-6.13,35.16-7.19a40,40,0,0,0,12.66,21.87C92.27,171.72,83.92,181.16,77.65,184.79ZM128,224a24,24,0,0,1-24-24c0-7.24,4-19.19,11.36-34.06a39.81,39.81,0,0,0,25.28,0C148,180.81,152,192.76,152,200A24,24,0,0,1,128,224Zm83.14-48a24,24,0,0,1-32.79,8.79c-6.27-3.63-14.62-13.07-23.82-26.89A40,40,0,0,0,167.19,136c16.55,1.06,28.89,3.56,35.16,7.18A24,24,0,0,1,211.14,176Z"></path></svg>'
    case 'network':
      return '<svg class="network-icon" stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 256 256" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M212,200a36,36,0,1,1-69.85-12.25l-53-34.05a36,36,0,1,1,0-51.4l53-34a36.09,36.09,0,1,1,8.67,13.45l-53,34.05a36,36,0,0,1,0,24.5l53,34.05A36,36,0,0,1,212,200Z"></path></svg>'
    default:
      return ''
  }
}

const MarkerIconFactory = (shape: string, color1: string, color2: string, icon: string) => {
  return L.divIcon({
    html: `${createSvg(shape, color1, color2)}${addIcon(icon)}`,
    iconAnchor: [17, 40],
    popupAnchor: [0, -40],
    iconSize: new L.Point(40, 46),
    className: 'leaflet-data-marker',
    shadowAnchor: [0, 0],
  })
}

export default MarkerIconFactory
