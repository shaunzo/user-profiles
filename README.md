# user-profiles
A Next.js app to display a list of users with teh ability to click through to a user's info as well as the ability to sort, filter and search through profiles


# Considerations
## Dummy data
With a live application, we need to assume a capped number of records, rather than an infinite number that the https://randomuser.me/ service gives us. for my notes that follow will assume that we a limit of 50 records for an initial page of records. <i>ie. If we have 10 000 records which would require pagination component and we would have 200 pages available to click through.</i>

## Optimizination on server calls vs client capacity
In this we example, we are taking advantage of server-side render content. While this is great for assisting is speeding up performance overall on our application, I opted to take a decision to only have a port of the records pre-rendered.
