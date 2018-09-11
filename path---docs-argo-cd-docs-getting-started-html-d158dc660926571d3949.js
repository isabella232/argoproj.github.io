webpackJsonp([0xba7ff04d46a0],{504:function(e,a){e.exports={pathContext:{docHtml:'<h1>ArgoCD Getting Started</h1>\n<p>An example guestbook application is provided to demonstrate how ArgoCD works.</p>\n<h2>Requirements</h2>\n<ul>\n<li>Installed <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/">kubectl</a> command-line tool</li>\n<li>Have a <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/">kubeconfig</a> file (default location is <code>~/.kube/config</code>).</li>\n</ul>\n<h2>1. Install ArgoCD</h2>\n<pre><code class="language-bash">kubectl create namespace argocd\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v0.8.1/manifests/install.yaml\n</code></pre>\n<p>This will create a new namespace, <code>argocd</code>, where ArgoCD services and application resources will live.</p>\n<p>NOTE:</p>\n<ul>\n<li>\n<p>On GKE with RBAC enabled, you may need to grant your account the ability to create new cluster roles</p>\n<pre><code class="language-bash">kubectl create clusterrolebinding YOURNAME-cluster-admin-binding --clusterrole=cluster-admin --user=YOUREMAIL@gmail.com\n</code></pre>\n</li>\n</ul>\n<h2>2. Download ArgoCD CLI</h2>\n<p>Download the latest ArgoCD version:</p>\n<p>On Mac:</p>\n<pre><code class="language-bash">brew install argoproj/tap/argocd\n</code></pre>\n<p>On Linux:</p>\n<pre><code class="language-bash">curl -sSL -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/download/v0.8.1/argocd-linux-amd64\nchmod +x /usr/local/bin/argocd\n</code></pre>\n<h2>3. Open access to ArgoCD API server</h2>\n<p>By default, the ArgoCD API server is not exposed with an external IP. To expose the API server,\nchange the service type to <code>LoadBalancer</code>:</p>\n<pre><code class="language-bash">kubectl patch svc argocd-server -n argocd -p \'{"spec": {"type": "LoadBalancer"}}\'\n</code></pre>\n<h3>Notes about Ingress and AWS Load Balancers</h3>\n<ul>\n<li>If using Ingress objects without TLS from the ingress-controller to ArgoCD API server, you will\nneed to add the <code>--insecure</code> command line flag to the argocd-server deployment.</li>\n<li>AWS Classic ELB (in HTTP mode) and ALB do not have full support for HTTP2/gRPC which is the\nprotocol used by the <code>argocd</code> CLI. When using an AWS load balancer, either Classic ELB in\npassthrough mode is needed, or NLBs.</li>\n</ul>\n<h2>4. Login to the server from the CLI</h2>\n<p>Login with using the <code>admin</code> user. The initial password is autogenerated to be the pod name of the\nArgoCD API server. This can be retrieved with the command:</p>\n<pre><code class="language-bash">kubectl get pods -n argocd -l app=argocd-server -o name | cut -d\'/\' -f 2\n</code></pre>\n<p>Using the above password, login to ArgoCD\'s external IP:</p>\n<p>On Minikube:</p>\n<pre><code class="language-bash">argocd login $(minikube service argocd-server -n argocd --url | cut -d\'/\' -f 3) --name minikube\n</code></pre>\n<p>Other clusters:</p>\n<pre><code class="language-bash">kubectl get svc -n argocd argocd-server\nargocd login &#x3C;EXTERNAL-IP>\n</code></pre>\n<p>After logging in, change the password using the command:</p>\n<pre><code class="language-bash">argocd account update-password\nargocd relogin\n</code></pre>\n<h2>5. Register a cluster to deploy apps to</h2>\n<p>We will now register a cluster to deploy applications to. First list all clusters contexts in your\nkubconfig:</p>\n<pre><code class="language-bash">argocd cluster add\n</code></pre>\n<p>Choose a context name from the list and supply it to <code>argocd cluster add CONTEXTNAME</code>. For example,\nfor minikube context, run:</p>\n<pre><code class="language-bash">argocd cluster add minikube --in-cluster\n</code></pre>\n<p>The above command installs an <code>argocd-manager</code> ServiceAccount and ClusterRole into the cluster\nassociated with the supplied kubectl context. ArgoCD uses the service account token to perform its\nmanagement tasks (i.e. deploy/monitoring).</p>\n<p>The <code>--in-cluster</code> option indicates that the cluster we are registering, is the same cluster that\nArgoCD is running in. This allows ArgoCD to connect to the cluster using the internal kubernetes\nhostname (kubernetes.default.svc). When registering a cluster external to ArgoCD, the <code>--in-cluster</code>\nflag should be omitted.</p>\n<h2>6. Create the application from a git repository</h2>\n<h3>Creating apps via UI</h3>\n<p>Open a browser to the ArgoCD external UI, and login using the credentials set in step 4.</p>\n<p>On Minikube:</p>\n<pre><code class="language-bash">minikube service argocd-server -n argocd\n</code></pre>\n<p>Connect a git repository containing your apps. An example repository containing a sample\nguestbook application is available at <a href="https://github.com/argoproj/argocd-example-apps.git">https://github.com/argoproj/argocd-example-apps.git</a>.</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/connect_repo-0700c08fdfbc5cfbbe42d0fb19480ee2-85bfc.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 60.0990099009901%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsSAAALEgHS3X78AAACOUlEQVQoz6WRTWgTQRTHpwbUS5V0kyqoMYcIgh94bVKLH3gICuJXbnpYUS9e4lEF9aLirSqCtrSgEGsMgt70Jh6FlhSSxmi3m49NNsnuzmZ3ZxM3u3nubqPWGg/FBz/ezPDef/5vBk3feedh0p/OZL6mL+Xz32iGZelCqUQXS0U6t7BA53K5P8hms3Qmk1nN5bnZ2bPx+DUPOh897U3Pz/FNFYPCcUAkDB1VBSxJUKlUQbKzLMuAMXYhhEC73YZWq+Wi6zpYlgX5fL4WjUaHEPKGfMdiF5hE8g28L1aNix8/mx+WymZBxGYNKyZWVFNagawSs6nppvwbg7QNqNQaS+FIZBihod2Uf/8I++DJBPCKZs2Xq91FvtEt18WuICtdSdG6YlNzs7t29+pKLGKYwNUahXBk1I92BEMU2neYvT7+FIhGLI6vQ02Q7AIBbAFokhbIDpoOWCV/YddYrY4FlbpgC0b8CPkDlO/QKfb2wwkQJGx9YVgocFUo2rAlDtgyB0yx7IzkXmA7Wo1Fvndch5FR2yHaEqAGwyfYW+PPQCW6xQsYGrj5C6GXnWZHsA/LDt2RbYfebSFqYOQ4e/PR5LKgiP/V2M+d61DvvaHr0L9rD+U5cm7xxuNJUBTNqDTEjv0ZfRH7YJ8bit6GMl9n3E/ZuveAb2PsinB/5i04YcHa4md9XZLFg2Njw2jz9sDghqMn78auxp+nXqemEq+S02tk6mUy9SIxk7y3MxjchHqxzmb9f+JoDPwA4FS8fRKDvqMAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="connect repo"\n        title=""\n        src="/static/connect_repo-0700c08fdfbc5cfbbe42d0fb19480ee2-fb8a0.png"\n        srcset="/static/connect_repo-0700c08fdfbc5cfbbe42d0fb19480ee2-1a291.png 148w,\n/static/connect_repo-0700c08fdfbc5cfbbe42d0fb19480ee2-2bc4a.png 295w,\n/static/connect_repo-0700c08fdfbc5cfbbe42d0fb19480ee2-fb8a0.png 590w,\n/static/connect_repo-0700c08fdfbc5cfbbe42d0fb19480ee2-526de.png 885w,\n/static/connect_repo-0700c08fdfbc5cfbbe42d0fb19480ee2-85bfc.png 1010w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>After connecting a git repository, select the guestbook application for creation:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/select_repo-55f6f276017f702306a40d9ec1beada0-85bfc.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 47.22772277227723%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAACCElEQVQoz43QS4jTQBgH8GnqCosIbl8g6EV8IIL78NTWgheFwp5WwYuiBPRe8bwHPQleVPCwot7EixevHj14EHeJbGmb1CapTbNpk8zk0bRNZ/KZVsGuKHj48Wc+/vMNDHr94H2yJXy8WpWEO6LY5JuKwrc7Hb79vc3XajW+Xq/zjUZ9ltNztVr9m7s729vXKpV7SXSzvLEkfN3ZczwMrqbBEBMIXRewbYOu62DHiTEGQgi48Xw0GsFwOIz9zCAIgDEGoiga5XI5hdDSycyV67dar96+A9MioSCp9P4ngX5QNKpahPYdj9rulE+x51PiB3MGU6E/CqFr9OVCsZhDKHcunV0tKo+evwDsDZjS7UVVzYjkvX7UI24UL9rHcryZuRkLQgqa0VcLxYtZdPT8chpdKCubT7YAOx6TVA00vRcXTDAdD7AfTB8C+w+W60PXxKD1beaPJ9DtmWo+X8iig6nj6cXSurz5dAsMb0AF3WQS8WdE22WNGYc1HZ/JgyGT/SFT/BFregHbNTGTsEe1SQSKYSqX8/ksOnzsTGZx/Ubn4cs3MKYRWPF/kDEFHCNznJCBM9mPhNPeBEIA0C2sXSqVcujIibOpQxu3P1cePyOq0jbEb3JP+gdxzu9Zy2jKirNba3xZXl3LIIQSB7iF5KkEx60lEtwK4rjVxH/61V2Z3eW40/GyhR8y3wfxOD5M9AAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="select repo"\n        title=""\n        src="/static/select_repo-55f6f276017f702306a40d9ec1beada0-fb8a0.png"\n        srcset="/static/select_repo-55f6f276017f702306a40d9ec1beada0-1a291.png 148w,\n/static/select_repo-55f6f276017f702306a40d9ec1beada0-2bc4a.png 295w,\n/static/select_repo-55f6f276017f702306a40d9ec1beada0-fb8a0.png 590w,\n/static/select_repo-55f6f276017f702306a40d9ec1beada0-526de.png 885w,\n/static/select_repo-55f6f276017f702306a40d9ec1beada0-85bfc.png 1010w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/select_app-1c4316dc290c5c7a0fb1e3bc1e2cf321-85bfc.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 47.22772277227723%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAACIElEQVQoz22QO4gTURSG70xcQUVw8wJBG/GBCJqs1W5iIWwT0GYVbBRlQPuIYLWNdmKzWIiKWIlgYWFhY2mxhbhr1JBkMjuPZCaZSTbzzszs7Nw53iQbJLjFx3fPf7iHcy969+Rzgq98u1FtVu43mxzDiSLTkmWm1W4ztVqNqdfrTKNRH3tUV6vV/XiwubFxs1x+mEB3SivzlV+bquUYYMkK+IYBoeOAoevQ7XZBJzZIZpom2LYNQRCA7/uEiT3PA4wxsCyrlUqlJELzp9PLt+7yHz5+gi9SJ3y8Xokerf+MvopKJA3MqG85kW6PcCPDcSPL9SKTMLXpDkM3CKGj9YWlQiGLUPZCKp0viM9evgHVdvFvWY2rHS3m1X6sGlasO8OYDIsHU6xZkz72djEoWl8iAzPo+MVLKXS5JK6uvSZPcrAgyiCIbZA7KgwMC3TLgYFpg+UMwbTd/1C0bWw63mhDaalYzKCDyZOpw1euC6trr8AMwkiwXNx2Pax4AVaGPm7ZQyySbOS242HZ9cf9sUnNkW9RdyKQtG3x6uJiBh09cS596Npt+enb9+BFMcheCP3deEIE0AsxdLwd6Poh9Payf8Qkw+ACgDIwlOViMYuOnTqfPLJy73v5+QtTEiWN3RJ6LMf32K0JTVI3eWHsaTYDx2scL1p/ao0fufxCGiFEHaDnEmcoml6gKDqHKCpPzjOMsv3yPXLjuzR9lgyb+wvNrAdSCBqpjwAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="select app"\n        title=""\n        src="/static/select_app-1c4316dc290c5c7a0fb1e3bc1e2cf321-fb8a0.png"\n        srcset="/static/select_app-1c4316dc290c5c7a0fb1e3bc1e2cf321-1a291.png 148w,\n/static/select_app-1c4316dc290c5c7a0fb1e3bc1e2cf321-2bc4a.png 295w,\n/static/select_app-1c4316dc290c5c7a0fb1e3bc1e2cf321-fb8a0.png 590w,\n/static/select_app-1c4316dc290c5c7a0fb1e3bc1e2cf321-526de.png 885w,\n/static/select_app-1c4316dc290c5c7a0fb1e3bc1e2cf321-85bfc.png 1010w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/select_env-e323759fd9bf01b2de870223b8b20d2c-85bfc.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 47.22772277227723%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAACF0lEQVQoz5XPO4gTQRgH8LnEE1QELy8QtBEfiOBdziqJAQstAtqcgo2iLGgfEeyu0E5sDgtRESsRLCwsbCwtFMQ7o4Zks7nsbm4f2WSz7+xuNjv7OZsLvrCx+PGf75uZjxn0/O6bZKf2/mKdqd1gmDbV5jiqKwhUd2uLajQaVLPZpGi6Oc24rtfr/3JzY339UrV6K4muVlYWal83eqatgymI4Ok6BLYNuqaBLMugkdRJzzAMsCwLfN8Hz/OI7XRdFzDG0Gq1lEqlkkJo4XDm7OVrnZevXsNbXgrufKyFtz98Cd9xYtjVjHBg2qFmxZxQJwzH/c0oFjh+AJIyYIulUg6h3Il0Jl/i7j96Cj3Lwd8EOapLSsQqaiSreqTbo4gMm9JnOWX+rLEbhCAqA75YOp1F+08uptGpCre69gQM08K8IEOvr5IDKvCSApKqgWaPpuShDtJAA0UzYWg5IA6GIPaH2PYnIPVVvlAoZtHO1MH07vIFdnXtMajeOKQNB/PuGPPeGLdNBzOGjbmRj1nHw7Rm4oZq4ObQxJvWCLd0K85QmETAKSp3rlDIor0HjmV2nb8i3Hv2AgIMoI1DMMkiZpCvmBP8y6w37QfbPYOcDwDi14tnyuUc2nfoeGrPyvVP1QcPDZ7jFXqT7bdmmJm/a+aPvY7SZjnze4P+vJhfziCE5nYk5pNH5hKJZWKJyP+npdndo2TY/A9COAcMQ1tyWgAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="select env"\n        title=""\n        src="/static/select_env-e323759fd9bf01b2de870223b8b20d2c-fb8a0.png"\n        srcset="/static/select_env-e323759fd9bf01b2de870223b8b20d2c-1a291.png 148w,\n/static/select_env-e323759fd9bf01b2de870223b8b20d2c-2bc4a.png 295w,\n/static/select_env-e323759fd9bf01b2de870223b8b20d2c-fb8a0.png 590w,\n/static/select_env-e323759fd9bf01b2de870223b8b20d2c-526de.png 885w,\n/static/select_env-e323759fd9bf01b2de870223b8b20d2c-85bfc.png 1010w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/create_app-9f8892aea3a3038834d404056133b38c-85bfc.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 83.06930693069307%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsSAAALEgHS3X78AAACxUlEQVQ4y6WTy08TURTGR5SNiUmrJsRHTEBErMiCEGNi1BiJG3DBwsQFNZrogqAW3ehG3UjQkPAIMZAoCxSsG/8JGmuDCCmmtJ2ILZ2ZdvqaZ6cIvZ3jmWlRWksC8Sa/OXduZr75zmOo/r6ZquCCq8MXXLjlD9Bd/uVl+3IkYg8jNE3b/X6/PRgI2AOIsff5fP+wtLTUtej13na73XVU55XOfYveb2FJToHCMEAkCUBVQcPIsiwkEglICwIIiIhnmqZBNpstIZPJ4HkWXC5XD0VZa63t9ruBSecnmGH53GOPlzyf/U5GF4MklBJJVFKIrGpEVFQiyCqRcF+OqGbWs+sEPF/n7lFUTbPlYGML/WxgGDh84XOY0z0rUX2eielsUjCJJtN6QpR1Qcno6QrgOVklOrhnUbDubKuFam6jH/WPgKKoeZbjIRqLAxeNQwRjBGOIjQGfFkFUtUroCFnLA3wxBA8cqrVQrW20AwUFUcrToQgKRM2HZW0V5EzWjMY9OqmE6fDXhuB+69GC4MsRkNEhwyeATwmQEKQSkqIMaVkFoQw8KwhiyqbgsdoGC2W7SN/vGwJJVvI/wgyscDEIo8sww5n7EMNi6vyGQDk68lfw+EmbhWo4Tz94MQgSOuTiKTOVSvXaKuWSGtY3oqDtEu3oG8Y5k/M/0VWqmN42KXVYf+q0hWq5SjtejZpNMWooYSP+OKpQtzKKNYRNgueu0Y6B1yChQ2NEuHjSJI6jYoimdyJ4wtZkoS5fp3sHx0HBpqxEeZ3l4zoTi+vY7cIwF9LaEmFzyoZgVfvNwMORN5BKpXNhji/+ThoxvmzUZxuYvx4K9lANTWes1Te6I08mnEByBDJrOTA6Zgzq2jbJruMFl2duvpeqOXxkb/Xljqftd7onnB+cY++mneOTU9M74/302JTz49uBwaELVHHtQvb8J7sNnd/5ziHDuBtgTwAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="create app"\n        title=""\n        src="/static/create_app-9f8892aea3a3038834d404056133b38c-fb8a0.png"\n        srcset="/static/create_app-9f8892aea3a3038834d404056133b38c-1a291.png 148w,\n/static/create_app-9f8892aea3a3038834d404056133b38c-2bc4a.png 295w,\n/static/create_app-9f8892aea3a3038834d404056133b38c-fb8a0.png 590w,\n/static/create_app-9f8892aea3a3038834d404056133b38c-526de.png 885w,\n/static/create_app-9f8892aea3a3038834d404056133b38c-85bfc.png 1010w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h3>Creating apps via CLI</h3>\n<p>Applications can be also be created using the ArgoCD CLI:</p>\n<pre><code class="language-bash">argocd app create guestbook-default --repo https://github.com/argoproj/argocd-example-apps.git --path guestbook --env default\n</code></pre>\n<h2>7. Sync (deploy) the application</h2>\n<p>Once the guestbook application is created, you can now view its status:</p>\n<p>From UI:\n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/guestbook-app-cf986b4ed6e707a36852838d24d5c2fc-85bfc.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 66.13861386138613%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAACpklEQVQ4y52Ty0/UQBjAG4kXFczSZYOPgwcfm+jBcOHhgagXSIgHxXjwZBNMvBAfJ/Wg/gd6RTx4I+pBiEYwSFAUjCGLsmxYLLLbRfbFbh/bbruddubzaxsQErzY5Jf5pp35zTffTLmBRyN1qR+fLi38/N6XXBIFMZUSpNVVIZPJCIuLiz7JZNLHixOJxCaxeFyIB/H1WCzWe+v2nTpO6L4Ympufy1cMFYxsFmxVBaLrIMsy5HI5ULBVFAVUfK9pGtRqNbAQrwXXAWJZQCkFURQLXd3djRzXEA1fvXlv5WNsAarEIWVNdykhLkFcx3Fx8CYMAdR4OIy5Q2tlt2g7BPtQkuXU+XNnIxwXbuGPdl1Jv56cAZs41KjZjDLmgxaGym3gMgz1DBdnj8U1ltZN6gk1XZc6OzubuIOt7Tx34UZ64N1n3FqFFgolUPQqYKagGSbopgWV6nY0REdozQbdMGlJt0CU1qTW9o4mjqs/zO+5jML3X2B9XaF56TeU1QpUUeS4LhDi+DXyAGCw9fF6Lm4jpxgQX5akNk+4O3SE39cjpAdHp2C9pNLiahZwW/4EhxCQFRVMLDzWFLAOf2UsiHFRmlerkPiVCYQNh47z9T196WdjQYZbhTWst2xUwUERHgLYmCVBbBcz3iY0ILGRYTh6mt/b258eHP+6KbQJCYS43WLFAB1bjwpi+C3BRejOwsjJFr7+2v2VpxPfoJgvOaVswS1YNZd4V8Q7aLw6G1dlJ7C2TraswcKylPKFzS3t4ca7T/JD8ytgmgRP2AIFh1YRwgJs+g/wm+kw0HHskpQttHWciXCN0VP7Q/0PXz54/mJ2YnJqenhsYubN2IeZEWTYYzSId2I4YPrt+OTsyOj4q2MnoiEOn12IFxxAmv8Tby7+dlzdHzJZGFPwlHkuAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="create app"\n        title=""\n        src="/static/guestbook-app-cf986b4ed6e707a36852838d24d5c2fc-fb8a0.png"\n        srcset="/static/guestbook-app-cf986b4ed6e707a36852838d24d5c2fc-1a291.png 148w,\n/static/guestbook-app-cf986b4ed6e707a36852838d24d5c2fc-2bc4a.png 295w,\n/static/guestbook-app-cf986b4ed6e707a36852838d24d5c2fc-fb8a0.png 590w,\n/static/guestbook-app-cf986b4ed6e707a36852838d24d5c2fc-526de.png 885w,\n/static/guestbook-app-cf986b4ed6e707a36852838d24d5c2fc-85bfc.png 1010w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>From CLI:</p>\n<pre><code class="language-bash">$ argocd app get guestbook-default\nName:          guestbook-default\nServer:        https://kubernetes.default.svc\nNamespace:     default\nURL:           https://192.168.64.36:31880/applications/argocd/guestbook-default\nEnvironment:   default\nRepo:          https://github.com/argoproj/argocd-example-apps.git\nPath:          guestbook\nTarget:        HEAD\n\nKIND        NAME          STATUS     HEALTH\nService     guestbook-ui  OutOfSync\nDeployment  guestbook-ui  OutOfSync\n</code></pre>\n<p>The application status is initially in an <code>OutOfSync</code> state, since the application has yet to be\ndeployed, and no Kubernetes resources have been created. To sync (deploy) the application, run:</p>\n<pre><code class="language-bash">$ argocd app sync guestbook-default\nApplication:        guestbook-default\nOperation:          Sync\nPhase:              Succeeded\nMessage:            successfully synced\n\nKIND        NAME          MESSAGE\nService     guestbook-ui  service "guestbook-ui" created\nDeployment  guestbook-ui  deployment.apps "guestbook-ui" created\n</code></pre>\n<p>This command retrieves the manifests from git repository and performs a <code>kubectl apply</code> of the\nmanifests. The guestbook app is now running and you can now view its resource\ncomponents, logs, events, and assessed health:</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/guestbook-tree-37d9a1e8b0354e3e9b61803b187dc5b4-59900.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 72.848948374761%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsSAAALEgHS3X78AAACxElEQVQ4y6WSS2tTQRTHgyg+cOHGb+An8EPUjW6kdCOiNCBFLHQpbnTTjeCr4AvTSlu6USroQoVSpLba0prUJrZ53Sb3kZv7fiU3yX0fz9wkaqsuxIEfM3PmzH/+M3MS9Nby4Hbp65VCsTxcqlaTNMclWZZN5vP5ZKFQ+Cs5XM/u5JPFQmE4m82OrK2tnU6QltnalBq2CbZQB8+yILBt0HUdBEEAwzDANM3fMBC32QAfIeMoDCGdTk/EghfGblSXMjlou54n6mZg2a3A9/2YPzUPAYiCFdUM3os6jsFFgKKoe7HgqYEh+s3KBuBKaDRbkW42ok7HiTDnB9Ev4z4Lshm9qmtk7BNBmqa7golzI8z8pwyJhZ7vAzGA5mJCvEoUy0XQ8nzQOk5M04s1SIvCKCIugWGY+7He0aGrzOv1bCzoB0E/D9q4se04/Y1gOy4odgtM7B3MI9bC+DTYK3jobJKZXlyFVtsNWVkDXjVAUM2YOiL2ekEzQYqxQNS6MSRCgqYbwpetbz2HA5eY1NuPmGSFdE0BhlehVJOAqsmIBGVNA9mwQEERHilx/bWYCHMC0WrDx/VMT/DMMJN6twy21Qlv5pbgBbsDDiZIuglVEcUR4qaG7ilOhEpdgQqvwG6XqMLLgdxwYGVjsyt47PwoM7mwijVnh/PUNiyyVZAUE4oMjxtkKKgySKYFqm7htS0oCzLUmxZoOFexIlhZDySr81Pw+MXrzNSHDfI2Ya2uAaHcuzIRzGGBc6oOVV6CEivAroDPgnMOnRdpPtrd7/DEtfHK5FIaJNX0ipwYULwUkKQ+1ZockHfCQ+KexCiuO+/FXMGwYXk9czcWPHnrsfJyh8USCUHEk5Smuxd7H/ti5ENIcX1OZx91HV4eGx+9/WB6ZnYu9WRqZvLp839kauZZanpu9s7Ew8FErx1Ejvwnh5EDaDTxHQBgogmFecqiAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="view app"\n        title=""\n        src="/static/guestbook-tree-37d9a1e8b0354e3e9b61803b187dc5b4-fb8a0.png"\n        srcset="/static/guestbook-tree-37d9a1e8b0354e3e9b61803b187dc5b4-1a291.png 148w,\n/static/guestbook-tree-37d9a1e8b0354e3e9b61803b187dc5b4-2bc4a.png 295w,\n/static/guestbook-tree-37d9a1e8b0354e3e9b61803b187dc5b4-fb8a0.png 590w,\n/static/guestbook-tree-37d9a1e8b0354e3e9b61803b187dc5b4-526de.png 885w,\n/static/guestbook-tree-37d9a1e8b0354e3e9b61803b187dc5b4-59900.png 1046w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h2>8. Next Steps</h2>\n<p>ArgoCD supports additional features such as SSO, WebHooks, RBAC, Projects. See the rest of\nthe <a href="./">documentation</a> for details.</p>',docPath:"argo-cd/docs/getting_started",proj:"argo-cd"}}}});
//# sourceMappingURL=path---docs-argo-cd-docs-getting-started-html-d158dc660926571d3949.js.map