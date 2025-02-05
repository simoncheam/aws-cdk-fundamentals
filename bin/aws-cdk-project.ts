#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkProjectStack } from '../lib/aws-cdk-project-stack';
import { EC2Stack } from '../lib/ec2-stack';

const app = new cdk.App();
const vpcStack = new AwsCdkProjectStack(app, 'AwsCdkProjectStack', {

});

// create ec2 stack
new EC2Stack(app, 'MyEC2Stack', {
  vpc: vpcStack.vpc
});

app.synth();