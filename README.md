# Survey Application for Comparing AI-Supported Interaction Types
Comparing the effects of AI assistance, reactive and proactive agent behavior, trust, and explanatory behavior on user productivity, experience, interaction, and perception.

In the study, participants completed administrative tasks for a fictional vacation rental management company. The tasks were provided via emails in an embedded email client within the survey application. Participants completed these tasks under three conditions: without agent support, with a reactive AI agent, and with a proactive AI agent, aiming to complete the tasks as efficiently and accurately as possible. The questionnaires used to collect participants’ responses were also integrated into the survey application.

## Clone this Repository with:
```
git clone --recurse-submodules https://github.com/JonBunator/smart-ui-demo
```

<img src="/doc-images/application-screenshot-bookings.png"/>
<img src="/doc-images/application-screenshot-properties.png"/>
<img src="/doc-images/application-screenshot-proactive-agent-email-event.png"/>

## Production environment
Create `.env` in `src`
```bash
OPENAI_API_KEY=
OPENAI_ENDPOINT=
OPENAI_API_VERSION=2025-01-01-preview
OPENAI_DEPLOYMENT= # You can only use GPT-4.1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=debug123
DATABASE_URL="postgresql://postgres:debug123@database:5432/postgres?schema=public"
JWT_SECRET=DEBUG_SECRET
```

Start docker container
```bash
docker compose up --build
```

Create `.env.development` in `src` (Required for seeding database)
```bash
OPENAI_API_KEY=
OPENAI_ENDPOINT=
OPENAI_API_VERSION=2025-01-01-preview
OPENAI_DEPLOYMENT= # You can only use GPT-4.1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=debug123
DATABASE_URL="postgresql://postgres:debug123@localhost:5432/postgres?schema=public"
JWT_SECRET=DEBUG_SECRET
```
Seed database
```bash
cd src
npm install
npm run init-db
npm run seed
```

Open UI
```bash
http://localhost:3001/invite
```

## Local development
Build `smart-ui` library
```bash
cd smart-ui
npm install
npm run build
npm link
```

Create `.env.development` in `src`
```bash
OPENAI_API_KEY=
OPENAI_ENDPOINT=
OPENAI_API_VERSION=2025-01-01-preview
OPENAI_DEPLOYMENT= # You can only use GPT-4.1
POSTGRES_USER=postgres
POSTGRES_PASSWORD=debug123
DATABASE_URL="postgresql://postgres:debug123@localhost:5432/postgres?schema=public"
JWT_SECRET=DEBUG_SECRET
```

Run main application
```bash
cd ..
cd src
npm install
npm link smart-ui
npm run dev
```

Start database
```bash
docker compose up database
```

Seed database (only once)
```bash
npm run init-db
npm run seed
```

## This work was supported by
<table>
  <tr>
    <td align="center">
        <a href="https://xitaso.com/">
            <img src="/doc-images/XITASO-Logo.png" alt="XITASO" height="100" />
        </a>
        <br />
        <strong>
            <a href="https://xitaso.com/">XITASO GmbH</a>
        </strong>
    </td>
    <td align="center">
      <a href="https://www.uni-augsburg.de/en/fakultaet/fai/informatik/prof/hcm/">
        <img src="/doc-images/HCAI-Logo.png" alt="HCAI" height="100" />
      </a>
      <br />
      <strong>
        <a href="https://www.uni-augsburg.de/en/fakultaet/fai/informatik/prof/hcm/">
          Chair for Human-Centered Artificial Intelligence (University Augsburg)
        </a>
      </strong>
    </td>
  </tr>
</table>
