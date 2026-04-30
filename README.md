🚀 DevOps Project – HAProxy + CI/CD + Monitoring (Air-Gapped Setup)
📌 Overview

Project ini adalah implementasi arsitektur DevOps end-to-end dengan:

Load Balancer (HAProxy)
CI/CD Pipeline (Jenkins)
Private Docker Registry
Monitoring (Prometheus + Grafana)
Secure Access (OpenVPN)

Arsitektur ini menggunakan pendekatan air-gapped deployment, dimana node aplikasi tidak memiliki akses internet.

🧱 Architecture
🖥️ VM HA (Public)
HAProxy (Load Balancer)
Jenkins (CI/CD)
Private Docker Registry
Grafana Dashboard
OpenVPN Server
🖥️ VM1 (App Node 1)
Node.js Application
Nginx (Reverse Proxy)
Node Exporter
Prometheus (Monitoring Server)
🖥️ VM2 (App Node 2)
Node.js Application
Nginx (Reverse Proxy)
Node Exporter
🔒 Network Design
VM1 & VM2 tidak memiliki akses internet
Semua deployment dilakukan melalui Jenkins (VM HA)
Image diambil dari Private Registry (10.0.2.13:5000)
Akses admin melalui OpenVPN
⚙️ CI/CD Pipeline
Developer push code ke GitHub
Jenkins melakukan checkout repository
Build Docker image dari folder /app
Tag image dengan version & latest
Push image ke local registry
Sync configuration ke VM1 & VM2 (scp)
Deploy menggunakan docker-compose
📦 Deployment
🔹 VM1 (dengan monitoring)
docker-compose -f docker-compose.yml -f docker-compose.monitor.yml up -d --remove-orphans
🔹 VM2 (tanpa monitoring)
docker-compose up -d --remove-orphans
📊 Monitoring
Prometheus
Berjalan di VM1
Mengumpulkan metrics dari:
Node Exporter VM1
Node Exporter VM2
Grafana
Berjalan di VM HA
Digunakan untuk visualisasi metrics
📊 Grafana Dashboard

Dashboard disimpan di repository:

monitoring/grafana-dashboard.json
Cara Import:
Buka Grafana: http://<VM-HA-IP>:3000
Klik + → Import
Upload file grafana-dashboard.json
Pilih datasource Prometheus
Klik Import
📁 Project Structure
app-iky-belajar1/
├── app/
│   ├── Dockerfile
│   ├── app.js
│   └── package.json
│
├── nginx/
│   └── nginx.conf
│
├── monitoring/
│   ├── prometheus.yml
│   └── grafana-dashboard.json
│
├── docker-compose.yml
├── docker-compose.monitor.yml
├── Jenkinsfile
├── .gitignore
└── README.md
🔑 Key Concepts
Immutable Infrastructure
Tidak ada perubahan manual di server
Air-Gapped Deployment
VM1 & VM2 tanpa akses internet
Centralized CI/CD
Semua deployment dikontrol Jenkins
Private Registry
Image hanya diambil dari internal registry
Role Separation
VM HA → Control plane
VM1/VM2 → Application nodes
🧠 Notes
Semua perubahan aplikasi dilakukan melalui GitHub
Tidak ada edit langsung di VM
Deployment sepenuhnya otomatis melalui pipeline
🚀 Future Improvements
Zero downtime deployment (rolling / blue-green)
Auto rollback jika deployment gagal
Alerting (Grafana / Prometheus)
SSL (HTTPS) via HAProxy
