

## Run the project
The project can be access at [link](https://github-api-five-wine.vercel.app/) or run locally by running the command ```npm run dev``` and going to localhost

## Tradeoff 
Instead of a build in error message on page, I added a toast which is more mordern for web developement. It make the page less busy but it need more design time to make the css better

## Time management
I actually finish the core requirement around the 2 hours mark and I spend an hour and a half on aesthetic.
There was no theme or direction so I just choose a random color pallete that seem easy on the eye. 
I didn't create a switch for darkmode. 
The toast could be better design
The button and cards could be design with a little pop-out when hovering over it instead of just highlightng it. 

## Assumption
It seem like the project only need an api call so I mainly focus on the frontend, there is no backend. 

I did run into the rate-limit issue and added my git token to allow the 5000 result. I do have check for 403 error to handle the rate-limit error. 
My Github token is in a local .env.local file and set up as an Enviromental Variable on Vercel, and it is not made public. The website will work whether a token is setup or not.

## Project Creation
### Steps

1. Creating initial template, run the command 
```npx create-next-app@latest```

2. Use [Github Fetch user API](https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10) to create fetch user info

3. Use [Github List user repo API](https://docs.github.com/en/rest/repos/repos?apiVersion=2026-03-10#list-repositories-for-a-user) to find the user repo

4. Create the intial container for search and display user repo

5. Seperate search and display into their own components

6. Create toast for warning, using sonner

7. Add checks for no public repo

8. Update css

9. Add Github token to allow more search

10. Add color palletes Tranquil Greenscape at (link)[https://www.higocreative.com/blog/website-color-palettes]

11. Upload to Vercel to host (website)[https://github-api-five-wine.vercel.app/]

12. Fix Totalcount error and display

### Tech Stack

#### Core Framework
* Next.js 
* React
* Typescript

#### Styling Design
* Tailwind



