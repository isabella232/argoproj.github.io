webpackJsonp([0x6b4273a49d82],{537:function(e,o){e.exports={pathContext:{docHtml:"<h2>Projects</h2>\n<p>Projects provide a logical grouping of applications, which is useful when Argo CD is used by multiple\nteams. Projects provide the following features:</p>\n<ul>\n<li>ability to restrict <em>what</em> may be deployed (the git source repositories)</li>\n<li>ability to restrict <em>where</em> apps may be deployed (the  destination clusters and namespaces)</li>\n<li>ability to control what type of objects may be deployed (e.g. RBAC, CRDs, DaemonSets, NetworkPolicy etc...)</li>\n</ul>\n<h3>The default project</h3>\n<p>Every application belongs to a single project. If unspecified, an application belongs to the\n<code>default</code> project, which is created automatically and by default, permits deployments from any\nsource repo, to any cluster, and all resource Kinds. The default project can be modified, but not\ndeleted. When initially created, it's specification is configured to be the most permissive:</p>\n<pre><code class=\"language-yaml\">spec:\n  sourceRepos:\n  - '*'\n  destinations:\n  - namespace: '*'\n    server: '*'\n  clusterResourceWhitelist:\n  - group: '*'\n    kind: '*'\n</code></pre>\n<h3>Creating Projects</h3>\n<p>Additional projects can be created to give separate teams different levels of access to namespaces.\nThe following command creates a new project <code>myproject</code> which can deploy applications to namespace\n<code>mynamespace</code> of cluster <code>https://kubernetes.default.svc</code>. The permitted git source repository is\nset to <code>https://github.com/argoproj/argocd-example-apps.git</code> repository.</p>\n<pre><code>argocd proj create myproject -d https://kubernetes.default.svc,mynamespace -s https://github.com/argoproj/argocd-example-apps.git\n</code></pre>\n<h3>Managing Projects</h3>\n<p>Permitted source git repositories are managed using commands:</p>\n<pre><code class=\"language-bash\">argocd project add-source &#x3C;PROJECT> &#x3C;REPO>\nargocd project remove-source &#x3C;PROJECT> &#x3C;REPO>\n</code></pre>\n<p>Permitted destination clusters and namespaces are managed with the commands:</p>\n<pre><code>argocd project add-destination &#x3C;PROJECT> &#x3C;CLUSTER>,&#x3C;NAMESPACE>\nargocd project remove-destination &#x3C;PROJECT> &#x3C;CLUSTER>,&#x3C;NAMESPACE>\n</code></pre>\n<p>Permitted destination K8s resource kinds are managed with the commands. Note that namespaced-scoped\nresources are restricted via a blacklist, whereas cluster-scoped resources are restricted via\nwhitelist.</p>\n<pre><code>argocd project allow-cluster-resource &#x3C;PROJECT> &#x3C;GROUP> &#x3C;KIND>\nargocd project allow-namespace-resource &#x3C;PROJECT> &#x3C;GROUP> &#x3C;KIND>\nargocd project deny-cluster-resource &#x3C;PROJECT> &#x3C;GROUP> &#x3C;KIND>\nargocd project deny-namespace-resource &#x3C;PROJECT> &#x3C;GROUP> &#x3C;KIND>\n</code></pre>\n<h3>Assign application to a project</h3>\n<p>The application project can be changed using <code>app set</code> command. In order to change the project of\nan app, the user must have permissions to access the new project.</p>\n<pre><code>argocd app set guestbook-default --project myproject\n</code></pre>\n<h3>Configuring RBAC with projects</h3>\n<p>Once projects have been defined, RBAC rules can be written to restrict access to the applications\nin the project. The following example configures RBAC for two GitHub teams: <code>team1</code> and <code>team2</code>,\nboth in the GitHub org, <code>some-github-org</code>. There are two projects, <code>project-a</code> and <code>project-b</code>.\n<code>team1</code> can only manage applications in <code>project-a</code>, while <code>team2</code> can only manage applications in\n<code>project-b</code>. Both <code>team1</code> and <code>team2</code> have the ability to manage repositories.</p>\n<p><em>ConfigMap <code>argocd-rbac-cm</code> example:</em></p>\n<pre><code class=\"language-yaml\">apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-rbac-cm\ndata:\n  policy.default: \"\"\n  policy.csv: |\n    p, some-github-org:team1, applications, *, project-a/*, allow\n    p, some-github-org:team2, applications, *, project-a/*, allow\n\n    p, role:org-admin, repositories, get, *, allow\n    p, role:org-admin, repositories, create, *, allow\n    p, role:org-admin, repositories, update, *, allow\n    p, role:org-admin, repositories, delete, *, allow\n\n    g, some-github-org:team1, org-admin\n    g, some-github-org:team2, org-admin\n</code></pre>\n<h2>Project Roles</h2>\n<p>Projects include a feature called roles that enable automated access to a project's applications.\nThese can be used to give a CI pipeline a restricted set of permissions. For example, a CI system\nmay only be able to sync a single app (but not change its source or destination).</p>\n<p>Projects can have multiple roles, and those roles can have different access granted to them. These\npermissions are called policies, and they are stored within the role as a list of policy strings.\nA role's policy can only grant access to that role and are limited to applications within the role's\nproject.  However, the policies have an option for granting wildcard access to any application\nwithin a project.</p>\n<p>In order to create roles in a project and add policies to a role, a user will need permission to\nupdate a project.  The following commands can be used to manage a role.</p>\n<pre><code class=\"language-bash\">argoproj proj role list\nargoproj proj role get\nargoproj proj role create\nargoproj proj role delete\nargoproj proj role add-policy\nargoproj proj role remove-policy\n</code></pre>\n<p>Project roles in itself are not useful without generating a token to associate to that role. Argo CD\nsupports JWT tokens as the means to authenticate to a role. Since the JWT token is\nassociated with a role's policies, any changes to the role's policies will immediately take effect\nfor that JWT token.</p>\n<p>The following commands are used to manage the JWT tokens.</p>\n<pre><code class=\"language-bash\">argoproj proj role create-token PROJECT ROLE-NAME\nargoproj proj role delete-token PROJECT ROLE-NAME ISSUED-AT\n</code></pre>\n<p>Since the JWT tokens aren't stored in Argo CD, they can only be retrieved when they are created. A\nuser can leverage them in the cli by either passing them in using the <code>--auth-token</code> flag or setting\nthe ARGOCD<em>AUTH</em>TOKEN environment variable. The JWT tokens can be used until they expire or are\nrevoked.  The JWT tokens can created with or without an expiration, but the default on the cli is\ncreates them without an expirations date.  Even if a token has not expired, it cannot be used if\nthe token has been revoked.</p>\n<p>Below is an example of leveraging a JWT token to access a guestbook application.  It makes the\nassumption that the user already has a project named myproject and an application called\nguestbook-default.</p>\n<pre><code class=\"language-bash\">PROJ=myproject\nAPP=guestbook-default\nROLE=get-role\nargocd proj role create $PROJ $ROLE\nargocd proj role create-token $PROJ $ROLE -e 10m\nJWT=&#x3C;value from command above>\nargocd proj role list $PROJ\nargocd proj role get $PROJ $ROLE\n\n# This command will fail because the JWT Token associated with the project role does not have a policy to allow access to the application\nargocd app get $APP --auth-token $JWT\n# Adding a policy to grant access to the application for the new role\nargocd proj role add-policy $PROJ $ROLE --action get --permission allow --object $APP\nargocd app get $PROJ-$ROLE --auth-token $JWT\n\n# Removing the policy we added and adding one with a wildcard.\nargocd proj role remove-policy $PROJ $TOKEN -a get -o $PROJ-$TOKEN\nargocd proj role remove-policy $PROJ $TOKEN -a get -o '*'\n# The wildcard allows us to access the application due to the wildcard.\nargocd app get $PROJ-$TOKEN --auth-token $JWT\nargocd proj role get $PROJ\n\n\nargocd proj role get $PROJ $ROLE\n# Revoking the JWT token\nargocd proj role delete-token $PROJ $ROLE &#x3C;id field from the last command>\n# This will fail since the JWT Token was deleted for the project role.\nargocd app get $APP --auth-token $JWT\n</code></pre>",docPath:"argo-cd/docs/projects",proj:"argo-cd"}}}});
//# sourceMappingURL=path---docs-argo-cd-docs-projects-html-6247bb1b4d077996cb9c.js.map