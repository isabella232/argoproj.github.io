webpackJsonp([0x765f822a88d6],{543:function(e,o){e.exports={pathContext:{docHtml:'<h1>Signal Microservices</h1>\n<p>In today\'s ecosystem with the rise in popularity of real-time systems and microservices, there exists a plethora of message brokers and streaming platforms from which to choose from. This results in the problem of being able to support a wide variety of platforms (external and internal) depending on the technology stack. The current solution to this problem uses <a href="https://github.com/micro/go-micro">micro</a> microservices that implement the <code>Signaler</code> interface, run as a separate deployment (multiple pods + service) to the <code>sensor-controller</code>, and communicate over <code>gRPC</code>.</p>\n<h2>Use Cases</h2>\n<ol>\n<li>User wishes to listen to events from outside the currently default builtin stream functionality without having to change the code or add to the existing <code>Stream</code> configuration.</li>\n<li>User wishes to leverage an existing platform from their stack as a source to trigger workflows.</li>\n</ol>\n<h2>Design</h2>\n<ul>\n<li>\n<p><code>Signaler</code> interface is defined within the <code>sdk</code> package. All signals must implement this interface.</p>\n<pre><code>// Signaler is the interface for signaling\ntype Signaler interface {\nStart(*v1alpha1.Signal) (&#x3C;-chan *v1alpha1.Event, error)\nStop() error\n}\n</code></pre>\n</li>\n<li>Use <a href="https://github.com/micro/kubernetes">micro k8s</a> to register deployed microservices. Each pod is considered a node of the microservice.</li>\n<li><code>Sensor controller</code> registers itself using the <code>micro k8s</code> as a client to the signal microservices. It then is able to </li>\n</ul>\n<h2>Build your own</h2>\n<p>Building your own signal microservice is easy. All you need is a <code>struct</code> which implements the <code>Signaler</code> interface. You can write your service in a number of different languages, however using a language other than <code>Go</code> requires a bit more work and is not covered in this. </p>\n<p>If you\'re using Go, take a look at the <code>builtin</code> package for examples on writing your own custom services. You\'ll need to call the <code>sdk.RegisterSignalServiceHandler()</code> method in the main function of your program. Please, put the new plugin under the <code>custom</code> package.</p>',docPath:"argo-events/signals/stream/readme",proj:"argo-events"}}}});
//# sourceMappingURL=path---docs-argo-events-signals-stream-readme-html-6f35b32efb868ff0639d.js.map