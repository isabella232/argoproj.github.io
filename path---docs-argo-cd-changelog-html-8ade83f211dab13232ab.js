webpackJsonp([0xf792c59d1575],{522:function(e,i){e.exports={pathContext:{docHtml:"<h1>Changelog</h1>\n<h2>v0.11.0</h2>\n<p>This is Argo CD's biggest release ever and introduces a completely redesigned controller architecture.</p>\n<h3>New Features</h3>\n<h4>New application controller architecture</h4>\n<p>The application controller has a completely redesigned architecture for better scalability, and\nimprove performance during application reconciliation. This was achieved by maintaining an\nin-memory, live state cache of lightweight Kubernetes object metadata. During reconciliation, the\ncontroller no longer performs expensive, in-line queries of app labeled resources in K8s API server,\ninstead relying on the metadata in the local state cache. This dramatically improves performance\nand responsiveness, and is less burdensome the K8s API server. A second benefit to this, is that the\nrelationship between object when computing the resource tree, can be displayed, even for custom\nresources.</p>\n<h4>Multi-namespaced applications</h4>\n<p>Argo CD will now honor any explicitly set namespace in a mainfest. Resources without a namespace\nwill continue to be deployed to the namespace specified in <code>spec.destination.namespace</code>. This\nenables support for a class of applications that install to multiple namespaces. For example,\nArgo CD now supports the istio helm chart, which deploys some resources to an explit <code>istio-system</code>\nnamespace.</p>\n<h4>Large application support</h4>\n<p>Full resource objects are no longer stored in the Application CRD object status. Instead, only\nlightweight metadata is stored in the status, such as a resource's sync and health status.\nThis change enables Argo CD to support applications with a very large number of resources\n(e.g. istio), and reduces the bandwidth requirements when listing applications in the UI.</p>\n<h4>Resource lifecycle hook improvements</h4>\n<p>Resource hooks are now visible from the UI. Additionally, bare Pods with a restart policy of Never\ncan now be used as a resource hook, as an alternative to Jobs, Workflows.</p>\n<h4>K8s recommended application labels</h4>\n<p>Resource labeling has been changed to use <code>app.kubernetes.io/instance</code> as recommended in\n<a href=\"https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/\">Kubernetes recommended labels</a>,\n(changed from <code>applications.argoproj.io/app-name</code>). This will enable applications created by Argo CD\nto interoperate with other tooling that are also converging on this labeling, such as the Kubernetes\ndashboard. Additionally, Argo CD will no longer inject any tracking labels at the\n<code>spec.template.metadata</code> level.</p>\n<h4>External OIDC provider support</h4>\n<p>Argo CD now supports auth delegation to an existing, external OIDC providers without the need for\nDex (e.g. Okta, OneLogin, Auth0, Microsoft, etc...)</p>\n<p>The optional, <a href=\"https://github.com/dexidp/dex\">Dex IDP OIDC provider</a> is still bundled as part of the\ndefault installation, in order to provide a seamless out-of-box experience, and enables Argo CD to\nintegrate with non-OIDC providers, or to benefit from Dex's full range of\n<a href=\"https://github.com/dexidp/dex/tree/master/Documentation/connectors\">connectors</a>.</p>\n<h4>OIDC group claims bindings to Project Roles</h4>\n<p>Group claims from the OIDC provider can now be bound to Argo CD project roles. Previously, group\nclaims were managed at the centralized ConfigMap, <code>argocd-rbac-cm</code>. This enables project admins to\nself service access to applications within a project.</p>\n<h4>Declarative Argo CD configuration</h4>\n<p>Argo CD settings can be now be configured either declaratively, or imperatively. The <code>argocd-cm</code>\nConfigMap now has a <code>repositories</code> field, which can reference credentials in a normal Kubernetes\nsecret which you can create declaratively, outside of Argo CD.</p>\n<h4>Helm repository support</h4>\n<p>Helm repositories can be configured at the system level, enabling the deployment of helm charts\nwhich have a dependency to external helm repositories.</p>\n<h3>Breaking changes:</h3>\n<ul>\n<li>\n<p>As a consequence to moving to recommended kubernetes labels, when upgrading from v0.10 to v0.11,\nall applications will immediately be OutOfSync due to the change in labeling techniques. This will\ncorrect itself with another sync of the application. However, since Pods will be recreated, please\ntake this into consideration, especially if your applications is configured with auto-sync.</p>\n</li>\n<li>\n<p>There was significant reworking of the <code>app.status</code> fields to simplify the datastructure and\nremove fields which were no longer used by the controller. No breaking changes were made in\n<code>app.spec</code>.</p>\n</li>\n<li>\n<p>An older Argo CD CLI (v0.10 and below) will not be compatible with an Argo CD v0.11. To keep\nCI pipelines in sync with the API server, it is recommended to have pipelines download the CLI\ndirectly from the API server <a href=\"https://$%7BARGOCD_SERVER%7D/download/argocd-linux-amd64\">https://${ARGOCD_SERVER}/download/argocd-linux-amd64</a> during the CI\npipeline.</p>\n</li>\n</ul>\n<h3>Changes since v0.10:</h3>\n<ul>\n<li>Declarative setup and configuration of ArgoCD (#536)</li>\n<li>Declaratively add helm repositories (#747)</li>\n<li>Switch to k8s recommended app.kubernetes.io/instance label (#857)</li>\n<li>Ability for a single application to deploy into multiple namespaces (#696)</li>\n<li>Self service group access to project applications (#742)</li>\n<li>Support for Pods as a sync hook (#801)</li>\n<li>Support 'crd-install' helm hook (#355)</li>\n<li>Remove resources state from application CRD (#758)</li>\n<li>Refactor, consolidate and rename resource type data structures</li>\n<li>Improve Application state reconciliation performance (#806)</li>\n<li>API server &#x26; UI should serve argocd binaries instead of linking to GitHub (#716)</li>\n<li>Failed to deploy helm chart with local dependencies and no internet access (#786)</li>\n<li>Out of sync reported if Secrets with stringData are used (#763)</li>\n<li>Unable to delete application in K8s v1.12 (#718)</li>\n</ul>\n<h2>v0.10.6 (2018-11-14)</h2>\n<ul>\n<li>Fix issue preventing in-cluster app sync due to go-client changes (issue #774)</li>\n</ul>\n<h2>v0.10.5 (2018-11-13)</h2>\n<ul>\n<li>Increase concurrency of application controller</li>\n<li>Update dependencies to k8s v1.12 and client-go v9.0 (#729)</li>\n<li>add argo cluster permission to view logs (#766) (@conorfennell)</li>\n<li>Fix issue where applications could not be deleted on k8s v1.12</li>\n<li>Allow 'syncApplication' action to reference target revision rather then hard-coding to 'HEAD' (#69) (@chrisgarland)</li>\n<li>Issue #768 - Fix application wizard crash</li>\n</ul>\n<h2>v0.10.4 (2018-11-07)</h2>\n<ul>\n<li>Upgrade to Helm v0.11.0 (@amarrella)</li>\n<li>Health check is not discerning apiVersion when assessing CRDs (issue #753)</li>\n<li>Fix nil pointer dereference in util/health (@mduarte)</li>\n</ul>\n<h2>v0.10.3 (2018-10-28)</h2>\n<ul>\n<li>Fix applying TLS version settings</li>\n<li>Update to kustomize 1.0.10 (@twz123)</li>\n</ul>\n<h2>v0.10.2 (2018-10-25)</h2>\n<ul>\n<li>Update to kustomize 1.0.9 (@twz123)</li>\n<li>Fix app refresh err when k8s patch is too slow</li>\n</ul>\n<h2>v0.10.1 (2018-10-24)</h2>\n<ul>\n<li>Handle case where OIDC settings become invalid after dex server restart (issue #710)</li>\n<li>git clean also needs to clean files under gitignore (issue #711)</li>\n</ul>\n<h2>v0.10.0 (2018-10-19)</h2>\n<h3>Changes since v0.9:</h3>\n<ul>\n<li>Allow more fine-grained sync (issue #508)</li>\n<li>Display init container logs (issue #681)</li>\n<li>Redirect to /auth/login instead of /login when SSO token is used for authenticaion (issue #348)</li>\n<li>Support ability to use a helm values files from a URL (issue #624)</li>\n<li>Support public not-connected repo in app creation UI (issue #426)</li>\n<li>Use ksonnet CLI instead of ksonnet libs (issue #626)</li>\n<li>We should be able to select the order of the <code>yaml</code> files while creating a Helm App (#664)</li>\n<li>Remove default params from app history (issue #556)</li>\n<li>Update to ksonnet v0.13.0</li>\n<li>Update to kustomize 1.0.8</li>\n<li>API Server fails to return apps due to grpc max message size limit  (issue #690)</li>\n<li>App Creation UI for Helm Apps shows only files prefixed with <code>values-</code> (issue #663)</li>\n<li>App creation UI should allow specifying values files outside of helm app directory bug (issue #658)</li>\n<li>argocd-server logs credentials in plain text when adding git repositories (issue #653)</li>\n<li>Azure Repos do not work as a repository (issue #643)</li>\n<li>Better update conflict error handing during app editing (issue #685)</li>\n<li>Cluster watch needs to be restarted when CRDs get created (issue #627)</li>\n<li>Credentials not being accepted for Google Source Repositories (issue #651)</li>\n<li>Default project is created without permission to deploy cluster level resources (issue #679)</li>\n<li>Generate role token click resets policy changes (issue #655)</li>\n<li>Input type text instead of password on Connect repo panel (issue #693)</li>\n<li>Metrics endpoint not reachable through the metrics kubernetes service (issue #672)</li>\n<li>Operation stuck in 'in progress' state if application has no resources (issue #682)</li>\n<li>Project should influence options for cluster and namespace during app creation (issue #592)</li>\n<li>Repo server unable to execute ls-remote for private repos (issue #639)</li>\n<li>Resource is always out of sync if it has only 'ksonnet.io/component' label (issue #686)</li>\n<li>Resource nodes are 'jumping' on app details page (issue #683)</li>\n<li>Sync always suggest using latest revision instead of target UI bug (issue #669)</li>\n<li>Temporary ignore service catalog resources (issue #650)</li>\n</ul>\n<h2>v0.9.2 (2018-09-28)</h2>\n<ul>\n<li>Update to kustomize 1.0.8</li>\n<li>Fix issue where argocd-server logged credentials in plain text during repo add (issue #653)</li>\n<li>Credentials not being accepted for Google Source Repositories (issue #651)</li>\n<li>Azure Repos do not work as a repository (issue #643)</li>\n<li>Temporary ignore service catalog resources (issue #650)</li>\n<li>Normalize policies by always adding space after comma</li>\n</ul>\n<h2>v0.9.1 (2018-09-24)</h2>\n<ul>\n<li>Repo server unable to execute ls-remote for private repos (issue #639)</li>\n</ul>\n<h2>v0.9.0 (2018-09-24)</h2>\n<h3>Notes about upgrading from v0.8</h3>\n<ul>\n<li>Cluster wide resources should be allowed in default project (due to issue #330):</li>\n</ul>\n<pre><code>argocd project allow-cluster-resource default '*' '*'\n</code></pre>\n<ul>\n<li>Projects now provide the ability to allow or deny deployments of cluster-scoped resources\n(e.g. Namespaces, ClusterRoles, CustomResourceDefinitions). When upgrading from v0.8 to v0.9, to\nmatch the behavior of v0.8 (which did not have restrictions on deploying resources) and continue to\nallow deployment of cluster-scoped resources, an additional command should be run:</li>\n</ul>\n<pre><code class=\"language-bash\">argocd proj allow-cluster-resource default '*' '*'\n</code></pre>\n<p>The above command allows the <code>default</code> project to deploy any cluster-scoped resources which matches\nthe behavior of v0.8.</p>\n<ul>\n<li>The secret keys in the argocd-secret containing the TLS certificate and key, has been renamed from\n<code>server.crt</code> and <code>server.key</code> to the standard <code>tls.crt</code> and <code>tls.key</code> keys. This enables Argo CD\nto integrate better with Ingress and cert-manager. When upgrading to v0.9, the <code>server.crt</code> and\n<code>server.key</code> keys in argocd-secret should be renamed to the new keys.</li>\n</ul>\n<h3>Changes since v0.8:</h3>\n<ul>\n<li>Auto-sync option in application CRD instance (issue #79)</li>\n<li>Support raw jsonnet as an application source (issue #540)</li>\n<li>Reorder K8s resources to correct creation order (issue #102)</li>\n<li>Redact K8s secrets from API server payloads (issue #470)</li>\n<li>Support --in-cluster authentication without providing a kubeconfig (issue #527)</li>\n<li>Special handling of CustomResourceDefinitions (issue #613)</li>\n<li>Argo CD should download helm chart dependencies (issue #582)</li>\n<li>Export Argo CD stats as prometheus style metrics (issue #513)</li>\n<li>Support restricting TLS version (issue #609)</li>\n<li>Use 'kubectl auth reconcile' before 'kubectl apply' (issue #523)</li>\n<li>Projects need controls on cluster-scoped resources (issue #330)</li>\n<li>Support IAM Authentication for managing external K8s clusters (issue #482)</li>\n<li>Compatibility with cert manager (issue #617)</li>\n<li>Enable TLS for repo server (issue #553)</li>\n<li>Split out dex into it's own deployment (instead of sidecar) (issue #555)</li>\n<li>[UI] Support selection of helm values files in App creation wizard (issue #499)</li>\n<li>[UI] Support specifying source revision in App creation wizard allow (issue #503)</li>\n<li>[UI] Improve resource diff rendering (issue #457)</li>\n<li>[UI] Indicate number of ready containers in pod (issue #539)</li>\n<li>[UI] Indicate when app is overriding parameters (issue #503)</li>\n<li>[UI] Provide a YAML view of resources (issue #396)</li>\n<li>[UI] Project Role/Token management from UI (issue #548)</li>\n<li>[UI] App creation wizard should allow specifying source revision (issue #562)</li>\n<li>[UI] Ability to modify application from UI (issue #615)</li>\n<li>[UI] indicate when operation is in progress or has failed (issue #566)</li>\n<li>Fix issue where changes were not pulled when tracking a branch (issue #567)</li>\n<li>Lazy enforcement of unknown cluster/namespace restricted resources (issue #599)</li>\n<li>Fix controller hot loop when app source contains bad manifests (issue #568)</li>\n<li>Fix issue where Argo CD fails to deploy when resources are in a K8s list format (issue #584)</li>\n<li>Fix comparison failure when app contains unregistered custom resource (issue #583)</li>\n<li>Fix issue where helm hooks were being deployed as part of sync (issue #605)</li>\n<li>Fix race conditions in kube.GetResourcesWithLabel and DeleteResourceWithLabel (issue #587)</li>\n<li>[UI] Fix issue where projects filter does not work when application got changed</li>\n<li>[UI] Creating apps from directories is not obvious (issue #565)</li>\n<li>Helm hooks are being deployed as resources (issue #605)</li>\n<li>Disagreement in three way diff calculation (issue #597)</li>\n<li>SIGSEGV in kube.GetResourcesWithLabel (issue #587)</li>\n<li>Argo CD fails to deploy resources list (issue #584)</li>\n<li>Branch tracking not working properly (issue #567)</li>\n<li>Controller hot loop when application source has bad manifests (issue #568)</li>\n</ul>\n<h2>v0.8.2 (2018-09-12)</h2>\n<ul>\n<li>Downgrade ksonnet from v0.12.0 to v0.11.0 due to quote unescape regression</li>\n<li>Fix CLI panic when performing an initial <code>argocd sync/wait</code></li>\n</ul>\n<h2>v0.8.1 (2018-09-10)</h2>\n<ul>\n<li>[UI] Support selection of helm values files in App creation wizard (issue #499)</li>\n<li>[UI] Support specifying source revision in App creation wizard allow (issue #503)</li>\n<li>[UI] Improve resource diff rendering (issue #457)</li>\n<li>[UI] Indicate number of ready containers in pod (issue #539)</li>\n<li>[UI] Indicate when app is overriding parameters (issue #503)</li>\n<li>[UI] Provide a YAML view of resources (issue #396)</li>\n<li>Fix issue where changes were not pulled when tracking a branch (issue #567)</li>\n<li>Fix controller hot loop when app source contains bad manifests (issue #568)</li>\n<li>[UI] Fix issue where projects filter does not work when application got changed</li>\n</ul>\n<h2>v0.8.0 (2018-09-04)</h2>\n<h3>Notes about upgrading from v0.7</h3>\n<ul>\n<li>\n<p>The RBAC model has been improved to support explicit denies. What this means is that any previous\nRBAC policy rules, need to be rewritten to include one extra column with the effect:\n<code>allow</code> or <code>deny</code>. For example, if a rule was written like this:</p>\n<pre><code>p, my-org:my-team, applications, get, */*\n</code></pre>\n<p>It should be rewritten to look like this:</p>\n<pre><code>p, my-org:my-team, applications, get, */*, allow\n</code></pre>\n</li>\n</ul>\n<h3>Changes since v0.7:</h3>\n<ul>\n<li>Support kustomize as an application source (issue #510)</li>\n<li>Introduce project tokens for automation access (issue #498)</li>\n<li>Add ability to delete a single application resource to support immutable updates (issue #262)</li>\n<li>Update RBAC model to support explicit denies (issue #497)</li>\n<li>Ability to view Kubernetes events related to application projects for auditing</li>\n<li>Add PVC healthcheck to controller (issue #501)</li>\n<li>Run all containers as an unprivileged user (issue #528)</li>\n<li>Upgrade ksonnet to v0.12.0</li>\n<li>Add readiness probes to API server (issue #522)</li>\n<li>Use gRPC error codes instead of fmt.Errorf (#532)</li>\n<li>API discovery becomes best effort when partial resource list is returned (issue #524)</li>\n<li>Fix <code>argocd app wait</code> printing incorrect Sync output (issue #542)</li>\n<li>Fix issue where argocd could not sync to a tag (#541)</li>\n<li>Fix issue where static assets were browser cached between upgrades (issue #489)</li>\n</ul>\n<h2>v0.7.2 (2018-08-21)</h2>\n<ul>\n<li>API discovery becomes best effort when partial resource list is returned (issue #524)</li>\n</ul>\n<h2>v0.7.1 (2018-08-03)</h2>\n<ul>\n<li>Surface helm parameters to the application level (#485)</li>\n<li>[UI] Improve application creation wizard (#459)</li>\n<li>[UI] Show indicator when refresh is still in progress (#493)</li>\n<li>[UI] Improve data loading error notification (#446)</li>\n<li>Infer username from claims during an <code>argocd relogin</code> (#475)</li>\n<li>Expand RBAC role to be able to create application events. Fix username claims extraction</li>\n<li>Fix scalability issues with the ListApps API (#494)</li>\n<li>Fix issue where application server was retrieving events from incorrect cluster (#478)</li>\n<li>Fix failure in identifying app source type when path was '.'</li>\n<li>AppProjectSpec SourceRepos mislabeled (#490)</li>\n<li>Failed e2e test was not failing CI workflow</li>\n<li>Fix linux download link in getting_started.md (#487) (@chocopowwwa)</li>\n</ul>\n<h2>v0.7.0 (2018-07-27)</h2>\n<ul>\n<li>Support helm charts and yaml directories as an application source</li>\n<li>Audit trails in the form of API call logs</li>\n<li>Generate kubernetes events for application state changes</li>\n<li>Add ksonnet version to version endpoint (#433)</li>\n<li>Show CLI progress for sync and rollback</li>\n<li>Make use of dex refresh tokens and store them into local config</li>\n<li>Expire local superuser tokens when their password changes</li>\n<li>Add <code>argocd relogin</code> command as a convenience around login to current context</li>\n<li>Fix saving default connection status for repos and clusters</li>\n<li>Fix undesired fail-fast behavior of health check</li>\n<li>Fix memory leak in the cluster resource watch</li>\n<li>Health check for StatefulSets, DaemonSet, and ReplicaSets were failing due to use of wrong converters</li>\n</ul>\n<h2>v0.6.2 (2018-07-23)</h2>\n<ul>\n<li>Health check for StatefulSets, DaemonSet, and ReplicaSets were failing due to use of wrong converters</li>\n</ul>\n<h2>v0.6.1 (2018-07-18)</h2>\n<ul>\n<li>Fix regression where deployment health check incorrectly reported Healthy</li>\n<li>Intercept dex SSO errors and present them in Argo login page</li>\n</ul>\n<h2>v0.6.0 (2018-07-16)</h2>\n<ul>\n<li>Support PreSync, Sync, PostSync resource hooks</li>\n<li>Introduce Application Projects for finer grain RBAC controls</li>\n<li>Swagger Docs &#x26; UI</li>\n<li>Support in-cluster deployments internal kubernetes service name</li>\n<li>Refactoring &#x26; Improvements</li>\n<li>Improved error handling, status and condition reporting</li>\n<li>Remove installer in favor of kubectl apply instructions</li>\n<li>Add validation when setting application parameters</li>\n<li>Cascade deletion is decided during app deletion, instead of app creation</li>\n<li>Fix git authentication implementation when using using SSH key</li>\n<li>app-name label was inadvertently injected into spec.selector if selector was omitted from v1beta1 specs</li>\n</ul>\n<h2>v0.5.4 (2018-06-27)</h2>\n<ul>\n<li>Refresh flag to sync should be optional, not required</li>\n</ul>\n<h2>v0.5.3 (2018-06-20)</h2>\n<ul>\n<li>Support cluster management using the internal k8s API address <a href=\"https://kubernetes.default.svc\">https://kubernetes.default.svc</a> (#307)</li>\n<li>Support diffing a local ksonnet app to the live application state (resolves #239) (#298)</li>\n<li>Add ability to show last operation result in app get. Show path in app list -o wide (#297)</li>\n<li>Update dependencies: ksonnet v0.11, golang v1.10, debian v9.4 (#296)</li>\n<li>Add ability to force a refresh of an app during get (resolves #269) (#293)</li>\n<li>Automatically restart API server upon certificate changes (#292)</li>\n</ul>\n<h2>v0.5.2 (2018-06-14)</h2>\n<ul>\n<li>Resource events tab on application details page (#286)</li>\n<li>Display pod status on application details page (#231)</li>\n</ul>\n<h2>v0.5.1 (2018-06-13)</h2>\n<ul>\n<li>API server incorrectly compose application fully qualified name for RBAC check (#283)</li>\n<li>UI crash while rendering application operation info if operation failed</li>\n</ul>\n<h2>v0.5.0 (2018-06-12)</h2>\n<ul>\n<li>RBAC access control</li>\n<li>Repository/Cluster state monitoring</li>\n<li>Argo CD settings import/export</li>\n<li>Application creation UI wizard</li>\n<li>argocd app manifests for printing the application manifests</li>\n<li>argocd app unset command to unset parameter overrides</li>\n<li>Fail app sync if prune flag is required (#276)</li>\n<li>Take into account number of unavailable replicas to decided if deployment is healthy or not #270</li>\n<li>Add ability to show parameters and overrides in CLI (resolves #240)</li>\n<li>Repo names containing underscores were not being accepted (#258)</li>\n<li>Cookie token was not parsed properly when mixed with other site cookies</li>\n</ul>\n<h2>v0.4.7 (2018-06-07)</h2>\n<ul>\n<li>Fix argocd app wait health checking logic</li>\n</ul>\n<h2>v0.4.6 (2018-06-06)</h2>\n<ul>\n<li>Retry argocd app wait connection errors from EOF watch. Show detailed state changes</li>\n</ul>\n<h2>v0.4.5 (2018-05-31)</h2>\n<ul>\n<li>Add argocd app unset command to unset parameter overrides</li>\n<li>Cookie token was not parsed properly when mixed with other site cookies</li>\n</ul>\n<h2>v0.4.4 (2018-05-30)</h2>\n<ul>\n<li>Add ability to show parameters and overrides in CLI (resolves #240)</li>\n<li>Add Events API endpoint</li>\n<li>Issue #238 - add upsert flag to 'argocd app create' command</li>\n<li>Add repo browsing endpoint (#229)</li>\n<li>Support subscribing to settings updates and auto-restart of dex and API server</li>\n<li>Issue #233 - Controller does not persist rollback operation result</li>\n<li>App sync frequently fails due to concurrent app modification</li>\n</ul>\n<h2>v0.4.3 (2018-05-21)</h2>\n<ul>\n<li>Move local branch deletion as part of git Reset() (resolves #185) (#222)</li>\n<li>Fix exit code for app wait (#219)</li>\n</ul>\n<h2>v0.4.2 (2018-05-21)</h2>\n<ul>\n<li>Show URL in argocd app get</li>\n<li>Remove interactive context name prompt during login which broke login automation</li>\n<li>Rename force flag to cascade in argocd app delete</li>\n</ul>\n<h2>v0.4.1 (2018-05-18)</h2>\n<ul>\n<li>Implemented argocd app wait command</li>\n</ul>\n<h2>v0.4.0 (2018-05-17)</h2>\n<ul>\n<li>SSO Integration</li>\n<li>GitHub Webhook</li>\n<li>Add application health status</li>\n<li>Sync/Rollback/Delete is asynchronously handled by controller</li>\n<li>Refactor CRUD operation on clusters and repos</li>\n<li>Sync will always perform kubectl apply</li>\n<li>Synced Status considers last-applied-configuration annotatoin</li>\n<li>Server &#x26; namespace are mandatory fields (still inferred from app.yaml)</li>\n<li>Manifests are memoized in repo server</li>\n<li>Fix connection timeouts to SSH repos</li>\n</ul>\n<h2>v0.3.2 (2018-05-03)</h2>\n<ul>\n<li>Application sync should delete 'unexpected' resources #139</li>\n<li>Update ksonnet to v0.10.1</li>\n<li>Detect unexpected resources</li>\n<li>Fix: App sync frequently fails due to concurrent app modification #147</li>\n<li>Fix: improve app state comparator: #136, #132</li>\n</ul>\n<h2>v0.3.1 (2018-04-24)</h2>\n<ul>\n<li>Add new rollback RPC with numeric identifiers</li>\n<li>New argo app history and argo app rollback command</li>\n<li>Switch to gogo/protobuf for golang code generation</li>\n<li>Fix: create .argocd directory during argo login (issue #123)</li>\n<li>Fix: Allow overriding server or namespace separately (issue #110)</li>\n</ul>\n<h2>v0.3.0 (2018-04-23)</h2>\n<ul>\n<li>Auth support</li>\n<li>TLS support</li>\n<li>DAG-based application view</li>\n<li>Bulk watch</li>\n<li>ksonnet v0.10.0-alpha.3</li>\n<li>kubectl apply deployment strategy</li>\n<li>CLI improvements for app management</li>\n</ul>\n<h2>v0.2.0 (2018-04-03)</h2>\n<ul>\n<li>Rollback UI</li>\n<li>Override parameters</li>\n</ul>\n<h2>v0.1.0 (2018-03-12)</h2>\n<ul>\n<li>Define app in Github with dev and preprod environment using KSonnet</li>\n<li>Add cluster Diff App with a cluster Deploy app in a cluster</li>\n<li>Deploy a new version of the app in the cluster</li>\n<li>App sync based on Github app config change - polling only</li>\n<li>Basic UI: App diff between Git and k8s cluster for all environments Basic GUI</li>\n</ul>",docPath:"argo-cd/changelog",proj:"argo-cd"}}}});
//# sourceMappingURL=path---docs-argo-cd-changelog-html-8ade83f211dab13232ab.js.map