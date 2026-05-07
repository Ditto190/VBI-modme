I am thinking about separating the implementations of agent and CLI, with agent as an independent package that operates the builder.

1. cli is responsible for integrating with provider, operating platform resources, and handling concrete app business logic.
2. agent is only responsible for obtaining builder and then operating builder.

The goal behind this is to make the atomic components in packages open-sourceable without binding them to the app platform.

Given that, what should we do?
