webpackJsonp([0x9084117b3958],{536:function(e,t){e.exports={pathContext:{docHtml:'<h1>Artifact Guide</h1>\n<p>This is a guide for help in utilizing artifacts within Argo Events. Sensors use artifacts for two purposes:</p>\n<ol>\n<li>Object notifications for use in <code>Artifact</code> signals. (currently S3 bucket notifications are only supported)</li>\n<li>A Resource Object store for use in <code>Resource</code> triggers</li>\n</ol>\n<h2>Inline</h2>\n<p>Inlined artifacts are included directly within the sensor resource and decoded as a string.</p>\n<h2>S3</h2>\n<p>Amazon Simple Storage Service (S3) is a block/file/object store for the internet. The standardized <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html">API</a> allows storage and retrieval of data at any time from anywhere on the web. There are a number of S3 providers that include, but are not limited to:</p>\n<ul>\n<li><a href="https://aws.amazon.com/s3/?nc2=h_m1">Amazon S3</a></li>\n<li><a href="https://minio.io/">Minio</a></li>\n<li><a href="https://www.netapp.com/us/products/data-management-software/object-storage-grid-sds.aspx">NetApp</a></li>\n<li><a href="http://docs.ceph.com/docs/master/radosgw/s3/">CEPH</a></li>\n<li><a href="https://rook.io/">Rook</a></li>\n</ul>\n<h3>Minio</h3>\n<p>Argo Events uses the <a href="https://github.com/minio/minio-go">minio-go</a> client for access to any Amazon S3 compatible object store. <a href="https://www.minio.io/">Minio</a> is an distributed object storage server. Follow the Minio <a href="https://docs.minio.io/docs/minio-bucket-notification-guide">Bucket Notification Guide</a> for help with configuring your minio server to listen and monitor for bucket event notifications. Note that you will need to setup a supported message queue for configuring your notification targets (i.e. NATS, WebHooks, Kafka, etc.). </p>\n<h4>Installation on Kubernetes</h4>\n<p>The <a href="https://docs.minio.io/docs/minio-deployment-quickstart-guide.html">Minio Deployment Quickstart Guide</a> is useful for help in getting Minio up &#x26; running on your orchestration platform. We\'ve also outlined additional steps below to use Minio for signal notifications and as an object store for trigger resources.</p>\n<ol>\n<li>\n<p>Install the Helm chart</p>\n<pre><code>$ helm init\n...\n$ helm install stable/minio --name artifacts --set service.type=LoadBalancer\n...\n</code></pre>\n</li>\n</ol>\n<p>$ #Verify that the minio pod, the minio service and minio secret are present\n$ kubectl get all -n default -l app=minio</p>\n<p>NAME                                   READY     STATUS    RESTARTS   AGE\npod/artifacts-minio-85547b6bd9-bhtt8   1/1       Running   0          21m</p>\n<p>NAME                      TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE\nservice/artifacts-minio   ClusterIP   None         <none>        9000/TCP   21m</p>\n<p>NAME                              DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE\ndeployment.apps/artifacts-minio   1         1         1            1           21m</p>\n<p>NAME                                         DESIRED   CURRENT   READY     AGE\nreplicaset.apps/artifacts-minio-85547b6bd9   1         1         1         21m</p>\n<pre><code>2. Create a bucket in Minio and upload the hello-world.yaml into that bucket.\nDownload the hello-world.yaml from https://raw.githubusercontent.com/argoproj/argo/master/examples/hello-world.yaml\n</code></pre>\n<p>$ kubectl port-forward <code>kubectl get pod -l app=minio -o name</code> 9000:9000</p>\n<pre><code>Open the browser at http://localhost:9000\nCreate a new bucket called \'workflows\'.\nUpload the hello-world.yaml into that bucket\n\n\n#### Enabling bucket notifications\nOnce the Minio server is configured with a notification target and you have restarted the server to put the changes into effect, you now need to explicitely enable event notifications for a specified bucket. Enabling these notifications are out of scope of Argo Events since bucket notifications are a construct within Minio that exists at the `bucket` level. To avoid multiple sensors on the same S3 bucket conflicting with each other, creating, updating, and deleting Minio bucket notifications should be delegated to a separate process with knowledge of all notification targets including those outside of the Argo Events.\n</code></pre>\n<p>$ k edit configmap artifacts-minio\n$ k delete pod artifacts-minio</p>\n<pre><code>## File (future enhancement)\nThis will enable access to file artifacts via a filesystem mounted as a [PersistentVolume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) within the `sensor-controller` pod. \n\n## URL (future enhancement)\nThis will enable access to web artifacts via RESTful API.\n</code></pre>',docPath:"argo-events/docs/artifact-guide",proj:"argo-events"}}}});
//# sourceMappingURL=path---docs-argo-events-docs-artifact-guide-html-4ff33dc59892f58da969.js.map