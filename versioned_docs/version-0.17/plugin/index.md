# Botkube plugin

Botkube plugin system allows you to extend the Botkube core with custom logic. For example, call or receive events from third party services.

Botkube is split into two main parts:

- Botkube Core: Botkube binary that serves as a bridge between communication platforms (e.g. Slack, Discord) and Botkube plugins (sources and executors).
- Botkube plugins: The executable binaries that communicate with Botkube Core over an RPC interface. Botkube supports two types of plugins, respectively called Source plugins and Executor plugins.
