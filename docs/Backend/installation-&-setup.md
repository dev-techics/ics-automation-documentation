---
sidebar_position: 2
---

# Installation & Setup

This guide walks you through setting up the ICS Automation backend on your local development machine. It covers prerequisites, database configuration, dependency installation, and running the queue worker.

---

## Prerequisites

Before you begin, ensure your system meets the following requirements:

| Requirement | Minimum Version | Recommended |
|-------------|----------------|-------------|
| **PHP** | 8.2 | 8.3+ |
| **Composer** | 2.5 | Latest stable |
| **MySQL** | 8.0 | 8.0+ |
| **Node.js** | 18 | 20 LTS |
| **Git** | 2.30 | Latest |
| **Operating System** | Windows 10/11, macOS, Linux | — |

### PHP Extensions

The following PHP extensions must be enabled:

```
pdo_mysql
mbstring
openssl
tokenizer
xml
ctype
json
bcmath
fileinfo
curl
gd
```

You can verify your PHP setup by running:

```bash
php -v
php -m | findstr pdo_mysql
```

---

## Step 1: Clone the Repository

Open your terminal and clone the project from GitHub:

```bash
git clone git@github.com:dev-techics/ics-automation-backend.git
cd ics-automation
```

If you are using SSH keys, ensure your SSH key is added to your GitHub account. Alternatively, use HTTPS:

```bash
git clone https://github.com/dev-techics/ics-automation-backend.git
cd ics-automation-backend
```

---

## Step 2: Install PHP Dependencies

Install all PHP dependencies using Composer:

```bash
composer install
```

This command reads `composer.json` and installs all required packages into the `vendor/` directory. It also generates the autoloader files.

For production deployments, use the optimized flag:

```bash
composer install --no-dev --optimize-autoloader
```

---

## Step 3: Configure the Environment

The application uses a `.env` file for configuration. Start by copying the example file:

```bash
copy .env.example .env
```

Then generate a unique application key:

```bash
php artisan key:generate
```

This creates a random `APP_KEY` value in your `.env` file. This key is used for encrypting cookies, sessions, and other sensitive data.

---

## Step 4: Configure the Database

The backend shares the **Legal CMS MySQL database**. It uses a table prefix (`ics_automation_`) to avoid conflicts with other CMS tables.

Open your `.env` file and configure the database connection:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cms
DB_USERNAME=root
DB_PASSWORD=
```

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_CONNECTION` | Database driver (always `mysql`) | `mysql` |
| `DB_HOST` | Database server address | `127.0.0.1` or `localhost` |
| `DB_PORT` | MySQL port (default 3306) | `3306` |
| `DB_DATABASE` | Database name (must be the CMS database) | `cms` |
| `DB_USERNAME` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `your_password` |

### Important: Database Prefix

The table prefix is configured in `config/database.php`:

```php
'prefix' => 'ics_automation_',
```

This means all application tables will be created with the `ics_automation_` prefix (e.g., `ics_automation_flows`, `ics_automation_clients`). This prefix separates the automation tables from the CMS tables in the shared database.

### Run Migrations

Once the database is configured, run the migrations to create all required tables:

```bash
php artisan migrate
```

This command reads all migration files in `database/migrations/` and creates the tables in your MySQL database. You should see output like:

```
INFO  Running migrations.

  2024_01_01_000001_create_flows_table ............ 50ms DONE
  2024_01_01_000002_create_templates_table ........ 45ms DONE
  2024_01_01_000003_create_sms_templates_table .... 30ms DONE
  2024_01_01_000004_create_client_lists_table ..... 35ms DONE
  2024_01_01_000005_create_clients_table .......... 40ms DONE
  2024_01_01_000006_create_flow_executions_table .. 55ms DONE
  2024_01_01_000007_create_statistics_table ....... 45ms DONE
  2024_01_01_000008_create_stats_table ............ 40ms DONE
  2024_01_01_000009_create_sendmode_stats_table ... 35ms DONE
  2024_01_01_000010_create_jobs_table ............. 30ms DONE
  2024_01_01_000011_create_failed_jobs_table ...... 25ms DONE
```

---

## Step 5: Configure Third-Party Services

### SendGrid (Email Service)

You need a SendGrid account and an API key with **Mail Send** permissions.

```env
SENDGRID_APIKEY=SG.xxxxxxxxxxxxxxxxxxxxxx
SENDGRID_APIENDPOINT=https://api.sendgrid.com/v3/mail/send
```

**How to get a SendGrid API key:**

1. Go to [https://app.sendgrid.com/](https://app.sendgrid.com/)
2. Navigate to **Settings → API Keys**
3. Click **Create API Key**
4. Give it a name (e.g., "ICS Automation")
5. Select **Full Access** or at minimum **Mail Send**
6. Copy the generated key and paste it into `.env`

### Sendmode (SMS Service)

You need a Sendmode account with active SMS credits.

```env
SENDMODE_USERNAME=your_sendmode_username
SENDMODE_PASSWORD=your_sendmode_password
SENDMODE_API_KEY=your_sendmode_api_key
```

**How to get Sendmode credentials:**

1. Go to [https://www.sendmode.com/](https://www.sendmode.com/)
2. Log in to your account
3. Navigate to **API Settings** or **Account Settings**
4. Copy your username, password, and API key

---

## Step 6: Start the Development Server

Start the Laravel development server:

```bash
php artisan serve
```

The API will be available at:

```
http://localhost:8000
```

You can specify a custom port:

```bash
php artisan serve --port=3000
```

---

## Step 7: Start the Queue Worker

The queue worker is **essential** for the automation engine. Without it, emails and SMS messages will not be sent, and flows will not execute.

### Development Mode

For local development, start a queue worker in a **separate terminal**:

```bash
php artisan queue:work
```

This command starts a persistent worker that continuously polls the `ics_automation_jobs` table for new jobs and processes them.

You should see output like:

```
INFO  Processing jobs from the [default] queue.
```

### With Retry Configuration

For more robust development, configure retry attempts:

```bash
php artisan queue:work --tries=3 --sleep=3
```

| Flag | Description |
|------|-------------|
| `--tries=3` | Retry failed jobs up to 3 times before moving to `failed_jobs` table |
| `--sleep=3` | Wait 3 seconds between job polls (reduces database load) |
| `--timeout=60` | Maximum seconds a single job can run |
| `--memory=512` | Maximum memory (in MB) before restarting the worker |

### Production Mode (Supervisor)

In production, use **Supervisor** to manage the queue worker. Supervisor ensures the worker automatically restarts if it crashes or the server reboots.

Create a Supervisor configuration file:

```ini
; /etc/supervisor/conf.d/ics-automation-worker.conf
[program:ics-automation-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/ics-automation/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/path/to/ics-automation/storage/logs/worker.log
stopwaitsecs=3600
```

Then start Supervisor:

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start ics-automation-worker:*
```

| Setting | Description |
|---------|-------------|
| `numprocs=2` | Run 2 worker processes in parallel for higher throughput |
| `autostart=true` | Start workers automatically on system boot |
| `autorestart=true` | Restart workers if they crash |
| `--max-time=3600` | Restart each worker every hour to prevent memory leaks |

---

## Step 8: Verify the Setup

### Test the API

Open your browser or use a tool like Postman to test the API:

```bash
curl http://localhost:8000/api/flows
```

You should receive a JSON response (possibly an empty array if no flows exist).

### Test the Queue Worker

Dispatch a test job to verify the queue worker is processing jobs:

```bash
php artisan tinker
```

```php
// Dispatch a test job
\App\Jobs\FlowExecutor::dispatch(
    flowId: 1,
    contactId: 1,
    currentNodeId: 'trigger',
    executionId: 1
);
```

Check the queue worker terminal — you should see the job being processed.

### Check the Database

Verify the tables were created:

```bash
mysql -u root -p cms -e "SHOW TABLES LIKE 'ics_automation_%';"
```

You should see all the `ics_automation_*` tables listed.

---

## Step 9: Optional — Set Up Postman

For API testing during development, you can use Postman:

1. Download Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Create a new collection called "ICS Automation API"
3. Set the base URL to `http://localhost:8000/api`
4. Create requests for each endpoint (see [API Reference](./api-documentation))

---

## Common Setup Issues

### "Class not found" Error After Composer Install

Run the autoloader dump:

```bash
composer dump-autoload
```

### Migration Fails with "Table Already Exists"

The migration may have been partially applied. Check the migration table:

```bash
php artisan migrate:status
```

If tables exist but migrations are not recorded, you can fake the migrations:

```bash
php artisan migrate:install
php artisan migrate --pretend
```

### Queue Worker Not Processing Jobs

1. Ensure the worker is running in a separate terminal
2. Check the `ics_automation_jobs` table for pending jobs
3. Check `storage/logs/laravel.log` for error messages
4. Try restarting the worker:

```bash
php artisan queue:restart
```

### Database Connection Refused

1. Verify MySQL is running:

```bash
# Windows
net start MySQL80

# Linux
sudo systemctl status mysql

# macOS
brew services list | grep mysql
```

2. Verify credentials in `.env`
3. Test the connection:

```bash
mysql -u root -p -h 127.0.0.1 cms
```

---

## Next Steps

| Document | What You'll Learn |
|----------|------------------|
| [Architecture](./architecture) | How the system components interact |
| [Configuration](./configuration) | All available environment variables |
| [Database](./database) | Complete database schema and relationships |
| [API Reference](./api-documentation) | All API endpoints with examples |
| [Automation Engine](./jobs-queues) | How the queue job system processes flows |
