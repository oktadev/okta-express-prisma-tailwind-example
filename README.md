# Build a website with Express.Js and Prisma

This repository shows you how to use Okta on an express web application using Prisma as an ORM.. Please read [Build a website with Express.Js and Prisma][blog] to see how it was created.

**Prerequisites:**

- [Node](https://nodejs.org/en/download/)
- [Eleventy](https://www.11ty.dev/)
- [Okta CLI](https://cli.okta.com)

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example, run the following commands:

```bash
git clone https://github.com/nickolasfisher/Okta_Primsa
cd workout-app
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI. 

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

Before you begin, you’ll need a free Okta developer account. Install the Okta CLI and run okta register to sign up for a new account. If you already have an account, run okta login. Then, run okta apps create. Select the default app name, or change it as you see fit. Choose Web and press Enter.

Select Other. Then, change the Redirect URI to http://localhost:3000/authorization-code/callback and accept the default Logout Redirect URI of http://localhost:3000.

The application configuration will be printed to `.okta.env`.

```dotenv
export OKTA_OAUTH2_ISSUER="{yourOktaDomain}/oauth2/default"
export OKTA_OAUTH2_CLIENT_SECRET="{yourClientSecret}"
export OKTA_OAUTH2_CLIENT_ID="{yourClientId}"
```

Create a file called `.env` in the `workout-app` directory.  Add the following code and replace the values with yours.

```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB (Preview).
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="{yourDatabaseUrl}"
SEED_USER_NAME="{yourOktaUserName}"
```

## Start the Application.

Run the command `npm run start` and then open `https://localhost:3000` in your favorite browser and you should be able to see the home page.

## Links

This example uses the following open source libraries from Okta:

* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: ()
