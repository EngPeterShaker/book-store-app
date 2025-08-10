# 🔐 IAM User Setup - Visual Walkthrough

## Step 3: Create IAM User (Follow these exact steps)

### 3.1 Navigate to IAM Service
1. In the AWS Console, click the **search bar** at the top
2. Type **"IAM"** and click on **"IAM"** service
3. You should see the IAM dashboard

### 3.2 Create New User
1. In the left sidebar, click **"Users"**
2. Click the **"Create user"** button (orange button)
3. Enter user details:
   - **User name**: `serverless-deploy-user`
   - **Select**: ☑️ **"Provide user access to the AWS Management Console"** (optional)
   - **Select**: ☑️ **"I want to create an IAM user"**

### 3.3 Set Permissions (CRITICAL STEP)
1. Click **"Next"** to go to permissions
2. Select **"Attach policies directly"**
3. In the search box, search for and check these policies:

   **Essential Policies (check all these boxes):**
   - ☑️ `AWSLambdaFullAccess`
   - ☑️ `AmazonAPIGatewayAdministrator` 
   - ☑️ `CloudFormationFullAccess`
   - ☑️ `AmazonS3FullAccess`
   - ☑️ `CloudWatchLogsFullAccess`
   - ☑️ `IAMFullAccess`

   **To find each policy:**
   - Type the policy name in the search box
   - Check the box next to it
   - Clear search and repeat for next policy

### 3.4 Review and Create
1. Click **"Next"** to review
2. Verify all 6 policies are attached
3. Click **"Create user"**

### 3.5 Create Access Keys
1. After user is created, click on the **username** (serverless-deploy-user)
2. Go to **"Security credentials"** tab
3. Scroll down to **"Access keys"** section
4. Click **"Create access key"**
5. Select **"Command Line Interface (CLI)"**
6. Check **"I understand..."** checkbox
7. Click **"Next"**
8. Add description: `Serverless Framework Deployment`
9. Click **"Create access key"**

### 3.6 Download Credentials (IMPORTANT!)
1. **Copy the Access Key ID** and save it
2. **Copy the Secret Access Key** and save it
3. **Click "Download .csv file"** for backup
4. **DO NOT close this window** until you've saved both keys
5. Click **"Done"**

---

## ⚠️ Security Notes
- Never share these credentials
- Store them securely
- The Secret Access Key is only shown once!

---

## Next: Configure AWS CLI

After you have the credentials, we'll configure the AWS CLI with:
```bash
aws configure
```

You'll enter:
- Access Key ID: [from step 3.6]
- Secret Access Key: [from step 3.6] 
- Region: us-east-1
- Output format: json
