# Testing

> [!NOTE]  
> Return back to the [README.md](README.md) file.

Feature-by-Feature Testing:

- Navigation: I ensured smooth transitions between each section and the links directed to the correct destination.
- Responsive Design: I've checked for compatibility across multiple devices and screen sizes.
- Portfolio Display: I have verified that every page is properly showcased with accurate descriptions, images, and links.
- Game area: I confirmed that the game worked as intended on different devices and screen sizes.
- Buttons: I made sure that all buttons worked as they should and were easy to understand and read.

User Experience Testing:

- Usability Testing: I let users interact with my site and provide feedback of their experience with it.
1.
2.
3.
- Accessibility Testing: I confirmed compliance with accessibility standards e.g. screen reader compatibility, proper alt text for images and keyboard navigation.

Compatibility Testing:

- Browser Compatibility: I Tested on different browsers, to ensure compatible performance.
- Device Compatibility: I ensured functionality across numerous devices.
- Performance Testing:
  - Speed and Load Testing: I used PageSpeed Insights to check page load times and optimized where necessary.

  <details>
  <summary> Click here to see speed tests of both pages </summary>

    - main
    ![screenshot](documentation/validate/main-load.png)

    - 404
    ![screenshot](documentation/validate/404-load.png)
    
    </details>

  - Scalability Testing: I assessed how the site handled increased traffic and usage.

Regression Testing:

After implementing any fixes or updates I ensured that previous features and functionalities still worked as intended.

Documentation and Logs:

- whilst creating the blocks, I noticed that where the blocks appeared the box shadow stayed when they left the area.

  - The issue: [issue](documentation/bugs/box-shadow-issue.png)

- To fix this issue I needed to add code into the correct function that removed the box shadow style.

  - The fix: [fix](documentation/bugs/fix-shadow.png)

- Whilst creating the rules hide button, I noticed that it wouldn't show and hide the text as desired.

  - The issue: [issue](documentation/bugs/display-type-issue.png)

- To fix this I had to remove multiple `span` elements inside the button element.
  
  - The fix: [fix](documentation/bugs/display-type-fix.png)

- Whilst creating the blocks, I noticed that the blocks were not in the correct designed shapes.

  - The issue: [issue](documentation/bugs/misshaped.png)

- To fix the issue, I had to change the game areas width and height so each div would fit evenly in the game area.

  - The fix: [fix](documentation/bugs/fix-misshaped.png)

- When creating the game, I noticed that when moving the blocks all way left or right of the game area, it would overlap to the opposite side of the game area.

  - The issue: [issue](documentation/bugs/overlap-right.png)

- To fix this issue, I had to add a function that checked if the block had reached the edge of the game area and if so stop.

  - The fix: [fix](documentation/bugs/fix-overlap-right.png)

- When trying to select all the `div` inside the game area I came across a type error.

  - The issue: [issue](documentation/bugs/type-error.png)

- To fix this issue I used the `querySelectorAll` to get all the child elements inside the game area.

  - The fix: [fix](documentation/bugs/fix-type-error.png)

- Whilst testing the game, I noticed that when turning the blocks near the edge of the game area they would overlap to the other side of the game area.

  - The issue: [issue](documentation/bugs/turn-overlap-screen.png)

- To fix the issue, I had to add a function that implemented code when the block turned near the edge of the game area, move its location away so it didn't overlap the game area.

  - The fix: [fix](documentation/bugs/turn-overlap-fix.png)

- When checking if the alteration of using JavaScript to create the game area had any effect with the 404 page I noticed a type error.

  - The issue: [issue](documentation/bugs/type-error-404.png)

- To fix the issue I had to add an if statement inside the for loop to check if the HTML id name was on the current page and if so execute the desired code but if not do nothing.

  - The fix: [fix](documentation/bugs/type-error-404-fix.png)

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
|  | index.html | ![screenshot](documentation/validate/html-check.png) | no issues were found |
|  | 404.html | ![screenshot](documentation/validate/404-html-check.png) | no issues were found |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| Directory | File | Screenshot | Notes |
| --- | --- | --- | --- |
| assets | styles.css | ![screenshot](documentation/validate/css-check.png) | no issues were found |

## Browser Compatibility

Sample browser testing documentation:

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Easy | Medium | Hard | 404 | Notes |
| --- | --- | --- | --- | --- | --- |
| Chrome | ![screenshot](documentation/browser/easy-chrome.png) | ![screenshot](documentation/browser/med-chrome.png) | ![screenshot](documentation/browser/hard-chrome.png) | ![screenshot](documentation/browser/404-chrome.png) | Works as expected |
| Firefox | ![screenshot](documentation/browser/easy-firefox.png) | ![screenshot](documentation/browser/med-firefox.png) | ![screenshot](documentation/browser/hard-firefox.png) | ![screenshot](documentation/browser/404-firefox.png) | Works as expected |
| Edge | ![screenshot](documentation/browser) | ![screenshot](documentation/browser) | ![screenshot](documentation/browser) | ![screenshot](documentation/browser) | Works as expected |
| Amazon Silk | ![screenshot](documentation/device/easy-ipad.jpg) | ![screenshot](documentation/device/med-ipad.jpg) | ![screenshot](documentation/device/hard-ipad.jpg) | ![screenshot](documentation/device/404-tablet.jpg) | Minor CSS differences |
| Bing | ![screenshot](documentation/browser) | ![screenshot](documentation/browser) | ![screenshot](documentation/browser) | ![screenshot](documentation/browser) | Works as expected |

## Responsiveness

Sample responsiveness testing documentation:

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Easy | Medium | Hard | 404 | Notes |
| --- | --- | --- | --- | --- | --- |
| Mobile | ![screenshot](documentation/device/easy-mob.jpg) | ![screenshot](documentation/device/med-mob.jpg) | ![screenshot](documentation/device/hard-mob.jpg) | ![screenshot](documentation/device/404-mob.jpg) | Works as expected |
| Tablet | ![screenshot](documentation/device/easy-ipad.jpg) | ![screenshot](documentation/device/med-ipad.jpg) | ![screenshot](documentation/device/hard-ipad.jpg) | ![screenshot](documentation/device/404-tablet.jpg) | Works as expected |
| Laptop | ![screenshot](documentation/device/easy-laptop.jpg) | ![screenshot](documentation/device/med-laptop.jpg) | ![screenshot](documentation/device/hard-laptop.jpg) | ![screenshot](documentation/device/404-laptop.jpg) | Works as expected |
| Desktop | ![screenshot](documentation) | ![screenshot](documentation) | ![screenshot](documentation) | ![screenshot](documentation) | Works as expected |
| XL screen | ![screenshot](documentation) | ![screenshot](documentation) | ![screenshot](documentation) | ![screenshot](documentation) | Noticeable scaling issues |

## Lighthouse Audit

Sample Lighthouse testing documentation:

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Main | ![screenshot](documentation/validate/mob-lighthouse.png) | ![screenshot](documentation/validate/desk-lighthouse.png) | Some warnings |
| 404 | ![screenshot](documentation/validate/404-mob-lighthouse.png) | ![screenshot](documentation/validate/404-desk-lighthouse.png) | Some warnings |

## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

| Page | Expectation | Test | Result | Fix | Screenshot |
| --- | --- | --- | --- | --- | --- |
| Easy | | | | | |
| | When the navigation icon is clicked, (3 lines/burger symbol) should show navigation buttons and when clicked again should hide them | Tested the feature by clicking on the icon on a variety of devices and browsers to make sure it un-hides and hides the buttons | The feature behaved as expected and it showed the navigation buttons when first clicked the hid them when clicked again | Test concluded and passed | ![screenshot](documentation/features/easy-nav-open.png) |
| | When each navigation button is clicked on it should change the colour of the current mode that has been clicked on, should change the game difficulty, the title, the background image and the background theme audio | Tested the feature by pressing each button multiple times and multiple devices and browsers | The feature behaved as expected and changed what needed to change | Test concluded and passed | ![screenshot](documentation/features/easy-nav-btn.png) |
| | When the header title is clicked on should navigate back to the main page | Tested the feature by clicking on the main header title on each section and page on a variety of devices and browsers | The feature behaved as expected and navigated back to the main home page | Test concluded and passed | ![screenshot](documentation/features/easy-title.png) |
| | When the rules button is clicked on it should show hidden text and when clicked on again should hide the text | Tested this feature by clicking it on and off on different devices and browsers | This feature behaved as it was expected and showed the hidden text the hid the text when clicked again | Test concluded and passed | ![screenshot](documentation/features/easy-rule-btn.png) |
| | When the play game button is first pressed, it should start the blocks dropping and if the un-mute button is clicked should also play the background audio. When the pause button is clicked again, it should stop the blocks dropping and pause the background audio | This feature was tested by clicking the button multiple times on different devices and browsers | The feature did what was expected by starting the game, then pausing and playing when clicked on again | Test concluded and passed | ![screenshot](documentation/features/easy-play-btn.png) |
| | When each button is pressed it should move the blocks in the correct direction that is shown on the buttons. The twist button will also make an audio noise when clicked if the un-mute button is clicked | This was tested by clicking all the buttons to make sure the blocks moved in the correct direction and that the spin button made a noise when clicked | The features did what expected except when the twist button is clicked quickly the audio doesn't play each time | Test concluded and passed because when the twist button is pressed slightly slower the sound worked as expected | ![screenshot](documentation/features/easy-move-btn.png) |
| | When the left, right, down and space keys are clicked it should move the blocks and also when the space key is clicked it should make the turning audio sound if the un-mute button is clicked. Also during the game the keys should not make the screen move | This was tested by pressing each key to make sure the blocks moved in the correct direction and that the space key made a noise when pressed and also that the screen only moved with the keys when the game was not playing | The features did what expected except, when the space key is pressed quickly the audio didn't play every time | Test concluded and passed because when the space key is pressed slightly slower the sound worked as expected | ![screenshot](documentation/features/easy-key-move.png) |
| | When a full horizontal line of blocks are across the game area, it should add 100 to the score and remove the full line and also when the un-mute button is clicked it should make an audio sound | This was tested by adding full lines in different parts of the game area to make sure it worked everywhere | This feature did what expected and added points when should have, then removed the full line and made the audio sound when getting the points | Test concluded and passed | ![screenshot](documentation/features/easy-score.png) |
| | When a part of the block reaches the top of the screen should stop the game and show a button saying they have lost, also if the un-mute button is clicked it should stop the background audio and play a different lost sound audio | Tested this feature by losing the game all across the top of the game area with each of the different shaped blocks | The feature did what was expected and showed the lost button, played the lost sound and paused the other background sound when it was supposed to | Test concluded and passed | ![screenshot](documentation) |
| | When a user loses the game a button appears in the center of the screen and the user should only be able to remove this by clicking the button or pressing the escape key | This was tested by losing the game on a multitude of devices and browser and trying both the escape key and clicking the button itself to remove the loss button | The feature did what it should and removed the loss button when either the escape key was pressed or the close button was clicked | Test concluded and passed | ![screenshot](documentation) |
| | When a user losses the game, if the current score is higher than the high score it should change the high score to this number if not it should stay the same | Tested by gaining different scores both higher and lower than the high score and making sure that it changed the high score when needed to | This feature did what was expected and changed the high score when the current score was higher and didn't change when it was lower | Test concluded and passed | ![screenshot](documentation) |
| | When the mute/un-mute button hasn't been clicked on no audio should happen, only when the user clicks the button should audio be enabled and the buttons background colour will be visible, then when clicked again the audio should stop and the background colour should not be visible | This was tested on a variety of browsers clicking it on and off many times | The feature did what was expected firstly un-muting the audio and changing it's background colour then muting it and changing the background colour when clicked again | Test concluded and passed | ![screenshot](documentation) |
| | When the user clicks the restart button it will remove all the blocks from the game area and set the score back to zero | This was tested by having the game both running and paused, then clicking on the reset button to make sure the correct things did what was required. This was also done on different browsers and devices | The feature did what it was supposed when clicked and removed all the blocks and set the score back to zero | Test concluded and passed | ![screenshot](documentation) |
| | When the links in the footer are clicked on it should open up a new tab and direct them to the specific website | This was tested on different browsers and devices to make sure new tabs opened for each link and the correct link opened in the new tab | The features did what they were supposed and all opened in new tabs and went to the correct website | Test concluded and passed | ![screenshot](documentation) | 
| Medium | | | | | |
| | When the navigation icon is clicked, (3 lines/burger symbol) should show navigation buttons and when clicked again should hide them | Tested the feature by clicking on the icon on a variety of devices and browsers to make sure it un-hides and hides the buttons | The feature behaved as expected and it showed the navigation buttons when first clicked the hid them when clicked again | Test concluded and passed | ![screenshot](documentation/features/med-nav-open.png) |
| | When each navigation button is clicked on it should change the colour of the current mode that has been clicked on, should change the game difficulty, the title, the background image and the background theme audio | Tested the feature by pressing each button multiple times and multiple devices and browsers | The feature behaved as expected and changed what needed to change | Test concluded and passed | ![screenshot](documentation/features/med-nav-btn.png) |
| | When the header title is clicked on should navigate back to the main page | Tested the feature by clicking on the main header title on each section and page on a variety of devices and browsers | The feature behaved as expected and navigated back to the main home page | Test concluded and passed | ![screenshot](documentation/features/med-title.png) |
| | When the rules button is clicked on it should show hidden text and when clicked on again should hide the text | Tested this feature by clicking it on and off on different devices and browsers | This feature behaved as it was expected and showed the hidden text the hid the text when clicked again | Test concluded and passed | ![screenshot](documentation/features/med-rule-btn.png) |
| | When the play game button is first pressed, it should start the blocks dropping and if the un-mute button is clicked should also play the background audio. When the pause button is clicked again, it should stop the blocks dropping and pause the background audio | This feature was tested by clicking the button multiple times on different devices and browsers | The feature did what was expected by starting the game, then pausing and playing when clicked on again | Test concluded and passed | ![screenshot](documentation/features/med-play-btn.png) |
| | When each button is pressed it should move the blocks in the correct direction that is shown on the buttons. The twist button will also make an audio noise when clicked if the un-mute button is clicked | This was tested by clicking all the buttons to make sure the blocks moved in the correct direction and that the spin button made a noise when clicked | The features did what expected except when the twist button is clicked quickly the audio doesn't play each time | Test concluded and passed because when the twist button is pressed slightly slower the sound worked as expected | ![screenshot](documentation/features/med-move-btn.png) |
| | When the left, right, down and space keys are clicked it should move the blocks and also when the space key is clicked it should make the turning audio sound if the un-mute button is clicked. Also during the game the keys should not make the screen move | This was tested by pressing each key to make sure the blocks moved in the correct direction and that the space key made a noise when pressed and also that the screen only moved with the keys when the game was not playing | The features did what expected except, when the space key is pressed quickly the audio didn't play every time | Test concluded and passed because when the space key is pressed slightly slower the sound worked as expected | ![screenshot](documentation/features/med-key-move.png) |
| | When a full horizontal line of blocks are across the game area, it should add 100 to the score and remove the full line and also when the un-mute button is clicked it should make an audio sound | This was tested by adding full lines in different parts of the game area to make sure it worked everywhere | This feature did what expected and added points when should have, then removed the full line and made the audio sound when getting the points | Test concluded and passed | ![screenshot](documentation/features/med-score.png) |
| | When a part of the block reaches the top of the screen should stop the game and show a button saying they have lost, also if the un-mute button is clicked it should stop the background audio and play a different lost sound audio | Tested this feature by losing the game all across the top of the game area with each of the different shaped blocks | The feature did what was expected and showed the lost button, played the lost sound and paused the other background sound when it was supposed to | Test concluded and passed | ![screenshot](documentation) |
| | When a user loses the game a button appears in the center of the screen and the user should only be able to remove this by clicking the button or pressing the escape key | This was tested by losing the game on a multitude of devices and browser and trying both the escape key and clicking the button itself to remove the loss button | The feature did what it should and removed the loss button when either the escape key was pressed or the close button was clicked | Test concluded and passed | ![screenshot](documentation) |
| | When a user losses the game, if the current score is higher than the high score it should change the high score to this number if not it should stay the same | Tested by gaining different scores both higher and lower than the high score and making sure that it changed the high score when needed to | This feature did what was expected and changed the high score when the current score was higher and didn't change when it was lower | Test concluded and passed | ![screenshot](documentation) |
| | When the mute/un-mute button hasn't been clicked on no audio should happen, only when the user clicks the button should audio be enabled and the buttons background colour will be visible, then when clicked again the audio should stop and the background colour should not be visible | This was tested on a variety of browsers clicking it on and off many times | The feature did what was expected firstly un-muting the audio and changing it's background colour then muting it and changing the background colour when clicked again | Test concluded and passed | ![screenshot](documentation) |
| | When the user clicks the restart button it will remove all the blocks from the game area and set the score back to zero | This was tested by having the game both running and paused, then clicking on the reset button to make sure the correct things did what was required. This was also done on different browsers and devices | The feature did what it was supposed when clicked and removed all the blocks and set the score back to zero | Test concluded and passed | ![screenshot](documentation) |
| | When the links in the footer are clicked on it should open up a new tab and direct them to the specific website | This was tested on different browsers and devices to make sure new tabs opened for each link and the correct link opened in the new tab | The features did what they were supposed and all opened in new tabs and went to the correct website | Test concluded and passed | ![screenshot](documentation) | 
| Hard | | | | | |
| | When the navigation icon is clicked, (3 lines/burger symbol) should show navigation buttons and when clicked again should hide them | Tested the feature by clicking on the icon on a variety of devices and browsers to make sure it un-hides and hides the buttons | The feature behaved as expected and it showed the navigation buttons when first clicked the hid them when clicked again | Test concluded and passed | ![screenshot](documentation/features/hard-nav-open.png) |
| | When each navigation button is clicked on it should change the colour of the current mode that has been clicked on, should change the game difficulty, the title, the background image and the background theme audio | Tested the feature by pressing each button multiple times and multiple devices and browsers | The feature behaved as expected and changed what needed to change | Test concluded and passed | ![screenshot](documentation/features/hard-nav-btn.png) |
| | When the header title is clicked on should navigate back to the main page | Tested the feature by clicking on the main header title on each section and page on a variety of devices and browsers | The feature behaved as expected and navigated back to the main home page | Test concluded and passed | ![screenshot](documentation/features/hard-title.png) |
| | When the rules button is clicked on it should show hidden text and when clicked on again should hide the text | Tested this feature by clicking it on and off on different devices and browsers | This feature behaved as it was expected and showed the hidden text the hid the text when clicked again | Test concluded and passed | ![screenshot](documentation/features/hard-rule-btn.png) |
| | When the play game button is first pressed, it should start the blocks dropping and if the un-mute button is clicked should also play the background audio. When the pause button is clicked again, it should stop the blocks dropping and pause the background audio | This feature was tested by clicking the button multiple times on different devices and browsers | The feature did what was expected by starting the game, then pausing and playing when clicked on again | Test concluded and passed | ![screenshot](documentation/features/hard-play-btn.png) |
| | When each button is pressed it should move the blocks in the correct direction that is shown on the buttons. The twist button will also make an audio noise when clicked if the un-mute button is clicked | This was tested by clicking all the buttons to make sure the blocks moved in the correct direction and that the spin button made a noise when clicked | The features did what expected except when the twist button is clicked quickly the audio doesn't play each time | Test concluded and passed because when the twist button is pressed slightly slower the sound worked as expected | ![screenshot](documentation/features/hard-move-btn.png) |
| | When the left, right, down and space keys are clicked it should move the blocks and also when the space key is clicked it should make the turning audio sound if the un-mute button is clicked. Also during the game the keys should not make the screen move | This was tested by pressing each key to make sure the blocks moved in the correct direction and that the space key made a noise when pressed and also that the screen only moved with the keys when the game was not playing | The features did what expected except, when the space key is pressed quickly the audio didn't play every time | Test concluded and passed because when the space key is pressed slightly slower the sound worked as expected | ![screenshot](documentation/features/hard-key-move.png) |
| | When a full horizontal line of blocks are across the game area, it should add 100 to the score and remove the full line and also when the un-mute button is clicked it should make an audio sound | This was tested by adding full lines in different parts of the game area to make sure it worked everywhere | This feature did what expected and added points when should have, then removed the full line and made the audio sound when getting the points | Test concluded and passed | ![screenshot](documentation/features/hard-score.png) |
| | When a part of the block reaches the top of the screen should stop the game and show a button saying they have lost, also if the un-mute button is clicked it should stop the background audio and play a different lost sound audio | Tested this feature by losing the game all across the top of the game area with each of the different shaped blocks | The feature did what was expected and showed the lost button, played the lost sound and paused the other background sound when it was supposed to | Test concluded and passed | ![screenshot](documentation) |
| | When a user loses the game a button appears in the center of the screen and the user should only be able to remove this by clicking the button or pressing the escape key | This was tested by losing the game on a multitude of devices and browser and trying both the escape key and clicking the button itself to remove the loss button | The feature did what it should and removed the loss button when either the escape key was pressed or the close button was clicked | Test concluded and passed | ![screenshot](documentation) |
| | When a user losses the game, if the current score is higher than the high score it should change the high score to this number if not it should stay the same | Tested by gaining different scores both higher and lower than the high score and making sure that it changed the high score when needed to | This feature did what was expected and changed the high score when the current score was higher and didn't change when it was lower | Test concluded and passed | ![screenshot](documentation) |
| | When the mute/un-mute button hasn't been clicked on no audio should happen, only when the user clicks the button should audio be enabled and the buttons background colour will be visible, then when clicked again the audio should stop and the background colour should not be visible | This was tested on a variety of browsers clicking it on and off many times | The feature did what was expected firstly un-muting the audio and changing it's background colour then muting it and changing the background colour when clicked again | Test concluded and passed | ![screenshot](documentation) |
| | When the user clicks the restart button it will remove all the blocks from the game area and set the score back to zero | This was tested by having the game both running and paused, then clicking on the reset button to make sure the correct things did what was required. This was also done on different browsers and devices | The feature did what it was supposed when clicked and removed all the blocks and set the score back to zero | Test concluded and passed | ![screenshot](documentation) |
| | When the links in the footer are clicked on it should open up a new tab and direct them to the specific website | This was tested on different browsers and devices to make sure new tabs opened for each link and the correct link opened in the new tab | The features did what they were supposed and all opened in new tabs and went to the correct website | Test concluded and passed | ![screenshot](documentation) | 
| 404 | | | | | |
| | When the navigation icon is clicked, (3 lines/burger symbol) should show navigation button | Tested the feature by clicking on a variety of devices and browsers | The feature behaved as expected and it showed the navigation buttons | Test concluded and passed | ![screenshot](documentation) |
| | When the header title is clicked on should navigate back to the main page | Tested the feature by clicking on the main header title on each section and page on a variety of devices and browsers | The feature behaved as expected and navigated back to the main home page | Test concluded and passed | ![screenshot](documentation) |
| | (run away btn) |  |  |  | ![screenshot](documentation) |
| | (mute/unmute btn) |  |  |  | ![screenshot](documentation) |
| | (click me btn) |  |  |  | ![screenshot](documentation) |


## User Story Testing

| User Story | Screenshot |
| --- | --- |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature01.png) |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature02.png) |
| As a new site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature03.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature04.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature05.png) |
| As a returning site user, I would like to ____________, so that I can ____________. | ![screenshot](documentation/features/feature06.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/features/feature07.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/features/feature08.png) |
| As a site administrator, I should be able to ____________, so that I can ____________. | ![screenshot](documentation/features/feature09.png) |
| repeat for all remaining user stories | x |

## Bugs

- JS Uncaught ReferenceError: `foobar` is undefined/not defined

    ![screenshot](documentation/bugs/bug01.png)

    - To fix this, I _____________________.

- JS `'let'` or `'const'` or `'template literal syntax'` or `'arrow function syntax (=>)'` is available in ES6 (use `'esversion: 11'`) or Mozilla JS extensions (use moz).

    ![screenshot](documentation/bugs/bug02.png)

    - To fix this, I _____________________.

## Unfixed Bugs

You will need to mention unfixed bugs and why they were not fixed.
This section should include shortcomings of the frameworks or technologies used.
Although time can be a big variable to consider, paucity of time and difficulty understanding
implementation is not a valid reason to leave bugs unfixed.

If you've identified any unfixed bugs, no matter how small, be sure to list them here.
It's better to be honest and list them, because if it's not documented and an assessor finds the issue,
they need to know whether or not you're aware of them as well, and why you've not corrected/fixed them.

Some examples:

- On devices smaller than 375px, the page starts to have `overflow-x` scrolling.

    ![screenshot](documentation/bugs/unfixed-bug01.png)

    - Attempted fix: I tried to add additional media queries to handle this, but things started becoming too small to read.

- For PP3, when using a helper `clear()` function, any text above the height of the terminal does not clear, and remains when you scroll up.

    ![screenshot](documentation/bugs/unfixed-bug02.png)

    - Attempted fix: I tried to adjust the terminal size, but it only resizes the actual terminal, not the allowable area for text.

- When validating HTML with a semantic `section` element, the validator warns about lacking a header `h2-h6`. This is acceptable.

    ![screenshot](documentation/bugs/unfixed-bug03.png)

    - Attempted fix: this is a known warning and acceptable, and my section doesn't require a header since it's dynamically added via JS.

If you legitimately cannot find any unfixed bugs or warnings, then use the following sentence:

> [!NOTE]  
> There are no remaining bugs that I am aware of.
