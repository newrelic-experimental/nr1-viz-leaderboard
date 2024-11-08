# Leaderboard Visualization

Leaderboard Visualization is a dynamic and animated web app that allows you to visualize the ranking of the top X values from your dataset. It displays the position, values ranked, optional image, percentage of the total (configurable), and the change in the last x hours.

<img width="1278" alt="leaderboard" src="https://github.com/user-attachments/assets/a6afab84-cc63-444c-9e65-9f3df7721f95">

## Features

All of the features are configurable and can be controlled by the user through the NRQL query via the New Relic One UI.

- **Configurable column names**: You can choose how to name the columns for your leaderboard.
- **Image support**: You can add an image to each row by providing the URL. The url can be derived from the dataset itself.
- **Sort order**: You can choose to sort the leaderboard in ascending or descending order by clicking on the column name. Default ordering is based on the first `SELECT` value in the query.
- **Name**: Configurable column for the name of the row with value derived from the dataset. Column name is configurable.
- **Value**: Configurable column for the value of the row with value derived from the dataset. Column name is configurable.
- **Percentage of total**: You can choose to display the percentage of the total value for each row. Derived from the dataset. Column name is configurable.
- **Change in the last x hours**: You can choose to display the change in the last x hours for each row. Derived from the dataset. Column name is configurable.

You can watch a quick vide demo of the visualization [here](https://github.com/user-attachments/assets/9b40b3b4-6a7d-416b-8f12-8ecf7cf2034f)

## Configuration of the Visualization

### Leaderboard query

The query should return the following columns:

- `unique_id`: A unique identifier for each row. Required
- `name`: The name of an item in the row. Required
- `full_name`: The full name of the item in the row. Optional (is show on item hover - might be useful for long names)
- `name_heading`: The name of the column for the name. Optional (default: `Name`)
- `name_extra_data`: Any extra data to be displayed in the name column. Optional
- `value`: The value of the item in the row - preferably a number but can be a string. Required
- `value_heading`: The name of the column for the value. Optional (default: `Value`)
- `value_display`: The value to be displayed in the value column. Optional (default: `value`)
- `progress_percent`: The percentage of the total value. Can be set using NRQL query based on `value`. Optional
- `progress_precent_heading`: The name of the column for the percentage of the total. Optional (default: `Progress`)
- `chnage`: The change in the last x hours. Can be set using NRQL query's `compare with x hour` clause. Optional
- `change_heading`: The name of the column for the change in the last x hours. Optional (default: `Change`)

### Example query

Below is an example query that can be used to display a leaderboard. The example displays the top 10 items sold in the last hour. The query returns the name of the item, the number of units sold, and the value of the sales. The query also calculates the porcentag progress towards the goal (500) and calculates the (value) change in the last hour.

```sql
SELECT

latest(id) as unique_id,

latest(concat('https://picsum.photos/id/',string(id))) as image_url

latest(aparse(appName,('%-*'))) as name,
'Product' as name_heading,
latest(concat(string(unitsPerHour,precision:2),' units per hour')) as name_extra_data,

latest(value) as value,
latest(concat('£',value,'k')) as value_display,
'Sales' as value_heading,

latest(value)/500 as progress_percent,
'Target' as progress_percent_heading,

'Change' as change_heading

from (
 FROM Transaction select
 count(*)/100 as value,
 average(duration)*1000 as unitsPerHour,
 (count(*)/1000)  as unitPrice
 facet appName
 limit 10
)
facet appName compare with 1 hour ago LIMIT 10
```

## How to install

### Prerequisites

Before we start, make sure you have the following installed:

1. [Node.js](https://nodejs.org/) (>=12.13.0).
2. [New Relic CLI](https://one.newrelic.com/launcher/developer-center.launcher) (>=0.25.0).

Also, make sure you are logged in to your New Relic account. (alternatively check out the [Set up your development environment guide](https://developer.newrelic.com/build-apps/set-up-dev-env/)).

### Installation

Clone the repository and run `npm install` to install dependencies.

You will need a development profile, you can read more about how to set up on the New Relic [developer site](https://developer.newrelic.com/)

To summarise the steps required:

- Navigate to the "Build your own Nerdpack" tile under `+Add data > Apps and visualizations`
- Follow steps one to three to download and install the NR1 CLI, generate API key and add the key to your profile (`nr1 profiles:add --name {account-slug} --api-key {api-key} --region {us|eu} `)
- Ensure the correct profile is selected: `nr1 profiles:default`
- Generate a new UUID for your app deployment: `nr1 nerdpack:uuid -gf`

### Testing

You can test locally by running `nr1 nerdpack:serve`

### Deploy to account

To use the custom visualisation you must deploy it to your account following these steps:

- Ensure the correct profile is selected: `nr1 profiles:default`
- Publish the assets: `nr1 nerdpack:publish`
- Deploy to production: `nr1 nerdpack:deploy`
- Subscribe your account: `nr1 subscription:set`

The custom visualization should now appear as an option in the Custom Visualizations app (in the Apps > Custom Visualizations). Select the custom visualization, configure it and save to a dashboard.

Pro tip: Once a custom visualization is on a dashboard, you can click the ellipses to duplicate it.
