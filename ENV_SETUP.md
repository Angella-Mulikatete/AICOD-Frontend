# Environment Setup

## Create `.env.local` File

Create a file named `.env.local` in the root directory of the project with the following content:

```env
# AICOD API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## For Production Deployment

When deploying to production, update the values:

```env
# Production Configuration
NEXT_PUBLIC_API_URL=https://api.aicod.org/api/v1
NEXT_PUBLIC_SITE_URL=https://aicod.org
```

## Quick Setup Command

Run this command to create the `.env.local` file:

### Windows (PowerShell)
```powershell
@"
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
"@ | Out-File -FilePath .env.local -Encoding utf8
```

### Mac/Linux (Bash)
```bash
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
```

## Verify Setup

After creating `.env.local`, restart your development server for changes to take effect:

```bash
npm run dev
```

The API service will now use these environment variables to connect to your backend.
