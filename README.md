# TwiYo repository bootstrap

This repository is being populated from the reviewed TwiYo demo source package. The source ZIP itself is not application source until it is unpacked into the repository tree.

## Populate this repository without installing Git locally

1. Download the **TwiYo_GitHub_Import_Package.zip** supplied in the project conversation.
2. Open the repository home page and choose **Add file → Upload files**.
3. Upload the ZIP file unchanged at the repository root. Its exact name must be `TwiYo_GitHub_Import_Package.zip`.
4. Commit the archive to `main`.
5. Open **Actions → Import TwiYo source archive → Run workflow**.
6. When the run finishes, open the pull request linked in the workflow summary. Review its files and verification results, then merge only after any failed checks are understood.

The import workflow validates archive paths and required source files before extracting. It creates a separate branch and pull request; it does not directly merge application code into `main`.

## Current scope

The imported project is a demo. A successful import does not enable live payments, durable order storage, production fulfilment, or delivery of customer enquiries.

The import action expects the exact package filename shown above. Do not upload secrets or credentials into the repository.
