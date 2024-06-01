import aws_cdk as core
import aws_cdk.assertions as assertions

from app_ec2_python.app_ec2_python_stack import AppEc2PythonStack

# example tests. To run these tests, uncomment this file along with the example
# resource in app_ec2_python/app_ec2_python_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = AppEc2PythonStack(app, "app-ec2-python")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
