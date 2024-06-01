import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_iam as iam } from 'aws-cdk-lib';
import { aws_ec2 as ec2 } from 'aws-cdk-lib';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Creating a new VPC (Virtual Private Cloud)
    const vpc = new ec2.Vpc(this, 'VPC')

    // Importing an IAM Role from its Amazon Resource Name (ARN)
    const myRole = iam.Role.fromRoleArn(this, 'Role', 'arn:aws:iam::{{ACCOUNT_ID}}:role/{{USER_NAME}}', {
      mutable: false,
    });

    const instance = new ec2.Instance(
      this,
      "myEc2App",
      {
          instanceType: ec2.InstanceType.of(
              ec2.InstanceClass.T2,
              ec2.InstanceSize.MEDIUM
          ),
//***** We are using Windows AMI, we can login via RDP if SG has 3389 port enabled *****
          machineImage: ec2.MachineImage.latestWindows(
              ec2.WindowsVersion.WINDOWS_SERVER_2022_ENGLISH_FULL_BASE
          ),
          keyName: 'ec2Win2022',  //utilizing existing one [created one via console]
          role: myRole,
          vpc: vpc
      }
  );

  }
}
