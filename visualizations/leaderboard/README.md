# Leaderboard Visualization

![Leaderboard](../../docs/screen-leaderboard.png)
The Leaderboard Visualization is a dynamic and animated web app that allows you to visualize the ranking of the top X values from your dataset. It displays the position, values ranked, optional image, percentage of the total (configurable), and the change in the last x hours.

## Features

All of the features are configurable and can be controlled by the user through the NRQL query via the New Relic One UI.

- **Configurable column names**: You can choose how to name the columns for your leaderboard.
- **Image support**: You can add an image to each row by providing the URL. The url can be derived from the dataset itself.
- **Sort order**: You can choose to sort the leaderboard in ascending or descending order by clicking on the column name. Default ordering is based on the first `SELECT` value in the query.
- **Name**: Configurable column for the name of the row with value derived from the dataset. Column name is configurable.
- **Value**: Configurable column for the value of the row with value derived from the dataset. Column name is configurable.
- **Percentage of total**: You can choose to display the percentage of the total value for each row. Derived from the dataset. Column name is configurable.
- **Change in the last x hours**: You can choose to display the change in the last x hours for each row. Derived from the dataset. Column name is configurable.

## Configuration of the Visualization

### Configuration options

- `Account ID` & `Query`: The query to dereive dat for table. See below for details.
- `Ignore time picker`: Changes to the time picker will not affect the query. Required if using compare.
- `Fetch interval`: Number of seconds between automatic re-hydration of the data in the table.

### Data query

The majority of the configuration is provided via an NRQL query, The query should return data for columns as listed below. Limit the results returned to limit the length of the leaderboard.

- `unique_id`: A unique identifier for each row. Required.
- `name`: The name of an item in the row. Required
- `full_name`: The full name of the item in the row. Optional (is show on item hover - might be useful for long names)
- `name_heading`: The heading text for the name column. Optional (default: `Name`)
- `name_extra_data`: Any extra data to be displayed underneath the name in the name column. Optional.
- `value`: The value of the item in the row - preferably a number but can be a string. Used for initial sorting. Required.
- `value_display`: The value to be displayed in the value column. Allows for text decoration without affecting ordering. Optional.
- `value_heading`: The heading text for value column. Optional (default: `Value`)
- `progress_percent`: The percentage for the progress column. Can be set using NRQL query based on `value`. Optional
- `progress_percent_heading`: The heading text for the progress column. Optional (default: `Progress`)
- Comparison: The change in the last x hours. Can be set using NRQL query's `compare with x hour` clause. If present triggers change column to appear. Optional.
- `change_heading`: The heading text for the change column. Optional (default: `Change`)
- `link`: Link to navigate to if item is clicked. Optional.

#### Example query

Below is an example query that can be used to display a leaderboard using service telemetry from the Transaction event type. We use nested aggregation to allow for string manipulation.

```sql
SELECT

latest(throughput) AS value,
latest(concat(string(throughput, precision:2),' rpm')) AS value_display,
latest('Throughput') AS value_heading,

latest(appName) AS unique_id,
latest(appName) AS name,
latest('Application') AS name_heading,
latest(concat(string(duration, precision:5),' avg duration')) AS name_extra_data,

latest((throughput/1000) * 100 ) AS progress_percent,
latest('Target') AS progress_percent_heading,

latest(concat('https://your-image-repo/',appName,'.jpg')) AS image_url,
latest(concat('https://your-url-target/',appName)) AS link

FROM (
 FROM Transaction
 SELECT
 rate(count(*), 1 minute) AS throughput,
 average(duration) AS duration,
 latest(appId) AS appId
 FACET appName AS appName
 LIMIT 10
)

FACET appName
LIMIT max
SINCE 1 HOUR AGO
COMPARE WITH 1 HOUR AGO
```
