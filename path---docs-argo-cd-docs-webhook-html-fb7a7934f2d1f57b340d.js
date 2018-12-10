webpackJsonp([0x721cdca81003],{543:function(e,t){e.exports={pathContext:{docHtml:'<h1>Git Webhook Configuration</h1>\n<h2>Overview</h2>\n<p>Argo CD will poll git repositories every three minutes for changes to the manifests. To eliminate\nthis delay from polling, the API server can be configured to receive webhook events. Argo CD supports\ngit webhook notifications from GitHub, GitLab, and BitBucket. The following explains how to configure\na git webhook for GitHub, but the same process should be applicable to other providers.</p>\n<h3>1. Create the webhook in the git provider</h3>\n<p>In your git provider, navigate to the settings page where webhooks can be configured. The payload\nURL configured in the git provider should use the /api/webhook endpoint of your Argo CD instance\n(e.g. <a href="https://argocd.example.com/api/webhook">https://argocd.example.com/api/webhook</a>). Input an arbitrary value in the secret. The same\nvalue will be used when configuring the webhook in step 2.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/webhook-config-1e3fed90ae9c19ddafe2b8b823f3114d-b7132.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 93.92338177014533%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAACXBIWXMAAAsSAAALEgHS3X78AAACNElEQVQ4y5VUS3bbMAzkvbvpDbpob9CrdNdtNukifW0s6y+KIvWnNAUgS5bc1HWYNw8gzYCYASBlXY04zZHmBYIwxmsQwroGw+jRDaOgv9jF94f9/ne2ytU1MgqmyxJ5oSlwjtJUAlNZgiPforI1wdG9SsB+RcmUdIfBZ23bQRm6+CtIcI5znMIMr+cUaZYjTlJ5qKBH+CH2+TxJMwH76z5l5JVkr2zdIy5aZKaDtiOqxmOasa15ngXTNNH5xV/3t2cEouxwOgWIogjOVuC9JTrGMC1LWo7wfsLovYCD3K55vj6uuq4XSnlRCpgaW6ZT6BJdP0iBOPAwLMH3ma/YAtZ1Q9nFiONEMnhk7QP8FbDrOsomQ0YZccUnEtBTYAZnv16+DfjPDK1zQpm14SCjaOaFmpezI6b5ULFrwIvdNMykNbRoV1M/jfTPopvot2jIerIsW2ZvZK64GR01KAdmn23TNIR2A+vcU7ADXfKdNiiDCCZOUZ5jtHUL1ZBu3Jz75l0aNt8aOIwSNPTYtSBLbp6qPjIbSoKtJyYqpWbONI0ajV5ZGinMIHM5CAa2fb/1320hDpTpTzX9CC2zayTDiuby0TW/VRQ/DjQZdqFLHwaZX2rodkfxPVB1N5HwRIn4szRr++xHbH4wMPew0u2Al/CEII+gnRHKPMsC6lHWlSu9n5B7EqhvyXd8ePqEj09f8Pn5K/hTs31JLthPwv9GURWtwXPxgh/6J35X5zt0JqF0HxP+AOGGyXe7E+EJAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="Add Webhook"\n        title="Add Webhook"\n        src="/static/webhook-config-1e3fed90ae9c19ddafe2b8b823f3114d-fb8a0.png"\n        srcset="/static/webhook-config-1e3fed90ae9c19ddafe2b8b823f3114d-1a291.png 148w,\n/static/webhook-config-1e3fed90ae9c19ddafe2b8b823f3114d-2bc4a.png 295w,\n/static/webhook-config-1e3fed90ae9c19ddafe2b8b823f3114d-fb8a0.png 590w,\n/static/webhook-config-1e3fed90ae9c19ddafe2b8b823f3114d-b7132.png 757w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h3>2. Configure Argo CD with the webhook secret</h3>\n<p>In the <code>argocd-secret</code> kubernetes secret, configure one of the following keys with the git provider\nwebhook secret configured in step 1.</p>\n<table>\n<thead>\n<tr>\n<th>Provider</th>\n<th>K8s Secret Key</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GitHub</td>\n<td><code>github.webhook.secret</code></td>\n</tr>\n<tr>\n<td>GitLab</td>\n<td><code>gitlab.webhook.secret</code></td>\n</tr>\n<tr>\n<td>BitBucket</td>\n<td><code>bitbucket.webhook.uuid</code></td>\n</tr>\n</tbody>\n</table>\n<p>Edit the Argo CD kubernetes secret:</p>\n<pre><code>kubectl edit secret argocd-secret\n</code></pre>\n<p>TIP: for ease of entering secrets, kubernetes supports inputting secrets in the <code>stringData</code> field,\nwhich saves you the trouble of base64 encoding the values and copying it to the <code>data</code> field.\nSimply copy the shared webhook secret created in step 1, to the corresponding\nGitHub/GitLab/BitBucket key under the <code>stringData</code> field:</p>\n<pre><code>apiVersion: v1\nkind: Secret\nmetadata:\n  name: argocd-secret\n  namespace: argocd\ntype: Opaque\ndata:\n...\n\nstringData:\n  # github webhook secret\n  github.webhook.secret: shhhh! it\'s a github secret\n\n  # gitlab webhook secret\n  gitlab.webhook.secret: shhhh! it\'s a gitlab secret\n\n  # bitbucket webhook secret\n  bitbucket.webhook.uuid: your-bitbucket-uuid\n</code></pre>\n<p>After saving, the changes should take affect automatically.</p>',docPath:"argo-cd/docs/webhook",proj:"argo-cd"}}}});
//# sourceMappingURL=path---docs-argo-cd-docs-webhook-html-fb7a7934f2d1f57b340d.js.map