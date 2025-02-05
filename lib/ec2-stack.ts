import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// props interface
interface Ec2StackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class EC2Stack extends cdk.Stack {



  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);



    // EC2 Instance with logical ID MyPrivateEC2
    const instance = new ec2.Instance(this, 'MyPrivateEC2', {
      // specifies which vpc to launch instance in - passed in from props
      vpc: props.vpc,
      // specifies which type of subnet to use
      vpcSubnets: {
        // isolated subnets are used for private resources
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      // specifies which AMI to use
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      // specifies which instance type, micro is the smallest
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO)

    })
    // adds a Name tag to the instance
    cdk.Tags.of(instance).add('Name', 'MyPrivateEC2');
  }
}
