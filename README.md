# Grocery Booking API

API endpoints for **grocery booking** built using `Node.js` with `express.js` and `TypeScript`. Dockerized for easier development and deployment

## Installation

1. Clone the repository:

```bash
git clone https://github.com/devrajneupane/Grocery-Booking-API
cd Grocery-Booking-API
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file based on the `.env.example`

```bash
cp .env.example .env
```

Then change the `.env` with the values you want to use for each env variable
for eg:

```bash
PORT=5000
```

## Usage

To start the server run

```bash
npm start
```

The server will start on the port specified in your `.env` file.
For eg:

```
http://localhost:3000/
```

> [!IMPORTANT]
> Before making any request to the server, make sure to run the migrations and seed the database
>
> ```bash
> npm run migrate && npm run seed:Run
> ```

### Using docker

Alternatively docker can be used to run this project

<details>
  <summary>For development</summary>
  Run the following `docker compose` command:

   ```bash
   docker compose watch
   ```

</details>

<details>
  <summary>For deployment</summary>

  Run the following `docker compose` command:

   ```bash
   docker compose up --detach
   ```

</details>

> [!IMPORTANT]
> Before aking any request enter into the `backend` container and run the migrations and seed
>
> 1. Enter into the `backend` container
>
>   ```bash
>   docker compose exec -it backend sh
>   ```
> 2. Run migrations and seed
>
>   ```sh
>   npm run migrate && npm run seed:run
>   ```

## Interactive docs

Visit at `http://localhost:<port>/docs` for interactive swagger docs for all available endpoints

> [!IMPORTANT]
> For endpoints that need authentication:
> 1. First, log in using the `/login` route.
> 2. Copy the `accessToken` from the response.
> 3. Click on the `Authorize` button at the top left.
> 4. Paste the `accessToken` into the provided field.
> 5. Click `Authorize` to complete the process.
>
> Now you can make request to the routes
