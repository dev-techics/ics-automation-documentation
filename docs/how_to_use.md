---

sidebar_position: 2
---

# How to Use
This lesson covers the basics of ICS Automation. You will learn how to create and run your first automation starting from scratch.

## Step 1 : Create Template
Plan your flow and create your email or SMS templates before creating an automation. This avoids the hassle of switching back to the template page multiple times later.  [Create Template.](https://automation.icslegal.com/dashboard/template-list)

![Create Template Screenshot](/img/how-to-use-1.png)

## Step 2 : Create Lists & Segments
Once your email and SMS templates are ready, the next step is to create a contact list. This is necessary for setting up your flow. Currently, we have only one trigger option, which is “Insert Data Into List”. So you must create a contact list first before building your flow.   [Create List.](https://automation.icslegal.com/dashboard/lists)

:::warning
Do not insert a contact before this list is connected with the flow.
:::

![Create List Screenshot](/img/how-to-use-2.png)

## Step 3 : Create Flow
Now you are ready to create a flow. A Flow represents your overall marketing strategy, allowing you to map out exactly how and when you will engage with your customers.  [Create Flow.](https://automation.icslegal.com/dashboard/flows)

![Create Flow Screenshot](/img/how-to-use-3.png)

Inside the flow you have 5 types of nodes:
1. **Trigger Node** – Defines how and when the automation will start.
2. **Email Node** – Configure and send your email templates with custom details.
3. **SMS Node** – Send SMS messages directly to your customers.
4. **Delay Node** – Add delays to control the timing between each step in the automation.
5. **Condition Node** – Set conditions based on user engagement to create dynamic and personalized journeys.

:::warning
Set up your **Trigger Node** first. The Trigger Node determines **how and when** this flow will run.
:::

![Trigger Node Setup](/img/how-to-use-4.png)

### Trigger Node
The Trigger Node is the most essential part of the flow, as it is key to starting the process. Currently, there is only one trigger option available: adding data to a list. When a contact is inserted into the list, the flow will run for that contact.

Click **Add to List** (marked by the second arrow) to view your contact lists. Select a list and click **Save**.

![Trigger Node Setup](/img/how-to-use-5.png)

### Email Node
Email Node contains some email-related information like Email Name, Subject Line, Preview Text (not implemented), Template, etc. Don't forget to save after changes.

![Trigger Node Setup](/img/how-to-use-6.png)

### SMS Node
The SMS Node is a standard node that contains all SMS-related information. You can create an SMS template and select it here. During template creation, the system will also show how many credits are required to send the SMS.

![Trigger Node Setup](/img/how-to-use-7.png)

### Delay Node
The Delay Node is used to pause the execution of the flow for a specific amount of time. It’s typically used when you want to wait for a customer’s response—such as checking whether they opened an email or performed another action—before moving on to the next step, like adding a Condition Node.

![Trigger Node Setup](/img/how-to-use-8.png)

### Condition Node
The Condition Node is used to check specific conditions—such as whether a user opened an email, clicked a link, or performed another action. Based on the result, the flow automatically branches and sends personalized emails or follows different paths. This is a powerful feature for creating modern, dynamic automation.

![Trigger Node Setup](/img/how-to-use-9.png)

:::warning
For now, nodes must be connected manually by clicking the handlers.  
In the future, we will improve this by adding drag-and-drop auto-connection similar to Klaviyo.
:::

## Step 4: Save Flow
After creating your flow, save it by clicking the **Save** button located in the top-right corner.

## Run Automation
Now when we insert our client into the list, this flow will run for that customer. There are two ways to insert into the list:

1. Bulk Insert  
2. Insert From CRM

### Bulk Insert
You can bulk-insert your clients directly from the List Management page.  
[List Management.](https://automation.icslegal.com/dashboard/lists)

![Trigger Node Setup](/img/how-to-use-10.png)  
![Trigger Node Setup](/img/how-to-use-11.png)

### Insert From CRM
You can insert clients directly into a specific list from the CRM. Once a client is inserted, the flow will automatically run for that client.

![Trigger Node Setup](/img/how-to-use-12.png)
