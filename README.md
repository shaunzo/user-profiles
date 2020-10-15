# user-profiles
A Next.js app to display a list of users with teh ability to click through to a user's info as well as the ability to sort, filter and search through profiles

# To run this project
Please ensure that you have Node.js installed on your system (https://nodejs.org/en/) as well as git (https://git-scm.com/)

1. Navigate to a diectory on your system and run: `git clone git@github.com:shaunzo/user-profiles.git`
2. On your terminal cd in the newly create folder within your directory and run:
   `cd ./user-profiles && npm install`
   If you run into permission errors and you are on a Mac or Linux syste, please run `sudo npm install`
3. Run `npm run dev`
4. Ensure that you have nothing running on http://localhost:3000. In a browser navigate to `http:localhost:3000`


# Considerations
## Dummy data
With a live application, we need to assume a capped number of records, rather than an infinite number that the https://randomuser.me/ service gives us. for my notes that follow will assume that we a limit of 50 records for an initial page of records. <i>ie. If we have 10 000 records which would require pagination component and we would have 200 pages available to click through.</i>

With a <i>API</i> we would need to pass either an <i>offset</i> or <i>page</i> value. The <i>results</i> query string could also be called <i>limit</i>

eg. `https://<API-URL>.me/?limit=50&offset=1` or `https://<API-URL>.me/?limit=50&page=1`

As a result of utilizing dummy data which is also random, I have utilized the <b>filter()</b> array method from the initially retrieved values to demonstrate functionality

## Changing data on every fetch
I overcame this by adding the "seed" parameter in the query string. This allows for the same data to be fetched else it would be a fairly confusing user experience.

## API lacks end point for single record
I looked through all the documentation on https://randomuser.me/documentation and there seems to be no end point available to retrieve a single record. This would be needed for the profile detail page. I overcame this by finding the most likely unique property in each record which could be the user's email. This was passed as a string query parameter. Unfortunately, without an endpoint for a single user, I have to run a filter on the records for a match on the email. The other option was to pass query params to the profile template. Although this could be a more performant option, it would not work as if the stand alone profile had to be visiting without clicking on the profile link, there would be no "props" for the component to render anything. The ideal solution here would be to do a server-side render of the profile page utilizing an API which has an endpoint to a single record and passing a unique system ID for the user.

## Profile ID
There was no unique system ID supplied in teh API apart from a citizen which for some was missing, so I opted to use the following schema for the key property when iterating over the profiles:
`<FIRST NAME>-<LAST NAME>`
Ideally in a real API each profile record should have a unique system id generated when entering each record which would be used.

## State
I did not see a need to include Redux in this project as it is a fairly small project. The only state required to reflect would be the route loading state which *Next.js* supplied via the *NProgress* module as well as using the index.js's local component state. If the project had to grow beyond this point, it will be a good consideration to include redux. I took care in considering this, because mishandling on including redux could hamper with Next.js's server-side rendering on other pages.]

