> Create a new project from this template by running `taito template-create: server-template`. You can also migrate an existing project to this template by running `taito template-migrate: server-template` in your project root folder. Later you can upgrade your project to the latest version of the template by running `taito template-upgrade`. To ensure flawless upgrade, do not modify files that have **do not modify** note in them as they are designed to be reusable and easily configurable for various needs. In such case, improve the original files in the template instead, and then upgrade.

# server-template

## Prerequisites

* [taito-cli](https://github.com/TaitoUnited/taito-cli#readme)
* [docker-compose](https://docs.docker.com/compose/install/) (>= 1.11) or [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) (>= x.xx)
* eslint-plugin for your editor

## Conventions

* [Taito conventions:](https://github.com/TaitoUnited/taito/wiki/Conventions) General conventions
* [TaitoFlow:](https://github.com/TaitoUnited/taito/wiki/Git-and-GitHub#taitoflow) Version control workflow
* [Airbnb Style Guide:](https://github.com/airbnb/javascript) ES6 conventions

## Tips

* [Taito-cli](https://github.com/TaitoUnited/taito/wiki/Taito-cli)
* [Basic git commands](https://github.com/TaitoUnited/taito/wiki/Git-and-GitHub#git-commands)
* Technologies: [React](https://github.com/TaitoUnited/taito/wiki/React), [Node.js](https://github.com/TaitoUnited/taito/wiki/Node), [Docker](https://github.com/TaitoUnited/taito/wiki/Docker)

## Development

Install linters locally (all developers use the same linter version):

    $ taito install

Start containers (add `--clean` option in case of trouble):

    $ taito start

Make sure that everything has been initialized (database populated, etc.):

    $ taito init

Open app in browser:

    $ taito open app

Show user accounts that you can use to log in:

    $ taito users

Stop:

    $ taito stop

Write `taito op` and press TAB to get the list of most important commands for operating your project. Run `taito COMMAND -h` to search for a command (e.g `taito log -h`, `taito clean -h`). Run `taito -h` to get detailed instructions for all commands. For troubleshooting run `taito --trouble`.

See PROJECT.md for project specific conventions and documentation.

> Basic authentication is enabled on all environments by default to keep unfinished work hidden from the public. The username is '#username' and the password is '#password'. You can turn basic authentication off by modifying the `scripts/helm-prod.yaml` and `scripts/helm.yaml` files.

> It's common that idle applications are run down to save resources on non-production environments . If your application seems to be down, you can start it by running `taito start:ENV`, or by pushing some changes to git.

## Structure

An application should be divided in loosely coupled highly cohesive parts by using a modular directory structure. The following rules usually work well in an event-based solution (a GUI for example). In the backend implementation you most likely need to break the rules once in a while, but still try to keep directories loosely coupled.

* Create directory structure based on features (`reporting`, `users`, ...) instead of type (`actions`, `containers`, `components`, `css`, ...). Use such file naming that you can easily determine the type from filename (e.g. `*.ducks.js`, `*.container.js`). Then you don't need to use directories for grouping files by type.
* A directory should not contain any references outside of its boundary; with the exception of references to libraries and common directories. You can think of each directory as an independent mini-sized app, and a `common` directory as a library that is shared among them.
* A file should contain only nearby references (e.g. files in the same directory or in a subdirectory directly beneath it); with the exception of references to libraries and common directories, of course.
* If you break the dependency rules, at least try to avoid making circular dependencies between directories. Also leave a `REFACTOR:` comment if the dependency is the kind that it should be refactored later.
* Each block of implementation (function, class, module, sql query, ...) should be clearly named by its responsibility and implement only what it is responsible for, nothing else.

See [orig-template/client/app](https://github.com/TaitoUnited/orig-template/tree/master/client/app) as an example. See [General Software Design](https://github.com/TaitoUnited/taito/wiki/General-Software-Design) article for more information on how to structure your app.

## Version control

### Development branches

Development is executed in dev and feature branches. Feature branches are useful for code reviews, cleaning up commit history and keeping unfinished work separate, but they are not mandatory for small projects. Note that most feature branches should be short-lived and located only on your local git repository.

> TIP: Use the `taito git feat` commands to manage your feature branches.

### Commit messages

All commit messages must be structured according to the [Conventional Commits](http://conventionalcommits.org/) convention as application version number and release notes are generated automatically during release by the [semantic-release](https://github.com/semantic-release/semantic-release) library. Commit messages are automatically validated before commit. You can also edit autogenerated release notes afterwards in GitHub (e.g. to combine some commits and clean up comments). Couple of commit message examples:

```
feat(dashboard): Added news on the dashboard.
```

```
fix(login): Fixed header alignment.

Problem persists with IE9, but IE9 is no longer supported.

Closes #87, #76
```

```
feat(ux): New look and feel

BREAKING CHANGE: Not really breaking anything, but it's a good time to
increase the major version number.
```

You can use any of the following types in your commit message. Use at least types `fix` and `feat`.

* `wip`: Work-in-progress (small commits that will be squashed later to one larger commit before merging them to one of the environment branches)
* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation only changes
* `style`: Code formatting
* `refactor`: Refactoring
* `perf`: Performance tuning
* `test`: Implementing missing tests or correcting existing ones
* `revert`: Revert previous commit.
* `build`: Build system changes
* `ci`: Continuous integration changes (cloudbuild.yaml)
* `chore`: maintenance

> TIP: Optionally you can use `npm run commit` to write your commit messages by using commitizen, though often it is quicker to write commit messages by hand.

## Database Migration

Add a new migration:

1. Add a new step to migration plan:

    `taito db-add: NAME -r REQUIRES -n 'DESCRIPTION'`, for example:

    `taito db-add: file.table -r user.table -r property.table -n 'Table for files'`

2. Modify database/deploy/xxx.sql, database/revert/xxx.sql and database/verify/xxx.sql

3. Deploy the change to your local db:

    `taito db deploy`

The CI/CD tool will deploy your database changes automatically to servers once you push your changes to git. Database migrations are executed using sqitch. More instructions on sqitch: [Sqitch tutorial](https://metacpan.org/pod/sqitchtutorial)

> It is recommended that you put a table name at the beginning of your migration script name. This way the table creation script and all its alteration scripts remain close to each other in the file hierarchy.

## Deployment

Deploying to different environments:

* dev: Push to dev branch.
* test: Merge changes to test branch. NOTE: Test environment is not mandatory.
* staging: Merge changes to staging branch. NOTE: Staging environment is not mandatory.
* prod: Merge changes to master branch. Version number and release notes are generated automatically by the CI/CD tool.

> TIP: Use the `taito git env merge:ENV SOURCE_BRANCH` command to merge an environment branch to another.

> NOTE: For critical systems master/staging branches are protected so that changes always need to go through a review before push.

Advanced features:

* **Debugging CI builds**: You can build and start production containers locally with the `taito start --clean --prod` command. You can also run any CI build steps defined in cloudbuild.yaml locally with taito-cli. If you want to run them exacly as CI would, first log in to container with `taito --shell`, set `taito_mode=ci` and `COMPOSE_PROJECT_NAME=workspace` environment variables and then run the taito-cli commands using the container shell. *TODO install also [container-builder-local](https://github.com/GoogleCloudPlatform/container-builder-local) on taito-cli container?*
* **Quick deploy**: If you are in a hurry, you can build, push and deploy a container directly to server with the `taito ci fulldeploy:ENV NAME` command e.g. `taito ci fulldeploy:dev client`.
* **Copy prod to staging**: Often it's a good idea to copy production database to staging before merging changes to the staging branch: `taito db copy:staging prod`. If you are sure nobody is using the production database, you can alternatively use the quick copy (`taito db copyquick:staging prod`), but it disconnects all other users connected to the production database until copying is finished and also requires that both databases are located in the same database cluster.
* **Feature branch**: You can create also an environment for a feature branch: Delete the old environment first if it exists (`taito env delete:feature`) and create new environment for your feature branch (`taito env create:feature BRANCH`). Currently only one feature environment can exist at a time and therefore the old one needs to be deleted before the new one is created.
* **Alternative environment** TODO implement: You can create an alternative environment for an environment by running `taito env alt create:ENV`. An alternative environment uses the same database as the main environment, but containers are built from an alternative branch. You can use alternative environments e.g. for canary releases or A/B testing by redirecting some of the users to the alternative environment.
* **Revert app**: Revert application to the previous revision by running `taito ci revert:ENV`. If you need to revert to a specific revision, check current revision by running `taito ci revision:ENV` first and then revert to a specific revision by running `taito ci revert:ENV REVISION`. NOTE: The command does not revert database changes.
* **Revert database changes**: Revert the previous migration batch by running `taito db revert[:ENV]`. If you would like to revert to a specific revision instead, view the db change log first (`taito db log[:ENV]`) and then run `taito db revert[:ENV] CHANGE`.

NOTE: Some of the advanced operations might require admin credentials (e.g. staging/production operations). If you don't have an admin account, ask devops personnel to execute the operation for you.

## Tools

The following tools are currently used for this project. You can open any of the tools quickly from command line by using the `taito open` commands provided by the taito-cli link plugin.

* See issue boards on [GitHub projects](https://github.com/TaitoUnited/server-template/projects) and issues on [GitHub issues](https://github.com/TaitoUnited/server-template/issues).
* See all builds on [Google Build History](https://console.cloud.google.com/gcr/builds?project=gcloud-temp1&query=source.repo_source.repo_name%3D%22github-taitounited-server-template%22).
* See all build artifacts on [Google Container Registry](https://console.cloud.google.com/gcr/images/gcloud-temp1/EU/github-taitounited-server-template?project=gcloud-temp1).
* Deployed on Kubernetes. See  [instructions](https://github.com/TaitoUnited/taito/wiki/Kubernetes). The most common Kubernetes operations are available as taito commands: `taito --help`.
*  All [dev](https://console.cloud.google.com/logs/viewer?project=gcloud-temp1&minLogLevel=0&expandAll=false&resource=container%2Fcluster_name%2Fkube1%2Fnamespace_id%2Fcustomername-dev), [staging](https://console.cloud.google.com/logs/viewer?project=gcloud-temp1&minLogLevel=0&expandAll=false&resource=container%2Fcluster_name%2Fkube1%2Fnamespace_id%2Fcustomername-staging) and [prod](https://console.cloud.google.com/logs/viewer?project=gcloud-temp1&minLogLevel=0&expandAll=false&resource=container%2Fcluster_name%2Fkube1%2Fnamespace_id%2Fcustomername-prod) logs are gathered to Google Stackdriver. See [instructions](https://github.com/TaitoUnited/taito/wiki/Stackdriver).
* [Sentry](https://sentry.io/taitounited/server-template/) is used for error tracking. See [instructions](https://github.com/TaitoUnited/taito/wiki/Sentry).
* [Stackdriver uptime monitoring](https://app.google.stackdriver.com/uptime?project=gcloud-temp1) is used for monitoring production environment uptime status.
* See performance on: TODO new relic?
* See customer feedback on: TODO zendesk?

## Configuration

> NOTE: Some of the configuration steps might require admin rights, especially if database is involved.

### Local development

Modify `docker-compose.yaml` without touching the container names. Remove such containers that you don't need.

TODO Something about examples...

### Project configuration

1. Configure `taito-config.sh`
2. Run `taito env-config`

### TODO Something about additional steps if an old project was migrated:

* Stackdriver
* Sentry
* Secrets
* Buckets
* Job queues

### Creating an environment

Execute the following steps for an environment (`feature`, `dev`, `test`, `staging` or `prod`):

1. Run `taito env create:ENV` and follow instructions.

### Finalizing production environment

Once you are ready to make the first production release, finalize the production environment with the following steps:

1. Configure `helm-prod.yaml`
2. Run `taito env finalize:prod` and follow instructions.

### Kubernetes configuration

The `scripts/heml.yaml` file contains default Kubernetes settings for all environments and the `scripts/helm:ENV.yaml` files contain environment specific overrides for them. By modying them you can easily configure environment variables, resource requirements and autoscaling for your containers.

If you want to change your stack in some way (e.g. add/remove cache or function), run `taito template upgrade` and it will do it for you.

### Configuring secrets

Local development (docker): Just define secret as a normal environment variable in `docker-compose.yaml`.

Kubernetes:
1. Add secret definition to `taito-config.sh`
2. Map secret to an environment variable in `scripts/helm.yaml`
3. Run `taito rotate:ENV [SECRET]` to generate a secret value for an environment. Run the command for each environment.

### Upgrading to the latest version of the project template

Run `taito template upgrade`. The command copies the latest versions of reusable Helm charts and CI/CD scripts to your project folder, and also this README.md file. You should not make project specific modifications to them as they are designed to be reusable and easily configurable for various needs. Improve the originals instead, and then upgrade.
