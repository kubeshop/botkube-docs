---
id: get started
title: Get Started
sidebar_position: 2
---

# Get Started with Botkube in Minutes

This guide provides a comprehensive walkthrough for setting up Botkube to send notifications and execute commands in your Kubernetes clusters directly from Slack and Microsoft Teams.

## Step 1. Sign up for Botkube

[Create an account](https://app.botkube.io/) at [botkube.io](http://botkube.io).

## Step 2. Connect Your Kubernetes Cluster

1. **Create a New Instance:** Start by selecting "create a new instance" on the Botkube Cloud Dashboard.
   
   ![Create a New Instance](https://prod-files-secure.s3.us-west-2.amazonaws.com/6d17395d-184a-4108-baf0-ac74e6b1f3f6/753d31d8-d351-4b31-bfb7-0cdcb661d36e/Untitled.png)
   
2. Install Botkube Agent on your Kubernetes cluster by following the instructions on the page.
   
   ![Install Botkube Agent](https://prod-files-secure.s3.us-west-2.amazonaws.com/6d17395d-184a-4108-baf0-ac74e6b1f3f6/f40a1829-089a-412c-8442-a76784e33a04/Untitled.png)

## Step 3. Connect to your Preferred Communication platform

(Add instructions here)

## Step 4. Start Receiving Alerts

(Add instructions here)

## Setting Up a Botkube Cloud Instance

### Dashboard Setup

1. **Install Botkube CLI:** Use Homebrew or curl to install the Botkube CLI on your terminal.
   - **Step 1:** Install the CLI tool.
   - **Step 2:** Execute the Botkube installation command provided on the dashboard.
2. **Connect Your Cluster:** Follow the instructions to connect your Kubernetes cluster to the Botkube Cloud, then click "Next."
3. **Instance Configuration:** Name your instance and select the integration option for Teams.

### Download Botkube App for Microsoft Teams

1. **Download:** Click the "Download" button to obtain the Botkube App, which will be downloaded as `Botkube.zip`.

## Installing Botkube to Microsoft Teams

1. **Manage Apps in Teams:** Open the Microsoft Teams application and go to "Manage your Apps" at the bottom of the screen.
2. **Upload Botkube App:**
   - Choose "Upload an app" and then "Upload an app to your org’s app catalog."
   - Upload the `Botkube.zip` file you downloaded earlier.
3. **Access Botkube App:**
   - Go to the "Apps" section, then "Built for your Org." You'll find the Botkube application there.
   - Click the "Add" button, then "Add to team."
4. **Select Team or Channel:** Choose the team or channel where you want to add Botkube.
5. **Welcome Message:** A welcome message should appear in the chat window. Click "Grant Access."
6. **Grant Access:** In the new window that pops up, click "Accept" to grant Botkube access.
7. **Connect to Botkube Cloud:** In the chat window, select "Connect to Botkube Cloud." This redirects you to the Botkube Cloud dashboard where your Teams channel will be listed. Click "Connect."

### Finalizing Your Botkube Cloud Instance

1. **Select Channels:** From the dashboard, choose the Teams channels you wish to use with Botkube.
2. **Configure Plugins:** Connect your preferred plugins to enhance Botkube's functionality.
3. **Set Preferences:** Review and select your preferred Botkube defaults.
4. **Apply Changes:** Finalize your setup by selecting "Apply changes."
```