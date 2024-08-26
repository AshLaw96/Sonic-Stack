# [SONIC STACK](https://ashlaw96.github.io/Sonic-Stack)

[![GitHub commit activity](https://img.shields.io/github/commit-activity/t/AshLaw96/Sonic-Stack)](https://github.com/AshLaw96/Sonic-Stack/commits/main)
[![GitHub last commit](https://img.shields.io/github/last-commit/AshLaw96/Sonic-Stack)](https://github.com/AshLaw96/Sonic-Stack/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/AshLaw96/Sonic-Stack)](https://github.com/AshLaw96/Sonic-Stack)

---

Sonic Stack is a Tetris game with a Sonic design. This is to draw all those Sonic and Tetris lovers all into one awesome box.

When users visit the website they will be able to quickly find the difficulty level they want to start their gaming session and then easily start Tetrissing away. The demographic for the website is anyone that loves old school gaming, anyone that loves Sonic and anyone that enjoys Tetris. It is perfect for all ages and can be played alone our with others.

![screenshot](documentation/mockup.png)

source: [amiresponsive](https://ui.dev/amiresponsive?url=https://ashlaw96.github.io/Sonic-Stack)

## UX

Sonic Stacks purpose is to help resolve peoples lack of enthusiasm by giving them fun tasks to solve.

The site will have 1 main page with 3 different levels that make it feel like 3 separate pages and a 404 error page, the first main section will contain the easy level game area with a background image a rules and score area, a button area within the main section, a header and footer section. Then the medium section will have a different background image and title and finally the hard section will also have a different background image and title. Each will comprise with the same layout so the user can easily navigate through the site. The 404 will follow the same layout but with just some error message and image in the main section.

### Colour Scheme

- The design of the Tetris game will incorporate both the slick colours from Sonic and old school styles from Tetris.
  - `#FFFFFF` used for primary text.
  - `#000000` used for main background.
  - `#3061E3` used for blocks.
  - `#1F51FF` used for shadows.
  - `#FF3131` used for blocks.
  - `#FF0000` used for shadows.
  - `#FFBF00` used for blocks.
  - `#F9D71C` used for shadows.

I used [coolors.co](https://coolors.co/ffffff-3061e3-ff3131-ffbf00-1f51ff-ff0000-f9d71c-000000) to generate my colour palette.

![screenshot](documentation/colours.png)

I've used CSS `:root` variables to easily update the global colour scheme by changing only one value, instead of everywhere in the CSS file.

```css
:root {
    /* P = Primary | S = Shadow */
    --p-text: #FFFFFF;
    --p-highlight: #000000;
    --p-block1: #3061E3;
    --p-block2: #FF3131;
    --p-block3: #FFBF00;
    --s-block1: #1F51FF;
    --s-block2: #FF0000;
    --s-block3: #F9D71C;
}
```

### Typography

- [Square Mile](https://www.fontget.com/font/square-mile/) was used for all the text.

- [Font Awesome](https://fontawesome.com) icons were used throughout the site, such as the icons in the button movement section.

## User Stories

### New Site Users

- As a new site user, I would like to easily understand the instructions, so that I can play the game as soon as possible.
- As a new site user, I would like to be able to choose different difficulties, so that I can have fun and challenge myself.
- As a new site user, I would like to be able to see my score, so that I know what I need to do better.
- As a new site user, I would like to see what the high score is, so that I can try and beat it.
- As a new site user, I would like to be able to watch others play, so that I can try improve how I play.

### Returning Site Users

- As a returning site user, I would like to pause the game, so that I can come back to where I left off.
- As a returning site user, I would like to play multiplayer, so that I can play with my friends.
- As a returning site user, I would like to have different levels, so that it feels like I'm accomplishing something.
- As a returning site user, I would like to hear old school Tetris/Sonic music, so that it feels like the old games when I'm playing.
- As a returning site user, I would like to see a scoreboard, so that I can see other peoples score and try and beat them.

## Wireframes

To follow best practice, wireframes were developed for mobile, tablet, and desktop sizes.
I've used [Moqups](https://app.moqups.com) to design my site wireframes.

### Mobile Wireframes

<details>
<summary> Click here to see the Mobile Wireframes </summary>

Main
  - ![screenshot](documentation/wireframes/mob-wireframe.png)

404
  - ![screenshot](documentation/wireframes/404-mob-wireframe.png)

</details>

### Tablet Wireframes

<details>
<summary> Click here to see the Tablet Wireframes </summary>

Main
  - ![screenshot](documentation/wireframes/tablet-wireframe.png)

404
  - ![screenshot](documentation/wireframes/404-ipad-wireframe.png)

</details>

### Desktop Wireframes

<details>
<summary> Click here to see the Desktop Wireframes </summary>

Main
  - ![screenshot](documentation/wireframes/wireframe.png)

404
  - ![screenshot](documentation/wireframes/404-wireframe.png)

</details>

## Features

### Existing Features

#### Header

The header will contain the title, the navigation dropdown button and a mute/un-mute sound button. It will be the same on each section except for the 404 where the navigation will only contain one button. It will also have a background colour that follows the colour scheme of the full site.

<details>
<summary> click here to see the header of each page </summary>

- Main
  - ![screenshot](documentation/features/main-header.png)

- 404
  - ![screenshot](documentation/features/404-header.png)

</details>

#### Navigation

The navigation will be situated at the top of the screen. There will be a tab button within the header section that when pressed will show 3 buttons for the level selectors, so that the user can change the difficulty which will also be highlighted with the current page they are on. On the 404 page there will only be the one button that will help the user return to the previous page.

<details>
<summary> click here to see the navigation of each page </summary>

Easy
  - ![screenshot](documentation/features/easy-nav.png)

Medium
  - ![screenshot](documentation/features/med-nav.png)

Hard
  - ![screenshot](documentation/features/hard-nav.png)

404
  - ![screenshot](documentation/features/404-nav.png)

</details>

#### Aside

This will be situated at the top of the screen on mobile and small tablets and then down the side on larger screens. It will contain 1 dropdown button that when clicked by the user will show how to play the game and another block will contain the current score and the high score of the user.

<details>
<summary> click here to see the aside on each screen </summary>

Mobile
  - ![screenshot](documentation/features/mob-aside.png)

Tablet
  - ![screenshot](documentation/features/ipad-aside.png)

Desktop
  - ![screenshot](documentation/features/desk-aside.png)

</details>

#### Main

The main section for the 3 main sections will contain a title, the game area itself, an aside section and a button area below containing 4 control buttons and 2 other buttons situated below the control ones. The first button will be the start/pause button so the user can actually start playing and pause if they want and a reset button if the user wants to start again. There will be a different background image for each main page. For the 404 page the main section will contain an image and a 404 message telling the user that an error has occurred and they need to navigate to the previous page.

<details>
<summary> click here to see the main section of each page </summary>

Easy
  - ![screenshot](documentation/features/easy-main.png)

Medium
  - ![screenshot](documentation/features/med-main.png)

Hard
  - ![screenshot](documentation/features/hard-main.png)

404
  - ![screenshot](documentation/features/404-main.png)

</details>

#### Footer

The footer will be located at the bottom of the page containing 4 different links on the main pages and just an empty footer on the 404 page but still having the same layout as the main page.

<details>
<summary> click here to see the footer section of each page </summary>

Main mobile/tablet
  - ![screenshot](documentation/features/mob-foot.png)

Main desktop
  - ![screenshot](documentation/features/desk-foot.png)

404
  - ![screenshot](documentation/features/404-foot.png)

</details>

### Future Features

1. Add a backend database to keep high scores of each game mode. 
2. Add another page to add different levels when a user gets so many points and when they do automatically change speed of block drop and background music.
3. Add a multiplayer/split-screen mode so people can play together online.
4. Add a mini image area to show what blocks are coming up next.
5. Add an area where you can store one block until you need it.

## Tools & Technologies Used

- [![Markdown Builder](https://img.shields.io/badge/Markdown_Builder-grey?logo=markdown&logoColor=000000)](https://tim.2bn.dev/markdown-builder) used to generate README and TESTING templates.
- [![Git](https://img.shields.io/badge/Git-grey?logo=git&logoColor=F05032)](https://git-scm.com) used for version control. (`git add`, `git commit`, `git push`)
- [![GitHub](https://img.shields.io/badge/GitHub-grey?logo=github&logoColor=181717)](https://github.com) used for secure online code storage.
- [![Gitpod](https://img.shields.io/badge/Gitpod-grey?logo=gitpod&logoColor=FFAE33)](https://gitpod.io) used as a cloud-based IDE for development.
- [![HTML](https://img.shields.io/badge/HTML-grey?logo=html5&logoColor=E34F26)](https://en.wikipedia.org/wiki/HTML) used for the main site content.
- [![CSS](https://img.shields.io/badge/CSS-grey?logo=css3&logoColor=1572B6)](https://en.wikipedia.org/wiki/CSS) used for the main site design and layout.
- [![JavaScript](https://img.shields.io/badge/JavaScript-grey?logo=javascript&logoColor=F7DF1E)](https://www.javascript.com) used for user interaction on the site.
- [![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-grey?logo=githubpages&logoColor=222222)](https://pages.github.com) used for hosting the deployed front-end site.
- [![Font Awesome](https://img.shields.io/badge/Font_Awesome-grey?logo=fontawesome&logoColor=528DD7)](https://fontawesome.com) used for the icons.
- [![Moqups](https://img.shields.io/badge/Moqups-grey?logo=moqups&logoColor=0096FF)](https://moqups.com) used for creating Wireframes.
- [![FontGet](https://img.shields.io/badge/FONTGET-grey?logo=realfavicongenerator&logoColor=00FFFF)](https://www.fontget.com) used for the text font.
- [![Real Favicon Generator](https://img.shields.io/badge/Real_Favicon_Generator-grey?logo=realfavicongenerator&logoColor=0096FF)](https://realfavicongenerator.net) used to create favicon.
- [![Removebg](https://img.shields.io/badge/Removebg-grey?logo=removebg&logoColor=FFBF00)](https://www.remove.bg/upload) used to make background of image transparent.
- [![ChatGPT](https://img.shields.io/badge/chatGPT-grey?logo=openai&logoColor=74AA9C)](https://chatgpt.com/) used to generate 404 message.
- [![XConvert](https://img.shields.io/badge/XConvert-grey?logo=xconvert&logoColor=3F00FF)](https://www.xconvert.com/audio-compressor) used to compress the audio files.

## Testing

> [!NOTE]  
> For all testing, please refer to the [TESTING.md](TESTING.md) file.

## Deployment

The site was deployed to GitHub Pages. The steps to deploy are as follows:

- In the [GitHub repository](https://github.com/AshLaw96/Sonic-Stack), navigate to the Settings tab 
- From the source section drop-down menu, select the **Main** Branch, then click "Save".
- The page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found [here](https://ashlaw96.github.io/Sonic-Stack)

### Local Deployment

This project can be cloned or forked in order to make a local copy on your own system.

#### Cloning

You can clone the repository by following these steps:

1. Go to the [GitHub repository](https://github.com/AshLaw96/Sonic-Stack) 
2. Locate the Code button above the list of files and click it 
3. Select if you prefer to clone using HTTPS, SSH, or GitHub CLI and click the copy button to copy the URL to your clipboard
4. Open Git Bash or Terminal
5. Change the current working directory to the one where you want the cloned directory
6. In your IDE Terminal, type the following command to clone my repository:
	- `git clone https://github.com/AshLaw96/Sonic-Stack.git`
7. Press Enter to create your local clone.

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/AshLaw96/Sonic-Stack)

Please note that in order to directly open the project in Gitpod, you need to have the browser extension installed.
A tutorial on how to do that can be found [here](https://www.gitpod.io/docs/configure/user-settings/browser-extension).

#### Forking

By forking the GitHub Repository, we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original owner's repository.
You can fork this repository by using the following steps:

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/AshLaw96/Sonic-Stack)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. Once clicked, you should now have a copy of the original repository in your own GitHub account!

### Local VS Deployment

No differences were found between the local version and the live deployed version.

## Credits

### Content

| Source | Location | Notes |
| --- | --- | --- |
| [Markdown Builder](https://tim.2bn.dev/markdown-builder) | README and TESTING | tool to help generate the Markdown files |
| [YouTube](https://www.youtube.com/watch?v=AUOzvFzdIk4) | leaderboard | using `localStorage()` in JS for high scores |
| [GitHub Repo](https://github.com/AshLaw96/my-love-maths) | entire site | helped with layout of the site |
| [W3schools](https://www.w3schools.com/jsref/prop_element_classlist.asp) | JS file | helped with adding and removing styles of divs using `.classList` methods |
| [YouTube](https://www.youtube.com/watch?v=rAUn1Lom6dw) | entire site | helped with basics for creating Tetris game |
| [W3Schools](https://www.w3schools.com/jsref/prop_audio_volume.asp#:~:text=Description,) | JS file | `.volume` method to have a mute and un-mute button |
| [Web Dev](https://blog.webdevsimplified.com/2023-04/html-dialog/) | entire site | how to use `<dialog></dialog>` element |
| [Medium](https://medium.com/poka-techblog/simplify-your-javascript-use-some-and-find-f9fb9826ddfd) | JS file | helped using `some()` and `find()` to check arrays |
| [W3Schools](https://www.w3schools.com/jsref/met_audio_pause.asp#:~:text=Description,%2C%20attached%20on%20the%20audio) | JS file | how to use the `play()` and `pause()` methods |
| [W3Schools](https://www.w3schools.com/jsref/jsref_every.asp) | JS file | how to use the `every()` method |
| [W3Schools](https://www.w3schools.com/jsref/event_preventdefault.asp#:~:text=The%20preventDefault()) | JS file | how to use `preventDefault()` method |
| [Stack Overflow](https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser) | JS file | how to stop keys from moving screen |

### Media

| Source | Location | Type | Notes |
| --- | --- | --- | --- |
| [Pinterest](https://www.pinterest.co.uk/pin/8162843068818083/) | website tab bar | image | favicon on the tab bar |
| [TinyPNG](https://tinypng.com) | entire site | image | tool for image compression |
| [Pinterest](https://www.pinterest.co.uk/pin/335025659768357500/) | index.html | image | background image for main easy section |
| [Khinsider](https://downloads.khinsider.com/game-soundtracks/album/sonic-1-revisited) | index.html | audio | background music for easy section and medium section |
| [101SoundBoards](https://www.101soundboards.com/boards/10990-sonic-the-hedgehog-sounds) | index.html | audio | sound when points gained, losing sound and turn sound |
| [TheGamer](https://www.thegamer.com/sonic-the-hedgehog-labyrinth-zone-nightmares/) | index.html | image | background image main medium section |
| [TheGamer](https://www.thegamer.com/sonic-the-hedgehog-best-final-zones-levels-ranked/) | index.html | image | background image main hard section |
| [Khinsider](https://downloads.khinsider.com/game-soundtracks/album/sonic-the-hedgehog-3-angel-island-revisited-pc-android-gamerip-flac) | index.html | audio | main background theme song for hard section |
| [101SoundBoards](https://www.101soundboards.com/boards/10609-dr-eggman-sounds-sonic-adventure-2) | 404 HTML | audio | button sound on 404 main section |
| [XConvert](https://www.xconvert.com/audio-compressor) | index.html | audio | tool for audio compression |
| [Pinterest](https://www.pinterest.co.uk/pin/756112224926051701/) | 404.html | image | main image on 404 page |

### Acknowledgements

- I would like to thank my Code Institute mentor, [Tim Nelson](https://github.com/TravelTimN) for his support throughout the development of this project.
- I would like to thank the [Code Institute](https://codeinstitute.net) tutor team for their assistance with the lessons provided to give me the knowledge I needed to make this game.
- I would like to thank the [Code Institute Slack community](https://code-institute-room.slack.com) for the moral support; it kept me going during periods of self doubt and imposter syndrome.
- I would like to thank my partner (Megan), for believing in me, and allowing me to make this transition into software development.
