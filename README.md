# user-profiles
A Next.js app to display a list of users with teh ability to click through to a user's info as well as the ability to sort, filter and search through profiles


# Considerations
## Dummy data
With a live application, we need to assume a capped number of records, rather than an infinite number that the https://randomuser.me/ service gives us. for my notes that follow will assume that we a limit of 50 records for an initial page of records. <i>ie. If we have 10 000 records which would require pagination component and we would have 200 pages available to click through.</i>

With a <i>API</i> we would need to pass either an <i>offset</i> or <i>page</i> value. The <i>results</i> query string could also be called <i>limit</i>

eg. `https://<API-URL>.me/?limit=50&offset=1` or `https://<API-URL>.me/?limit=50&page=1`

As a result of utilizing dummy data which is also random, I have utilized the <b>filter()</b> array method from the initially retrieved values to demonstrate functionality

## Profile ID
There was no unique system ID supplied in teh API apart from a citizen which for some was missing, so I opted to use the following schema for the key property when iterating over the profiles:
`<FIRST NAME>-<LAST NAME>`
Ideally in a real API each profile record should have a unique system id generated when entering each record which would be used.


## Optimizination on server calls vs client capacity
In this we example, we are taking advantage of server-side render content. While this is great for assisting is speeding up performance overall on our application, I opted to take a decision to only have a port of the records pre-rendered.
