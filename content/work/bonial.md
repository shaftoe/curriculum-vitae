---
title: "Bonial International GmbH"
location: "Berlin (Germany)"
timePeriod: "July 2013 - December 2016"
jobTitle: "Senior System Engineer"
date: 2013-07-01T00:00:00+00:00
---

Bonial, multinational business in the publishing field, was looking for someone willing to embrace the challenge of refactoring their relatively big Puppet codebase, all while expanding their operations. I was eager to get onboard and test my skills on a new scale (thousand of servers).

I happily joined the _Operations_ team as team lead and put in charge of the overall infrastructure stability, robustness and maintainability, enforcing best operational practices.

In my years at Bonial I witnessed first hand the IT department and especially the Operations team exponential growth. We regularly faced interesting new challenges, some of them planned, like cloud providers migrations (from Rackspace to AWS), some of them unexpected and frantic, like embracing the new micro-services paradigm, which in itself put an incredible amount of new goals and responsibilities on my team.

As the _new way_ took off more and more, we gradually abandoned self managed hosts (and Puppet with them) moving towards cloud services. Terraform was our tool of choice to help us manage at best our multi-account, multi-region AWS setup. We decided to implement internally our Terraform orchestrator to better integrate with our CI/CD pipeline, react to failures, and enforce good coding practices.

The technological stack:

- AWS / Rackspace cloud
- Debian GNU/Linux
- Ganeti virtualization
- Docker
- Terraform
- Puppet
- Icinga
- Apache web server
- Tomcat/JVM
- PostgreSQL
- Python automation with Fabric and Boto libraries
- Jenkins
- Gerrit
- Datadog
- OpenLDAP
- data confidentiality with LUKS
- ...
