webpackJsonp([0xc03704f9c2a0],{507:function(e,t){e.exports={pathContext:{docHtml:'<h1>Parameter Overrides</h1>\n<p>ArgoCD provides a mechanism to override the parameters of a ksonnet/helm app. This gives some extra\nflexibility in having most of the application manifests defined in git, while leaving room for\n<em>some</em> parts of the k8s manifests determined dynamically, or outside of git. It also serves as an\nalternative way of redeploying an application by changing application parameters via ArgoCD, instead\nof making the changes to the manifests in git.</p>\n<p><strong>NOTE:</strong> many consider this mode of operation as an anti-pattern to GitOps, since the source of\ntruth becomes a union of the git repository, and the application overrides. The ArgoCD parameter\noverrides feature is provided mainly convenience to developers and is intended to be used more for\ndev/test environments, vs. production environments.</p>\n<p>To use parameter overrides, run the <code>argocd app set -p (COMPONENT=)PARAM=VALUE</code> command:</p>\n<pre><code>argocd app set guestbook -p guestbook=image=example/guestbook:abcd123\nargocd app sync guestbook\n</code></pre>\n<p>The following are situations where parameter overrides would be useful: </p>\n<ol>\n<li>\n<p>A team maintains a "dev" environment, which needs to be continually updated with the latest\nversion of their guestbook application after every build in the tip of master. To address this use\ncase, the application would expose an parameter named <code>image</code>, whose value used in the <code>dev</code>\nenvironment contains a placeholder value (e.g. <code>example/guestbook:replaceme</code>). The placeholder value\nwould be determined externally (outside of git) such as a build systems. Then, as part of the build\npipeline, the parameter value of the <code>image</code> would be continually updated to the freshly built image\n(e.g. <code>argocd app set guestbook -p guestbook=image=example/guestbook:abcd123</code>). A sync operation\nwould result in the application being redeployed with the new image.</p>\n</li>\n<li>\n<p>A repository of helm manifests is already publicly available (e.g. <a href="https://github.com/helm/charts">https://github.com/helm/charts</a>).\nSince commit access to the repository is unavailable, it is useful to be able to install charts from\nthe public repository, customizing the deployment with different parameters, without resorting to\nforking the repository to make the changes. For example, to install redis from the helm chart\nrepository and customize the the database password, you would run:</p>\n</li>\n</ol>\n<pre><code>argocd app create redis --repo https://github.com/helm/charts.git --path stable/redis --dest-server https://kubernetes.default.svc --dest-namespace default -p password=abc123\n</code></pre>',docPath:"argo-cd/docs/parameters",proj:"argo-cd"}}}});
//# sourceMappingURL=path---docs-argo-cd-docs-parameters-html-cae6402fc41fe1bf6d4a.js.map