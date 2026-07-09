# SaaS Boilerplate with Tailwind CSS and Shadcn UI

<p align="center">
  <a href="https://max-demo.nextjs-boilerplate.com"><img height="300" src="public/assets/images/nextjs-starter-banner.png?raw=true" alt="Next.js SaaS Template"></a>
</p>

🚀 **Next.js Boilerplate Max** is a powerful and customizable template to kickstart your SaaS applications. Built with **Next.js** and **Tailwind CSS**, and the modular UI components of **shadcn/Radix UI**. This boilerplate helps you build and launch faster with a production-minded foundation.

Packed with essentials like **authentication** (Better Auth), database (Postgres + Drizzle + local PGlite), **user-based Stripe subscriptions**, **i18n** (next-intl), marketing pages, dashboard shell, typed API (oRPC), form handling, SEO basics (sitemap + robots), logging, error monitoring with [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo), testing, CI, and monitoring-as-code, this template provides a solid starting point for real-world SaaS.

Designed with developers in mind, this starter kit uses TypeScript for type safety and integrates ESLint for code quality. The testing suite uses Vitest (with Browser Mode) and Playwright for integration, E2E and visual tests. CI is managed via GitHub Actions. Authentication is handled by Better Auth, and the database layer is built on Drizzle ORM.

Whether you're building a new SaaS app or looking for a flexible, **production-ready SaaS template**, this boilerplate has you covered.

Clone this project and use it to create your own SaaS. You can check the live demo at [SaaS Boilerplate](https://max-demo.nextjs-boilerplate.com), which is a demo with a working authentication and billing system.

## Features

Everything you need to ship a real SaaS product, with best practices and a great developer experience.

### Product-ready SaaS

- 🔐 **Authentication (Better Auth)** - Email/password, email verification (OTP), password reset, social login (GitHub + Google), MFA (TOTP + backup codes), and email change flow.
- 🛡️ **Rate limiting** - Built-in protection for sensitive auth routes to reduce abuse.
- 💳 **Billing** - Launch monetization fast with user-based Stripe subscriptions: checkout, upgrades/cancellations, customer portal, and webhook handling.
- 🧭 **Dashboard shell** - A production-ready app layout with sidebar navigation.
- 🏠 **Marketing homepage** - A ready-to-edit landing page.
- 📱 **Mobile-friendly UI** - Responsive marketing pages and the authenticated dashboard are designed to work well on mobile, tablet, and desktop.
- 🎨 **UI components + themes** - Ship polished UI fast and rebrand easily with themes.
- 🌍 **Internationalization** - Reach global customers with localized UI.
- ⚙️ **Settings UI** - User profile, security, and billing settings.
- ✉️ **Transactional Emails** - React Email templates ready to send via any SMTP provider (Resend, SendGrid, Postmark, AWS SES, etc.).
- ✅ **Real code example** - A simple Todo feature demonstrating how to build features with the boilerplate architecture.
- 🎨 **Shadcn UI + Tailwind CSS 4** - Ready-to-use UI components with full customization flexibility.

#### Developer experience

- ⚡ **Next.js App Router + React 19** - Build full-stack applications in a single codebase.
- 🔥 **TypeScript everywhere** - One language across frontend, backend, and infrastructure as code reduces context switching and accelerates onboarding.
- 🧠 **End-to-end type safety** - Database, API, forms, queries, i18n, and UI are fully typed.
- 🧱 **Clean architecture** - Clear separation of concerns with dedicated layers to organize your code. Easy to navigate, customize, and maintain as you grow.
- 🗄️ **Database: Postgres + Drizzle ORM** - A type-safe ORM that lets you query and evolve your database with confidence.
- 🔎 **Drizzle Studio** - Explore and inspect your database in a visual UI while you build.
- 🐘 **Local-first development** - Run the app locally without Docker: local PostgreSQL (PGlite) + local email testing (MailDev); works offline after install.
- 🥟 **Bun** - Fast package manager to install dependencies quickly.
- 🧾 **Forms & validation** - Shared validation schemas run on the client for instant feedback and on the server to ensure security.
- ♻️ **Type-safe env vars** - Fail fast on misconfigurations with type-safe environment variables.
- 🗂 **VS Code** - Preconfigured settings, tasks, launch configs, and recommended extensions so you can start coding immediately.
- 🧩 **Highly customizable** - Full access to all source code, so you can customize everything you need.
- 🤝 **AI agents** - Includes project rules that help AI coding tools (Claude Code, Codex, Cursor, Gemini, GitHub Copilot, OpenCode, etc.) generate code better and faster.
- 📚 **Docs** - Step-by-step setup and configuration guides.
- 📖 **UI development** - Develop and test UI components in isolation with Storybook.
- 🔄 **Continuously evolving** - 6 years of active development since 2020, battle-tested on real SaaS products and continuously modernized. A reliable foundation with the latest standards.

#### Quality, CI & automation

- 🧹 **Linting & formatting** - ESLint configured with strict rules to catch bugs early and enforce consistent code style across the codebase.
- 🧪 **Testing** - Unit tests with Vitest, integration and E2E with Playwright, and visual regression testing.
- 👷 **CI** - GitHub Actions runs all your quality checks automatically on every push and pull request.
- 📝 **Conventional Commits** - Standardized commit messages and use Commitlint to enforce them.
- 🧰 **Git Hooks** - Lefthook catches issues before they reach your repository.
- ✂️ **Clean codebase** - Knip identifies unused dependencies, exports, and files to simplify maintenance.
- 🔍 **Dependency updates** - Dependabot automatically monitors and updates dependencies.

#### Serverless Infrastructure

- 🔧 **Platform agnostic** - No vendor lock-in. Easily switch hosting providers, databases, email service, or payment processor.
- 🌐 **Deploy anywhere** - Deploy easily on Vercel, Netlify, Cloudflare, AWS Amplify, Firebase, Railway, etc.
- 🔀 **Unlimited environments** - Create as many environments as you need: local, staging, production, or a preview environment for every pull request.
- 🚫 **No servers to manage** - No Docker, no Kubernetes, no VPS, no VMs, no server maintenance. Just deploy your code and focus on your product.
- 📈 **Auto-scaling** - Scale effortlessly from zero to millions of requests automatically.
- 💰 **Cost-efficient** - Pay only when requests hit your app. No traffic, no charges.
- 🏗️ **Infrastructure as Code** - Define and provision services programmatically with version-controlled configuration.

#### Observability

- 📒 **Logging** - Structured logging that works seamlessly across server and browser.
- 🚨 **Error monitoring** - Sentry notifies you when errors happen in production.
- 🖥️ **Monitoring-as-code** - Test your production instance globally and alerts you before users notice downtime.
- ⚙️ **Bundle analyzer** - Visualizes package sizes and dependencies.
- 🤖 **SEO baseline** - Sitemap, robots.txt, metadata, and favicon for search engines.

Built-in features from Next.js:

- ☕ Minify HTML & CSS
- 💨 Live reload
- ✅ Cache busting

### Philosophy

- Nothing is hidden from you, allowing you to make any necessary adjustments to suit your requirements and preferences.
- Dependencies are updated every month
- Start for free without upfront costs
- Easy to customize
- Minimal code
- SEO-friendly
- Everything you need to build a SaaS
- 🚀 Production-ready

### Requirements

- Bun v1.3+

### Getting started

Run the following command on your local environment:

```shell
git clone --depth=1 https://github.com/Nextlessjs/Next-js-Boilerplate-Max my-project-name
cd my-project-name
bun install
```

Then, you can run the project locally in development mode with live reload by executing:

```shell
bun run dev
```

This command starts:

- Next.js dev server, open http://localhost:3000 to see your project running
- Local PostgreSQL DB via PGlite
- MailDev (local SMTP server) at http://localhost:1080 to receive test emails
- Sentry Spotlight at http://localhost:8969 to view captured errors in development

Now, you are ready to start developing your SaaS application! 🎉 You can skip the rest of this README and start coding. If you want an overview of the project structure and customization points, keep reading.

### Project structure

```shell
.
├── README.md                        # README file
├── .github                          # GitHub folder
│   ├── actions                      # Reusable actions
│   └── workflows                    # GitHub Actions workflows
├── .storybook                       # Storybook folder
├── .vscode                          # VSCode folder
├── docs                             # Documentation
├── infrastructure                   # Infra-as-code
├── migrations                       # Drizzle migrations
├── public                           # Static assets
├── src
│   ├── app                          # Next.js App Router routes
│   ├── components                   # Shared UI components
│   ├── emails                       # React Email templates
│   ├── features                     # Feature folders (auth, billing, dashboard, settings, todos)
│   ├── hooks                        # Reusable hooks
│   ├── libs                         # 3rd party libraries configuration
│   ├── locales                      # Locales folder (i18n messages)
│   ├── models                       # Database models
│   ├── routers                      # API endpoints
│   ├── services                     # Business logic
│   ├── styles                       # Styles folder
│   ├── templates                    # Marketing page building blocks
│   ├── types                        # Shared types definitions
│   ├── utils                        # Shared helpers
│   └── validations                  # Zod validation schemas
├── tests
│   ├── e2e                          # E2E tests, also includes Monitoring as Code
│   └── integration                  # Integration tests
├── drizzle.config.ts                # Drizzle Kit configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Scripts and dependencies
└── tsconfig.json                    # TypeScript configuration
```

### Customization

You can easily configure SaaS Boilerplate by searching the entire project for `FIXME:` to make quick customization. Here are some of the most important files to customize:

- `AGENTS.md`: project conventions and instructions for AI coding agents
- `public/apple-touch-icon.png`, `public/favicon.ico`, `public/favicon-16x16.png` and `public/favicon-32x32.png`: your website favicon
- `src/utils/AppConfig.ts`: app configuration
- `src/utils/PricingPlans.ts`: subscription pricing plans
- `next.config.ts`: Next.js config
- `.env`: default environment variables

You have full access to the source code for further customization. The provided code is just an example to help you start your project. The sky's the limit 🚀.

#### Create a fresh and empty database

If you want to create a fresh and empty database, you just need to remove the folder `local.db` from the root of the project. The next time you run the project, a new database will be created automatically.

### Change database schema

To modify the database schema in the project, you can update the schema file located at `./src/models/Schema.ts`. This file defines the structure of your database tables using the Drizzle ORM library.

After making changes to the schema, generate a migration by running the following command:

```shell
bun run db:generate
```

This will create a migration file that reflects your schema changes.

After making sure your database is running, you can apply the generated migration using:

```shell
bun run db:migrate
```

There is no need to restart the Next.js server for the changes to take effect.

### Commit Message Format

The project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification, meaning all commit messages must be formatted accordingly. To help you write commit messages, the project provides an interactive CLI that guides you through the commit process. To use it, run the following command:

```shell
bun run commit
```

One of the benefits of using Conventional Commits is the ability to automatically generate GitHub releases. It also allows us to automatically determine the next version number based on the types of commits that are included in a release.

#### Commit Types

Every commit message follows Conventional Commits and must begin with a type prefix (e.g., `feat: add login page`). The table below lists the available types:

| Type | Description |
| --- | --- |
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Code formatting without logic changes |
| `refactor` | Code restructuring without behavior changes |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `build` | Build system |
| `ci` | CI configuration and scripts |
| `chore` | Maintenance tasks (dependencies, config) |
| `revert` | Reverts a previous commit |

### Subscription payment with Stripe

The project is integrated with Stripe for subscription payment. First, you need to create a Stripe account.

In your Stripe Dashboard, you are required to configure your customer portal settings at https://dashboard.stripe.com/test/settings/billing/portal. Most importantly, don't forget to save the settings even you don't change anything. This is necessary to ensure that the customer portal works correctly.

#### Stripe setup

To configure Stripe, you need to provision Products and Prices. You can do this by running the following command:

```shell
bun run infra:deploy
```

To test Stripe webhooks locally, install the Stripe CLI (instructions: https://docs.stripe.com/stripe-cli) and login:

```shell
stripe login
```

In your `.env` file, you need to update the `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` with your Stripe Publishable key. You can find the key in your Stripe Dashboard. Then, you also need to create a new file named `.env.local` and add the following environment variables in the newly created file:

```shell
STRIPE_API_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

You get the `STRIPE_API_KEY` from your Stripe Dashboard. The `STRIPE_WEBHOOK_SECRET` is generated by running the following command:

```shell
bun run stripe:listen
```

You'll find the webhook signing secret in your terminal. You can copy it and paste it in your `.env.local` file.

#### Running Stripe webhooks locally

Now, you are ready to test the Stripe integration in your local environment. In one terminal, you need to run your Next.js application in development mode:

```shell
bun run dev
```

And, in another terminal, you need to run the Stripe webhook listener to forward Stripe events to your local development server:

```shell
bun run stripe:listen
```

This allows you to test subscription events, payment completions, and other Stripe webhooks locally without deploying your application.

### Testing

All unit tests are located alongside the source code in the same directory, making them easier to find. The unit test files follow this format: `*.test.ts` or `*.test.tsx`. The project uses Vitest with Browser Mode for unit testing for UI/component tests. You can run the tests with:

```shell
bun run test
```

### Integration & E2E Testing

The project uses Playwright for integration and end-to-end (E2E) testing. Integration test files use the `*.integ.ts` extension, while E2E test files use the `*.e2e.ts` extension. You can run the tests with the following commands:

```shell
npx playwright install # Only for the first time in a new environment
bun run test:e2e
```

### Storybook

Storybook is configured for UI component development and testing. The project uses Storybook with Next.js and Vite integration, including accessibility testing and documentation features.

Stories are located alongside your components in the `src` directory and follow the pattern `*.stories.ts` or `*.stories.tsx`.

You can run Storybook in development mode with:

```shell
bun run storybook
```

This will start Storybook on http://localhost:6006 where you can view and interact with your UI components in isolation.

To run Storybook tests in headless mode, you can use the following command:

```shell
bun run storybook:test
```

### Local Production Build

Generate an optimized production build locally using a temporary in-memory Postgres database:

```shell
bun run build-local
```

This command:

- Starts a temporary in-memory Database server
- Runs database migrations with Drizzle Kit
- Builds the Next.js app for production
- Shuts down the temporary DB when the build finishes

Notes:

- By default, it uses a local database, but you can also use `bun run build` with a remote database.
- This only creates the build, it doesn't start the server. To run the build locally, use `bun run start`.

### Deploy to production

#### Build and run in production

During the build process, database migrations are automatically executed, so there's no need to run them manually. However, you must define `DATABASE_URL` in your environment variables.

Then, you can generate a production build with:

```shell
$ bun run build
```

It generates an optimized production build of the boilerplate. To test the generated build, run:

```shell
$ bun run start
```

Make sure you also set `BETTER_AUTH_SECRET`  in your production environment. To generate a good secret, you can use the following command:

```shell
$ openssl rand -base64 32
```

This command starts a local server using the production build. You can now open http://localhost:3000 in your preferred browser to see the result.

Here are some popular hosting options without Docker for deploying your Next.js application:

- Vercel - Tested and works great with the project
- Netlify
- AWS Amplify

#### Set up remote database

The project uses DrizzleORM, a type-safe ORM that is compatible with PostgreSQL, SQLite, and MySQL databases. By default, the project is configured to seamlessly work with PostgreSQL, and you have the flexibility to choose any PostgreSQL database provider of your choice.

When you launch the project locally for the first time, it automatically creates a PostgreSQL database on your local machine. This allows you to work with a PostgreSQL database without Docker or any additional setup.

To set up a remote and production database, you need to create a PostgreSQL database and obtain the connection string. One recommended option is to use [Neon](https://get.neon.com/BMFYNtx), which provides a free PostgreSQL database. This database is compatible and has been tested with Next.js Boilerplate.

After creating your Neon account, you can get the connection string and copy it to the `DATABASE_URL` variable in your `.env.production` file.

> :warning: This project works out of the box with any PostgreSQL provider. Neon is mentioned here because it offers a free tier, and the link is an affiliate link. Feel free to use any PostgreSQL provider that fits your needs.

#### Email setup for production

You need to set up an SMTP provider to send emails. You can use providers like Resend, SendGrid, Mailgun, Amazon SES, or any other SMTP service, and then add the SMTP configuration in your production environment variables:

```shell
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
```

#### Social login setup

To enable social login providers such as GitHub and Google, you need to create OAuth applications in their respective developer consoles. Once you have created, you can add the client IDs and client secrets in your production environment variables:

```shell
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Error Monitoring

The project uses [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo) to monitor errors.

#### Local development with Sentry and Spotlight

In the development environment, no additional setup is required: Next.js Boilerplate comes pre-configured with Sentry and Spotlight (Sentry for Development). All errors are automatically captured by your local Spotlight instance, enabling testing without sending data to Sentry Cloud.

You can inspect captured events, view stack traces, and analyze errors in the Spotlight UI at `http://localhost:8969`.

#### Production setup with Sentry

For production environment, you'll need to create a [Sentry](https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo) account and a new project. Then, in `.env.production`, you need to update the following environment variables:

```shell
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORGANIZATION=
SENTRY_PROJECT=
```

You also need to create a environment variable `SENTRY_AUTH_TOKEN` in your hosting provider's dashboard.

### Code coverage

SaaS Boilerplate relies on [Codecov](https://about.codecov.io/codecov-free-trial/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo) for code coverage reporting solution. To enable Codecov, create a Codecov account and connect it to your GitHub account. Your repositories should appear on your Codecov dashboard. Select the desired repository and copy the token. In GitHub Actions, define the `CODECOV_TOKEN` environment variable and paste the token.

Make sure to create `CODECOV_TOKEN` as a GitHub Actions secret, do not paste it directly into your source code.

### Logging

The project uses LogTape for logging. In the development environment, logs are displayed in the console by default.

For production, the project is already integrated with [Better Stack](https://betterstack.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate) to manage and query your logs using SQL. To use Better Stack, you need to create a [Better Stack](https://betterstack.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate) account and create a new source: go to your Better Stack Logs Dashboard > Sources > Connect source. Then, you need to give a name to your source and select JavaScript as the platform.

After creating the source, you will be able to view and copy your source token. In your environment variables, paste the token into the `NEXT_PUBLIC_BETTER_STACK_SOURCE_TOKEN` variable. You'll also need to define the `NEXT_PUBLIC_BETTER_STACK_INGESTING_HOST` variable, which can be found in the same place as the source token.

Now, all logs will automatically be sent to and ingested by Better Stack.

### Translation (i18n) setup

For translation, the project uses `next-intl` combined with [Crowdin](https://l.crowdin.com/next-js). As a developer, you only need to take care of the English (or another default language) version. Translations for other languages are automatically generated and handled by Crowdin. You can use Crowdin to collaborate with your translation team or translate the messages yourself with the help of machine translation.

To set up translation (i18n), create an account at [Crowdin.com](https://l.crowdin.com/next-js) and create a new project. In the newly created project, you will be able to find the project ID. You will also need to create a new Personal Access Token by going to Account Settings > API. Then, in your GitHub Actions, you need to define the following environment variables: `CROWDIN_PROJECT_ID` and `CROWDIN_PERSONAL_TOKEN`.

After defining the environment variables in your GitHub Actions, your localization files will be synchronized with Crowdin every time you push a new commit to the `main` branch.

### Checkly monitoring

The project uses [Checkly](https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate) to ensure that your production environment is always up and running. At regular intervals, Checkly runs the tests ending with `*.check.e2e.ts` extension and notifies you if any of the tests fail. Additionally, you have the flexibility to execute tests from multiple locations to ensure that your application is available worldwide.

To use Checkly, you must first create an account on [their website](https://www.checklyhq.com/?utm_source=github&utm_medium=sponsorship&utm_campaign=next-js-boilerplate). After creating an account, generate a new API key in the Checkly Dashboard and set the `CHECKLY_API_KEY` environment variable in GitHub Actions. Additionally, you will need to define the `CHECKLY_ACCOUNT_ID`, which can also be found in your Checkly Dashboard under User Settings > General.

To complete the setup, update the `checkly.config.ts` file with your own email address and production URL.

### Useful commands

#### Development

- `dev`: starts development environment: Next.js + local DB (PGlite) + MailDev + Sentry Spotlight
- `email:dev`: starts React Email preview server for `src/emails`
- `commit`: CLI for creating Conventional Commits

#### Build

- `build`: runs DB migrations then builds Next.js
- `build-local`: starts an in-memory DB, runs migrations, then builds Next.js
- `start`: starts Next.js in production mode
- `clean`: remove project artifacts
- `build-stats`: builds with bundle analyzer enabled

#### Testing

- `test`: runs unit tests with Vitest
- `test:e2e`: runs Playwright integration, E2E and Visual tests

#### Code quality

The project includes several commands to ensure code quality and consistency. You can run:

- `bun run lint` to check for linting errors
- `bun run lint:fix` to automatically fix fixable issues from the linter
- `bun run check:types` to verify type safety across the entire project
- `bun run check:deps` help identify unused dependencies and files
- `bun run check:i18n` ensures all translations are complete and properly formatted

#### Database

- `db-server:file`: starts a file-backed PGlite database and runs migrations
- `db-server:memory`: starts an in-memory PGlite database and runs migrations
- `db:generate`: generates Drizzle migrations from `src/models/*`
- `db:migrate`: applies migrations to the database
- `db:studio`: opens Drizzle Studio (database explorer)

#### Storybook

- `storybook`: starts Storybook dev server
- `storybook:test`: runs Storybook tests
- `build-storybook`: builds Storybook static output

#### Stripe

- `infra:deploy`: provisions Stripe Products/Prices
- `stripe:listen`: forwards Stripe events to the local webhook endpoint

#### Bundle Analyzer

SaaS Boilerplate includes a built-in bundle analyzer. It can be used to analyze the size of your JavaScript bundles. To begin, run the following command:

```shell
bun run build-stats
```

By running the command, it'll automatically open a new browser window with the results.

#### Database Studio

The project is already configured with Drizzle Studio to explore the database. You can run the following command to open the database studio:

```shell
bun run db:studio
```

Then, you can open https://local.drizzle.studio with your favorite browser to explore your database.

### VSCode information (optional)

If you are VSCode user, you can have a better integration with VSCode by installing the suggested extension in `.vscode/extension.json`. The starter code comes up with Settings for a seamless integration with VSCode. The Debug configuration is also provided for frontend and backend debugging experience.

With the plugins installed in your VSCode, ESLint can automatically fix the code and display errors. The same applies to testing: you can install the VSCode Vitest extension to automatically run your tests, and it also shows the code coverage in context.

Max tips: if you need a project wide-type checking with TypeScript, you can run a build with <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> on Mac.

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have any questions or find a bug. Totally open to suggestions and improvements.

### License

Licensed under the MIT License, Copyright © 2026

See [LICENSE](LICENSE) for more information.

---

Made with ♥ by [CreativeDesignsGuru](https://creativedesignsguru.com) [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40Ixartz)](https://twitter.com/ixartz)

[![Sponsor Next JS Boilerplate](https://cdn.buymeacoffee.com/buttons/default-red.png)](https://github.com/sponsors/ixartz)
