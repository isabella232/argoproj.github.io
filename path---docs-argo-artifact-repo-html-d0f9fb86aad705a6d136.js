webpackJsonp([0x647ea1779a71],{520:function(e,t){e.exports={pathContext:{docHtml:'<h1>Configuring Your Artifact Repository</h1>\n<p>To run Argo workflows that use artifacts, you must configure and use an artifact repository.\nArgo supports any S3 compatible artifact repository such as AWS, GCS and Minio.\nThis section shows how to configure the artifact repository. Subsequent sections will show how to use it.</p>\n<h2>Configuring Minio</h2>\n<pre><code>$ brew install kubernetes-helm # mac\n$ helm init\n$ helm install stable/minio --name argo-artifacts --set service.type=LoadBalancer\n</code></pre>\n<p>Login to the Minio UI using a web browser (port 9000) after obtaining the external IP using <code>kubectl</code>.</p>\n<pre><code>$ kubectl get service argo-artifacts-minio\n</code></pre>\n<p>On Minikube:</p>\n<pre><code>$ minikube service --url argo-artifacts-minio\n</code></pre>\n<p>NOTE: When minio is installed via Helm, it uses the following hard-wired default credentials,\nwhich you will use to login to the UI:</p>\n<ul>\n<li>AccessKey: AKIAIOSFODNN7EXAMPLE</li>\n<li>SecretKey: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY</li>\n</ul>\n<p>Create a bucket named <code>my-bucket</code> from the Minio UI.</p>\n<h2>Configuring AWS S3</h2>\n<p>Create your bucket and access keys for the bucket. AWS access keys have the same permissions as the user they are associated with. In particular, you cannot create access keys with reduced scope. If you want to limit the permissions for an access key, you will need to create a user with just the permissions you want to associate with the access key. Otherwise, you can just create an access key using your existing user account.</p>\n<pre><code>$ export mybucket=bucket249\n$ cat > policy.json &#x3C;&#x3C;EOF\n{\n   "Version":"2012-10-17",\n   "Statement":[\n      {\n         "Effect":"Allow",\n         "Action":[\n            "s3:PutObject",\n            "s3:GetObject"\n         ],\n         "Resource":"arn:aws:s3:::$mybucket/*"\n      }\n   ]\n}\nEOF\n$ aws s3 mb s3://$mybucket [--region xxx]\n$ aws iam create-user --user-name $mybucket-user\n$ aws iam put-user-policy --user-name $mybucket-user --policy-name $mybucket-policy --policy-document file://policy.json\n$ aws iam create-access-key --user-name $mybucket-user > access-key.json\n</code></pre>\n<p>NOTE: if you want argo to figure out which region your buckets belong in, you must additionally set the following statement policy. Otherwise, you must specify a bucket region in your workflow configuration.</p>\n<pre><code>    ...\n      {\n         "Effect":"Allow",\n         "Action":[\n            "s3:GetBucketLocation"\n         ],\n         "Resource":"arn:aws:s3:::*"\n      }\n    ...\n</code></pre>\n<h2>Configuring GCS (Google Cloud Storage)</h2>\n<p>Create a bucket from the GCP Console (<a href="https://console.cloud.google.com/storage/browser">https://console.cloud.google.com/storage/browser</a>).</p>\n<p>Enable S3 compatible access and create an access key.\nNote that S3 compatible access is on a per project rather than per bucket basis.</p>\n<ul>\n<li>Navigate to Storage > Settings (<a href="https://console.cloud.google.com/storage/settings">https://console.cloud.google.com/storage/settings</a>).</li>\n<li>Enable interoperability access if needed.</li>\n<li>Create a new key if needed.</li>\n</ul>\n<h1>Configure the Default Artifact Repository</h1>\n<p>In order for Argo to use your artifact repository, you must configure it as the default repository.\nEdit the workflow-controller config map with the correct endpoint and access/secret keys for your repository.</p>\n<p>Use the <code>endpoint</code> corresponding to your S3 provider:</p>\n<ul>\n<li>AWS: s3.amazonaws.com</li>\n<li>GCS: storage.googleapis.com</li>\n<li>Minio: my-minio-endpoint.default:9000</li>\n</ul>\n<p>The <code>key</code> is name of the object in the <code>bucket</code> The <code>accessKeySecret</code> and <code>secretKeySecret</code> are secret selectors that reference the specified kubernetes secret.  The secret is expected to have have the keys \'accessKey\' and \'secretKey\', containing the base64 encoded credentials to the bucket.</p>\n<p>For AWS, the <code>accessKeySecret</code> and <code>secretKeySecret</code> correspond to AWS<em>ACCESS</em>KEY<em>ID and AWS</em>SECRET<em>ACCESS</em>KEY respectively.</p>\n<p>EC2 provides a metadata API via which applications using the AWS SDK may assume IAM roles associated with the instance. If you are running argo on EC2 and the instance role allows access to your S3 bucket, you can configure the workflow step pods to assume the role. To do so, simply omit the <code>accessKeySecret</code> and <code>secretKeySecret</code> fields.</p>\n<p>For GCS, the <code>accessKeySecret</code> and <code>secretKeySecret</code> for S3 compatible access can be obtained from the GCP Console. Note that S3 compatible access is on a per project rather than per bucket basis.</p>\n<ul>\n<li>Navigate to Storage > Settings (<a href="https://console.cloud.google.com/storage/settings">https://console.cloud.google.com/storage/settings</a>).</li>\n<li>Enable interoperability access if needed.</li>\n<li>Create a new key if needed.</li>\n</ul>\n<p>For Minio, the <code>accessKeySecret</code> and <code>secretKeySecret</code> naturally correspond the AccessKey and SecretKey.</p>\n<p>Example:</p>\n<pre><code>$ kubectl edit configmap workflow-controller-configmap -n argo      # assumes argo was installed in the argo namespace\n...\ndata:\n  config: |\n    artifactRepository:\n      s3:\n        bucket: my-bucket\n        keyPrefix: prefix/in/bucket     #optional\n        endpoint: my-minio-endpoint.default:9000        #AWS => s3.amazonaws.com; GCS => storage.googleapis.com\n        insecure: true                  #omit for S3/GCS. Needed when minio runs without TLS\n        accessKeySecret:                #omit if accessing via AWS IAM\n          name: my-minio-cred\n          key: accesskey\n        secretKeySecret:                #omit if accessing via AWS IAM\n          name: my-minio-cred\n          key: secretkey\n</code></pre>\n<p>The secrets are retrieve from the namespace you use to run your workflows. Note that you can specify a <code>keyPrefix</code>.</p>\n<h1>Accessing Non-Default Artifact Repositories</h1>\n<p>This section shows how to access artifacts from non-default artifact repositories.</p>\n<p>The <code>endpoint</code>, <code>accessKeySecret</code> and <code>secretKeySecret</code> are the same as for configuring the default artifact repository described previously.</p>\n<pre><code>  templates:\n  - name: artifact-example\n    inputs:\n      artifacts:\n      - name: my-input-artifact\n        path: /my-input-artifact\n        s3:\n          endpoint: s3.amazonaws.com\n          bucket: my-aws-bucket-name\n          key: path/in/bucket/my-input-artifact.tgz\n          accessKeySecret:\n            name: my-aws-s3-credentials\n            key: accessKey\n          secretKeySecret:\n            name: my-aws-s3-credentials\n            key: secretKey\n    outputs:\n      artifacts:\n      - name: my-output-artifact\n        path: /my-ouput-artifact\n        s3:\n          endpoint: storage.googleapis.com\n          bucket: my-aws-bucket-name\n          # NOTE that all output artifacts are automatically tarred and\n          # gzipped before saving. So as a best practice, .tgz or .tar.gz\n          # should be incorporated into the key name so the resulting file\n          # has an accurate file extension.\n          key: path/in/bucket/my-output-artifact.tgz\n          accessKeySecret:\n            name: my-gcs-s3-credentials\n            key: accessKey\n          secretKeySecret:\n            name: my-gcs-s3-credentials\n            key: secretKey\n    container:\n      image: debian:latest\n      command: [sh, -c]\n      args: ["cp -r /my-input-artifact /my-output-artifact"]\n</code></pre>',docPath:"argo/artifact_repo",proj:"argo"}}}});
//# sourceMappingURL=path---docs-argo-artifact-repo-html-d0f9fb86aad705a6d136.js.map