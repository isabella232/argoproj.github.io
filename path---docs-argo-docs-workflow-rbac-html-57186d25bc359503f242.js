webpackJsonp([0x70a3bef7c3ea],{569:function(e,o){e.exports={pathContext:{docHtml:'<h1>Workfow RBAC</h1>\n<p>All pods in a workflow run with the service account specified in <code>workflow.spec.serviceAccountName</code>,\nor if omitted, the <code>default</code> service account of the workflow\'s namespace. The amount of access which\na workflow needs is dependent on what the workflow needs to do. For example, if your workflow needs\nto deploy a resource, then the workflow\'s service account will require \'create\' privileges on that\nresource.</p>\n<p>The bare minimum for a workflow to function is outlined below:</p>\n<pre><code class="language-yaml">apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: workflow-role\nrules:\n# pod get/watch is used to identify the container IDs of the current pod\n# pod patch is used to annotate the step\'s outputs back to controller (e.g. artifact location)\n- apiGroups:\n  - ""\n  resources:\n  - pods\n  verbs:\n  - get\n  - watch\n  - patch\n# logs get/watch are used to get the pods logs for script outputs, and for log archival\n- apiGroups:\n  - ""\n  resources:\n  - pods/log\n  verbs:\n  - get\n  - watch\n# secrets get is used to retrieve credentials to artifact repository. NOTE: starting n Argo v2.3,\n# the API secret access will be removed in favor of volume mounting the secrets to the workflow pod\n# (issue #1072)\n- apiGroups:\n  - ""\n  resources:\n  - secrets\n  verbs:\n  - get\n</code></pre>',docPath:"argo/docs/workflow-rbac",proj:"argo"}}}});
//# sourceMappingURL=path---docs-argo-docs-workflow-rbac-html-57186d25bc359503f242.js.map