# Universal Novu CDK App

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

This project provisions an AWS EC2 instance with a Dockerized Novu setup, a DocumentDB database, and an S3 bucket. It allows for quick deployment and setup in an AWS account.

## Prerequisites

Before you begin, make sure you have the following installed:
- AWS CLI
- Node.js
- AWS CDK

## Setup

1. Clone the repository and navigate into the project directory:

    ```sh
    git clone https://github.com/your-username/universal-novu-cdk-app.git
    cd universal-novu-cdk-app
    ```

2. Install the project dependencies:

    ```sh
    npm install
    ```

3. Configure your AWS credentials:

    ```sh
    aws configure
    ```

## Deployment

1. To deploy the stack to your AWS account, run the following command:

    ```sh
    cdk deploy
    ```

## Configuration

You can configure the deployment by setting the following environment variables:

- `INSTANCE_TYPE`: The EC2 instance type (e.g., `t3.micro`).
- `ALLOW_SSH`: Set to `true` to allow SSH access.
- `ALLOW_HTTP`: Set to `true` to allow HTTP access.
- `EXISTING_VPC_ID`: Set this if you want to use an existing VPC.

Set these variables before running the `cdk deploy` command, like so:

```sh
export INSTANCE_TYPE='t3.micro'
export ALLOW_SSH='true'
export ALLOW_HTTP='true'
export EXISTING_VPC_ID='vpc-xxxxxx' # Optional: Use an existing VPC ID

## Novu Version
The CDK script will deploy the latest Novu version by default. To deploy a specific version of Novu, set the `NOVU_VERSION` environment variable with the desired version tag.

```sh
export NOVU_VERSION='x.y.z' # Replace 'x.y.z' with the desired Novu version
```

## UserData Script
The EC2 instance will run a UserData script on startup to install Docker and run the Novu container. You can find this script in the `userdata.sh` file in the project directory.

## Customizing UserData Script
If you wish to customize the UserData script, edit the `userdata.sh` file and then redeploy the stack.

## Security
For production environments, it's important to manage sensitive information securely. Avoid hardcoding sensitive data in your UserData script. Use AWS Secrets Manager or environment variables to pass sensitive information to your EC2 instances securely.

## Cleanup
To avoid incurring future charges, remember to delete the resources when you are done:

```sh
cdk destroy
```

## Contributing
Contributions are welcome! Feel free to open a pull request or an issue if you have suggestions or find a bug.

## License
This project is open source and available under the MIT License.
