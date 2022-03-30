# Budget Calculator App
## *Rebekah Goodman | 03/22*


Thank you for visiting my project for the Code Louisville Javascript course Spring '22. For my project, I built a simple calculator that allows the user to add expenses and incomes and see the totals and outcome dynamically represented in a donut chart (generated using *chart.js*). The user can see also see a list of all entries and edit/remove entries at any time. The entries are saved to local storage, so they persist after page reloads. 

Since I opted to link to chart.js's CDN instead of the node package, no npm packages are necessary, although the site can be launched via express.

Here are the elements I picked to build my site:

1. Create and use a function that accepts two or more values (parameters), calculates or determines a new value based on those inputs, and returns a new value --> Use the function calculateBalance to subtract the income and the outcome and produce the total balance remaining, which then feeds into updateUI, a function used to update the totals in the dashboard/chart.
2. Create an array, dictionary or list, populate it with multiple values, retrieve at least one value, and use or display it in your application --> Generate a list of "entries" for both incomes and expenses and display in the dashboard
3. Visualize data in a graph, chart, or other visual representation of data --> Create a pie chart that shows the balance of the income - outcome.

Thanks again for checking out my project!

*Special Thanks To:*

- CodeExplained for the overall idea and direction
- Jacob Reese for the all the coffee, long troubleshooting sessions, and sacrificial love
- Tyler Akin for technical support
- Billie Jean the hamster for emotional support
