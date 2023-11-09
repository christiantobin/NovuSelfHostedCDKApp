#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {NovuEc2Stack} from './Stacks/NovuEc2Stack';

const app = new cdk.App();
new NovuEc2Stack(app, 'Novu', {
  env: {
    region: process.env.AWS_REGION,
  },
  description: 'Ec2 Instance for Novu Push Notification System',
});
