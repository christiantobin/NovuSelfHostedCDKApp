import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {
  Instance,
  InstanceType,
  MachineImage,
  Vpc,
  SecurityGroup,
  Peer,
  Port,
  IVpc,
} from 'aws-cdk-lib/aws-ec2';
import * as fs from 'fs';

export class NovuEc2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Environment variables for configuration
    const instanceType = process.env.INSTANCE_TYPE || 't3.micro';
    const allowSSH = process.env.ALLOW_SSH === 'true';
    const allowHTTP = process.env.ALLOW_HTTP === 'true';
    const existingVpcId = process.env.EXISTING_VPC_ID;

    // Optionally use an existing VPC or create a new one
    let vpc: IVpc;
    if (existingVpcId) {
      vpc = Vpc.fromLookup(this, 'Vpc', {vpcId: existingVpcId});
    } else {
      vpc = new Vpc(this, 'NovuVPC', {maxAzs: 2});
    }

    // Security Group for EC2 with conditional ingress rules
    const securityGroup = new SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Security group for Novu instance',
      allowAllOutbound: true,
    });

    if (allowSSH) {
      securityGroup.addIngressRule(
        Peer.anyIpv4(),
        Port.tcp(22),
        'Allow SSH access from the world'
      );
    }

    if (allowHTTP) {
      securityGroup.addIngressRule(
        Peer.anyIpv4(),
        Port.tcp(80),
        'Allow HTTP access from the world'
      );
    }

    // EC2 instance details
    const instance = new Instance(this, 'NovuInstance', {
      vpc,
      instanceType: new InstanceType(instanceType),
      machineImage: MachineImage.latestAmazonLinux2023(),
      securityGroup: securityGroup,
    });

    // Read UserData script from file
    const userDataScript = fs.readFileSync('assets/userdata.sh', 'utf8');

    // Add UserData to the EC2 instance
    instance.addUserData(userDataScript);
  }
}
