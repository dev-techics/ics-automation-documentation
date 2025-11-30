---
sidebar_position: 2
---

# Installation & Setup

This guide explains how to set up the ICS Automation project on your local machine.

---

### 1. Install XAMPP

Download and install [**XAMPP (PHP 8.2)**](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe) for Windows . Ensure that both **Apache** and **MySQL** services are running.

---

### 2. Clone the Repository

Clone the project using Git:

```bash
git clone git@github.com:dev-techics/ics-automation.git
cd <Project Directory>
```

### 3. Database Setup

Connect API to the database. Make sure it should be Legal CMS database.
Inside the project folder Locate `.env.example` Duplicate it Rename the duplicate to `.env`

```javascript
# Make sure the database cms exists in MySQL.
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=cms
DB_USERNAME=root
DB_PASSWORD=
```

### Postman Setup (Optional)

Install Postman

Download: https://www.postman.com/downloads/

### You're Ready to Develop

After completing all steps, your backend environment is fully ready for development and API testing.
