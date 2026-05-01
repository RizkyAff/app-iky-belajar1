# 🚀 DevOps Project – HAProxy + CI/CD + Monitoring (Air-Gapped Setup)

## 📌 Overview

Project ini merupakan implementasi arsitektur DevOps end-to-end yang mencakup:

* ⚖️ Load Balancer (HAProxy)
* 🔁 CI/CD Pipeline (Jenkins)
* 📦 Private Docker Registry
* 📊 Monitoring (Prometheus + Grafana)
* 🔐 Secure Access (OpenVPN)

Menggunakan pendekatan **air-gapped deployment**, dimana node aplikasi **tidak memiliki akses internet** dan seluruh deployment dilakukan secara terpusat.

---

## 🧱 Architecture

### 🖥️ VM HA (Control Plane - Public)

* HAProxy (Load Balancer)
* Jenkins (CI/CD)
* Private Docker Registry
* Grafana Dashboard
* OpenVPN Server

### 🖥️ VM1 (App Node 1)

* Node.js Application
* Nginx (Reverse Proxy)
* Node Exporter
* Prometheus (Monitoring Server)

### 🖥️ VM2 (App Node 2)

* Node.js Application
* Nginx (Reverse Proxy)
* Node Exporter

---

## 🔄 Request Flow

Client → HAProxy → VM1 / VM2 → Nginx → Node.js App

---

## 🔒 Network Design

* VM1 & VM2 **tidak memiliki akses internet**
* Deployment hanya melalui Jenkins (VM HA)
* Docker image diambil dari:

  ```
  10.0.2.13:5000
  ```
* Akses admin melalui OpenVPN

---

## ⚙️ CI/CD Pipeline

1. Developer push code ke GitHub
2. Jenkins melakukan checkout repository
3. Build Docker image dari folder `/app`
4. Tag image (`latest` & versioning)
5. Push ke Private Registry
6. Deploy ke VM1 & VM2 via `docker-compose`

---

## 📦 Deployment

### 🔹 VM1 (dengan monitoring)

```bash
docker-compose -f docker-compose.yml -f docker-compose.monitor.yml up -d --remove-orphans
```

### 🔹 VM2 (tanpa monitoring)

```bash
docker-compose up -d --remove-orphans
```

---

## 📊 Monitoring

### Prometheus

* Berjalan di **VM1**
* Mengumpulkan metrics dari:

  * VM1 (Node Exporter)
  * VM2 (Node Exporter)

### Grafana

* Berjalan di **VM HA**
* Digunakan untuk visualisasi metrics

---

## 📊 Grafana Dashboard

Dashboard tersedia di:

```
monitoring/grafana-dashboard.json
```

### Cara Import:

1. Buka Grafana: `http://<VM-HA-IP>:3000`
2. Klik **+ → Import**
3. Upload file dashboard
4. Pilih datasource Prometheus
5. Klik **Import**

---

## 📁 Project Structure

```
app-iky-belajar1/
├── app/
├── docker/
├── jenkins/
├── monitoring/
├── proxy/
└── README.md
```

---

## 🔑 Key Concepts

* ♻️ **Immutable Infrastructure**
  Tidak ada perubahan manual di server

* 🌐 **Air-Gapped Deployment**
  VM1 & VM2 tanpa akses internet

* 🎯 **Centralized CI/CD**
  Semua deployment melalui Jenkins

* 📦 **Private Registry**
  Image hanya diambil dari internal registry

* 🧩 **Role Separation**

  * VM HA → Control Plane
  * VM1 & VM2 → Application Nodes

---

## 🧠 Notes

* Semua perubahan aplikasi dilakukan melalui GitHub
* Tidak ada edit langsung di VM
* Deployment sepenuhnya otomatis melalui pipeline

---

## 🚀 Future Improvements

* Zero-downtime deployment (rolling / blue-green)
* Auto rollback jika deployment gagal
* Alerting (Grafana / Prometheus)
* HTTPS (SSL termination via HAProxy)

---
