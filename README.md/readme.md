# AI-Assisted Threat Cyber Intelligence Dashboard

## Project Overview

The AI-Assisted Threat Intelligence Dashboard is a web-based cybersecurity application that analyzes IP addresses for potential threats using real-time threat intelligence data from AbuseIPDB and AI-generated risk assessments using Groq AI.

The system allows users to check the reputation of an IP address, classify its threat level, store results in a PostgreSQL database, and view historical threat records through an interactive dashboard.

---

## Objectives

* Analyze IP addresses for malicious activity.
* Retrieve real-time threat intelligence data.
* Generate AI-powered threat assessments.
* Store threat records for future reference.
* Provide a user-friendly dashboard for monitoring threats.

---

## Technologies Used

### Frontend

* React.js
* Axios
* HTML5
* CSS3

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### APIs & AI

* AbuseIPDB API
* Groq API (Llama 3.3 70B Versatile)

---

## System Architecture

User Input (IP Address)

↓

React Frontend

↓

Express Backend API

↓

AbuseIPDB API

↓

Threat Classification Engine

↓

Groq AI Risk Assessment

↓

PostgreSQL Database

↓

Dashboard Visualization

---

## Features

### IP Threat Lookup

* Checks an IP address against AbuseIPDB.
* Retrieves abuse score, country, and ISP details.

### Threat Classification

Threats are classified based on Abuse Confidence Score:

| Abuse Score | Classification |
| ----------- | -------------- |
| 0 - 40      | Low            |
| 41 - 80     | Medium         |
| 81 - 100    | High           |

### AI Risk Summary

* Generates a cybersecurity assessment using Groq AI.
* Provides threat analysis and recommendations.

### Threat History

* Stores all analyzed IP addresses.
* Displays historical records in a table.

### Search Functionality

* Search threats by IP address, ISP, country, or classification.

### Threat Statistics Dashboard

* Total Threats
* Low Risk Threats
* Medium Risk Threats
* High Risk Threats

### Delete Records

* Remove unwanted threat records from the database.

---

## Database Design

### Threats Table

| Column         | Data Type          |
| -------------- | ------------------ |
| id             | SERIAL PRIMARY KEY |
| ip_address     | VARCHAR(50)        |
| abuse_score    | INTEGER            |
| country        | VARCHAR(20)        |
| isp            | TEXT               |
| classification | VARCHAR(20)        |
| checked_at     | TIMESTAMP          |

---

## Installation Steps

### Clone Repository

```bash
git clone <repository-url>
cd AI-Assisted-Threat-Intelligence-Dashboard
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

### PostgreSQL Setup

Create a database named:

```sql
CREATE DATABASE threatintel;
```

Create threats table:

```sql
CREATE TABLE threats (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(50),
    abuse_score INTEGER,
    country VARCHAR(20),
    isp TEXT,
    classification VARCHAR(20),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=threatintel

ABUSEIPDB_API_KEY=your_abuseipdb_key

GROQ_API_KEY=your_groq_key
```

---

## API Endpoints

### Check Threat

```http
GET /api/threat-check/:ip
```

### Get All Threats

```http
GET /api/threats
```

### Delete Threat

```http
DELETE /api/threats/:id
```

---

## Sample Output

Threat Result:

* IP Address: 8.8.8.8
* Abuse Score: 0
* Country: US
* ISP: Google LLC
* Classification: Low

AI Summary:

"Risk Assessment: Low. The IP address belongs to a reputable organization and currently shows no significant indicators of malicious activity. Continued monitoring is recommended."

---

## Future Enhancements

* Threat trend visualization charts
* PDF report generation
* User authentication system
* Threat alerts and notifications
* Multiple threat intelligence sources
* Advanced analytics dashboard

---

## Conclusion

The AI-Assisted Threat Intelligence Dashboard successfully combines threat intelligence APIs, artificial intelligence, database management, and modern web technologies to provide an efficient platform for identifying and monitoring potentially malicious IP addresses. The project demonstrates practical implementation of cybersecurity concepts, REST APIs, database integration, and AI-assisted analysis.

---

## Screenshots

### Dashboard Overview
![Dashboard](https://raw.githubusercontent.com/Aaditya0901/ai-assisted-threat-cyber-intelligence-dashboard/master/screenshots/dashboard.png)

### Threat Analysis

![Threat Analysis](https://raw.githubusercontent.com/Aaditya0901/ai-assisted-threat-cyber-intelligence-dashboard/master/screenshots/threat-analysis.png)

### AI Generated Risk Summary

![AI Summary](https://raw.githubusercontent.com/Aaditya0901/ai-assisted-threat-cyber-intelligence-dashboard/master/screenshots/ai-summary.png)




