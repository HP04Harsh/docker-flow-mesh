# Docker Flow

A production-ready multi-service web application containerized with Docker and Docker Compose. Features secure runtime configurations, optimized image layers, and Nginx reverse proxy.

**Author:** Harsh Pardhi  
**Version:** v1.1.0

## Architecture

This project consists of three main services:

- **Backend:** Node.js/Express API server
- **Worker:** Python/Flask microservice for data processing
- **Nginx:** Reverse proxy with load balancing and security features

## Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd docker-flow
```

2. Build and start all services:
```bash
docker-compose up -d
```

3. Verify services are running:
```bash
docker-compose ps
```

4. Test the application:
```bash
curl http://localhost
curl http://localhost/health
curl http://localhost/api/data
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service information |
| `/health` | GET | Health check |
| `/api/data` | GET | Fetch data from worker |
| `/api/process` | POST | Process data through worker |
| `/worker/` | GET | Worker service info |

## Project Structure

```
docker-flow/
├── backend/          # Node.js service
│   ├── app.js        # Express server
│   ├── Dockerfile    # Multi-stage build
│   └── package.json  # Dependencies
├── worker/           # Python service
│   ├── app.py        # Flask application
│   ├── Dockerfile    # Multi-stage build
│   └── requirements.txt
├── nginx/            # Reverse proxy
│   ├── nginx.conf    # Nginx configuration
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Management Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild services
```bash
docker-compose build --no-cache
docker-compose up -d
```

### Scale services
```bash
docker-compose up -d --scale worker=3
```

## Security Features

- Multi-stage builds for minimal image sizes
- Non-root user execution in all containers
- Read-only filesystems where possible
- Security headers via Nginx
- Rate limiting on API endpoints
- Health checks for all services

## Development

### Backend development
```bash
cd backend
npm install
npm run dev
```

### Worker development
```bash
cd worker
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Troubleshooting

### Check service health
```bash
curl http://localhost/health
```

### View container logs
```bash
docker-compose logs backend
docker-compose logs worker
docker-compose logs nginx
```

### Restart specific service
```bash
docker-compose restart backend
```

### Clean up everything
```bash
docker-compose down -v
docker system prune -a
```

## License

MIT License - feel free to use this project for learning and production.
