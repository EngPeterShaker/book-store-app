# 🔐 AWS Credentials Setup Guide

## Option 1: AWS Free Tier Account (Recommended)

### Step 1: Create AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Click "Create an AWS Account"
3. Follow the signup process (requires credit card, but won't charge for free tier)

### Step 2: Create IAM User
1. **Login to AWS Console**: https://console.aws.amazon.com/
2. **Go to IAM Service**: Search for "IAM" in the services
3. **Click "Users"** in the left sidebar
4. **Click "Add user"** or "Create user"
5. **User name**: Enter `serverless-user`
6. **Access type**: Select "Programmatic access"
7. **Permissions**: Click "Attach policies directly"
8. **Search and attach these policies**:
   - `AWSLambdaFullAccess`
   - `IAMFullAccess` 
   - `AmazonAPIGatewayAdministrator`
   - `CloudFormationFullAccess`
   - `AmazonS3FullAccess`
   - `CloudWatchLogsFullAccess`

### Step 3: Download Credentials
1. **Click "Create user"**
2. **Download the CSV file** with credentials
3. **Save the Access Key ID and Secret Access Key**

### Step 4: Configure AWS CLI
Run this command and enter your credentials:
```bash
aws configure
```

Enter:
- **AWS Access Key ID**: `[Your Access Key from CSV]`
- **AWS Secret Access Key**: `[Your Secret Key from CSV]`
- **Default region name**: `us-east-1`
- **Default output format**: `json`

---

## Option 2: AWS Temporary Credentials (For Testing)

If you want to test without creating an account, you can use AWS LocalStack (local AWS simulation).

### Install LocalStack
```bash
pip install localstack
pip install awscli-local

# Start LocalStack
localstack start
```

### Configure for LocalStack
```bash
# Set environment variables for local testing
export AWS_ENDPOINT_URL=http://localhost:4566
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
```

---

## Verify AWS Configuration

### Test AWS CLI
```bash
# Check configuration
aws configure list

# Test credentials
aws sts get-caller-identity

# List S3 buckets (should work without error)
aws s3 ls
```

### Test with Serverless Framework
```bash
cd backend

# Test serverless configuration
npx serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY

# Test deployment (dry run)
npx serverless deploy --noDeploy
```

---

## Environment Variables Method (Alternative)

Instead of `aws configure`, you can set environment variables:

```bash
# Add to your ~/.zshrc or ~/.bashrc
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"  
export AWS_DEFAULT_REGION="us-east-1"

# Reload shell
source ~/.zshrc
```

---

## Security Best Practices

### 1. Use IAM Roles for Production
For production deployments, create specific IAM roles with minimal permissions.

### 2. Enable MFA
Enable Multi-Factor Authentication on your AWS account.

### 3. Rotate Keys Regularly
Set up key rotation policies.

### 4. Use AWS Secrets Manager
For production applications, store database credentials in AWS Secrets Manager.

---

## Troubleshooting

### Common Issues

1. **"Could not load credentials"**
   ```bash
   # Check if credentials are configured
   aws configure list
   
   # Reconfigure if needed
   aws configure
   ```

2. **"Access Denied" Errors**
   - Make sure IAM user has the required permissions
   - Check if policies are attached correctly

3. **Region Mismatch**
   - Ensure your default region matches serverless.yml region
   - Update serverless.yml if needed:
   ```yaml
   provider:
     region: us-east-1  # Match your AWS CLI region
   ```

4. **Profile Issues**
   ```bash
   # Use specific profile
   aws configure --profile serverless
   
   # Set in serverless.yml
   provider:
     profile: serverless
   ```

---

## Next Steps After Configuration

1. **Test the setup**:
   ```bash
   cd backend
   npm run sls:deploy
   ```

2. **If successful**, you'll get an API Gateway URL like:
   ```
   https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/production
   ```

3. **Update frontend API URL** and deploy:
   ```bash
   cd frontend
   REACT_APP_API_URL="https://your-api-url" npm run build
   ```

---

## Cost Considerations

- **Lambda**: 1M free requests per month
- **API Gateway**: 1M API calls per month  
- **S3**: 5GB free storage
- **CloudWatch**: Basic monitoring included

The BookStore app should stay well within free tier limits for development and testing!

---

**Ready to deploy? Run: `./deploy.sh aws prod`** 🚀
