Simple Green Remodeling Project LCC calculate
============================

The Green Remodeling Project is a web application that helps users optimize their home renovation projects to be more cost-effective. It provides an optimized finanacial results and remodeling costs for users to input their home specifications and preferences, and then generates a list of recommended upgrades and estimates their costs and savings over time. The application is based on a genetic algorithm that finds the best combination of 5 financing method given the user's constraints and objectives.

Getting Started
---------------

To use the Green Remodeling Project, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/your-username/green-remodeling-project.git`.
2. Install the required dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Open the 'controller/client_input.js' to input the detailed information. The schema of input is in 'utils/inputSchema.js'
5. Review the results from the 'controller/client_output.js'  and choose which upgrades you want to implement.

Folder structure
------------

```lua
src/
├── configs/
│   ├── fund.js
│   ├── electricityPriceDB.js
│   ├── gasPriceDB.js
│   ├── wallDB.js
│   ├── roofDB.js
│   ├── heatpumpDB.js
│   ├── lightDB.js
│   ├── packageDB.js
│   └── renewableDB.js
├── controllers/
│   ├── client_input.js
│   └── server_output.js
├── model/
│   └── genetic.js
├── services/
│   ├── cashflowNPV.js
│   ├── cashflowTechnology.js
│   ├── getNPV.js
│   ├── optimizeGeneticAlgorithm.js
│   └── cashflowEnergy.js
├── utils/
│   ├── inputSchema.js
│   ├── updateInput.js
│   └── validateInputSchema.js
├── package.json
└── .gitignore
```

- `configs/`: This folder contains configuration files for various aspects of the project, such as the prices of different energy sources and the specifications of various building materials and technologies.
- `controllers/client_input.js` is likely responsible for handling user input and validating it before sending it to the server, while server_output.js probably handles the server's response to the client.
- `model/`: This folder contains a genetic algorithm for optimizing energy usage in buildings.
- `services/`: This folder contains various utility services for the project, such as calculating the net present value (NPV) of energy projects and optimizing the genetic algorithm.
- `utils/`: This folder contains utility scripts for the project, such as input schema validation and updating input data.
- `package.json`: This file contains information about the project's dependencies and scripts.

Overall, the folder structure is to be well-organized and follows best practices for structuring a Node.js project. It is designed for easy project expansion.

Input Data
------------

The input data consists of several JavaScript objects that store different types of information.

- `userInput`: This object contains basic information about the building type, location, approval year and main bank.
- `energyContract`: This object contains information about the energy contract type, pressure and selection.
- `monthlyElectricityInput`: This object contains arrays of monthly electricity consumption before and after remodeling (in kWh).
- `monthlyGasInput`: This object contains arrays of monthly gas consumption before and after remodeling (in MJ).
- `LCCAssumptionInput`: This object contains assumptions for the life cycle cost analysis, such as analysis period and real interest rate.
- `remodelingTechInput`: This object contains information about the remodeling technologies applied to different parts of the building, such as name, size and material cost.
- `detailedFundInformationInput`: This object contains information about the funding sources for the remodeling project, such as mortgage loan limit, interest rate and repayment period.

Output data
------------

The `controllers/server_output.js` contains the output data for the server's optimization and analysis of the client's building and remodeling project.

- `optimizeResults`: This variable contains the results of the optimization process using a genetic algorithm. It includes the optimal values for each funding source and remodeling technology.
- `totalInitialCost`: This variable contains the total initial cost of the remodeling project (in KRW).
- `techNPV`: This variable contains the net present value (NPV) of the remodeling technologies (in KRW).
- `electricityNPV`: This variable contains the NPV of the electricity savings (in KRW).
- `gasNPV`: This variable contains the NPV of the gas savings (in KRW).
- `initialCostWall`, `initialCostRoof`, etc.: These variables contain the initial cost of each remodeling technology applied to different parts of the building (in KRW).
- `totalWallCashFlow`, `totalRoofCashFlow`, etc.: These variables contain the NPV of each remodeling technology applied to different parts of the building (in KRW).
- `B1`, `B2`, etc.: These variables contain the loan amounts for each funding source (in KRW).
- `ICC`: Initial investment cost (IIC): Amount required to start remodeling.
- `NPV`: Net present value (NPV): Calculated by combining construction costs and expected energy cost savings returned at present value.
- `SIR`: Saving to Investment Ratio (SIR): Calculated by dividing the energy cost savings by the total cost of remodeling.
- `TR`: Total Repayment (TR): Amount loaned for remodeling, total amount due including interest and fees.
- `ECR`: Energy consumption reduction (ECR): Percentage of energy consumption reduced by remodeling.

License
------------

The Green Remodeling Project is licensed under the MIT License.

README from chatGPT